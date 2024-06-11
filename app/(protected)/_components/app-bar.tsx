"use client";

import Link from "next/link";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

export const AppBar = () => {
	const { status } = useSession({ required: true });
	const userId = useCurrentUser()?.id;

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [links, setLinks] = useState<any[]>([]);

	const fetchLinks = async () => {
		setIsLoading(true);
		try {
			const res = await fetch(`/api/apps/${userId}`);
			const response = await res.json();
			setLinks(response);
		} catch (error) {
			toast.error("Fehler beim Laden der Links.");
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		setIsLoading(true);
		fetchLinks();
		setIsLoading(false);
	}, []);

	return (
		<div className="w-full">
			<div className="flex items-start justify-start space-x-3">
				{links.length === 0 || status === "loading" || isLoading ? (
					<>
						<Skeleton className="size-16 bg-primary/10 animate-pulse" />
						<Skeleton className="size-16 bg-primary/10 animate-pulse" />
						<Skeleton className="size-16 bg-primary/10 animate-pulse" />
					</>
				) : (
					<>
						{links.map(link => (
							<Link
								key={link.id}
								href={link.url}
								className="size-16 rounded-lg font-medium flex justify-center items-center border shadow-sm hover:shadow-lg bg-white"
								target="_blank"
								rel="noopener noreferrer"
							>
								{link.title.charAt(0).toUpperCase()}
							</Link>
						))}
					</>
				)}
			</div>
		</div>
	);
};
