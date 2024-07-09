"use client"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { useTransition, useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useSession } from "next-auth/react"

import { Input } from "@/components/ui/input"
import { Form, FormControl, FormLabel, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"

import { FiPlus } from "react-icons/fi"
import { GoTrash } from "react-icons/go"

import { Todo } from "@prisma/client"
import { TodoSchema } from "@/schemas"
import { addTodo, editTodo, deleteTodo, getTodosByUserId } from "@/actions/todo"

interface TodoWidgetProps {
	classNames: string
	// todos: Todo[]
}

export const TodoWidget = () => {
	const { status } = useSession({ required: true })

	const [isPending, startTransition] = useTransition()
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [todos, setTodos] = useState<Todo[]>([])

	const fetchTodos = async () => {
		setIsLoading(true)
		try {
			const response = await getTodosByUserId()
			setTodos(response)
		} catch (error) {
			toast.error("Failed to fetch Todos.")
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		setIsLoading(true)
		fetchTodos()
		setIsLoading(false)
	}, [])

	const newForm = useForm<z.infer<typeof TodoSchema>>({
		resolver: zodResolver(TodoSchema),
		defaultValues: { title: "", description: "", isCompleted: false }
	})

	const dynamicForm = useForm<z.infer<typeof TodoSchema>>({
		resolver: zodResolver(TodoSchema),
		defaultValues: { title: "", description: "", isCompleted: false }
	})

	const onSubmit = async (values: z.infer<typeof TodoSchema>) => {
		const validatedFields = TodoSchema.safeParse(values)
		startTransition(async () => {
			const result = await addTodo(values)
			if (result.error) {
				toast.error(result.error)
			} else if (result.success) {
				toast.success(result.success)
				newForm.reset()
				fetchTodos()
			}
		})
	}

	const onEdit = async (id: string, values: z.infer<typeof TodoSchema>) => {
		startTransition(async () => {
			const result = await editTodo(id, values)
			if (result.error) {
				toast.error(result.error)
			} else if (result.success) {
				toast.success(result.success)
				fetchTodos()
			}
		})
	}

	const onDelete = async (id: string) => {
		startTransition(async () => {
			const result = await deleteTodo(id)
			if (result.error) {
				toast.error(result.error)
			} else if (result.success) {
				toast.success(result.success)
				fetchTodos()
			}
		})
	}

	return (
		<div className="todo-widget">
			<Form {...newForm}>
				<form onSubmit={newForm.handleSubmit(onSubmit)} className="flex justify-between space-x-4">
					<FormField
						control={newForm.control}
						name="title"
						disabled={isPending}
						render={({ field }) => (
							<FormItem className="w-full shadow-none block p-0">
								<FormControl>
									<Input {...field} className="w-full shadow-none h-8 block" placeholder="neues Todo" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<button disabled={isPending} className="text-white bg-black px-2 rounded-sm  shadow-none" type="submit">
						<FiPlus className="size-4" />
					</button>
				</form>
			</Form>

			<ul className="ml-2">
				{isLoading && <Skeleton />}
				{todos.map(todo => (
					<li key={todo.id} className="flex justify-between mt-3 text-sm">
						{/* <Form {...dynamicForm}>
								<form onSubmit={dynamicForm.handleSubmit(() => onEdit(todo.id, dynamicForm.getValues()))} className="flex justify-between space-x-1 mb-3">
									<FormField
										control={dynamicForm.control}
										name="isCompleted"
										disabled={isPending}
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<Checkbox className="mr-2" checked={todo.isCompleted} onCheckedChange={field.onChange} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={dynamicForm.control}
										name="title"
										disabled={isPending}
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<Input {...field} className="w-full border-0 shadow-none" value={todo.title} placeholder="neues Todo" />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<Button disabled={isPending} variant="destructive" size="sm" type="submit">
										edit
									</Button>
									<Button onClick={() => onDelete(todo.id)} variant="destructive" size="sm">
										Del
									</Button>
								</form>
							</Form> */}
						<span className="w-full inline-block mt-1">{todo.title}</span>
						<button className="text-destructive p-1 rounded-sm border border-destructive shadow-none" onClick={() => onDelete(todo.id)} disabled={isPending}>
							<GoTrash className="size-4" />
						</button>
					</li>
				))}
			</ul>
		</div>
	)
}
