"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SettingsSchema } from "@/schemas";

import { useState, useEffect, useTransition } from "react";
import { useSession } from "next-auth/react";

import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Form, FormField, FormControl, FormItem, FormLabel, FormDescription, FormMessage } from "@/components/ui/form";
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { useCurrentUser } from "@/hooks/use-current-user";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "sonner";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import { BsInfoCircle } from "react-icons/bs";
import { BsFillTrash3Fill } from "react-icons/bs";
import { LiaEdit } from "react-icons/lia";
import { capitalizeFirstLetter } from "@/lib/utils";

import { settings } from "@/actions/settings";
import { deleteUser } from "@/actions/user";

const UsersTable = () => {
	const user = useCurrentUser();
	const { update } = useSession();

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [users, setUsers] = useState<any[]>([]);

	const [error, setError] = useState<string | undefined>("");
	const [success, setSuccess] = useState<string | undefined>("");

	const [isPending, startTransition] = useTransition();

	const form = useForm<z.infer<typeof SettingsSchema>>({
		resolver: zodResolver(SettingsSchema),
		defaultValues: {
			name: user?.name || undefined,
			email: user?.email || undefined,
			password: undefined,
			newPassword: undefined,
			isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined
		}
	});

	const onSubmit = (email: string, values: z.infer<typeof SettingsSchema>) => {
		startTransition(() => {
			settings(values)
				.then(data => {
					if (data.error) {
						setError(data.error);
					}
					if (data.success) {
						update();
						setSuccess(data.success);
					}
				})
				.catch(() => {
					setError("Irgendwas ging serverseitig schief.");
				});
		});
	};

	const fetchUsers = async () => {
		setIsLoading(true);
		await fetch("/api/users/").then(async res => {
			const response = await res.json();
			setUsers(response);
		});
		setIsLoading(false);
	};

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
			<TableCaption>{isLoading ? "Lade Benutzer..." : `${users.length} Benutzer.`}</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className="w-[20px]">Id</TableHead>
					<TableHead className="w-[160px]">Name</TableHead>
					<TableHead className="w-[250px]">E-Mail Adresse</TableHead>
					<TableHead className="w-[160px]">E-Mail verifiziert</TableHead>
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
							<Switch>
								<CheckCircledIcon className="size-4 mx-auto text-emerald-500" />
								<ExclamationTriangleIcon className="size-4 mx-auto text-rose-500" />
							</Switch>
							{user?.isTwoFactorEnabled ? <CheckCircledIcon className="size-4 mx-auto text-emerald-500" /> : <ExclamationTriangleIcon className="size-4 mx-auto text-rose-500" />}
						</TableCell>
						<TableCell>{capitalizeFirstLetter(user?.role)}</TableCell>
						<TableCell>asd</TableCell>
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
