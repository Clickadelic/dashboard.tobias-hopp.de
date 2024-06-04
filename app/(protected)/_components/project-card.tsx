"use client";

import * as z from "zod";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useForm } from "react-hook-form";
import { useTransition, useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProjectSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormLabel, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";

import { FiPlus } from "react-icons/fi";
import { MdOutlineInfo } from "react-icons/md";

import { addProject } from "@/actions/project/add-project";

const LinkCard = () => {
	const [isPending, startTransiton] = useTransition();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [projects, setProjects] = useState<any[]>([]);

	const fetchProjects = async () => {
		await fetch("/api/projects/").then(async res => {
			setIsLoading(true);
			const response = await res.json();
			console.log(response);
			setProjects(response);
			setIsLoading(false);
		});
	};

	useEffect(() => {
		setIsLoading(true);
		fetchProjects();
		setIsLoading(false);
	}, []);

	const form = useForm<z.infer<typeof ProjectSchema>>({
		resolver: zodResolver(ProjectSchema),
		defaultValues: { title: "", url: "", description: "" }
	});

	const onSubmit = async (values: z.infer<typeof ProjectSchema>) => {
		const validatedFields = ProjectSchema.safeParse(values);
		startTransiton(() => {
			addProject(values).then(data => {
				if (data.error) {
					toast.error(data.error);
				}

				if (data.success) {
					toast.success(data.success);
				}
			});
			form.reset();
		});
	};

	return (
		<div className="bg-white rounded shadow-sm border p-3">
			<h2 className="text-sm border-bottom text-neutral-500 flex justify-between">
				<span>Projekte</span>
				<span>
					<MdOutlineInfo />
				</span>
			</h2>
			<h3 className="text-md font-semibold mt-2 mb-4">{isLoading ? "0" : projects.length}</h3>
			<Popover>
				<PopoverTrigger className="flex justify-center w-full px-3 py-2 bg-slate-100 text-slate-700 hover:text-slate-800 hover:bg-slate-200 text-xs md:text-base rounded-sm">
					<FiPlus className="mt-[.125rem] md:mt-1 mr-2" /> Projekt hinzufügen
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
											<Input {...field} placeholder="Projekt-Titel" />
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
											<Input {...field} placeholder="Projekt-URL" />
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
											<Textarea {...field} placeholder="Projekt-Beschreibung..." />
										</FormControl>
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

export default LinkCard;
