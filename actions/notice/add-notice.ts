"use server";

import * as z from "zod";

import { db } from "@/lib/db";
import { NoticeSchema } from "@/schemas";
import { auth } from "@/auth";

export const addNotice = async (values: z.infer<typeof NoticeSchema>) => {
	const session = await auth();
	const user = session?.user;
	const userId = user?.id;
	try {
		const validatedFields = NoticeSchema.safeParse(values);
		if (!validatedFields.success) {
			return { error: "Ungültige Felder!" };
		}

		const { noticetext } = validatedFields.data;

		await db.notice.create({
			data: {
				noticetext,
				user: {
					connect: { id: userId }
				}
			}
		});

		return { success: "Notiz hinzugefügt." };
	} catch (error) {
		return { error: "Interner Server-Fehler." };
	}
};
