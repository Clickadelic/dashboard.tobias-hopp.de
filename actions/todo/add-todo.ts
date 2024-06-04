"use server";

import * as z from "zod";

import { db } from "@/lib/db";
import { TodoSchema } from "@/schemas";
import { auth } from "@/auth";

export const addTodo = async (values: z.infer<typeof TodoSchema>) => {
	const session = await auth();
	const user = session?.user;
	const userId = user?.id;
	try {
		const validatedFields = TodoSchema.safeParse(values);
		if (!validatedFields.success) {
			return { error: "Ungültige Felder!" };
		}

		const { title, description, isCompleted } = validatedFields.data;

		await db.todo.create({
			data: {
				title,
				description,
				isCompleted,
				user: {
					connect: { id: userId }
				}
			}
		});

		return { success: "Todo hinzugefügt." };
	} catch (error) {
		return { error: "Interner Server-Fehler." };
	}
};
