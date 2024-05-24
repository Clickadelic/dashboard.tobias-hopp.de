import { db } from "@/lib/db";
import { User } from "@prisma/client";

type UserWithoutPassword = Omit<User, "password">;

export const getUsers = async (): Promise<UserWithoutPassword[]> => {
	const allUsers = await db.user.findMany();
	const usersWithoutPassword = allUsers.map(user => {
		const { password, ...userWithoutPassword } = user;
		return userWithoutPassword;
	});
	return usersWithoutPassword;
};
