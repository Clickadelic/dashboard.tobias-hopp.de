"use server";

import * as z from "zod";

import { db } from "@/lib/db";
import { LinkSchema } from "@/schemas";
import { auth } from "@/auth";

export const addLink = async (values: z.infer<typeof LinkSchema>) => {
	const session = await auth();
	const user = session?.user;
	const userId = user?.id;
	try {
		const validatedFields = LinkSchema.safeParse(values);
		console.log("Validated Fields:", validatedFields);
		if (!validatedFields.success) {
			return { error: "Ungültige Felder!" };
		}

		const { title, url, description, isPinned } = validatedFields.data;
		console.log("Title:", title, "URL:", url, "Description:", description);

		const existingLink = await db.link.findFirst({
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
		console.log("Trying to create link...");
		await db.link.create({
			data: {
				title,
				url,
				description,
				isPinned,
				user: {
					connect: { id: userId }
				}
			}
		});
		console.log("Link created.");

		return { success: "Link hinzugefügt." };
	} catch (error) {
		return { error: "Interner Server-Fehler." };
	}
};

export const editLink = async (id: string, values: z.infer<typeof LinkSchema>) => {
	try {
		const validatedFields = LinkSchema.safeParse(values);
		console.log("Validated Fields:", validatedFields);
		if (!validatedFields.success) {
			return { error: "Ungültige Felder!" };
		}
		const { title, url, description, isPinned } = validatedFields.data;

		const existingLink = await db.link.findFirst({
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
				isPinned,
				updatedAt: new Date()
			}
		});

		return { success: "Link bearbeitet." };
	} catch (error) {
		return { error: "Interner Server-Fehler." };
	}
};

export const deleteLink = async (id: string) => {
	try {
		const existingLink = await db.link.findFirst({
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

export const getAppLinksByUser = async () => {
	const session = await auth();
	const user = session?.user;
	const userId = user?.id;
	const links = await db.link.findMany({
		where: {
			user: {
				id: userId
			},
			AND: {
				isPinned: true
			}
		}
	});
	return links;
};
