"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useCurrentUser } from "@/hooks/use-current-user";
import Link from "next/link";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "sonner";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import { FiExternalLink } from "react-icons/fi";
import { BsInfoCircle } from "react-icons/bs";
import { BsFillTrash3Fill } from "react-icons/bs";
import { LiaEdit } from "react-icons/lia";
import { deleteLink } from "@/actions/link/delete-link";
import { germanDateFormat } from "@/lib/utils";

const LinksTable = () => {
	const { status } = useSession({ required: true });
	const userId = useCurrentUser()?.id;

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
		await deleteLink(id);
		fetchLinks();
	};

	useEffect(() => {
		setIsLoading(true);
		fetchLinks();
		setIsLoading(false);
	}, []);

	return (
		<Table>
			<TableCaption>{isLoading ? "Lade Links..." : `${links.length} Links registriert.`}</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className="w-[20px]">Id</TableHead>
					<TableHead>Titel</TableHead>
					<TableHead>Url</TableHead>
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
								<FiExternalLink className="inline mr-2 mt--1" />
								<Link href={link.url} title={link.title} className="inline hover:text-sky-500" target="_blank">
									{link.url}
								</Link>
							</TableCell>
							<TableCell>{link?.description}</TableCell>
							<TableCell>{germanDateFormat(link.createdAt)}</TableCell>
							<TableCell>{germanDateFormat(link.updatedAt)}</TableCell>
							<TableCell>
								<button className=" text-slate-800 hover:text-emerald-500">
									<LiaEdit className="size-4 mx-auto" />
								</button>
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
