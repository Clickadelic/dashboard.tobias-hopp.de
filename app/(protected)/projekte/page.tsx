"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useCurrentUser } from "@/hooks/use-current-user";
import Link from "next/link";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "sonner";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import { FiExternalLink } from "react-icons/fi";
import { BsInfoCircle } from "react-icons/bs";
import { BsFillTrash3Fill } from "react-icons/bs";
import { LiaEdit } from "react-icons/lia";

import { germanDateFormat } from "@/lib/utils";

const ProjectPage = () => {
	const { status } = useSession({ required: true });
	const userId = useCurrentUser()?.id;

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [projects, setProjects] = useState<any[]>([]);

	const fetchProjects = async () => {
		setIsLoading(true);
		await fetch(`/api/projects/${userId}`).then(async res => {
			const response = await res.json();
			setProjects(response);
		});
		setIsLoading(false);
	};

	useEffect(() => {
		setIsLoading(true);
		fetchProjects();
		setIsLoading(false);
	}, []);

	return (
		<div className="page-wrapper">
			<h2 className="text-md font-bold text-slate-700 mb-5">Projekte</h2>
			<div className="grid grid-cols-2 gap-3 md:grid-cols-4">
				{projects.length > 0 ? (
					<>
						{projects.map(project => (
							<Card className="p-1" key={project.id}>
								<CardHeader>
									<CardTitle>{project.title}</CardTitle>
								</CardHeader>
								<CardContent>{project.description}</CardContent>
							</Card>
						))}
					</>
				) : (
					<p className="text-slate-500">Keine Projekte gefunden.</p>
				)}
			</div>
		</div>
	);
};

export default ProjectPage;
