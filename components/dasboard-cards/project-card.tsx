"use client";

import { useTransition, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useProjectsStore } from "@/hooks/use-projects-store";

import Link from "next/link";

import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { Project } from "@prisma/client";

import { getProjectsByUserId } from "@/actions/project";
import { BsBuildings } from "react-icons/bs";

export const ProjectCard = () => {
	const { status } = useSession({ required: true });
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const projects = useProjectsStore<Project[]>(state => state.projects);
	const latestProject = useProjectsStore<Project>(state => state.projects[0]);
	const setProjects = useProjectsStore(state => state.setProjects);

	const fetchProjects = async () => {
		setIsLoading(true);
		try {
			const response = await getProjectsByUserId();
			setProjects(response);
		} catch (error) {
			console.error("Error fetching links:", error);
			toast.error("Failed to fetch links.");
		}
		setIsLoading(false);
	};

	useEffect(() => {
		setIsLoading(true);
		fetchProjects();
		setIsLoading(false);
	}, []);

	return (
		<div className="p-4 bg-white border shadow-sm rounded-xl">
			<h2 className="flex justify-between mb-2 text-xs md:text-sm">
				<Link href="/projekte" className="text-slate-900 hover:text-slate-700 hover:underline" title="Zur Projektübersicht">
					Projekte
				</Link>
				<span>neuestes Projekt</span>
			</h2>
			<h3 className="flex justify-between">
				<span className="font-bold">
					{status === "loading" || isLoading ? (
						<Skeleton className="mt-[-3px] w-8 h-4 bg-primary/10 animate-pulse" />
					) : (
						<>
							<BsBuildings className="inline-block mr-2 mt-[-3px]" />
							{projects.length}
						</>
					)}
				</span>
				<span className="mt-1 text-sm font-normal">{status === "loading" || isLoading ? <Skeleton className="mt-[-3px] w-12 h-4 bg-primary/10 animate-pulse" /> : latestProject?.title}</span>
			</h3>
		</div>
	);
};
