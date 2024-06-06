"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useCurrentUser } from "@/hooks/use-current-user";

import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "sonner";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import { BsInfoCircle } from "react-icons/bs";
import { BsFillTrash3Fill } from "react-icons/bs";
import { LiaEdit } from "react-icons/lia";

import { capitalizeFirstLetter } from "@/lib/utils";
const LinksTable = () => {
	const options: Intl.DateTimeFormatOptions = {
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		timeZone: "UTC",
		timeZoneName: "short"
	};

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [links, setUsers] = useState<any[]>([]);

	const userId = useCurrentUser()?.id;
	const fetchLinks = async () => {
		setIsLoading(true);
		await fetch(`/api/links/${userId}`).then(async res => {
			const response = await res.json();
			setUsers(response);
		});
		setIsLoading(false);
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
					<TableHead className="w-[]">Titel</TableHead>
					<TableHead className="w-[]">Url</TableHead>
					<TableHead className="w-[]">Beschreibung</TableHead>
					<TableHead className="w-[]">Hinzugefügt am</TableHead>
					<TableHead>Letzte Änderung</TableHead>
					<TableHead>bearbeiten</TableHead>
					<TableHead>löschen</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{links.map((link: any) => (
					<>
						<TableRow key={link?.id}>
							<TableCell>
								<Popover>
									<PopoverTrigger>
										<BsInfoCircle />
									</PopoverTrigger>
									<PopoverContent>{link?.id}</PopoverContent>
								</Popover>
							</TableCell>
							<TableCell>{link?.title}</TableCell>
							<TableCell>{link?.url}</TableCell>
							<TableCell>{link.description}</TableCell>
							<TableCell>{link?.createdAt}</TableCell>
							<TableCell>{link?.updatedAt}</TableCell>
							<TableCell>
								<button className=" text-slate-800 hover:text-emerald-500">
									<LiaEdit className="size-4 mx-auto" />
								</button>
							</TableCell>
							<TableCell>
								<button className="text-rose-500 hover:text-rose-600">
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
