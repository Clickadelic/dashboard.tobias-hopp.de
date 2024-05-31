"use server"
import * as z from "zod"

import { db } from "@/lib/db"
import { LinkSchema } from "@/schemas"
import { auth } from "@/auth"

export const addLink = async (values: z.infer<typeof LinkSchema>) => {
	// TODO: Optimierung: Durch Hook ersetzen?
	const session = await auth()
	const user = session?.user
	const userId = user?.id
	try {
		const validatedFields = LinkSchema.safeParse(values)

		if (!validatedFields.success) {
			return { error: "Ungültige Felder!" }
		}

		const { title, url } = validatedFields.data

		const existingLink = await db.link.findFirst({
			where: {
				url
			}
		})

		if (existingLink) {
			return { error: "Url bereits vorhanden." }
		}

		await db.link.create({
			data: {
				title: title,
				url,
				user: {
					connect: { id: userId }
				}
			}
		})

		return { success: "Link hinzugefügt." }
	} catch (error) {
		return { error: "Internal server error." }
	}
}
