import { db } from "@/lib/db";

export const countLinks = async () => {
	return await db.link.count();
};

export const getLinks = async () => {
	return await db.link.findMany();
};
