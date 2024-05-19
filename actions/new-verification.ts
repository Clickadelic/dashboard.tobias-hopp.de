"use server"

import { db } from "@/lib/db"
import { getUserByEmail } from "@/data/user"
import { getVerificationTokenByToken } from "@/data/verification-token"

export const newVerification = async (token: string) => {
	const existingToken = await getVerificationTokenByToken(token)

	if (!existingToken) {
		return { error: "Aktivierungs-Token existiert nicht." }
	}

	const hasExpired = new Date(existingToken.expires) < new Date()

	if (hasExpired) {
		return { error: "Aktivierungs-Token ist abgelaufen." }
	}

	const existingUser = await getUserByEmail(existingToken.email)

	if (!existingUser) {
		return { error: "E-Mail existiert nicht." }
	}

	await db.user.update({
		where: { id: existingUser.id },
		data: {
			emailVerified: new Date(),
			email: existingToken.email
		}
	})
	return { success: "E-mail verifiziert. Danke!" }
}
