"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useCurrentUser } from "@/hooks/use-current-user";

import { Input } from "@/components/ui/input";
import { Form, FormControl, FormLabel, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "sonner";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import { FiExternalLink } from "react-icons/fi";
import { BsInfoCircle } from "react-icons/bs";
import { LiaClipboard } from "react-icons/lia";
import { BsFillTrash3Fill } from "react-icons/bs";
import { LiaEdit } from "react-icons/lia";
import { deleteLink } from "@/actions/link/delete-link";
import { germanDateFormat } from "@/lib/utils";

import { LinkSchema } from "@/schemas";
// import { addLink } from "@/actions/link/add-link";
import { editLink } from "@/actions/link/edit-link";
import { ClipboardButton } from "../clipboard-button";
const LinksTable = () => {
	const { status } = useSession({ required: true });
	const userId = useCurrentUser()?.id;

	const [isPending, startTransition] = useTransition();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [links, setUsers] = useState<any[]>([]);

	const [textToCopy, setTextToCopy] = useState(""); // The text you want to copy
	const [copyStatus, setCopyStatus] = useState(false); //

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
			form.reset({
				title: link.title,
				url: link.url,
				description: link.description
			});
		}
	};

	const form = useForm<z.infer<typeof LinkSchema>>({
		resolver: zodResolver(LinkSchema),
		defaultValues: { title: "", url: "", description: "" }
	});

	const onSubmit = async (id: string, values: z.infer<typeof LinkSchema>) => {
		startTransition(async () => {
			const result = await editLink(id, values);
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
		<Table>
			<TableCaption>{isLoading ? "Lade Links..." : `${links.length} Links registriert.`}</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className="w-[20px]">Id</TableHead>
					<TableHead>Titel</TableHead>
					<TableHead>Url</TableHead>
					<TableHead>
						<LiaClipboard />
					</TableHead>
					<TableHead>Beschreibung</TableHead>
					<TableHead>Hinzugefügt am</TableHead>
					<TableHead>Letzte Änderung</TableHead>
					<TableHead>bearbeiten</TableHead>
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
								<FiExternalLink className="inline mr-2 mt-[-4px]" />
								<Link href={link.url} title={link.title} className="inline hover:text-sky-500" target="_blank">
									{link.url}
								</Link>
							</TableCell>
							<TableCell>
								<ClipboardButton className="hover:text-emerald-500" textToCopy={link.url} />
							</TableCell>
							<TableCell>{link?.description}</TableCell>
							<TableCell>{germanDateFormat(link.createdAt)}</TableCell>
							<TableCell>{germanDateFormat(link.updatedAt)}</TableCell>
							<TableCell>
								<Popover>
									<PopoverTrigger asChild>
										<button onClick={() => setEditValues(link.id)} className="inline">
											<LiaEdit className="size-6" />
										</button>
									</PopoverTrigger>
									<PopoverContent>
										<Form {...form}>
											<form onSubmit={form.handleSubmit(() => onSubmit(link.id, form.getValues()))} className="space-y-2">
												<FormField
													control={form.control}
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
													control={form.control}
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

												<Button disabled={isPending} variant="outline" type="submit" className="w-full">
													Bearbeiten
												</Button>
											</form>
										</Form>
									</PopoverContent>
								</Popover>
							</TableCell>
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
	);
};

export default LinksTable;
