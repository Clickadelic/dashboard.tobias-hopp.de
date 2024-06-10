"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useCurrentUser } from "@/hooks/use-current-user";

import { Input } from "@/components/ui/input";
import { Form, FormControl, FormLabel, FormField, FormItem, FormMessage, FormDescription } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "sonner";

import { FiExternalLink } from "react-icons/fi";
import { CgInternal } from "react-icons/cg";
import { BsInfoCircle } from "react-icons/bs";
import { LiaClipboard } from "react-icons/lia";
import { BsFillTrash3Fill } from "react-icons/bs";
import { LiaEdit } from "react-icons/lia";

import Link from "next/link";
import { LinkSchema } from "@/schemas";
import { addLink, editLink, deleteLink } from "@/actions/link";

import { ClipboardButton } from "../clipboard-button";
import { germanDateFormat } from "@/lib/utils";

const LinksTable = () => {
	const { status } = useSession({ required: true });
	const userId = useCurrentUser()?.id;

	const [isPending, startTransition] = useTransition();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [links, setUsers] = useState<any[]>([]);

	const fetchLinks = async () => {
		setIsLoading(true);
		await fetch(`/api/links/${userId}`).then(async res => {
			const response = await res.json();
			setUsers(response);
		});
		setIsLoading(false);
	};

	const deleteLinkById = async (id: string) => {
		const result = await deleteLink(id);
		if (result.error) {
			toast.error(result.error);
		} else if (result.success) {
			toast.success(result.success);
			fetchLinks();
		}
	};

	useEffect(() => {
		setIsLoading(true);
		fetchLinks();
		setIsLoading(false);
	}, []);

	const setEditValues = (linkId: string) => {
		const link = links.find(link => link.id === linkId);
		if (link) {
			dynamicForm.reset({
				title: link.title,
				url: link.url,
				description: link.description,
				isPinned: link.isPinned
			});
		}
	};

	const newForm = useForm<z.infer<typeof LinkSchema>>({
		resolver: zodResolver(LinkSchema),
		defaultValues: { title: "", url: "", description: "", isPinned: false }
	});

	const dynamicForm = useForm<z.infer<typeof LinkSchema>>({
		resolver: zodResolver(LinkSchema),
		defaultValues: { title: "", url: "", description: "", isPinned: false }
	});

	const addNewLink = async (values: z.infer<typeof LinkSchema>) => {
		startTransition(async () => {
			const result = await addLink(values);
			if (result.error) {
				toast.error(result.error);
			} else if (result.success) {
				toast.success(result.success);
				dynamicForm.reset();
				fetchLinks();
			}
		});
	};

	const editCurrentLink = async (id: string, values: z.infer<typeof LinkSchema>) => {
		startTransition(async () => {
			const result = await editLink(id, values);
			if (result.error) {
				toast.error(result.error);
			} else if (result.success) {
				toast.success(result.success);
				dynamicForm.reset();
				fetchLinks();
			}
		});
	};

	return (
		<>
			<div className="mb-5 p-4">
				<Form {...newForm}>
					<form onSubmit={newForm.handleSubmit(addNewLink)} className="space-y-3">
						<FormField
							control={newForm.control}
							name="title"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Titel</FormLabel>
									<Input {...field} />
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={newForm.control}
							name="url"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Url</FormLabel>
									<FormMessage />
									<Input {...field} />
								</FormItem>
							)}
						/>
						<FormField
							control={newForm.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Beschreibung</FormLabel>
									<FormMessage />
									<Textarea {...field} />
								</FormItem>
							)}
						/>
						<FormField
							control={newForm.control}
							name="isPinned"
							render={({ field }) => (
								<FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
									<div className="space-y-.5">
										<FormLabel>Pinned</FormLabel>
										<FormDescription>Zeigt den Link als App-Icon auf dem Dashboard an.</FormDescription>
									</div>
									<FormControl>
										<Switch disabled={isPending} checked={field.value} onCheckedChange={field.onChange} />
									</FormControl>
								</FormItem>
							)}
						/>
						<Button disabled={isPending} variant="outline" className="w-full">
							Neuen Link hinzufügen
						</Button>
					</form>
				</Form>
			</div>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[20px]">Id</TableHead>
						<TableHead>Titel</TableHead>
						<TableHead className="truncate overflow-hidden">Url</TableHead>
						<TableHead className="">Target</TableHead>
						<TableHead className="w-[160px]">Beschreibung</TableHead>
						<TableHead>Ist angepinned</TableHead>
						<TableHead>
							<LiaClipboard />
						</TableHead>
						<TableHead>bearbeiten</TableHead>
						<TableHead className="w-[180px]">Hinzugefügt am</TableHead>
						<TableHead className="w-[180px]">Letzte Änderung</TableHead>
						<TableHead>löschen</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{links.map((link: any) => (
						<>
							<TableRow key={link.id}>
								<TableCell>
									<Popover>
										<PopoverTrigger>
											<BsInfoCircle />
										</PopoverTrigger>
										<PopoverContent>{link.id}</PopoverContent>
									</Popover>
								</TableCell>
								<TableCell>{link.title}</TableCell>
								<TableCell>
									<span className="flex justify-between">
										<Link href={link.url} title={link.title + " in neuen Fenster öffnen"} className="inline hover:text-sky-500" target="_blank">
											{link.url}
										</Link>
									</span>
								</TableCell>
								<TableCell>{link.target === "_blank" ? <CgInternal className="ml-2 mt-1 inline" /> : <FiExternalLink className="ml-2 mt-1 inline" />}</TableCell>

								<TableCell className="truncate">{link?.description}</TableCell>
								<TableCell>{link.isPinned ? "Ja" : "Nein"}</TableCell>
								<TableCell>
									<ClipboardButton classNames="mt-1.5 hover:text-emerald-500" textToCopy={link.url} />
								</TableCell>
								<TableCell>
									<Popover>
										<PopoverTrigger asChild>
											<button onClick={() => setEditValues(link.id)} className="hover:text-mantis-primary rounded-md inline">
												<LiaEdit className="size-4" />
											</button>
										</PopoverTrigger>
										<PopoverContent align="end">
											<Form {...dynamicForm}>
												<form onSubmit={dynamicForm.handleSubmit(() => editCurrentLink(link.id, dynamicForm.getValues()))} className="space-y-2">
													<FormField
														control={dynamicForm.control}
														name="title"
														defaultValue={link.title}
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
														defaultValue={link.url}
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
														control={dynamicForm.control}
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
														control={dynamicForm.control}
														name="isPinned"
														render={({ field }) => (
															<FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
																<div className="space-y-.5">
																	<FormLabel>Pinned</FormLabel>
																	<FormDescription>Zeigt den Link als App-Icon auf dem Dashboard an.</FormDescription>
																</div>
																<FormControl>
																	<Switch disabled={isPending} checked={field.value} onCheckedChange={field.onChange} />
																</FormControl>
															</FormItem>
														)}
													/>

													<Button disabled={isPending} variant="outline" type="submit" className="w-full">
														Bearbeiten
													</Button>
												</form>
											</Form>
										</PopoverContent>
									</Popover>
								</TableCell>

								<TableCell>{germanDateFormat(link.createdAt)}</TableCell>
								<TableCell>{germanDateFormat(link.updatedAt)}</TableCell>

								<TableCell>
									<button onClick={() => deleteLinkById(link.id)} className="text-rose-500 hover:text-rose-600">
										<BsFillTrash3Fill className="size-4 mx-auto" />
									</button>
								</TableCell>
							</TableRow>
						</>
					))}
				</TableBody>
			</Table>
		</>
	);
};

export default LinksTable;
