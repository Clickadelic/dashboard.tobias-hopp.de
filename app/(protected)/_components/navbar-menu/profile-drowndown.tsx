"use client"

import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"
import { useCurrentRole } from "@/hooks/use-current-role"
import { useCurrentUser } from "@/hooks/use-current-user"

import Link from "next/link"

import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import { FaUser } from "react-icons/fa"
import { LuUser2 } from "react-icons/lu"
import { GiOrganigram } from "react-icons/gi"
import { GrAppsRounded } from "react-icons/gr"

import { LogoutButton } from "@/components/auth/logout-button"

export const ProfileDropdown = () => {
	const { status } = useSession({ required: true })
	const user = useCurrentUser()
	const role = useCurrentRole()
	const path = usePathname()

	return (
		<>
			{status === "loading" ? (
				<div className="flex justify-between w-[130px] mt-1">
					<Skeleton className="size-6 mt-1 mr-1 rounded-full" />
					<Skeleton className="w-[100px] h-6 mt-1" />
				</div>
			) : (
				<DropdownMenu modal={false}>
					<DropdownMenuTrigger className="flex justify-between p-1 hover:bg-slate-200 rounded-sm">
						<Avatar className="size-8">
							<AvatarImage src={user?.profileImage || ""} alt={`${user?.name} Profilbild`} />
							<AvatarFallback>
								<FaUser className="text-neutral-400" />
							</AvatarFallback>
						</Avatar>
						<span className="mt-1 ml-2 text-slate-900 hover:text-slate-900">{user?.name}</span>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="mr-3">
						<DropdownMenuLabel>Mein Account</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<Link href="/mein-profil" title="Zum Profil">
								<LuUser2 className="size-4 inline-block mr-2 mt-[-2px]" />
								Mein Profil
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Link href="/organisationen" title="Zum Profil">
								<GiOrganigram className="size-4 inline-block mr-2 mt-[-2px]" />
								Organisationen
							</Link>
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<LogoutButton>Logout</LogoutButton>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)}
		</>
	)
}
