"use server";

import { db } from "@/lib/db";
import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";

export const addBackgroundImage = async (formData: FormData) => {
	
	const imageFile = formData.get("image") as File;
	const blob = await put(imageFile.name, imageFile, {
		access: "public"
	});
	revalidatePath("/");
	return blob;
};
