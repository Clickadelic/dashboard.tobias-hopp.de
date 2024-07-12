"use server"

import * as z from "zod"

import { db } from "@/lib/db"
import { NoticeSchema } from "@/schemas"
import { auth } from "@/auth"

// TODO: Add Security mit Benutzer ID

export const addNotice = async (values: z.infer<typeof NoticeSchema>) => {
	const session = await auth()
	const user = session?.user
	const userId = user?.id
	try {
		const validatedFields = NoticeSchema.safeParse(values)
		if (!validatedFields.success) {
			return { error: "Ungültige Felder!" }
		}

		const { noticetext } = validatedFields.data

		if (noticetext === "") {
			return { error: "Notiztext fehlt." }
		}

		await db.notice.create({
			data: {
				noticetext,
				user: {
					connect: { id: userId }
				}
			}
		})

		return { success: "Notiz hinzugefügt." }
	} catch (error) {
		return { error: "Interner Server-Fehler." }
	}
}

export const getNoticesByUserId = async () => {
	const session = await auth()
	const user = session?.user
	const userId = user?.id

	const data = await db.notice.findMany({
		where: {
			user: {
				id: userId
			}
		}
	})
	return data
}

export const deleteNoticeById = async (id: string) => {
	try {
		const existingNotice = await db.notice.findFirst({
			where: {
				id
			}
		})
		if (!existingNotice) {
			return { error: "Notiz nicht vorhanden" }
		}

		await db.notice.delete({
			where: {
				id
			}
		})

		return { success: "Notiz gelöscht" }
	} catch (error) {
		return { error: "Interner Server-Fehler" }
	}
}

export const getLatestNotice = async () => {
	const session = await auth()
	const user = session?.user
	const userId = user?.id
	const data = await db.notice.findMany({ where: { userId }, take: 1, orderBy: { createdAt: "desc" } })
	return data
}
