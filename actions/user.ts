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

export const getUsers = async () => {
	try {
		const data = await db.user.findMany();
		// TODO: Filter Password Key
		// const allUsersWithoutPassword = data.map(user => {
		// 	const { password, ...userWithoutPassword } = user
		// 	return userWithoutPassword
		// })
		return data;
	} catch (error) {
		return { error: "Interner Server-Fehler" };
	}
};
