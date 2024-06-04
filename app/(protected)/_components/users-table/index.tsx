"use client";

import { useState, useEffect } from "react";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import UserRow from "./user-row";

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

	useEffect(() => {
		setIsLoading(true);
		fetchUsers();
		setIsLoading(false);
	}, []);

	return (
		<Table>
			<TableCaption>Query Time</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className="w-[20px]">Id</TableHead>
					<TableHead className="w-[160px]">Name</TableHead>
					<TableHead className="w-[180px]">E-Mail Adresse</TableHead>
					<TableHead className="w-[130px]">E-Mail verifiziert</TableHead>
					<TableHead className="w-[120px]">2FA-Status</TableHead>
					<TableHead>Rolle</TableHead>
					<TableHead>bearbeiten</TableHead>
					<TableHead>löschen</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{users.map((user: any) => (
					<UserRow key={user.id} user={user} />
				))}
			</TableBody>
		</Table>
	);
};

export default UsersTable;
