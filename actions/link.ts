"use server"

import * as z from "zod"

import { db } from "@/lib/db"
import { LinkSchema } from "@/schemas"
import { auth } from "@/auth"

export const addLink = async (values: z.infer<typeof LinkSchema>) => {
	const session = await auth()
	const user = session?.user
	const userId = user?.id
	try {
		const validatedFields = LinkSchema.safeParse(values)
		if (!validatedFields.success) {
			return { error: "Ungültige Felder!" }
		}

		const { title, url, description } = validatedFields.data

		const existingLink = await db.link.findFirst({
			where: {
				url,
				user: {
					id: userId
				}
			}
		})
		if (existingLink) {
			return { error: "Url bereits vorhanden." }
		}
		await db.link.create({
			data: {
				title,
				url,
				description,
				user: {
					connect: { id: userId }
				}
			}
		})

		return { success: "Link hinzugefügt." }
	} catch (error) {
		return { error: "Interner Server-Fehler." }
	}
}

export const editLinkById = async (id: string, values: z.infer<typeof LinkSchema>) => {
	try {
		const validatedFields = LinkSchema.safeParse(values)
		console.log("Validated Fields:", validatedFields)
		if (!validatedFields.success) {
			return { error: "Ungültige Felder!" }
		}
		const { title, url, description } = validatedFields.data

		const existingLink = await db.link.findFirst({
			where: {
				id
			}
		})
		if (!existingLink) {
			return { error: "Link-Id nicht gefunden." }
		}

		await db.link.update({
			where: {
				id
			},
			data: {
				title,
				url,
				description,
				updatedAt: new Date()
			}
		})

		return { success: "Link bearbeitet." }
	} catch (error) {
		return { error: "Interner Server-Fehler." }
	}
}

export const deleteLinkById = async (id: string) => {
	try {
		const existingLink = await db.link.findFirst({
			where: {
				id
			}
		})
		if (!existingLink) {
			return { error: "Link nicht vorhanden." }
		}

		await db.link.delete({
			where: {
				id
			}
		})

		return { success: "Link gelöscht." }
	} catch (error) {
		return { error: "Interner Server-Fehler." }
	}
}

export const getLinksByUserId = async () => {
	const session = await auth()
	const user = session?.user
	const userId = user?.id
	const data = await db.link.findMany({
		where: {
			user: {
				id: userId
			}
		},
		orderBy: { createdAt: "desc" }
	})
	return data
}

export const getLatestLink = async () => {
	const session = await auth()
	const user = session?.user
	const userId = user?.id
	const data = await db.link.findMany({ where: { userId }, take: 1, orderBy: { createdAt: "desc" } })
	return data
}
