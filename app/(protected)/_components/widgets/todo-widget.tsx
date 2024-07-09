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

import { TodoSchema } from "@/schemas";
import { addTodo, getTodosByUserId } from "@/actions/todo";

export const TodoWidget = () => {
	const { status } = useSession({ required: true });

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
		<div className="todo-widget">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="flex justify-between space-x-1 mb-3">
					<FormField
						control={form.control}
						name="title"
						disabled={isPending}
						render={({ field }) => (
							<FormItem className="w-full space-y-0 border-0 shadow-none">
								<FormControl>
									<Input {...field} placeholder="neues Todo" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button disabled={isPending} variant="primary" type="submit">
						<FiPlus className="size-4" />
					</Button>
				</form>
			</Form>
			<div>
				<ul className="ml-2">
					{isLoading && <Skeleton />}
					{todos.map(todo => (
						<li key={todo.id}>
							<Form {...form}>
								<form onSubmit={form.handleSubmit(onSubmit)} className="flex space-x-1">
									<FormField
										control={form.control}
										name="isCompleted"
										disabled={isPending}
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<Checkbox className="mr-2" checked={field.value} onCheckedChange={field.onChange} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="title"
										disabled={isPending}
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<Input {...field} placeholder="Titel" value={todo.title} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<Button disabled={isPending} variant="primaryOutline" size="sm" type="submit">
										<FiPlus />
									</Button>
								</form>
							</Form>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};
