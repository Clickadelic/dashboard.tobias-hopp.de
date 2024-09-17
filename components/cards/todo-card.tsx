"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useTodosStore } from "@/hooks/use-todos-store";

import Link from "next/link";

import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { BsListCheck } from "react-icons/bs";

export const TodoCard = () => {
	const { status } = useSession({ required: true });
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const todos = useTodosStore(state => state.todos);
	const latestTodo = useTodosStore(state => state.todos[0]);
	const setTodos = useTodosStore(state => state.setTodos);

	const fetchTodos = async () => {
		setIsLoading(true);
		try {
			setTodos(todos);
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

	return (
		<div className="bg-white rounded-xl shadow-sm border p-4">
			<h2 className="text-xs md:text-sm border-bottom text-slate-900 flex justify-between mb-2">
				<Link href="/todos" className="hover:text-slate-700 hover:underline" title="Zur Todo-Übersicht">
					Todo&apos;s
				</Link>
				<span>neuestes Todo</span>
			</h2>
			<h3 className="flex justify-between">
				<span className="font-bold">
					<BsListCheck className="inline-block mr-2 mt-[-3px]" />
					{todos.length}
				</span>
				<span className="text-sm font-normal mt-1">{status === "loading" || isLoading ? <Skeleton className="w-12 h-4 bg-primary/10 animate-pulse" /> : latestTodo?.title}</span>
			</h3>
		</div>
	);
};
