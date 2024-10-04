"use server"

import * as z from "zod"
import { db } from "@/lib/db"
import { signIn } from "@/auth"
import { LoginSchema } from "@/schemas"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { AuthError } from "next-auth"
import { getUserByEmail } from "@/data/user"
import { sendVerificationEmail, sendTwoFactorTokenEmail } from "@/lib/mail"
import { generateVerificationToken, generateTwoFactorToken } from "@/lib/tokens"
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token"
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation"

export const login = async (values: z.infer<typeof LoginSchema>, callbackUrl: string | null) => {
	const validatedFields = LoginSchema.safeParse(values)

	if (!validatedFields.success) {
		return { error: "Ungültige Eingabe!" }
	}
	const { email, password, code } = validatedFields.data

	const existingUser = await getUserByEmail(email)

	if (!existingUser || !existingUser.email || !existingUser.password) {
		return { error: "E-Mail existiert nicht!" }
	}

	if (!existingUser.emailVerified) {
		const verificationToken = await generateVerificationToken(existingUser.email)
		sendVerificationEmail(verificationToken.email, verificationToken.token)
		return { success: "E-Mail Bestätigung versendet!" }
	}

	if (existingUser.isTwoFactorEnabled && existingUser.email) {
		if (code) {
			const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email)

			if (!twoFactorToken) {
				return { error: "Kein 2FA-Token vorhanden." }
			}

			if (twoFactorToken.token !== code) {
				return { error: "Ungültiger 2FA-Token." }
			}

			const hasExpired = new Date(twoFactorToken.expires) < new Date()

			if (hasExpired) {
				return { error: "2FA-Token abgelaufen." }
			}

			await db.twoFactorToken.delete({
				where: { id: twoFactorToken.id }
			})

			const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)

			if (existingConfirmation) {
				await db.twoFactorConfirmation.delete({
					where: { id: existingConfirmation.id }
				})
			}

			await db.twoFactorConfirmation.create({
				data: { userId: existingUser.id }
			})
		} else {
			const twoFactorToken = await generateTwoFactorToken(existingUser.email)
			await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token)
			return { twoFactor: true }
		}
	}

	try {
		await signIn("credentials", {
			email,
			password,
			redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT
		})
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case "CredentialsSignin":
					return { error: "Ungültige Zugangsdaten!" }
					break

				default:
					return { error: "Irgendwas ging schief" }
					break
			}
		}

		throw error
	}
}
