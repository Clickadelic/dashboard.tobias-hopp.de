"use server"

import { db } from "@/lib/db"

export const deleteUserByUserId = async (userId: string) => {
	console.log(userId)
	return userId
	// if (currentUser) {
	// 	try {
	// 		await db.user.delete({
	// 			where: {
	// 				id: userId
	// 			}
	// 		})
	// 		return { success: "Benutzer gelöscht" }
	// 	} catch (error) {
	// 		return { error: error }
	// 	}
	// }
	// return { error: "Fehler beim Löschen" }
}
