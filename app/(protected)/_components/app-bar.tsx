"use client";
import Image from "next/image";
import Link from "next/link";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useCurrentUser } from "@/hooks/use-current-user";

import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import { HiOutlineDotsVertical } from "react-icons/hi";

// TODO: Auf statisch umbauen und URL speichern beim ersten Anlegen
import { getFavicon } from "@/lib/utils";

export const AppBar = () => {
	const { status } = useSession({ required: true });
	const userId = useCurrentUser()?.id;

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [apps, setApps] = useState<any[]>([]);

	const fetchApps = async () => {
		try {
			const res = await fetch(`/api/apps/${userId}`);
			const response = await res.json();
			setApps(response);
		} catch (error) {
			toast.error("Fehler beim Laden der Apps.");
		}
	};

	useEffect(() => {
		setIsLoading(true);
		fetchApps();
		setIsLoading(false);
	}, []);

	return (
		<div className="w-full">
			<div className="flex items-start justify-start space-x-3">
				{apps.length > 0 ? (
					// TODO: Improve UI/UX
					apps.map(app => (
						<div className="size-20 relative flex flex-col justify-center place-content-center bg-white/20 backdrop-blur hover:bg-white/30 rounded-lg">
							<Link href={app.url} className="w-full h-full flex flex-col items-center justify-center">
								<Image src={getFavicon(app.url)} className="mb-2 rounded-sm" width={24} height={24} alt={app.title} />
								<span className="text-xs text-slate-900">{app.title}</span>
							</Link>
							<DropdownMenu>
								<DropdownMenuTrigger className="absolute top-2 right-2 hover:bg-white/30 text-slate-700">
									<HiOutlineDotsVertical />
								</DropdownMenuTrigger>
								<DropdownMenuContent>
									<DropdownMenuItem>bearbeiten</DropdownMenuItem>
									<DropdownMenuItem>löschen</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					))
				) : (
					<>
						<Skeleton className="size-20 bg-primary/10 animate-pulse" />
						<Skeleton className="size-20 bg-primary/10 animate-pulse" />
						<Skeleton className="size-20 bg-primary/10 animate-pulse" />
						<Skeleton className="size-20 bg-primary/10 animate-pulse" />
					</>
				)}
			</div>
		</div>
	);
};
