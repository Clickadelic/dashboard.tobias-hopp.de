"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useTransition, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";

import Link from "next/link";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

import { FiPlus } from "react-icons/fi";

import { ProjectSchema } from "@/schemas";
import { Project } from "@prisma/client";

import { addProject, getProjectsByUserId } from "@/actions/project";
import { BsBuildings } from "react-icons/bs";

export const ProjectCard = () => {
	const { status } = useSession({ required: true });
	const [isPending, startTransition] = useTransition();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [projects, setProjects] = useState<any[]>([]);
	const [latestProject, setLatestProject] = useState<Project | null>(null);
	const fetchProjects = async () => {
		setIsLoading(true);
		try {
			const response = await getProjectsByUserId();
			setProjects(response);
			setLatestProject(response[0]);
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
		<div className="bg-white rounded-xl shadow-sm border p-4">
			<h2 className="flex justify-between text-xs md:text-sm mb-2">
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
				<span className="text-sm font-normal mt-1">{status === "loading" || isLoading ? <Skeleton className="mt-[-3px] w-12 h-4 bg-primary/10 animate-pulse" /> : latestProject?.title}</span>
			</h3>
		</div>
	);
};
