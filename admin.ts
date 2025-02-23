"use server";

import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { UserRole } from "@prisma/client";

import { currentRole } from "@/lib/auth";

export const addLoginBackgroundImage = async (formData: FormData) => {
	const session = await auth();
	const user = session?.user;
	const userId = user?.id;
	const role = await currentRole();
	if (role === UserRole.ADMIN) {
		const imageFile = formData.get("image") as File;
		const blob = await put(imageFile.name, imageFile, {
			access: "public"
		});
		const existingBackground = await db.systemsetting.findFirst({
			where: {
				loginBackground: blob.url
			}
		});
		if (existingBackground) {
			try {
				await db.systemsetting.update({
					where: {
						id: existingBackground.id
					},
					data: {
						loginBackground: blob.url
					}
				});
			} catch (error) {
				return { error: "Error updating background image." };
			}
		} else {
			await db.systemsetting.create({
				data: {
					loginBackground: blob.url
				}
			});
			return { success: "Background image added." };
		}
		revalidatePath("/");
		return blob;
	}
	return { error: "Keine Berechtigung für diese Aktion." };
};

export const loadLoginBackgroundImage = async () => {
	const background = await db.systemsetting.findFirst({
		where: {
			loginBackground: {
				not: null
			}
		}
	});
	return background;
};
