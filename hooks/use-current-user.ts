import { useSession } from "next-auth/react";

/**
 * Custom hook to get the current user session
 * @returns {object} user
 */
export const useCurrentUser = () => {
	const session = useSession();

	return session.data?.user;
};
