"use server";
import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
	const validatedFields = RegisterSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: "Ungültige Felder." };
	}

	const { email, password, name } = validatedFields.data;

	const hashedPassword = await bcrypt.hash(password, 10);
	const existingUser = await db.user.findUnique({
		where: {
			email
		}
	});

	if (existingUser) {
		return { error: "E-Mail bereits in Verwendung!" };
	}

	await db.user.create({
		data: {
			email,
			name,
			password: hashedPassword
		}
	});

	// Send verification token E-Mail
	return { success: "Registrierung erfolgreich!" };
};
