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
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

import { FiPlus } from "react-icons/fi";
import { GoLink } from "react-icons/go";

import { Link as Hyperlink } from "@prisma/client";
import { LinkSchema } from "@/schemas";
import { addLink, getLinksByUserId, getLatestLink } from "@/actions/link";

// TODO: Fix broken layout shift when Loading...
export const LinkCard = () => {
	const { status } = useSession({ required: true });
	const [isPending, startTransition] = useTransition();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [links, setLinks] = useState<Hyperlink[]>([]);
	const [latestLink, setLatestLink] = useState<Hyperlink | null>(null);

	const fetchLinks = async () => {
		setIsLoading(true);
		try {
			const response = await getLinksByUserId();
			const latest = await getLatestLink();
			setLinks(response);
			setLatestLink(latest[0]);
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
		<div className="bg-white rounded-xl shadow-sm border p-2 md:p-4">
			<h2 className="text-xs md:text-sm border-bottom text-slate-900 flex justify-between mb-2">
				<Link href="/links" className="hover:text-slate-700 hover:underline" title="Zur Link-Übersicht">
					Links
				</Link>
				<span>neuester Link</span>
			</h2>
			<h3 className="mb-4 flex justify-between">
				<span className="font-bold">
					{status === "loading" || isLoading ? (
						<Skeleton className="mt-3 mb-5 w-8 h-4 bg-primary/10 animate-pulse" />
					) : (
						<>
							<GoLink className="inline-block mr-2 mt-[-3px]" />
							{links.length}
						</>
					)}
				</span>
				<span className="text-md font-normal">
					{status === "loading" || isLoading ? (
						<Skeleton className="mt-3 mb-5 w-12 h-4 bg-primary/10 animate-pulse" />
					) : (
						<Link href={latestLink?.url || "#"} className="hover:text-mantis-primary max-w-[260px] md:max-w-52 inline-flex overflow-hidden truncate ellipsis" target="_blank">
							{latestLink?.url || "erstelle Deinen ersten Link"}
						</Link>
					)}
				</span>
			</h3>
			<Popover>
				<PopoverTrigger className="flex justify-center w-full p-3 py-2 bg-slate-100 text-slate-900 hover:text-slate-800 hover:bg-slate-200 text-sm rounded-sm">
					<FiPlus className="mt-[3px] mr-2" />
					Link hinzufügen
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
