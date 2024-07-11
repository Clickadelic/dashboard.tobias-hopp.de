"use client"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"

import { useTransition, useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useSession } from "next-auth/react"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormLabel, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"

import { FiPlus } from "react-icons/fi"
import { BsListCheck } from "react-icons/bs"

import { TodoSchema } from "@/schemas"
import { addTodo, getTodosByUserId } from "@/actions/todo"

export const TodoCard = () => {
	const { status } = useSession({ required: true })

	const [isPending, startTransition] = useTransition()
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [todos, setTodos] = useState<any[]>([])

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

	const form = useForm<z.infer<typeof TodoSchema>>({
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
				form.reset()
				fetchTodos()
			}
		})
	}

	return (
		<div className="bg-white rounded-xl shadow-sm border p-2 md:p-4">
			<h2 className="text-xs md:text-sm border-bottom text-slate-900 flex justify-between mb-2">
				<span>Todo&apos;s</span>
				<Link href="/todos" className="hover:text-slate-900">
					zur Übersicht
				</Link>
			</h2>
			<h3 className="text-md font-semibold mb-4">
				<BsListCheck className="inline-block mr-2 mt-[-3px]" />
				{status === "loading" || isLoading ? <Skeleton className="mt-3 mb-5 w-8 h-4 bg-primary/10 animate-pulse" /> : todos.length}
			</h3>
			<Popover>
				<PopoverTrigger className="flex justify-center w-full p-3 py-2 bg-slate-100 text-slate-900 hover:text-slate-800 hover:bg-slate-200 text-sm rounded-sm">
					<FiPlus className="mt-[3px] mr-2" /> Todo hinzufügen
				</PopoverTrigger>
				<PopoverContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
							<FormField
								control={form.control}
								name="title"
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
								control={form.control}
								name="description"
								disabled={isPending}
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Textarea {...field} placeholder="Beschreibung" />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="isCompleted"
								disabled={isPending}
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Checkbox className="mr-2" checked={field.value} onCheckedChange={field.onChange} />
										</FormControl>
										<FormLabel>Erledigt</FormLabel>
										<FormMessage />
									</FormItem>
								)}
							/>

							<Button disabled={isPending} variant="default" size="sm" type="submit" className="w-full">
								hinzufügen
							</Button>
						</form>
					</Form>
				</PopoverContent>
			</Popover>
		</div>
	)
}
