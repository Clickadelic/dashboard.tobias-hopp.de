"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useCurrentUser } from "@/hooks/use-current-user";

import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "sonner";

import { BsFillTrash3Fill } from "react-icons/bs";
import { FiExternalLink } from "react-icons/fi";
import { LiaEdit } from "react-icons/lia";
import { LuInfo } from "react-icons/lu";

import Link from "next/link";

import { getLinksByUserId, deleteLinkById } from "@/actions/link";

import { ClipboardButton } from "../clipboard-button";
import { Link as Hyperlink } from "@prisma/client";

import { DownloadCSVButton } from "./download-csv-button";
import { DownloadJSONButton } from "./download-json-button";

const LinksTable = () => {
	const { status } = useSession({ required: true });
	const userId = useCurrentUser()?.id;

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

	return (
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
							<TableCell className="space-x-5">kjhs</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};

export default LinksTable;
