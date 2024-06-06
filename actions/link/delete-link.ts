"use server";

import { db } from "@/lib/db";

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
