"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import Link from "next/link";
import { useState, useEffect, useTransition } from "react";
import { useSession } from "next-auth/react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useForm } from "react-hook-form";
import { AppSchema } from "@/schemas";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormLabel, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

import { FiPlus } from "react-icons/fi";
import { BsApp } from "react-icons/bs";

import { addApp } from "@/actions/app";

export const AppBar = () => {
	const { status } = useSession({ required: true });
	const userId = useCurrentUser()?.id;
	const [isPending, startTransition] = useTransition();

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [apps, setApps] = useState<any[]>([]);

	const fetchApps = async () => {
		try {
			const res = await fetch(`/api/apps/${userId}`);
			const response = await res.json();
			setApps(response);
		} catch (error) {
			toast.error("Fehler beim Laden der Apps.");
		}
	};

	useEffect(() => {
		setIsLoading(true);
		fetchApps();
		setIsLoading(false);
	}, []);

	const form = useForm<z.infer<typeof AppSchema>>({
		resolver: zodResolver(AppSchema),
		defaultValues: { title: "", url: "", description: "" }
	});

	const onSubmit = async (values: z.infer<typeof AppSchema>) => {
		startTransition(async () => {
			const result = await addApp(values);
			if (result.error) {
				toast.error(result.error);
			} else if (result.success) {
				toast.success(result.success);
				form.reset();
				fetchApps();
			}
		});
	};

	return (
		<div className="w-full">
			<div className="flex items-start justify-start space-x-3">
				<Popover>
					<PopoverTrigger asChild>
						<Button variant="outline" className="size-16 rounded-lg shadow-sm border hover:shadow:lg p-0 mt-5">
							<FiPlus className="h-5 w-5" />
						</Button>
					</PopoverTrigger>
					<PopoverContent align="start" className="w-96">
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

								<Button disabled={isPending} type="submit" className="w-full">
									Hinzufügen
								</Button>
							</form>
						</Form>
					</PopoverContent>
				</Popover>
				{apps.length > 0 ? (
					apps.map(app => (
						// TODO: Mal testen, url mit params: href={`/app/${app.id}`}
						<Link key={app.id} className="flex flex-col justify-center items-center" href={app.url} target="_blank" title={app.title}>
							<span className="text-xs font-medium text-neutral-500 mb-1">{app.title}</span>
							<span className="bg-white size-16 flex flex-col align-middle items-center justify-center rounded-xl shadow hover:shadow-lg p-1 border">
								{app.title.charAt(0).toUpperCase().slice(0, 2)}
							</span>
						</Link>
					))
				) : (
					<>
						<Skeleton className="size-16 bg-primary/10 animate-pulse" />
						<Skeleton className="size-16 bg-primary/10 animate-pulse" />
						<Skeleton className="size-16 bg-primary/10 animate-pulse" />
						<Skeleton className="size-16 bg-primary/10 animate-pulse" />
					</>
				)}
			</div>
		</div>
	);
};
