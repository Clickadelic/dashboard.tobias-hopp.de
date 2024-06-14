"use server"
import { db } from "@/lib/db"

export const getCurrentLinks = async () => {
	const links = await db.link.findMany()
	return links
}
