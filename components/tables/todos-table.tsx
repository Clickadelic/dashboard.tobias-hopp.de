"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useCurrentUser } from "@/hooks/use-current-user";

import { getTodosByUserId, deleteTodoById } from "@/actions/todo";

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";

import { HiDotsHorizontal } from "react-icons/hi";

import { cn } from "@/lib/utils";

export const TodosTable = () => {
	const { status } = useSession({ required: true });
	const userId = useCurrentUser()?.id;

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
							<TableCell className="asd">
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button variant="ghost" size="sm">
											<HiDotsHorizontal className="size-5" />
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent>
										<DropdownMenuItem>
											<button
												onClick={() => {
													console.log("Clicked");
												}}
											>
												Edit
											</button>
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
	);
};
