"use server";

import { db } from "@/lib/db";
import { User } from "@prisma/client";
import { UserRole } from "@prisma/client";

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

/**
 * Returns a user object without password key
 */
type UserWithoutPassword = Omit<User, "password">;

/**
 * Returns an array of user objects without password key
 * @returns {object[]}
 */
export const getUsersWithoutPassword = async (): Promise<UserWithoutPassword[]> => {
	const allUsers = await db.user.findMany();
	const allUsersWithoutPassword = allUsers.map(user => {
		const { password, ...userWithoutPassword } = user;
		return userWithoutPassword;
	});
	return allUsersWithoutPassword;
};

export const deleteUserByEmail = async (email: string) => {
	try {
		const user = await db.user.findUnique({ where: { email } });
		if (!user) {
			return { error: "Benutzer nicht vorhanden." };
		}
		await db.user.delete({ where: { email } });
		return { success: "Benutzer gelöscht." };
	} catch (error) {
		return { error: "Interner Server-Fehler." };
	}
};

export const updateUserRole = async (email: string, role: UserRole) => {
	try {
		const user = await db.user.update({
			where: { email },
			data: { role }
		});
		if (!user) {
			return { error: "Benutzer nicht gefunden." };
		}
		return { success: "Benutzerrolle geändert." };
	} catch (error) {
		return { error: "Interner Server-Fehler." };
	}
};
