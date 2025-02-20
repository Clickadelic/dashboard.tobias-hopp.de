"use server";

import { db } from "@/lib/db";
import { User } from "@prisma/client";
import { UserRole } from "@prisma/client";
import { auth } from "@/auth";

import { currentRole } from "@/lib/auth";

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
	const currentUserRole = await currentRole();

	if (currentUserRole === UserRole.ADMIN) {
		try {
			const existingUser = await db.user.findUnique({
				where: {
					email
				}
			});
			if (!existingUser) {
				return { error: "Benutzer nicht vorhanden" };
			}

			await db.user.delete({
				where: {
					email
				}
			});

			return { success: "Benutzer gelöscht" };
		} catch (error) {
			return { error: "Interner Server-Fehler" };
		}
	}

	return { error: "Fehlende Berechtigung" };
};

export const updateUserRole = async (email: string, role: UserRole) => {
	const currentUserRole = await currentRole();

	if (currentUserRole === UserRole.ADMIN) {
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
	}

	return { error: "Fehlende Berechtigung." };
};

export const getUserBackground = async () => {
	const session = await auth();
	const user = session?.user;
	const userId = user?.id;
	try {
		const userBackground = await db.user.findUnique({
			where: {
				id: userId
			},
			select: {
				backgroundImage: true
			}
		});

		if (!userBackground) return { error: "No background found" };

		return userBackground;
	} catch (error) {
		return { error: "Ein Fehler ist aufgetreten." };
	}
};
