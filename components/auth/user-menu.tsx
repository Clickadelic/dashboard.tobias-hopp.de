"use client";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LogoutButton } from "@/components/auth/logout-button";
import { ExitIcon } from "@radix-ui/react-icons";

export const UserMenu = () => {
	const user = useCurrentUser();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="hover:bg-slate-200 rounded-md">
				<Avatar>
					<AvatarImage className="size-10" src={user?.image || ""} alt="User Avatar" />
					<AvatarFallback className="bg-slate-200 border border-slate-400">
						<FaUser className="text-slate-400" />
					</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-40" align="end">
				<LogoutButton>
					<DropdownMenuItem>
						<ExitIcon className="mr-2" />
						Logout
					</DropdownMenuItem>
				</LogoutButton>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
