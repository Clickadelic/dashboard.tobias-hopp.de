"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState, useEffect, useTransition } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";

import Image from "next/image";
import Link from "next/link";

import { AppSchema } from "@/schemas";

import { Input } from "@/components/ui/input";
import { Form, FormControl, FormLabel, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";

import { HiOutlineDotsVertical } from "react-icons/hi";
import { FiPlus } from "react-icons/fi";

import { addApp, editApp, deleteApp, getAppsByUserId } from "@/actions/app";

import { getFavicon } from "@/lib/utils";

export const AppBar = () => {
	const { status } = useSession({ required: true });
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const [isPending, startTransition] = useTransition();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [apps, setApps] = useState<any[]>([]);

	const fetchApps = async () => {
		try {
			const res = await getAppsByUserId();
			setApps(res);
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
		defaultValues: { title: "", url: "" }
	});

	const setEditValues = (appId: string) => {
		const app = apps.find(app => app.id === appId);
		if (app) {
			form.reset({
				title: app.title,
				url: app.url
			});
		}
	};

	const openEditForm = (appId: string) => {
		setEditValues(appId);
	};

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
				<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
					<DialogTrigger className="size-20 flex flex-col justify-center place-content-center items-center bg-white/20 hover:bg-white/30 rounded-lg">
						<FiPlus className="mx-auto text-slate-700" />
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>App-Link hinzufügen</DialogTitle>
							<DialogDescription>Quick-Links für Deine Startseite.</DialogDescription>
						</DialogHeader>
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

								<Button disabled={isPending} type="submit" className="w-full">
									Hinzufügen
								</Button>
							</form>
						</Form>
					</DialogContent>
				</Dialog>
				{apps.length > 0 ? (
					// TODO: Improve UI/UX
					apps.map(app => (
						<div key={app.id} className="size-20 relative flex flex-col justify-center place-content-center bg-white/20 backdrop-blur hover:bg-white/30 rounded-lg">
							<Link href={app.url} className="w-full h-full flex flex-col items-center justify-center space-y-2" target="_blank">
								<Image src={getFavicon(app.url)} alt={app.title} width={32} height={32} className="rounded-full" />
								<span className="text-xs text-slate-900">{app.title}</span>
							</Link>
							<DropdownMenu>
								<DropdownMenuTrigger className="absolute top-2 right-1 rounded-full hover:bg-white/30 text-slate-700">
									<HiOutlineDotsVertical />
								</DropdownMenuTrigger>
								<DropdownMenuContent>
									<DropdownMenuItem>
										<button
											className="block w-full"
											onClick={() => {
												setIsDialogOpen(true);
												setEditValues(app.id);
											}}
										>
											bearbeiten
										</button>
									</DropdownMenuItem>
									<DropdownMenuItem>
										<button
											className="block w-full"
											onClick={() => {
												startTransition(async () => {
													const result = await deleteApp(app.id);
													if (result.error) {
														toast.error(result.error);
													} else if (result.success) {
														toast.success(result.success);
														fetchApps();
													}
												});
											}}
										>
											löschen
										</button>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					))
				) : (
					<>
						<Skeleton className="size-20 bg-white/20 animate-pulse" />
						<Skeleton className="size-20 bg-white/20 animate-pulse" />
						<Skeleton className="size-20 bg-white/20 animate-pulse" />
						<Skeleton className="size-20 bg-white/20 animate-pulse" />
						<Skeleton className="size-20 bg-white/20 animate-pulse" />
						<Skeleton className="size-20 bg-white/20 animate-pulse" />
						<Skeleton className="size-20 bg-white/20 animate-pulse" />
						<Skeleton className="size-20 bg-white/20 animate-pulse" />
						<Skeleton className="size-20 bg-white/20 animate-pulse" />
						<Skeleton className="size-20 bg-white/20 animate-pulse" />
						<Skeleton className="size-20 bg-white/20 animate-pulse" />
						<Skeleton className="size-20 bg-white/20 animate-pulse" />
						<Skeleton className="size-20 bg-white/20 animate-pulse" />
						<Skeleton className="size-20 bg-white/20 animate-pulse" />
					</>
				)}
			</div>
		</div>
	);
};
