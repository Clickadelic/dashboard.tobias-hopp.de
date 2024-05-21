import { auth } from "@/auth";

export const user = async () => {
	const session = await auth();

	return session?.user;
};
