"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// import Link from "next/link";

import { useTransition, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";

import { Input } from "@/components/ui/input";
import { Form, FormControl, FormLabel, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
// import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

import { FiPlus } from "react-icons/fi";
import { GoTrash } from "react-icons/go";

import { Todo } from "@prisma/client";
import { TodoSchema } from "@/schemas";
import { addTodo, editTodo, deleteTodo, getTodosByUserId, toggleIsCompleted } from "@/actions/todo";
import { cn } from "@/lib/utils";

interface TodoWidgetProps {
	classNames?: string;
}

// 10 Items = 569 Pixel Höhe
export const TodoWidget = ({ classNames }: TodoWidgetProps = { classNames: "" }) => {
	const { status } = useSession({ required: true });

	const [isPending, startTransition] = useTransition();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [todos, setTodos] = useState<Todo[]>([]);

	const fetchTodos = async () => {
		setIsLoading(true);
		try {
			const response = await getTodosByUserId();
			setTodos(response);
		} catch (error) {
			toast.error("Failed to fetch Todos.");
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		setIsLoading(true);
		fetchTodos();
		setIsLoading(false);
	}, []);

	const newForm = useForm<z.infer<typeof TodoSchema>>({
		resolver: zodResolver(TodoSchema),
		defaultValues: { title: "", description: "", isCompleted: false }
	});

	const dynamicForm = useForm<z.infer<typeof TodoSchema>>({
		resolver: zodResolver(TodoSchema),
		defaultValues: { title: "", description: "", isCompleted: false }
	});

	const onSubmit = async (values: z.infer<typeof TodoSchema>) => {
		const validatedFields = TodoSchema.safeParse(values);
		startTransition(async () => {
			const result = await addTodo(values);
			if (result.error) {
				toast.error(result.error);
			} else if (result.success) {
				toast.success(result.success);
				newForm.reset();
				fetchTodos();
			}
		});
	};

	const onEdit = async (id: string, values: z.infer<typeof TodoSchema>) => {
		startTransition(async () => {
			const result = await editTodo(id, values);
			if (result.error) {
				toast.error(result.error);
			} else if (result.success) {
				toast.success(result.success);
				fetchTodos();
			}
		});
	};

	const onIsCompleted = async (id: string) => {
		startTransition(async () => {
			const result = await toggleIsCompleted(id);
			if (result.error) {
				toast.error(result.error);
			} else if (result.success) {
				toast.success(result.success);
				fetchTodos();
			}
		});
	};

	// TODO: Funktionen und Server Actions überprüfen und Naming glatt ziehen
	const deleteTodoById = async (id: string) => {
		const result = await deleteTodo(id);
		if (result.error) {
			toast.error(result.error);
		} else if (result.success) {
			toast.success(result.success);
			fetchTodos();
		}
	};

	const showEditForm = () => {
		alert("Edit");
	};

	return (
		<div className={cn("min-h-28", classNames)}>
			<Form {...newForm}>
				<form onSubmit={newForm.handleSubmit(onSubmit)}>
					<FormField
						control={newForm.control}
						name="title"
						disabled={isPending}
						render={({ field }) => (
							<FormItem className="w-full shadow-none block p-0 mb-3">
								<FormControl>
									<Input {...field} className="w-full shadow-none h-8 text-sm block" placeholder="neues Todo" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={newForm.control}
						name="description"
						disabled={isPending}
						render={({ field }) => (
							<FormItem className="w-full shadow-none block p-0 mb-3">
								<FormControl>
									<Textarea {...field} className="w-full shadow-none h-8 text-sm block" placeholder="Beschreibung" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button disabled={isPending} className="text-white bg-black rounded-sm  text-sm w-full shadow-none" type="submit">
						<FiPlus className="size-4" /> Todo hinufügen
					</Button>
				</form>
			</Form>
			<hr className="my-3" />
			<ul className="ml-2">
				{status === "loading" ? (
					<>
						<Skeleton className="mt-3 mb-5 w-full h-4 bg-black/10 animate-pulse" />
						<Skeleton className="mt-3 mb-5 w-full h-4 bg-black/10 animate-pulse" />
						<Skeleton className="mt-3 mb-5 w-75 h-4 bg-black/10 animate-pulse" />
						<Skeleton className="mt-3 mb-5 w-50 h-4 bg-black/10 animate-pulse" />
					</>
				) : (
					todos.map(todo => (
						<li key={todo.id} className="flex justify-between mt-3 text-sm">
							<span>
								<input type="checkbox" disabled={isPending} checked={todo.isCompleted} onChange={() => onIsCompleted(todo.id)} className="mt-1 mr-2" />
								<span className={cn("text-slate-900", todo.isCompleted ? "line-through text-slate-500" : "")}>{todo.title}</span>
							</span>
							<span>
								<button onClick={() => deleteTodoById(todo.id)} className="text-rose-400 hover:text-rose-600 hover:bg-slate-200 rounded-full p-1" disabled={isPending}>
									<GoTrash />
								</button>
							</span>
						</li>
					))
				)}
			</ul>
		</div>
	);
};
