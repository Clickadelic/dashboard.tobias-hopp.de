"use server"

import * as z from "zod"
import { db } from "@/lib/db"
import { ProjectSchema } from "@/schemas"
import { auth } from "@/auth"

export const addProject = async (values: z.infer<typeof ProjectSchema>) => {
	const session = await auth()
	const user = session?.user
	const userId = user?.id
	try {
		const validatedFields = ProjectSchema.safeParse(values)

		if (!validatedFields.success) {
			return { error: "Ungültige Felder!" }
		}

		const { title, url, description } = validatedFields.data

		const existingLink = await db.project.findFirst({
			where: {
				url,
				user: {
					id: userId
				}
			}
		})

		if (existingLink) {
			return { error: "Projekt-Url existiert bereits." }
		}
		await db.project.create({
			data: {
				title,
				url,
				description,
				user: {
					connect: { id: userId }
				}
			}
		})
		return { success: "Projekt hinzugefügt." }
	} catch (error) {
		return { error: "Interner Server-Fehler." }
	}
}

export const getProjectById = async (id: string) => {
	const project = await db.project.findFirst({ where: { id } })
	return project
}

export const getProjectsByUserId = async () => {
	const session = await auth()
	const user = session?.user
	const userId = user?.id
	const projects = await db.project.findMany({ where: { userId } })
	return projects
}
