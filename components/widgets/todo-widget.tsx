"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useTransition, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";

import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormLabel, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

import { FiPlus } from "react-icons/fi";
import { BsInfoCircle } from "react-icons/bs";
import { LiaEdit } from "react-icons/lia";
import { GoTrash } from "react-icons/go";

import { Todo } from "@prisma/client";
import { TodoSchema } from "@/schemas";
import { addTodo, editTodoById, deleteTodoById, getTodosByUserId, toggleIsCompleted } from "@/actions/todo";
import { cn } from "@/lib/utils";

interface TodoWidgetProps {
	classNames?: string;
}

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
		if (!editTodoId) return; // Ensure there's an ID to edit
		startTransition(async () => {
			const result = await editTodoById(editTodoId, values);
			if (result.error) {
				toast.error(result.error);
			} else if (result.success) {
				toast.success(result.success);
				form.reset({
					title: "",
					description: "",
					isCompleted: false
				});
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
			setEditTodoId(todoId); // Set the current editing Todo ID
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

	const onAbort = () => {
		form.reset({
			title: "",
			description: "",
			isCompleted: false
		});
	};

	return (
		<div className={classNames}>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(isEditing ? onEdit : onAdd)} className="space-y-2 mb-2">
					<FormField
						control={form.control}
						name="title"
						disabled={isPending}
						render={({ field }) => (
							<FormItem className="w-full shadow-none block p-0">
								<FormControl>
									<Input {...field} className="w-full shadow-none h-8 text-sm block" placeholder="Neues Todo" />
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
								<LiaEdit className="size-4 inline mr-2 mt-[-3px]" /> Todo bearbeiten
							</span>
						) : (
							<span>
								<FiPlus className="size-4 inline mr-2 mt-[-3px]" /> Todo hinufügen
							</span>
						)}
					</Button>
				</form>
			</Form>
			<Button disabled={isPending} variant="outline" className="w-full shadow-none" onClick={() => onAbort()}>
				abbrechen
			</Button>
			<hr className="my-3" />
			<ul>
				{todos.map(todo => (
					<li key={todo.id} className="flex justify-between text-sm mb-1">
						<span className="flex-grow justify-between">
							<span className="hover:bg-mantis-hover p-2 size-[36px] text-center inline-block rounded-sm">
								<input
									type="checkbox"
									aria-label="Ist erledigt"
									className="relative top-[1px]"
									disabled={isPending}
									checked={todo.isCompleted}
									onChange={() => onIsCompleted(todo.id)}
								/>
							</span>
							<span className={cn("ml-2 text-slate-900 inline-block", todo.isCompleted ? "line-through text-slate-400" : "")}>{todo.title}</span>
						</span>
						<span className="flex space-x-1">
							<Popover>
								<PopoverTrigger asChild>
									<button className="size-[36px] text-slate-900 hover:text-black hover:bg-mantis-hover rounded-sm p-2" disabled={isPending}>
										<BsInfoCircle className="mx-auto" />
									</button>
								</PopoverTrigger>
								<PopoverContent align="end" side="left">
									{todo.title && <h3 className={cn("mb-1 text-slate-900 text-sm font-bold", todo.isCompleted && "line-through text-slate-400")}>{todo.title}</h3>}
									{todo.description && <p className={cn("text-slate-900 text-sm", todo.isCompleted && "line-through text-slate-400")}>{todo.description}</p>}
								</PopoverContent>
							</Popover>
							<button
								onClick={() => setEditValues(todo.id)}
								aria-label="Bearbeiten"
								className="size-[36px] text-slate-900 hover:text-black hover:bg-mantis-hover rounded-sm p-2"
								disabled={isPending}
							>
								<LiaEdit className="mx-auto" />
							</button>
							<button
								onClick={() => onDelete(todo.id)}
								aria-label="Löschen"
								className="size-[36px] text-rose-500 hover:text-rose-600 hover:bg-mantis-hover rounded-sm p-2"
								disabled={isPending}
							>
								<GoTrash className="mx-auto" />
							</button>
						</span>
					</li>
				))}
				{todos.length === 0 && <p className="text-slate-400 my-12 text-center">Lege Dein erstes Todo an.</p>}
			</ul>
		</div>
	);
};
