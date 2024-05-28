"use server"
import * as z from "zod";
import { db } from "@/lib/db";

export const deleteUserById = async (userId: string) => {
	const currentUser = await db.user.findFirst({
		where: {
			id: userId
		}
	})

	if (currentUser) {
		try {
			await db.user.delete({
				where: {
					id: userId
				}
			})
			return { success: "Benutzer gelöscht" }
		} catch (error) {
			return { error: error }
		}
	}
	return { error: "Fehler beim Löschen" }
}
