"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import { LinkSchema } from "@/schemas";

export const editLink = async (id: string, values: z.infer<typeof LinkSchema>) => {
	try {
		const validatedFields = LinkSchema.safeParse(values);
		console.log("Validated Fields:", validatedFields);
		if (!validatedFields.success) {
			return { error: "Ungültige Felder!" };
		}
		const { title, url, description } = validatedFields.data;
		console.log("Title:", title, "URL:", url, "Description:", description);

		const existingLink = await db.link.findFirst({
			where: {
				id
			}
		});
		if (!existingLink) {
			return { error: "Link-Id nicht gefunden." };
		}
		console.log("Trying to update link...");

		await db.link.update({
			where: {
				id
			},
			data: {
				title,
				url,
				description
			}
		});

		return { success: "Link bearbeitet." };
	} catch (error) {
		return { error: "Interner Server-Fehler." };
	}
};
