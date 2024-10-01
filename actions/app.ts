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
		if (!validatedFields.success) {
			return { error: "Ungültige Werte" };
		}

		const { title, url } = validatedFields.data;

		const existingLink = await db.app.findFirst({
			where: {
				url,
				user: {
					id: userId
				}
			}
		});
		if (existingLink) {
			return { error: "Url bereits vorhanden" };
		}
		await db.app.create({
			data: {
				title,
				url,
				user: {
					connect: { id: userId }
				}
			}
		});

		return { success: "App hinzugefügt" };
	} catch (error) {
		return { error: "Interner Server-Fehler" };
	}
};

export const editAppById = async (id: string, values: z.infer<typeof AppSchema>) => {
	const session = await auth();
	const user = session?.user;
	const userId = user?.id;
	const validatedFields = AppSchema.safeParse(values);
	if (!validatedFields.success) {
		return { error: "Ungültige Werte" };
	}

	const { title, url } = validatedFields.data;
	try {
		const existingApp = await db.app.findFirst({
			where: {
				id
			}
		});
		if (!existingApp) {
			return { error: "App-Id nicht gefunden" };
		}

		await db.app.update({
			where: {
				id
			},
			data: {
				title,
				url,
				updatedAt: new Date()
			}
		});

		return { success: "App bearbeitet" };
	} catch (error) {
		return { error: "Interner Server-Fehler" };
	}
};

export const deleteAppById = async (id: string) => {
	try {
		const existingApp = await db.app.findFirst({
			where: {
				id
			}
		});
		if (!existingApp) {
			return { error: "App-Id nicht vorhanden" };
		}

		await db.app.delete({
			where: {
				id: id
			}
		});

		return { success: "App gelöscht" };
	} catch (error) {
		return { error: "Interner Server-Fehler" };
	}
};

export const getAppsByUserId = async () => {
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
