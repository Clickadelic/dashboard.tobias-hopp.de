"use server"

import * as z from "zod"

import { db } from "@/lib/db"
import { TodoSchema } from "@/schemas"
import { auth } from "@/auth"

export const addTodo = async (values: z.infer<typeof TodoSchema>) => {
	const session = await auth()
	const user = session?.user
	const userId = user?.id
	try {
		const validatedFields = TodoSchema.safeParse(values)
		if (!validatedFields.success) {
			return { error: "Ungültige Felder!" }
		}

		const { title, description, isCompleted } = validatedFields.data

		await db.todo.create({
			data: {
				title,
				description,
				isCompleted,
				user: {
					connect: { id: userId }
				}
			}
		})

		return { success: "Todo hinzugefügt." }
	} catch (error) {
		return { error: "Interner Server-Fehler." }
	}
}

export const editTodoById = async (id: string, values: z.infer<typeof TodoSchema>) => {
	try {
		const validatedFields = TodoSchema.safeParse(values)
		if (!validatedFields.success) {
			return { error: "Ungültige Felder!" }
		}
		const { title, description, isCompleted } = validatedFields.data

		const existingTodo = await db.todo.findFirst({
			where: {
				id
			}
		})
		if (!existingTodo) {
			return { error: "Todo-Id nicht gefunden." }
		}

		await db.todo.update({
			where: {
				id
			},
			data: {
				title,
				description,
				isCompleted,
				updatedAt: new Date()
			}
		})

		return { success: "Todo bearbeitet." }
	} catch (error) {
		return { error: "Interner Server-Fehler." }
	}
}

export const deleteTodoById = async (id: string) => {
	try {
		const existingTodo = await db.todo.findFirst({
			where: {
				id
			}
		})
		if (!existingTodo) {
			return { error: "Todo nicht vorhanden" }
		}

		await db.todo.delete({
			where: {
				id
			}
		})

		return { success: "Todo gelöscht" }
	} catch (error) {
		return { error: "Interner Server-Fehler" }
	}
}

export const getTodosByUserId = async () => {
	const session = await auth()
	const user = session?.user
	const userId = user?.id
	const data = await db.todo.findMany({ where: { userId }, orderBy: { createdAt: "desc" } })
	return data
}

// TODO: User ID hinzufügen als check
export const toggleIsCompleted = async (id: string) => {
	try {
		const existingTodo = await db.todo.findFirst({
			where: {
				id
			}
		})
		if (!existingTodo) {
			return { error: "Todo nicht vorhanden" }
		}

		await db.todo.update({
			where: {
				id
			},
			data: {
				isCompleted: !existingTodo.isCompleted
			}
		})
		return { success: "Todo bearbeitet" }
	} catch (error) {
		return { error: "Interner Server-Fehler" }
	}
}
