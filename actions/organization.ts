"use server"

import * as z from "zod"

import { db } from "@/lib/db"
import { OrganizationSchema } from "@/schemas"
import { auth } from "@/auth"

export const addOrganization = async (values: z.infer<typeof OrganizationSchema>) => {
	const session = await auth()
	const user = session?.user
	const userId = user?.id
	try {
		const validatedFields = OrganizationSchema.safeParse(values)
		if (!validatedFields.success) {
			return { error: "Ungültige Werte" }
		}

		const { name, url, description } = validatedFields.data

		const existingOrganization = await db.organization.findFirst({
			where: {
				url
			}
		})
		if (existingOrganization) {
			return { error: "Org-Url bereits vorhanden" }
		}
		await db.organization.create({
			data: {
				name,
				url,
				description,
				user: {
					connect: { id: userId }
				}
			}
		})

		return { success: "Organisation hinzugefügt" }
	} catch (error) {
		return { error: "Interner Server-Fehler" }
	}
}

export const editOrganization = async (organizationId: string, values: z.infer<typeof OrganizationSchema>) => {
	const session = await auth()
	const user = session?.user
	const userId = user?.id
	try {
		const validatedFields = OrganizationSchema.safeParse(values)
		if (!validatedFields.success) {
			return { error: "Ungültige Werte" }
		}
		const { name, url } = validatedFields.data

		const existingOrganization = await db.organization.findFirst({
			where: {
				id: organizationId
			}
		})
		if (!existingOrganization) {
			return { error: "Organization-Id nicht gefunden" }
		}

		await db.organization.update({
			where: {
				id: organizationId
			},
			data: {
				name,
				url,
				updatedAt: new Date()
			}
		})

		return { success: "Organization bearbeitet" }
	} catch (error) {
		return { error: "Interner Server-Fehler" }
	}
}

export const deleteOrganization = async (organizationId: string) => {
	try {
		const existingOrganization = await db.organization.findFirst({
			where: {
				id: organizationId
			}
		})
		if (!existingOrganization) {
			return { error: "Organization-Id nicht vorhanden" }
		}

		await db.organization.delete({
			where: {
				id: organizationId
			}
		})

		return { success: "Organization gelöscht" }
	} catch (error) {
		return { error: "Interner Server-Fehler" }
	}
}

export const getOrganizationsByUserId = async () => {
	const session = await auth()
	const user = session?.user
	const userId = user?.id
	const organizations = await db.organization.findMany({
		where: {
			user: {
				id: userId
			}
		}
	})
	return organizations
}

export const getOrganizationById = async (id: string) => {
	const organization = await db.organization.findFirst({
		where: {
			id
		}
	})
	return organization
}
