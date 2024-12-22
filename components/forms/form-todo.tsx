"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useTransition, useState } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useTodosStore } from "@/hooks/use-todos-store";

import { Input } from "@/components/ui/input";

import { Form, FormControl, FormLabel, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

import { FiPlus } from "react-icons/fi";
import { CiEdit } from "react-icons/ci";

import { TodoSchema } from "@/schemas";
import { Todo } from "@prisma/client";
import { addTodo, getTodosByUserId, editTodoById } from "@/actions/todo";

interface FormTodoProps {
	isTodoEditMode?: boolean;
}

export const FormTodo = ({ isTodoEditMode }: FormTodoProps = {}) => {
	const { status } = useSession({ required: true });

	const [isPending, startTransition] = useTransition();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const todos: Todo[] = useTodosStore(state => state.todos);
	const setTodos: (state: Todo[]) => void = useTodosStore(state => state.setTodos);

	const formData = useTodosStore(state => state.formData);
	const setFormData: (formData: Todo) => void = useTodosStore(state => state.setFormData);

	const isTodoDialogOpen: boolean = useTodosStore(state => state.isTodoDialogOpen);
	const setTodoDialogOpen: (state: boolean) => void = useTodosStore(state => state.setTodoDialogOpen);

	const determineDefaultValues = () => {
		if (isTodoEditMode) {
			const id = formData?.id as string;
			const todo = todos.find(todo => todo.id === id);
			if (todo) {
				return {
					title: todo.title,
					description: todo.description ?? undefined,
					isCompleted: todo.isCompleted
				};
			}
		}
	};

	const form = useForm<z.infer<typeof TodoSchema>>({
		resolver: zodResolver(TodoSchema),
		defaultValues: determineDefaultValues()
	});

	const onSubmit = async (values: z.infer<typeof TodoSchema>) => {
		if (isTodoEditMode) {
			const id = formData?.id as string;

			// BUG: Async bug
			// @ts-ignore
			startTransition(async () => {
				const result = await editTodoById(id, values);
				if (result.error) {
					toast.error(result.error);
				} else if (result.success) {
					toast.success(result.success);
					form.reset({ title: values?.title, description: values?.description, isCompleted: values?.isCompleted });
					setTodoDialogOpen(false);
					setTodos(todos);
				}
			});
		} else {
			startTransition(async () => {
				const result = await addTodo(values);
				if (result.error) {
					toast.error(result.error);
				} else if (result.success) {
					toast.success(result.success);
					form.reset();
					const newApps = await getTodosByUserId();
					setTodos(newApps);
				}
			});
		}
		setTodoDialogOpen(false);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 mb-3">
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
								<Textarea rows={4} {...field} placeholder="Beschreibung" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button disabled={isPending} variant="primary" aria-label={isTodoEditMode ? "Todo bearbeiten" : "Todo hinzufügen"} type="submit" className="w-full rounded-sm">
					{isTodoEditMode ? <CiEdit className="inline text-white mr-2" /> : <FiPlus className="inline text-white mr-2" />}
					{isTodoEditMode ? "Todo bearbeiten" : "Todo hinzufügen"}
				</Button>
			</form>
		</Form>
	);
};
