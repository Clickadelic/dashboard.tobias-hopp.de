"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useTransition, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";

import { Input } from "@/components/ui/input";
import { Form, FormControl, FormLabel, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

import { FiPlus } from "react-icons/fi";

import { ProjectSchema } from "@/schemas";
import { Project } from "@prisma/client";
import { addProject } from "@/actions/project";

import { cn } from "@/lib/utils";

interface FormProjectProps {
	formClasses?: string;
	project?: Project;
}

export const FormProject = ({ formClasses, project }: FormProjectProps = {}) => {
	const { status } = useSession({ required: true });
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const [isPending, startTransition] = useTransition();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const form = useForm<z.infer<typeof ProjectSchema>>({
		resolver: zodResolver(ProjectSchema),
		defaultValues: { title: project?.title || "", url: project?.url || "", description: project?.description || "" }
	});

	const onSubmit = async (values: z.infer<typeof ProjectSchema>) => {
		startTransition(async () => {
			const result = await addProject(values);
			if (result.error) {
				toast.error(result.error);
			} else if (result.success) {
				toast.success(result.success);
				form.reset();
				setIsDialogOpen(false);
			}
		});
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className={cn("space-y-2", formClasses)}>
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
				<FormField
					control={form.control}
					name="description"
					disabled={isPending}
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Textarea rows={4} {...field} className="mb-3" placeholder="Projektbeschreibung" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button disabled={isPending} variant="primary" type="submit" className="w-full rounded-sm">
					<FiPlus className="inline mr-2 text-white" />
					Projekt hinzufügen
				</Button>
			</form>
		</Form>
	);
};
