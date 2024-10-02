"use client";
import Link from "next/link";
import { useTransition } from "react";

import { FormProject } from "@/components/forms/form-project";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

import { Project } from "@prisma/client";
import { deleteProjectById } from "@/actions/project";

interface ProjectTabsProps {
	project?: Project;
}

export const ProjectTabs = ({ project }: ProjectTabsProps) => {
	const [isPending, startTransition] = useTransition();

	const onDelete = async (id: string) => {
		startTransition(async () => {
			const result = await deleteProjectById(id);
			if (result.error) {
				toast.error(result.error);
			} else if (result.success) {
				toast.success(result.success);
			}
		});
	};

	return (
		<div>
			<Tabs defaultValue="view" className="w-full">
				<TabsList>
					<TabsTrigger value="view">Übersicht</TabsTrigger>
					<TabsTrigger value="edit">Bearbeiten</TabsTrigger>
					<TabsTrigger value="delete">Löschen</TabsTrigger>
				</TabsList>
				<TabsContent value="view">
					<h3 className="text-md font-bold">{project?.title}</h3>
					<p>{project?.description}</p>
					<Link href="{project?.url}" target="_blank">
						{project?.url}
					</Link>
				</TabsContent>
				<TabsContent value="edit">{project && <FormProject project={project} />}</TabsContent>
				<TabsContent value="delete" className="flex flex-col justify-center place-items-center items-center space-y-4">
					<p>Achtung, Du bist dabei das komplette Projekt und alle damit verbundenen Daten zu löschen.</p>
					<button
						className="bg-red-500 hover:bg-danger-600 text-white font-bold py-2 px-4 rounded"
						onClick={() => {
							onDelete(project?.id!);
						}}
					>
						Löschen
					</button>
				</TabsContent>
			</Tabs>
		</div>
	);
};
