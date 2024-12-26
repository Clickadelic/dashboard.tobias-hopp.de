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
import { CiEdit } from "react-icons/ci";

interface FormAppProps {
	isAppEditMode?: boolean;
}

export const FormApp = ({ isAppEditMode }: FormAppProps = {}) => {
	const [isPending, startTransition] = useTransition();

	const apps = useAppsStore(state => state.apps);
	const setApps = useAppsStore(state => state.setApps);

	const formData = useAppsStore(state => state.formData);
	const setFormData = useAppsStore(state => state.setFormData);

	const isAppDialogOpen = useAppsStore(state => state.isAppDialogOpen);
	const setAppDialogOpen = useAppsStore(state => state.setAppDialogOpen);

	const determineDefaultValues = () => {
		if (isAppEditMode) {
			const id = formData?.id as string;
			// BUG: Wrong types passed along ???
			// Cannot use AppSchema :App  here
			const app = apps.find(app => app.id === id);
			if (app) {
				return {
					title: app.title,
					url: app.url
				};
			}
		}
	};

	const form = useForm<z.infer<typeof AppSchema>>({
		resolver: zodResolver(AppSchema),
		defaultValues: determineDefaultValues()
	});

	const onSubmit = async (values: z.infer<typeof AppSchema>) => {
		if (isAppEditMode) {
			const id = formData?.id as string;

			// BUG: Async bug
			// @ts-ignore
			startTransition(async () => {
				const result = await editAppById(id, values);
				if (result.error) {
					toast.error(result.error);
				} else if (result.success) {
					toast.success(result.success);
					form.reset({ title: values?.title, url: values?.url });
					const newApps = await getAppsByUserId();
					setApps(newApps);
				}
			});
		} else {
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
		}
		setAppDialogOpen(false);
	};

	return (
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
				<Button disabled={isPending} variant="primary" aria-label={isAppEditMode ? "App bearbeiten" : "App hinzufugen"} type="submit" className="w-full rounded-sm">
					{isAppEditMode ? <CiEdit className="inline text-white mr-2" /> : <FiPlus className="inline text-white mr-2" />}
					{isAppEditMode ? "App bearbeiten" : "App hinzufugen"}
				</Button>
			</form>
		</Form>
	);
};
