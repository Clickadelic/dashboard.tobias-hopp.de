"use server";

import * as z from "zod";

import { db } from "@/lib/db";
import { OrganisationSchema } from "@/schemas";
import { auth } from "@/auth";

export const addOrganisation = async (values: z.infer<typeof OrganisationSchema>) => {
	const session = await auth();
	const user = session?.user;
	const userId = user?.id;
	try {
		const validatedFields = OrganisationSchema.safeParse(values);
		console.log("Validated Fields:", validatedFields);
		if (!validatedFields.success) {
			return { error: "Ungültige Werte" };
		}

		const { name, url } = validatedFields.data;
		console.log("Name:", name, "URL:", url);

		const existingOrganisation = await db.organization.findFirst({
			where: {
				user: {
					id: userId
				}
			}
		});
		if (existingOrganization) {
			return { error: "Org-Url bereits vorhanden" };
		}
		await db.organization.create({
			data: {
				name,
				url,
				user: {
					connect: { id: userId }
				}
			}
		});

		return { success: "Organization hinzugefügt" };
	} catch (error) {
		return { error: "Interner Server-Fehler" };
	}
};

export const editOrganisation = async (organizationId: string, values: z.infer<typeof OrganisationSchema>) => {
	const session = await auth();
	const user = session?.user;
	const userId = user?.id;
	try {
		const validatedFields = OrganisationSchema.safeParse(values);
		if (!validatedFields.success) {
			return { error: "Ungültige Werte" };
		}
		const { name, url } = validatedFields.data;

		const existingOrganisation = await db.organisation.findFirst({
			where: {
				id: organizationId
			}
		});
		if (!existingOrganisation) {
			return { error: "Organization-Id nicht gefunden" };
		}

		await db.organization.update({
			where: {
				id: orgId
			},
			data: {
				name,
				url,
				updatedAt: new Date()
			}
		});

		return { success: "Organization bearbeitet" };
	} catch (error) {
		return { error: "Interner Server-Fehler" };
	}
};

export const deleteOrganization = async (organizationId: string) => {
	try {
		const existingOrganisation = await db.organization.findFirst({
			where: {
				id: organizationId
			}
		});
		if (!existingOrganization) {
			return { error: "Organization-Id nicht vorhanden" };
		}

		await db.organization.delete({
			where: {
				id: organizationId
			}
		});

		return { success: "Organization gelöscht" };
	} catch (error) {
		return { error: "Interner Server-Fehler" };
	}
};

export const getOrganizationsByUserId = async () => {
	const session = await auth();
	const user = session?.user;
	const userId = user?.id;
	const organizations = await db.organization.findMany({
		where: {
			user: {
				id: userId
			}
		}
	});
	return organizations;
};
