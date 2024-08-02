"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

import { useTransition, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormLabel, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

import { FiPlus } from "react-icons/fi";
import { BsListCheck } from "react-icons/bs";

import { addTodo, getTodosByUserId } from "@/actions/todo";
import { TodoSchema } from "@/schemas";
import { Todo } from "@prisma/client";

export const TodoCard = () => {
	const { status } = useSession({ required: true });

	const [isPending, startTransition] = useTransition();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [todos, setTodos] = useState<Todo[]>([]);
	const [latestTodo, setLatestTodo] = useState<Todo | null>(null);
	const fetchTodos = async () => {
		setIsLoading(true);
		try {
			const response = await getTodosByUserId();
			setTodos(response);
			setLatestTodo(response[0]);
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
