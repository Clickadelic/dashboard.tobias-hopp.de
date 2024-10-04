"use server"

import { put } from "@vercel/blob"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"
import { db } from "@/lib/db"

/**
 * Uploads a background image for a user.
 *
 * @param {FormData} formData - The form data containing the image file.
 * @return {Promise<Blob>} - A promise that resolves to the uploaded image blob.
 */
export const addBackgroundImage = async (formData: FormData) => {
	const session = await auth()
	const user = session?.user
	const userId = user?.id

	const imageFile = formData.get("image") as File
	const blob = await put(imageFile.name, imageFile, {
		access: "public"
	})

	revalidatePath("/")

	return blob
}
