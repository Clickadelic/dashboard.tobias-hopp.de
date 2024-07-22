"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSchema } from "@/schemas";

import { useState, useEffect, useTransition } from "react";
import { useSession } from "next-auth/react";

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useCurrentUser } from "@/hooks/use-current-user";
import { capitalizeFirstLetter } from "@/lib/utils";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import { BsInfoCircle } from "react-icons/bs";
import { BsFillTrash3Fill } from "react-icons/bs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { settings } from "@/actions/user-settings";
import { deleteUserByEmail } from "@/actions/user";
import { getUsersWithoutPassword, updateUserRole } from "@/actions/user";
import { User } from "@prisma/client";
import { UserRole } from "@prisma/client";

type UserWithoutPassword = Omit<User, "password">;

const UsersTable = () => {
	const user = useCurrentUser();
	const { status, update } = useSession();

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [users, setUsers] = useState<UserWithoutPassword[]>([]);

	const [error, setError] = useState<string | undefined>("");
	const [success, setSuccess] = useState<string | undefined>("");

	const [isPending, startTransition] = useTransition();

	const form = useForm<z.infer<typeof UserSchema>>({
		resolver: zodResolver(UserSchema),
		defaultValues: {
			name: user?.name || undefined,
			email: user?.email || undefined,
			password: undefined,
			newPassword: undefined,
			isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined
		}
	});

	const onSubmit = (email: string, values: z.infer<typeof UserSchema>) => {
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
		const users = await getUsersWithoutPassword();
		setUsers(users);
		setIsLoading(false);
	};

	const onDelete = async (email: string) => {
		const result = await deleteUserByEmail(email);
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

	const onRoleChange = async (email: string, UserRole: UserRole) => {
		const result = await updateUserRole(email, UserRole);
		if (result.error) {
			toast.error(result.error);
		} else if (result.success) {
			toast.success(result.success);
			fetchUsers();
		}
	};

	return (
		<Table>
			<TableCaption>{status === "loading" || isLoading ? "Lade Benutzer..." : `${users.length} Benutzer.`}</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead>Name</TableHead>
					<TableHead>E-Mail Adresse</TableHead>
					<TableHead>Account verifiziert</TableHead>
					<TableHead>2FA-Aktiviert</TableHead>
					<TableHead>Rolle</TableHead>
					<TableHead>löschen</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{users.map((user: any) => (
					<TableRow key={user?.id}>
						<TableCell>{user?.name}</TableCell>
						<TableCell>{user?.email}</TableCell>
						<TableCell>{user?.emailVerified ? <CheckCircledIcon className="size-4 text-emerald-500 mr-2" /> : <AiOutlineExclamationCircle className="size-4 text-rose-500" />}</TableCell>
						<TableCell>
							{user?.isTwoFactorEnabled ? <CheckCircledIcon className="size-4 text-emerald-500 mr-2" /> : <AiOutlineExclamationCircle className="size-4 text-rose-500 mr-2" />}
						</TableCell>
						<TableCell>
							<Select onValueChange={value => onRoleChange(user?.email, value as UserRole)}>
								<SelectTrigger className="w-[180px]">
									<SelectValue placeholder={user?.role} />
								</SelectTrigger>
								<SelectContent defaultValue={user?.role}>
									<SelectItem value={UserRole.USER}>Benutzer</SelectItem>
									<SelectItem value={UserRole.ADMIN}>Administrator</SelectItem>
								</SelectContent>
							</Select>
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
