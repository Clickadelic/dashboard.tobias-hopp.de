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
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { toast } from "sonner";

import { HiOutlineDotsVertical } from "react-icons/hi";
import { FiPlus } from "react-icons/fi";
import { BsTrash } from "react-icons/bs";

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
			const response = await getAppsByUserId();
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

	const newForm = useForm<z.infer<typeof AppSchema>>({
		resolver: zodResolver(AppSchema),
		defaultValues: { title: "", url: "" }
	});

	const dynamicForm = useForm<z.infer<typeof AppSchema>>({
		resolver: zodResolver(AppSchema),
		defaultValues: { title: "", url: "" }
	});

	const onAdd = async (values: z.infer<typeof AppSchema>) => {
		startTransition(async () => {
			const result = await addApp(values);
			if (result.error) {
				toast.error(result.error);
			} else if (result.success) {
				toast.success(result.success);
				newForm.reset();
				fetchApps();
			}
		});
		setIsDialogOpen(false);
	};

	const setEditValues = (appId: string) => {
		const app = apps.find(app => app.id === appId);
		if (app) {
			dynamicForm.reset({
				title: app.title,
				url: app.url
			});
		}
	};

	const onEdit = async (appId: string, values: z.infer<typeof AppSchema>) => {
		startTransition(async () => {
			const result = await editApp(appId, values);
			if (result.error) {
				toast.error(result.error);
			} else if (result.success) {
				toast.success(result.success);
				fetchApps();
			}
		});
	};

	const onDelete = async (appId: string) => {
		startTransition(async () => {
			const result = await deleteApp(appId);
			if (result.error) {
				toast.error(result.error);
			} else if (result.success) {
				toast.success(result.success);
				fetchApps();
			}
		});
	};

	return (
		<div className="w-full">
			<div className="flex items-start justify-start space-x-3">
				{apps.length > 0 ? (
					apps.map(app => (
						<div key={app.id} className="size-16 relative flex flex-col justify-center place-content-center bg-white/20 backdrop-blur hover:bg-white/30 rounded-lg">
							<Link href={app.url} className="w-full h-full flex flex-col items-center justify-center space-y-2" target="_blank">
								<Image src={getFavicon(app.url, 24) || ""} alt={app.title} width={24} height={24} className="rounded-full" />
								<span className="text-xs text-slate-900">{app.title}</span>
							</Link>
							<Popover>
								<PopoverTrigger asChild className="absolute top-1.5 right-1 rounded-full hover:bg-white/30 text-slate-700">
									<button
										onClick={() => {
											setEditValues(app.id);
										}}
									>
										<HiOutlineDotsVertical />
									</button>
								</PopoverTrigger>
								<PopoverContent className="p-2">
									<Form {...dynamicForm}>
										<form
											onSubmit={dynamicForm.handleSubmit(() => {
												onEdit(app.id, dynamicForm.getValues());
											})}
											className="space-y-2 mb-3"
										>
											<FormField
												control={dynamicForm.control}
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
												control={dynamicForm.control}
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
												bearbeiten
											</Button>
										</form>
									</Form>
									<button
										title="App löschen"
										className="text-sm border-destructive text-destructive bg-transparent shadow-none hover:text-rose-700"
										onClick={() => {
											onDelete(app.id);
										}}
									>
										<BsTrash className="mt-[-2px] mr-2 inline-block" />
										löschen
									</button>
								</PopoverContent>
							</Popover>
						</div>
					))
				) : (
					<>
						<Skeleton className="size-16 bg-white/20 animate-pulse" />
						<Skeleton className="size-16 bg-white/20 animate-pulse" />
						<Skeleton className="size-16 bg-white/20 animate-pulse" />
						<Skeleton className="size-16 bg-white/20 animate-pulse" />
						<Skeleton className="size-16 bg-white/20 animate-pulse" />
						<Skeleton className="size-16 bg-white/20 animate-pulse" />
						<Skeleton className="size-16 bg-white/20 animate-pulse" />
						<Skeleton className="size-16 bg-white/20 animate-pulse" />
						<Skeleton className="size-16 bg-white/20 animate-pulse" />
						<Skeleton className="size-16 bg-white/20 animate-pulse" />
						<Skeleton className="size-16 bg-white/20 animate-pulse" />
						<Skeleton className="size-16 bg-white/20 animate-pulse" />
						<Skeleton className="size-16 bg-white/20 animate-pulse" />
						<Skeleton className="size-16 bg-white/20 animate-pulse" />
					</>
				)}
				<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
					<DialogTrigger className="size-16 flex flex-col justify-center place-content-center items-center bg-white/20 hover:bg-white/30 rounded-lg">
						<FiPlus className="mx-auto text-slate-700" />
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>App-Link hinzufügen</DialogTitle>
							<DialogDescription>Quick-Links für Deine Startseite</DialogDescription>
						</DialogHeader>
						<Form {...newForm}>
							<form onSubmit={newForm.handleSubmit(onAdd)} className="space-y-2">
								<FormField
									control={newForm.control}
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
									control={newForm.control}
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
									hinzufügen
								</Button>
							</form>
						</Form>
					</DialogContent>
				</Dialog>
			</div>
		</div>
	);
};
