"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useTransition, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";

import { Input } from "@/components/ui/input";
import { Form, FormControl, FormLabel, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
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
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [editTodoId, setEditTodoId] = useState<string | null>(null); // Track the current editing Todo ID
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

	const form = useForm<z.infer<typeof TodoSchema>>({
		resolver: zodResolver(TodoSchema),
		defaultValues: { title: "", description: "", isCompleted: false }
	});

	const onAdd = async (values: z.infer<typeof TodoSchema>) => {
		startTransition(async () => {
			const result = await addTodo(values);
			if (result.error) {
				toast.error(result.error);
			} else if (result.success) {
				toast.success(result.success);
				form.reset();
				fetchTodos();
			}
		});
	};

	const onEdit = async (values: z.infer<typeof TodoSchema>) => {
		if (!editTodoId) return;
		startTransition(async () => {
			const result = await editTodoById(editTodoId, values);
			if (result.error) {
				toast.error(result.error);
			} else if (result.success) {
				toast.success(result.success);
				form.reset();
				setIsEditing(false);
				setEditTodoId(null);
				fetchTodos();
			}
		});
	};

	const setEditValues = (todoId: string) => {
		const todo = todos.find(todo => todo.id === todoId);
		if (todo) {
			form.reset({
				title: todo.title,
				description: todo.description || undefined,
				isCompleted: todo.isCompleted
			});
			setEditTodoId(todoId);
		}
		setIsEditing(true);
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

	const onDelete = async (id: string) => {
		const result = await deleteTodoById(id);
		if (result.error) {
			toast.error(result.error);
		} else if (result.success) {
			toast.success(result.success);
			fetchTodos();
		}
	};

	return (
		<>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(isEditing ? onEdit : onAdd)} className="space-y-2">
					<FormField
						control={form.control}
						name="title"
						disabled={isPending}
						render={({ field }) => (
							<FormItem className="w-full shadow-none block p-0">
								<FormControl>
									<Input {...field} className="w-full shadow-none h-8 text-sm block" placeholder="neues Todo" />
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
							<FormItem className="w-full shadow-none block p-0">
								<FormControl>
									<Textarea {...field} rows={4} className="w-full shadow-none text-sm block" placeholder="Beschreibung" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button disabled={isPending} variant="primary" className="w-full rounded-sm" type="submit">
						{isEditing ? (
							<span>
								<LiaEdit className="size-4 inline mr-2" /> Todo bearbeiten
							</span>
						) : (
							<span>
								<FiPlus className="size-4 inline mr-2" /> Todo hinufügen
							</span>
						)}
					</Button>
				</form>
			</Form>
			<hr className="my-3" />
			<ul>
				{todos.map(todo => (
					<li key={todo.id} className="flex justify-between text-sm">
						<span className="flex-grow justify-start">
							<span className="hover:bg-mantis-hover px-[10px] pt-2 pb-[5px] rounded-sm">
								<input type="checkbox" disabled={isPending} checked={todo.isCompleted} onChange={() => onIsCompleted(todo.id)} />
							</span>
							<span className="w-full">
								<span className={cn("ml-2 mt-1.5 text-slate-900 inline-block", todo.isCompleted ? "line-through text-slate-400" : "")}>{todo.title}</span>
								<span className="text-xs">{todo.description}</span>
							</span>
						</span>
						<span>
							<button onClick={() => setEditValues(todo.id)} className="text-slate-900 hover:text-slate-500 hover:bg-mantis-hover rounded-sm p-2" disabled={isPending}>
								<LiaEdit />
							</button>
							<button onClick={() => onDelete(todo.id)} className="text-rose-500 hover:text-rose-600 hover:bg-mantis-hover rounded-sm p-2" disabled={isPending}>
								<GoTrash />
							</button>
						</span>
					</li>
				))}
			</ul>
		</>
	);
};
