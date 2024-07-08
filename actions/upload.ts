"use server";

import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

export const addBackgroundImage = async (formData: FormData) => {
	const session = await auth();
	const user = session?.user;
	const userId = user?.id;

	const imageFile = formData.get("image") as File;
	const blob = await put(imageFile.name, imageFile, {
		access: "public"
	});
	console.log(blob);

	revalidatePath("/");

	return blob;
};
