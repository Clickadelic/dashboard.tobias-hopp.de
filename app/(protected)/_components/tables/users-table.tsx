"use client";

import { useState, useEffect } from "react";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "sonner";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import { BsInfoCircle } from "react-icons/bs";
import { BsFillTrash3Fill } from "react-icons/bs";
import { LiaEdit } from "react-icons/lia";
import { capitalizeFirstLetter } from "@/lib/utils";

import { deleteUser } from "@/actions/user/delete-user";

const UsersTable = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [users, setUsers] = useState<any[]>([]);

	const fetchUsers = async () => {
		setIsLoading(true);
		await fetch("/api/users/").then(async res => {
			const response = await res.json();
			setUsers(response);
		});
		setIsLoading(false);
	};

	// Obsolote
	// const deleteUserByEmail = async (email: string) => {
	// 	setIsLoading(true)
	// 	const result = await fetch(`/api/user/${email}`, {
	// 		method: "DELETE"
	// 	})
	// 	if (!result.ok) {
	// 		toast.error("Fehler beim Loeschen des Benutzers.")
	// 	} else {
	// 		toast.success("Benutzer gelöscht.")
	// 		fetchUsers()
	// 	}
	// 	setIsLoading(false)
	// }

	const deleteUserByEmail = async (email: string) => {
		const result = await deleteUser(email);
		if (result.error) {
			toast.error(result.error);
		} else if (result.success) {
			toast.success(result.success);
			fetchUsers();
		}
	};

	useEffect(() => {
		setIsLoading(true);
		fetchUsers();
		setIsLoading(false);
	}, []);

	return (
		<Table>
			<TableCaption>{isLoading ? "Lade Benutzer..." : `${users.length} Benutzer registriert.`}</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className="w-[20px]">Id</TableHead>
					<TableHead className="w-[160px]">Name</TableHead>
					<TableHead className="w-[250px]">E-Mail Adresse</TableHead>
					<TableHead className="w-[130px]">E-Mail verifiziert</TableHead>
					<TableHead className="w-[120px]">2FA-Status</TableHead>
					<TableHead>Rolle</TableHead>
					<TableHead>bearbeiten</TableHead>
					<TableHead>löschen</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{users.map((user: any) => (
					<TableRow key={user?.id}>
						<TableCell>
							<Popover>
								<PopoverTrigger>
									<BsInfoCircle />
								</PopoverTrigger>
								<PopoverContent>{user?.id}</PopoverContent>
							</Popover>
						</TableCell>
						<TableCell>{user?.name}</TableCell>
						<TableCell>{user?.email}</TableCell>
						<TableCell>
							{user?.emailVerified ? <CheckCircledIcon className="size-4 mx-auto text-emerald-500" /> : <ExclamationTriangleIcon className="size-4 mx-auto text-rose-500" />}
						</TableCell>
						<TableCell>
							{user?.isTwoFactorEnabled ? <CheckCircledIcon className="size-4 mx-auto text-emerald-500" /> : <ExclamationTriangleIcon className="size-4 mx-auto text-rose-500" />}
						</TableCell>
						<TableCell>{capitalizeFirstLetter(user?.role)}</TableCell>
						<TableCell>
							<button className=" text-slate-800 hover:text-emerald-500">
								<LiaEdit className="size-4 mx-auto" />
							</button>
						</TableCell>
						<TableCell>
							<button onClick={() => deleteUserByEmail(user?.email)} className="text-rose-500 hover:text-rose-600">
								<BsFillTrash3Fill className="size-4 mx-auto" />
							</button>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};

export default UsersTable;
