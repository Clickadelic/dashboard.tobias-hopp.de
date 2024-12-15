"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { useAppsStore } from "@/hooks/use-apps-store";

import { AppSchema } from "@/schemas";
// import { App } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { toast } from "sonner";

import { addApp, getAppsByUserId, editAppById } from "@/actions/app";
import { FiPlus } from "react-icons/fi";

interface FormAppProps {
	isEditMode?: boolean;
}

export const FormApp = ({ isEditMode }: FormAppProps = {}) => {
	const [isPending, startTransition] = useTransition();

	const apps = useAppsStore(state => state.apps);
	const setApps = useAppsStore(state => state.setApps);

	const formData = useAppsStore(state => state.formData);
	const setFormData = useAppsStore(state => state.setFormData);

	const isAppDialogOpen = useAppsStore(state => state.isAppDialogOpen);
	const setAppDialogOpen = useAppsStore(state => state.setAppDialogOpen);

	// Var :D
	var form = useForm<z.infer<typeof AppSchema>>({
		resolver: zodResolver(AppSchema),
		defaultValues: { title: "", url: "" }
	});

	if (isEditMode) {
		form = useForm<z.infer<typeof AppSchema>>({
			resolver: zodResolver(AppSchema),
			defaultValues: { title: formData?.title, url: formData?.url }
		});
	}

	const onAdd = async (values: z.infer<typeof AppSchema>) => {
		// BUG: Async bug
		// @ts-ignore
		startTransition(async () => {
			const result = await addApp(values);
			if (result.error) {
				toast.error(result.error);
			} else if (result.success) {
				toast.success(result.success);
				form.reset();
				const newApps = await getAppsByUserId();
				setApps(newApps);
			}
		});
	};

	const onEdit = async (values: z.infer<typeof AppSchema>) => {
		console.log(values);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(isEditMode ? onEdit : onAdd)} className="space-y-2">
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
					name="url"
					disabled={isPending}
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input {...field} className="mb-3" placeholder="Url" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button disabled={isPending} variant="primary" aria-label={isEditMode ? "App bearbeiten" : "App hinzufugen"} type="submit" className="w-full rounded-sm">
					<FiPlus className="inline text-white mr-2" />
					{isEditMode ? "App bearbeiten" : "App hinzufugen"}
				</Button>
			</form>
		</Form>
	);
};
