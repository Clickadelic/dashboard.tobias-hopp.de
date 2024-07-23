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
import { GoTrash } from "react-icons/go";
import { LiaEdit } from "react-icons/lia";

import { LinkSchema } from "@/schemas";
import { addLink, editLinkById, deleteLinkById, getLinksByUserId } from "@/actions/link";
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

	const setEditValues = (linkId: string) => {
		const link = links.find(link => link.id === linkId);
		if (link) {
			form.reset({
				title: link.title,
				url: link.url,
				description: link.description || ""
			});
		}
	};

	const onEdit = async (id: string, values: z.infer<typeof LinkSchema>) => {
		startTransition(async () => {
			const result = await editLinkById(id, values);
			if (result.error) {
				toast.error(result.error);
			} else if (result.success) {
				toast.success(result.success);
				form.reset();
				fetchLinks();
			}
		});
	};

	const onDelete = async (id: string) => {
		startTransition(async () => {
			const result = await deleteLinkById(id);
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
									<Textarea rows={2} {...field} placeholder="Beschreibung..." />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button disabled={isPending} variant="primary" type="submit" className="w-full rounded-sm">
						<FiPlus className="mr-2" /> Link hinzufügen
					</Button>
				</form>
			</Form>
			<hr className="my-3" />
			<ul>
				{links.map((link: Link) => (
					<li key={link.id} className="flex justify-between mb-2 px-3 py-1 hover:bg-mantis-hover rounded-sm">
						<span>
							<a href={link.url} className="text-sm text-slate-900 hover:text-mantis-primary" target="_blank" title={link.title} rel="noreferrer">
								{link.title}
							</a>
							<p className="text-xs text-slate-400 cursor-default">{link.description}</p>
						</span>
						<span className="space-x-3 flex">
							<button>
								<LiaEdit
									onClick={() => {
										setEditValues(link.id);
									}}
								/>
							</button>
							<button onClick={() => onDelete(link.id)} className="text-rose-500 hover:text-rose-600">
								<GoTrash className="size-4 mx-auto" />
							</button>
						</span>
					</li>
				))}
				{links.length === 0 && <li className="text-md text-neutral-400 text-center mt-12">Lege Deinen ersten Link an.</li>}
			</ul>
		</>
	);
};
