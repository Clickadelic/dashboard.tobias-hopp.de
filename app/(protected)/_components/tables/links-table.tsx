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

import { BsFillTrash3Fill } from "react-icons/bs";
import { BsInfoCircle } from "react-icons/bs";
import { FiExternalLink } from "react-icons/fi";
import { FiPlus } from "react-icons/fi";
import { LiaClipboard } from "react-icons/lia";
import { LiaEdit } from "react-icons/lia";

import { CgInternal } from "react-icons/cg";
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
				description: link.description
			});
		}
	};

	const newForm = useForm<z.infer<typeof LinkSchema>>({
		resolver: zodResolver(LinkSchema),
		defaultValues: { title: "", url: "", description: "" }
	});

	const dynamicForm = useForm<z.infer<typeof LinkSchema>>({
		resolver: zodResolver(LinkSchema),
		defaultValues: { title: "", url: "", description: "" }
	});

	const addNewLink = async (values: z.infer<typeof LinkSchema>) => {
		startTransition(async () => {
			const result = await addLink(values);
			if (result.error) {
				toast.error(result.error);
			} else if (result.success) {
				toast.success(result.success);
				newForm.reset();
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
			<div className="bg-white rounded-lg shadow-sm border mb-5 p-4 md:grid md:grid-cols-2 md:gap-5">
				<div>
					<h2 className="text-lg font-medium mb-2">Neuer Link</h2>
					<Form {...newForm}>
						<form onSubmit={newForm.handleSubmit(addNewLink)} className="space-y-3">
							<div className="grid grid-cols-2 gap-5 mb-3">
								<div className="flex flex-col justify-between">
									<FormField
										control={newForm.control}
										name="title"
										render={({ field }) => (
											<FormItem>
												<Input {...field} placeholder="Titel" />
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={newForm.control}
										name="url"
										render={({ field }) => (
											<FormItem>
												<Input {...field} placeholder="URL" />
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<div>
									<FormField
										control={newForm.control}
										name="description"
										render={({ field }) => (
											<FormItem>
												<Textarea {...field} rows={4} placeholder="Beschreibung" />
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
							</div>
							<Button variant="default" type="submit" disabled={isPending} className="w-full">
								<FiPlus className=" mr-2" /> Link hinzufügen
							</Button>
						</form>
					</Form>
				</div>
				<div>
					<h2 className="text-lg font-medium mb-2">Informationen zur Benutzung</h2>
				</div>
			</div>
			<div className="bg-white rounded-lg shadow-sm border p-4">
				<Table className="w-full">
					<TableHeader>
						<TableRow>
							<TableHead className="w-[20px]">Id</TableHead>
							<TableHead>Titel</TableHead>
							<TableHead>
								<LiaClipboard />
							</TableHead>
							<TableHead className="text-truncate overflow-hidden text-ellipsis max-w-[120px]">Url</TableHead>
							<TableHead className="">Target</TableHead>
							<TableHead className="w-[160px]">Beschreibung</TableHead>
							<TableHead>bearbeiten</TableHead>
							<TableHead className="w-[180px]">Hinzugefügt am</TableHead>
							<TableHead className="w-[180px]">Letzte Änderung</TableHead>
							<TableHead>löschen</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{status === "loading" && (
							<TableRow>
								<TableCell colSpan={10}>
									<Skeleton className="h-5 w-full" />
								</TableCell>
							</TableRow>
						)}

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
									<TableCell className="truncate ellipsis">{link.title}</TableCell>
									<TableCell>
										<ClipboardButton classNames="mt-1.5 hover:text-emerald-500" title="In die Zwischenablage kopieren" textToCopy={link.url} />
									</TableCell>
									<TableCell className="truncate ellipsis">
										<Link href={link.url} title={link.title + " in neuen Fenster öffnen"} className="inline hover:text-sky-500" target="_blank">
											{link.url}
										</Link>
									</TableCell>
									<TableCell>{link.target === "_blank" ? <CgInternal className="ml-2 mt-1 inline" /> : <FiExternalLink className="ml-2 mt-1 inline" />}</TableCell>

									<TableCell className="truncate">{link?.description}</TableCell>
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
			</div>
		</>
	);
};

export default LinksTable;
