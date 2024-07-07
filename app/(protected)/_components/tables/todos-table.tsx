"use client"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTransition, useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useSession } from "next-auth/react"
import { useCurrentUser } from "@/hooks/use-current-user"

import { Input } from "@/components/ui/input"
import { Form, FormControl, FormLabel, FormField, FormItem, FormMessage, FormDescription } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Skeleton } from "@/components/ui/skeleton"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { toast } from "sonner"

import { AiOutlineExclamationCircle } from "react-icons/ai"
import { CheckCircledIcon } from "@radix-ui/react-icons"
import { BsInfoCircle } from "react-icons/bs"
import { BsFillTrash3Fill } from "react-icons/bs"
import { FiPlus } from "react-icons/fi"
import { LiaEdit } from "react-icons/lia"
import { TodoSchema } from "@/schemas"
import { addTodo, editTodo, deleteTodo } from "@/actions/todo"

import { cn } from "@/lib/utils"
import { germanDateFormat } from "@/lib/utils"

export const TodosTable = () => {
	const { status } = useSession({ required: true })
	const userId = useCurrentUser()?.id

	const [isPending, startTransition] = useTransition()
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [todos, setTodos] = useState<any[]>([])

	const fetchTodos = async () => {
		setIsLoading(true)
		await fetch(`/api/todos/${userId}`).then(async res => {
			const response = await res.json()
			setTodos(response)
		})
		setIsLoading(false)
	}

	const deleteTodoById = async (id: string) => {
		const result = await deleteTodo(id)
		if (result.error) {
			toast.error(result.error)
		} else if (result.success) {
			toast.success(result.success)
			fetchTodos()
		}
	}

	useEffect(() => {
		setIsLoading(true)
		fetchTodos()
		setIsLoading(false)
	}, [])

	const setEditValues = (todoId: string) => {
		const todo = todos.find(todo => todo.id === todoId)
		if (todo) {
			dynamicForm.reset({
				title: todo.title,
				description: todo.description,
				isCompleted: todo.isCompleted
			})
		}
	}

	const newForm = useForm<z.infer<typeof TodoSchema>>({
		resolver: zodResolver(TodoSchema),
		defaultValues: { title: "", description: "", isCompleted: false }
	})

	const dynamicForm = useForm<z.infer<typeof TodoSchema>>({
		resolver: zodResolver(TodoSchema),
		defaultValues: { title: "", description: "", isCompleted: false }
	})

	const addNewTodo = async (values: z.infer<typeof TodoSchema>) => {
		startTransition(async () => {
			const result = await addTodo(values)
			if (result.error) {
				toast.error(result.error)
			} else if (result.success) {
				toast.success(result.success)
				dynamicForm.reset()
				fetchTodos()
			}
		})
	}

	const editCurrentTodo = async (id: string, values: z.infer<typeof TodoSchema>) => {
		startTransition(async () => {
			const result = await editTodo(id, values)
			if (result.error) {
				toast.error(result.error)
			} else if (result.success) {
				toast.success(result.success)
				dynamicForm.reset()
				fetchTodos()
			}
		})
	}

	// TODO: IDEE isEditable, setIsEditable für Rows, dann Buttons für Edit, Delete, etc.
	return (
		<>
			<div className="bg-white rounded-xl shadow-sm border p-2 md:p-4 mb-5">
				<h2 className="text-md font-bold text-slate-700 mb-5">Neues Todo</h2>
				<Form {...newForm}>
					<form onSubmit={newForm.handleSubmit(addNewTodo)} className="md:grid md:grid-cols-4 gap-5">
						<FormField
							control={newForm.control}
							name="title"
							render={({ field }) => (
								<FormItem>
									<Input {...field} placeholder="Titel" />
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={newForm.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<Input {...field} placeholder="Beschreibung" />
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={newForm.control}
							name="isCompleted"
							render={({ field }) => (
								<FormItem className="flex justify-center items-center p-0">
									<FormLabel className="font-normal mr-3">erledigt</FormLabel>
									<FormControl>
										<Switch className="mt-[-10px]" disabled={isPending} checked={field.value} onCheckedChange={field.onChange} />
									</FormControl>
								</FormItem>
							)}
						/>
						<Button disabled={isPending} variant="default" className="w-full">
							<FiPlus className="mr-2" />
							Todo hinzufügen
						</Button>
					</form>
				</Form>
			</div>
			<div className="bg-white rounded-xl shadow-sm border p-5">
				<Table className="w-full">
					<TableHeader>
						<TableRow>
							<TableHead className="w-[20px]">Id</TableHead>
							<TableHead>Titel</TableHead>
							<TableHead className="w-[160px]">Beschreibung</TableHead>
							<TableHead className="w-[160px]">erledigt</TableHead>
							<TableHead>bearbeiten</TableHead>
							<TableHead className="w-[180px]">Hinzugefügt am</TableHead>
							<TableHead className="w-[180px]">Letzte Änderung</TableHead>
							<TableHead>löschen</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{status === "loading" && (
							<TableRow>
								<TableCell colSpan={10}>
									<Skeleton className="h-5 w-full" />
									<Skeleton className="h-5 w-full" />
									<Skeleton className="h-5 w-full" />
									<Skeleton className="h-5 w-full" />
									<Skeleton className="h-5 w-75" />
									<Skeleton className="h-5 w-75" />
									<Skeleton className="h-5 w-50" />
								</TableCell>
							</TableRow>
						)}

						{todos.map((todo: any) => (
							<TableRow key={todo.id}>
								<TableCell>
									<Popover>
										<PopoverTrigger>
											<BsInfoCircle />
										</PopoverTrigger>
										<PopoverContent>{todo.id}</PopoverContent>
									</Popover>
								</TableCell>
								<TableCell className={cn("truncate ellipsis", todo.isCompleted ? "line-through" : "")}>{todo.title}</TableCell>
								<TableCell className={cn("truncate ellipsis", todo.isCompleted ? "line-through" : "")}>{todo.description}</TableCell>
								<TableCell className="truncate ellipsis">
									{todo.isCompleted ? <CheckCircledIcon className="size-5 text-emerald-500" /> : <AiOutlineExclamationCircle className="size-5 text-rose-500" />}
								</TableCell>
								<TableCell>
									<Popover>
										<PopoverTrigger asChild>
											<button onClick={() => setEditValues(todo.id)} className="hover:text-mantis-primary rounded-md inline">
												<LiaEdit className="size-4" />
											</button>
										</PopoverTrigger>
										<PopoverContent align="end">
											<Form {...dynamicForm}>
												<form onSubmit={dynamicForm.handleSubmit(() => editCurrentTodo(todo.id, dynamicForm.getValues()))} className="space-y-2">
													<FormField
														control={dynamicForm.control}
														name="title"
														defaultValue={todo.title}
														disabled={isPending}
														render={({ field }) => (
															<FormItem>
																<FormControl>
																	<Input {...field} placeholder="Titel" />
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>

													<FormField
														control={dynamicForm.control}
														name="description"
														disabled={isPending}
														render={({ field }) => (
															<FormItem>
																<FormControl>
																	<Textarea {...field} placeholder="Beschreibung..." />
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
													<FormField
														control={dynamicForm.control}
														name="isCompleted"
														render={({ field }) => (
															<FormItem className="flex flex-row items-center justify-between rounded-lg p-3">
																<div className="space-y-.5">
																	<FormLabel>erledigt</FormLabel>
																	<FormDescription>Wird als erledigt markiert.</FormDescription>
																</div>
																<FormControl>
																	<Switch disabled={isPending} checked={field.value} onCheckedChange={field.onChange} />
																</FormControl>
															</FormItem>
														)}
													/>

													<Button disabled={isPending} variant="default" type="submit" className="w-full">
														Bearbeiten
													</Button>
												</form>
											</Form>
										</PopoverContent>
									</Popover>
								</TableCell>

								<TableCell>{germanDateFormat(todo.createdAt)}</TableCell>
								<TableCell>{germanDateFormat(todo.updatedAt)}</TableCell>

								<TableCell>
									<button onClick={() => deleteTodoById(todo.id)} className="text-rose-500 hover:text-rose-600">
										<BsFillTrash3Fill className="size-4 mx-auto" />
									</button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</>
	)
}
