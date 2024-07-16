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
import { BsList, BsListCheck } from "react-icons/bs";

import { addTodo, getTodosByUserId, getLatestTodo } from "@/actions/todo";
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
			const latest = await getLatestTodo();
			setTodos(response);
			setLatestTodo(latest[0]);
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

	const onSubmit = async (values: z.infer<typeof TodoSchema>) => {
		const validatedFields = TodoSchema.safeParse(values);
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

	return (
		<div className="bg-white rounded-xl shadow-sm border p-2 md:p-4">
			<h2 className="text-xs md:text-sm border-bottom text-slate-900 flex justify-between mb-2">
				<Link href="/todos" className="hover:text-slate-700 hover:underline" title="Zur Todo-Übersicht">
					Todo&apos;s
				</Link>

				<span>neuestes Todo</span>
			</h2>
			<h3 className="flex justify-between mb-4">
				<span className="font-bold">
					{status === "loading" || isLoading ? (
						<Skeleton className="mt-[-3px] w-8 h-4 bg-primary/10 animate-pulse" />
					) : (
						<>
							<BsListCheck className="inline-block mr-2 mt-[-3px]" />
							{todos.length}
						</>
					)}
				</span>
				<span className="text-md font-normal">{status === "loading" || isLoading ? <Skeleton className="mt-3 mb-5 w-12 h-4 bg-primary/10 animate-pulse" /> : latestTodo?.title}</span>
			</h3>
			<Popover>
				<PopoverTrigger className="flex justify-center w-full p-3 py-2 bg-white text-mantis-primary border border-mantis-primary hover:text-white hover:bg-mantis-primary text-sm rounded-sm">
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

							<Button disabled={isPending} variant="primary" size="sm" type="submit" className="w-full">
								hinzufügen
							</Button>
						</form>
					</Form>
				</PopoverContent>
			</Popover>
		</div>
	);
};
