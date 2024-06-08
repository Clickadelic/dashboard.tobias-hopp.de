"use server";

import { db } from "@/lib/db";

export const deleteUser = async (email: string) => {
	try {
		const existingUser = await db.user.findUnique({
			where: {
				email
			}
		});
		if (!existingUser) {
			return { error: "Benutzer nicht vorhanden." };
		}

		await db.user.delete({
			where: {
				email
			}
		});

		return { success: "Benutzer gelöscht." };
	} catch (error) {
		return { error: "Interner Server-Fehler." };
	}
};
