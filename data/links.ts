import { db } from "@/lib/db";

export const countLinks = async () => {
	const count = await db.link.count();
	return count;
};
