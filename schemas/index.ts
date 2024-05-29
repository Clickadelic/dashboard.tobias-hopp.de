import * as z from "zod";
import { UserRole } from "@prisma/client";

export const SettingsSchema = z
	.object({
		name: z.optional(z.string()),
		isTwoFactorEnabled: z.optional(z.boolean()),
		role: z.enum([UserRole.ADMIN, UserRole.USER]),
		email: z.optional(z.string().email()),
		password: z.optional(z.string().min(6)),
		newPassword: z.optional(z.string().min(6))
	})
	// TODO Check Refine Code
	.refine(
		data => {
			if (data.password && !data.newPassword) {
				return false;
			}

			return true;
		},
		{
			message: "Neues Passwort ist notwendig.",
			path: ["newPassword"]
		}
	)
	.refine(
		data => {
			if (data.newPassword && !data.password) {
				return false;
			}
			return true;
		},
		{
			message: "Altes Passwort ist notwendig.",
			path: ["password"]
		}
	);

export const LoginSchema = z.object({
	email: z.string().email({ message: "E-Mail ist notwendig." }),
	password: z.string().min(1, { message: "Passwort ist notwendig." }),
	code: z.optional(z.string())
});

export const RegisterSchema = z.object({
	email: z.string().email({ message: "E-Mail ist ein Pflichtfeld." }),
	password: z.string().min(6, { message: "Mindestens 6 Buchstaben." }),
	name: z.string().min(1, { message: "Name ist ein Pflichtfeld." })
});

export const ResetSchema = z.object({
	email: z.string().email({ message: "E-Mail ist notwendig." })
});

export const NewPasswordSchema = z.object({
	password: z.string().min(6, { message: "Mindestens 6 Buchstaben." })
});

export const LinkSchema = z.object({
	title: z.string().min(1, "Titel fehlt"),
	url: z.string().url("Ungültige URL")
});
