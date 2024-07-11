"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useTransition, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";

import { Input } from "@/components/ui/input";
import { Form, FormControl, FormLabel, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

import { FiPlus } from "react-icons/fi";

import { LinkSchema } from "@/schemas";
import { addLink, getLinksByUserId } from "@/actions/link";
import { Link } from "@prisma/client";

export const LinkWidget = () => {
	const { status } = useSession({ required: true });
	const [isPending, startTransition] = useTransition();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [links, setLinks] = useState<any[]>([]);

	const fetchLinks = async () => {
		setIsLoading(true);
		try {
			const response = await getLinksByUserId();
			setLinks(response);
		} catch (error) {
			toast.error("Fehler beim Laden der Links.");
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		setIsLoading(true);
		fetchLinks();
		setIsLoading(false);
	}, []);

	const form = useForm<z.infer<typeof LinkSchema>>({
		resolver: zodResolver(LinkSchema),
		defaultValues: { title: "", url: "", description: "" }
	});

	const onSubmit = async (values: z.infer<typeof LinkSchema>) => {
		startTransition(async () => {
			const result = await addLink(values);
			if (result.error) {
				toast.error(result.error);
			} else if (result.success) {
				toast.success(result.success);
				form.reset();
				fetchLinks();
			}
		});
	};

	return (
		<>
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
									<Input {...field} placeholder="Url" />
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
									<Textarea {...field} placeholder="Beschreibung..." />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button disabled={isPending} variant="default" size="sm" type="submit" className="w-full">
						hinzufügen
					</Button>
				</form>
			</Form>
			<ul>
				{links.map((link: Link) => (
					<li key={link.id}>
						<a href={link.url} className="text-sm text-slate-900" target="_blank" title={link.title} rel="noreferrer">
							{link.title}
						</a>
					</li>
				))}
			</ul>
		</>
	);
};
