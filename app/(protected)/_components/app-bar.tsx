"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import Link from "next/link";

import { useTransition, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useCurrentUser } from "@/hooks/use-current-user";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Form, FormControl, FormLabel, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

import { FiPlus } from "react-icons/fi";

import { LinkSchema } from "@/schemas";
import { addLink } from "@/actions/link";

export const AppBar = () => {
	const { status } = useSession({ required: true });
	const userId = useCurrentUser()?.id;

	const [isPending, startTransition] = useTransition();

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [links, setLinks] = useState<any[]>([]);

	const fetchLinks = async () => {
		setIsLoading(true);
		try {
			const res = await fetch(`/api/links/isPinned/${userId}`);
			const response = await res.json();
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
		defaultValues: { title: "", url: "", description: "", isPinned: false }
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
		<div className="w-full">
			<div className="flex items-start justify-start space-x-3">
				{links.length === 0 || isLoading || isPending ? (
					<>
						<Skeleton className="w-16 h-16 bg-primary/10 animate-pulse" />
						<Skeleton className="w-16 h-16 bg-primary/10 animate-pulse" />
						<Skeleton className="w-16 h-16 bg-primary/10 animate-pulse" />
						<Skeleton className="w-16 h-16 bg-primary/10 animate-pulse" />
					</>
				) : (
					<>
						<Popover>
							<PopoverTrigger className="size-16 rounded-md flex justify-center items-center border shadow-sm hover:shadow-lg bg-slate-200">
								<FiPlus className="mt-[.125rem] md:mt-1" />
							</PopoverTrigger>
							<PopoverContent align="start">
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

										<FormField
											control={form.control}
											name="isPinned"
											render={({ field }) => (
												<FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
													<div className="space-y-.5">
														<FormLabel>als App angepinned</FormLabel>
													</div>
													<FormControl>
														<Switch disabled={isPending} checked={field.value} onCheckedChange={field.onChange} />
													</FormControl>
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
						{links.map(link => (
							<Link
								key={link.id}
								href={link.url}
								className="size-16 rounded-md flex justify-center items-center border shadow-sm hover:shadow-lg bg-white"
								target="_blank"
								rel="noopener noreferrer"
							>
								SVG
							</Link>
						))}
					</>
				)}
			</div>
		</div>
	);
};
