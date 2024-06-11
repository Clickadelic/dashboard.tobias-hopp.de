"use server";

import * as z from "zod";

import { db } from "@/lib/db";
import { AppSchema } from "@/schemas";
import { auth } from "@/auth";

export const addApp = async (values: z.infer<typeof AppSchema>) => {
	const session = await auth();
	const user = session?.user;
	const userId = user?.id;
	try {
		const validatedFields = AppSchema.safeParse(values);
		console.log("Validated Fields:", validatedFields);
		if (!validatedFields.success) {
			return { error: "Ungültige Felder!" };
		}

		const { title, url, description } = validatedFields.data;
		console.log("Title:", title, "URL:", url, "Description:", description);

		const existingLink = await db.app.findFirst({
			where: {
				url,
				user: {
					id: userId
				}
			}
		});
		if (existingLink) {
			return { error: "Url bereits vorhanden." };
		}
		await db.app.create({
			data: {
				title,
				url,
				description,
				user: {
					connect: { id: userId }
				}
			}
		});

		return { success: "App hinzugefügt." };
	} catch (error) {
		return { error: "Interner Server-Fehler." };
	}
};

export const editApp = async (id: string, values: z.infer<typeof AppSchema>) => {
	try {
		const validatedFields = AppSchema.safeParse(values);
		console.log("Validated Fields:", validatedFields);
		if (!validatedFields.success) {
			return { error: "Ungültige Felder!" };
		}
		const { title, url, description } = validatedFields.data;

		const existingLink = await db.app.findFirst({
			where: {
				id
			}
		});
		if (!existingLink) {
			return { error: "Link-Id nicht gefunden." };
		}

		await db.link.update({
			where: {
				id
			},
			data: {
				title,
				url,
				description,
				updatedAt: new Date()
			}
		});

		return { success: "Link bearbeitet." };
	} catch (error) {
		return { error: "Interner Server-Fehler." };
	}
};

export const deleteApp = async (id: string) => {
	try {
		const existingLink = await db.app.findFirst({
			where: {
				id
			}
		});
		if (!existingLink) {
			return { error: "Link nicht vorhanden." };
		}

		await db.link.delete({
			where: {
				id
			}
		});

		return { success: "Link gelöscht." };
	} catch (error) {
		return { error: "Interner Server-Fehler." };
	}
};

export const getAppsByUser = async () => {
	const session = await auth();
	const user = session?.user;
	const userId = user?.id;
	const apps = await db.app.findMany({
		where: {
			user: {
				id: userId
			}
		}
	});
	return apps;
};
