"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useCurrentUser } from "@/hooks/use-current-user";

import { Input } from "@/components/ui/input";
import { Form, FormControl, FormLabel, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";

import { HiDotsHorizontal } from "react-icons/hi";
import { FiPlus } from "react-icons/fi";
import { TodoSchema } from "@/schemas";
import { addTodo, editTodoById, deleteTodoById, getTodosByUserId, toggleIsCompleted } from "@/actions/todo";

import { cn } from "@/lib/utils";
import { ResponsiveDialog } from "@/components/responsive-dialog";

export const TodosTable = () => {
	const { status } = useSession({ required: true });
	const userId = useCurrentUser()?.id;

	const [isPending, startTransition] = useTransition();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [todos, setTodos] = useState<any[]>([]);

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

	const addNewTodo = async (values: z.infer<typeof TodoSchema>) => {
		startTransition(async () => {
			const result = await addTodo(values);
			if (result.error) {
				toast.error(result.error);
			} else if (result.success) {
				toast.success(result.success);
				dynamicForm.reset();
				fetchTodos();
			}
		});
	};

	const setEditValues = (todoId: string) => {
		const todo = todos.find(todo => todo.id === todoId);
		if (todo) {
			dynamicForm.reset({
				title: todo.title,
				description: todo.description,
				isCompleted: todo.isCompleted
			});
		}
	};

	const onEdit = async (id: string, values: z.infer<typeof TodoSchema>) => {
		startTransition(async () => {
			const result = await editTodoById(id, values);
			if (result.error) {
				toast.error(result.error);
			} else if (result.success) {
				toast.success(result.success);
				dynamicForm.reset();
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
						<Button disabled={isPending} variant="primary" className="w-full">
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
							<TableHead>Erledigt</TableHead>
							<TableHead>Titel</TableHead>
							<TableHead>Beschreibung</TableHead>
							<TableHead>Aktion</TableHead>
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
									<input type="checkbox" checked={todo.isCompleted} id={todo.id} onChange={() => onIsCompleted(todo.id)} />
								</TableCell>
								<TableCell className={cn("truncate ellipsis", todo.isCompleted ? "line-through" : "")}>{todo.title}</TableCell>
								<TableCell className={cn("truncate ellipsis", todo.isCompleted ? "line-through" : "")}>{todo.description}</TableCell>
								<TableCell className="asd">
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button variant="ghost" size="sm">
												<HiDotsHorizontal className="size-5" />
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent>
											<DropdownMenuItem>
												<button onClick={() => setEditValues(todo.id)}>Edit</button>
											</DropdownMenuItem>
											<DropdownMenuItem>
												<button onClick={() => onDelete(todo.id)}>Delete</button>
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</>
	);
};
