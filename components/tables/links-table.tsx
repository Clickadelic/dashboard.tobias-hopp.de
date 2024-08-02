"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useCurrentUser } from "@/hooks/use-current-user";

import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "sonner";

import { BsFillTrash3Fill } from "react-icons/bs";
import { FiExternalLink } from "react-icons/fi";
import { FiPlus } from "react-icons/fi";
import { LiaEdit } from "react-icons/lia";
import { LuInfo } from "react-icons/lu";

import Link from "next/link";
import { LinkSchema } from "@/schemas";
import { addLink, editLinkById, deleteLinkById, getLinksByUserId } from "@/actions/link";

import { ClipboardButton } from "../clipboard-button";
import { germanDateFormat } from "@/lib/utils";
import { Link as Hyperlink } from "@prisma/client";

import { DownloadCSVButton } from "./download-csv-button";
import { DownloadJSONButton } from "./download-json-button";

const LinksTable = () => {
	const { status } = useSession({ required: true });
	const userId = useCurrentUser()?.id;

	const [isPending, startTransition] = useTransition();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [links, setLinks] = useState<Hyperlink[]>([]);

	const fetchLinks = async () => {
		setIsLoading(true);
		const response = await getLinksByUserId();
		setLinks(response);
		setIsLoading(false);
	};

	const deleteCurrentLinkById = async (id: string) => {
		const result = await deleteLinkById(id);
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
				description: link.description || ""
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

	const onAdd = async (values: z.infer<typeof LinkSchema>) => {
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

	const onEdit = async (id: string, values: z.infer<typeof LinkSchema>) => {
		startTransition(async () => {
			const result = await editLinkById(id, values);
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
			<div className="bg-white rounded-xl shadow-sm border p-2 md:p-4 mb-5">
				<h2 className="text-md font-bold text-slate-700 mb-5">Neuer Link</h2>
				<Form {...newForm}>
					<form onSubmit={newForm.handleSubmit(onAdd)} className="md:grid md:grid-cols-4 gap-4">
						<FormField
							control={newForm.control}
							name="title"
							render={({ field }) => (
								<FormItem>
									<Input {...field} className="w-full" placeholder="Titel" />
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={newForm.control}
							name="url"
							render={({ field }) => (
								<FormItem>
									<Input {...field} className="w-full" placeholder="URL" />
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={newForm.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<Input {...field} className="w-full" placeholder="Beschreibung" />
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button variant="primary" className="w-full rounded-sm" type="submit" disabled={isPending}>
							<FiPlus className=" mr-2" /> Link hinzufügen
						</Button>
					</form>
				</Form>
			</div>
			<div className="bg-white rounded-xl shadow-sm border p-2 md:p-4">
				<div className="space-x-3 mb-3 flex justify-end items-end">
					<DownloadCSVButton data={links} fileName="links" btnClasses="bg-mantis-primary text-white rounded-sm p-2 px-3 text-sm" />
					<DownloadJSONButton data={links} fileName="links" btnClasses="bg-mantis-primary text-white rounded-sm p-2 px-3 text-sm" />
				</div>
				<Table className="w-full">
					<TableHeader>
						<TableRow>
							<TableHead className="text-truncate overflow-hidden text-ellipsis">Titel</TableHead>
							<TableHead className="text-truncate overflow-hidden text-ellipsis">Url</TableHead>
							<TableHead className="text-truncate overflow-hidden text-ellipsis">Beschreibung</TableHead>
							<TableHead className="text-truncate overflow-hidden text-ellipsis">Aktionen</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{links.map((link: Hyperlink) => (
							<TableRow data-row-id={link.id} key={link.id}>
								<TableCell className="truncate ellipsis">{link.title}</TableCell>
								<TableCell className="truncate ellipsis">
									<Link href={link.url} title={link.title + " in neuen Fenster öffnen"} className="flex justify-between hover:text-sky-500 max-w-72" target="_blank">
										<span className="max-w-72 truncate ellipsis">{link.url}</span>
										<span className="max-w-7">
											<FiExternalLink className="ml-2 inline" />
										</span>
									</Link>
								</TableCell>
								<TableCell className="truncate">{link?.description}</TableCell>
								<TableCell className="space-x-5">
									<Popover>
										<PopoverTrigger asChild>
											<button onClick={() => setEditValues(link.id)} className="hover:text-mantis-primary rounded-md inline" title="Link bearbeiten">
												<LiaEdit className="size-4" />
											</button>
										</PopoverTrigger>
										<PopoverContent align="end">
											<Form {...dynamicForm}>
												<form onSubmit={dynamicForm.handleSubmit(() => onEdit(link.id, dynamicForm.getValues()))} className="space-y-2">
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

													<Button disabled={isPending} variant="primary" size="sm" type="submit" className="w-full">
														Bearbeiten
													</Button>
												</form>
											</Form>
										</PopoverContent>
									</Popover>
									<ClipboardButton classNames="mt-1.5 p-0 hover:text-emerald-500" title="In die Zwischenablage kopieren" textToCopy={link.url} />
									<Popover>
										<PopoverTrigger asChild>
											<button onClick={() => setEditValues(link.id)} className="hover:text-mantis-primary rounded-md inline">
												<LuInfo className="size-4" />
											</button>
										</PopoverTrigger>
										<PopoverContent align="end" className="md:w-[600px]">
											<h3 className="text-md font-bold mb-3">{link.title}</h3>
											<table className="w-full text-sm font-light text-left">
												<thead>
													<tr>
														<th className="text-truncate overflow-hidden text-ellipsis p-1">Link-Id</th>
														<th className="text-truncate overflow-hidden text-ellipsis p-1">Hinzugefügt am</th>
														<th className="text-truncate overflow-hidden text-ellipsis p-1">zuletzt bearbeitet</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<td className="text-truncate overflow-hidden text-ellipsis p-1">{link.id}</td>
														<td className="text-truncate overflow-hidden text-ellipsis p-1">{new Date(link.createdAt).toLocaleString()}</td>
														<td className="text-truncate overflow-hidden text-ellipsis p-1">{new Date(link.updatedAt).toLocaleString()}</td>
													</tr>
												</tbody>
											</table>
										</PopoverContent>
									</Popover>
									<button onClick={() => deleteCurrentLinkById(link.id)} className="text-rose-500 hover:text-rose-600">
										<BsFillTrash3Fill className="size-4 mx-auto" />
									</button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</>
	);
};

export default LinksTable;
