"use server";
import * as z from "zod";
import { NewPasswordSchema } from "@/schemas";
import { getPasswordResetTokenByToken } from "@/data/password-token-reset";
import { getUserByEmail } from "@/data/user";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

export const newPassword = async (values: z.infer<typeof NewPasswordSchema>, token?: string | null) => {
	if (!token) {
		return { error: "Kein Token vorhanden." };
	}

	const validatedFields = NewPasswordSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: "Ungültige Eingaben." };
	}

	const { password } = validatedFields.data;

	const existingToken = await getPasswordResetTokenByToken(token);

	if (!existingToken) {
		return { error: "Ungültier Token." };
	}

	const hasExpired = new Date(existingToken.expires) < new Date();

	if (hasExpired) {
		return { error: "Token abgelaufen." };
	}

	const existingUser = await getUserByEmail(existingToken.email);

	if (!existingToken.email) {
		return { error: "E-Mail nicht vorhanden." };
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	await db.user.update({
		where: {
			id: existingUser?.id
		},
		data: {
			password: hashedPassword
		}
	});

	await db.passwordResetToken.delete({
		where: {
			id: existingToken.id
		}
	});

	return { success: "Passwort aktualisisert." };
};
