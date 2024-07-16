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
import { LiaEdit } from "react-icons/lia";

import { Todo } from "@prisma/client";
import { TodoSchema } from "@/schemas";
import { addTodo, editTodoById, deleteTodoById, getTodosByUserId, toggleIsCompleted } from "@/actions/todo";
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
			const result = await editTodoById(id, values);
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
	const onDelete = async (id: string) => {
		const result = await deleteTodoById(id);
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
		<div className={cn("min-h-28 pb-1", classNames)}>
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
									<Textarea {...field} rows={3} className="w-full shadow-none text-sm block" placeholder="Beschreibung" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button disabled={isPending} variant="primary" className="w-full rounded-md" type="submit">
						<FiPlus className="size-4 mr-2" /> Todo hinufügen
					</Button>
				</form>
			</Form>
			<hr className="my-3" />
			<ul>
				{status === "loading" || isLoading || status !== "authenticated" || isPending || todos.length === 0 ? (
					<>
						<li className="my-1">
							<Skeleton className="w-full h-5 bg-black/10 mb-3 animate-pulse" />
						</li>
						<li className="my-1">
							<Skeleton className="w-full h-5 bg-black/10 mb-3 animate-pulse" />
						</li>
						<li className="my-1">
							<Skeleton className="w-full h-5 bg-black/10 mb-3 animate-pulse" />
						</li>
					</>
				) : (
					todos.map(todo => (
						<li key={todo.id} className="flex justify-between text-sm">
							<span className="flex justify-start">
								<span className="hover:bg-mantis-hover rounded-sm">
									<input type="checkbox" disabled={isPending} checked={todo.isCompleted} onChange={() => onIsCompleted(todo.id)} />
								</span>
								<span className={cn("ml-2 text-slate-900", todo.isCompleted ? "line-through text-slate-400" : "")}>{todo.title}</span>
							</span>
							<span>
								<button
									onClick={() => onEdit(todo.id, dynamicForm.getValues())}
									className="text-slate-500 hover:text-slate-500 hover:bg-mantis-hover rounded-sm p-2"
									disabled={isPending}
								>
									<LiaEdit />
								</button>
								<button onClick={() => onDelete(todo.id)} className="text-rose-400 hover:text-rose-600 hover:bg-slate-200 rounded-sm p-2" disabled={isPending}>
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
