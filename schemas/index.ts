import * as z from "zod";

export const LoginSchema = z.object({
	email: z.string().email({ message: "E-Mail ist notwendig" }),
	password: z.string().min(1, { message: "Passwort ist notwendig" })
});

export const RegisterSchema = z.object({
	email: z.string().email({ message: "E-Mail ist ein Pflichtfeld" }),
	password: z.string().min(6, { message: "Mindestens 6 Buchstaben" }),
	name: z.string().min(1, { message: "Name ist ein Pflichtfeld" })
});

export const ResetSchema = z.object({
	email: z.string().email({ message: "E-Mail ist notwendig" })
});

export const NewPasswordSchema = z.object({
	password: z.string().min(6, { message: "Mindestens 6 Buchstaben" })
});
