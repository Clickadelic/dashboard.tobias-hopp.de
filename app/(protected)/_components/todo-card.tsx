"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useTransition, useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormLabel, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

import { MdOutlineInfo } from "react-icons/md";
import { FiPlus } from "react-icons/fi";

import { TodoSchema } from "@/schemas";
import { addTodo } from "@/actions/todo/add-todo";

const TodoCard = () => {
	const [isPending, startTransition] = useTransition();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [todos, setTodos] = useState<any[]>([]);

	const fetchTodos = async () => {
		setIsLoading(true);
		try {
			const res = await fetch("/api/todos/");
			const response = await res.json();
			setTodos(response);
		} catch (error) {
			console.error("Error fetching Todos:", error);
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
		<div className="bg-white rounded shadow-sm border p-3">
			<h2 className="text-sm border-bottom text-neutral-500 flex justify-between mb-2">
				<span>Todo&apos;s</span>
				<span>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger>
								<MdOutlineInfo />
							</TooltipTrigger>
							<TooltipContent>
								<p>Deine Todo&apos;s</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</span>
			</h2>
			<h3 className="text-md font-semibold mb-4">{todos.length === 0 ? <Skeleton className="mt-3 mb-5 w-8 h-4" /> : todos.length}</h3>
			<Popover>
				<PopoverTrigger className="flex justify-center w-full p-3 py-2 bg-slate-100 text-slate-700 hover:text-slate-800 hover:bg-slate-200 text-xs md:text-base rounded-sm">
					<FiPlus className="mt-[.125rem] md:mt-1 mr-2" /> Todo hinzufügen
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

							<Button disabled={isPending} variant="outline" type="submit" className="w-full">
								Hinzufügen
							</Button>
						</form>
					</Form>
				</PopoverContent>
			</Popover>
		</div>
	);
};

export default TodoCard;
