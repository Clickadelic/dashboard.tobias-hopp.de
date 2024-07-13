import { db } from "@/lib/db";
import { User } from "@prisma/client";

export const getUserByEmail = async (email: string) => {
	try {
		const user = await db.user.findUnique({ where: { email } });
		return user;
	} catch (error) {
		return null;
	}
};

export const getUserById = async (id: string) => {
	try {
		const user = await db.user.findUnique({ where: { id } });
		return user;
	} catch (error) {
		return null;
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
