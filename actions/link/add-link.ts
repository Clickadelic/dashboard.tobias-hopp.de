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
		console.log("Validated Fields:", validatedFields)
		if (!validatedFields.success) {
			return { error: "Ungültige Felder!" }
		}

		const { title, url, description } = validatedFields.data
		console.log("Title:", title, "URL:", url, "Description:", description)

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
		console.log("Trying to create link...")
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
		console.log("Link created.")

		return { success: "Link hinzugefügt." }
	} catch (error) {
		return { error: "Interner Server-Fehler." }
	}
}
