"use client";

import { useTransition, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useTodosStore } from "@/hooks/use-todos-store";

import { getTodosByUserId, deleteTodoById, toggleIsCompleted } from "@/actions/todo";

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";

import { Todo } from "@prisma/client";

import { HiDotsHorizontal } from "react-icons/hi";
import { BsTrash } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";

import { cn } from "@/lib/utils";

export const TodosTable = () => {
	const { status } = useSession({ required: true });

	const userId = useCurrentUser()?.id;
	const [isPending, startTransition] = useTransition();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const todos = useTodosStore(state => state.todos);
	const setTodos = useTodosStore(state => state.setTodos);

	const formData = useTodosStore(state => state.formData);
	const setFormData = useTodosStore(state => state.setFormData);

	const isTodoDialogOpen = useTodosStore(state => state.isTodoDialogOpen);
	const setTodoDialogOpen = useTodosStore(state => state.setTodoDialogOpen);

	const isTodoEditMode = useTodosStore(state => state.isTodoEditMode);
	const setIsTodoEditMode = useTodosStore(state => state.setIsTodoEditMode);

	const fetchTodos = async () => {
		try {
			const response: Todo[] = await getTodosByUserId();
			setTodos(response);
		} catch (error) {
			toast.error("Failed to fetch Todos.");
		}
	};

	useEffect(() => {
		setIsLoading(true);
		fetchTodos();
		setIsLoading(false);
	}, [isTodoDialogOpen]);

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

	const onEdit = (id: string) => {
		const todo = todos.find(todo => todo.id === id);
		if (todo) {
			setFormData(todo);
			setTodoDialogOpen(true);
			setIsTodoEditMode(true);
		}
	};

	return (
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
							<TableCell className="give-me-a-name-maybe">
								<DropdownMenu modal={false}>
									<DropdownMenuTrigger asChild>
										<button className="text-slate-500 hover:text-slate-900">
											<HiDotsHorizontal className="size-5" />
										</button>
									</DropdownMenuTrigger>
									<DropdownMenuContent side="right" align="start">
										<DropdownMenuItem>
											<button onClick={() => onEdit(todo.id)} className="flex justify-between">
												<AiOutlineEdit className="mt-1 mr-2" />
												bearbeiten
											</button>
										</DropdownMenuItem>
										<DropdownMenuItem>
											<button onClick={() => onDelete(todo.id)} className="flex justify-between text-red-500 hover:text-red-700">
												<BsTrash className="mt-1 mr-2" /> löschen
											</button>
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};
