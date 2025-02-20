import { auth } from "@/auth";

/**
 * SSR: Returns the current user
 * @returns {object}
 */
export const currentUser = async () => {
	const session = await auth();

	return session?.user;
};

/**
 * SSR: Returns the current user role
 * @returns {object}
 */
export const currentRole = async () => {
	const session = await auth();

	return session?.user?.role;
};
