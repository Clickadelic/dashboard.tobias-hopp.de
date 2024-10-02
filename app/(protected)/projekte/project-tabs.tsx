"use client";
import Link from "next/link";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { FormProject } from "@/components/forms/form-project";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

import { Project } from "@prisma/client";
import { deleteProjectById } from "@/actions/project";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger
} from "@/components/ui/alert-dialog";

interface ProjectTabsProps {
	project?: Project;
}

export const ProjectTabs = ({ project }: ProjectTabsProps) => {
	const [isPending, startTransition] = useTransition();

	const router = useRouter();
	const onDelete = async (id: string) => {
		startTransition(async () => {
			const result = await deleteProjectById(id);
			if (result.error) {
				toast.error(result.error);
			} else if (result.success) {
				toast.success(result.success);
				router.push("/projekte");
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
					<h3 className="text-xl font-medium">Projekt löschen</h3>
					<h4 className="text-lg">Alle Projektdaten aus dem Dashboard löschen.</h4>
					<AlertDialog>
						<AlertDialogTrigger className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-3 rounded-sm">Löschen</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>Achtung, bist Du Dir sicher?</AlertDialogTitle>
								<AlertDialogDescription>
									Diese Aktion kann nicht rückgängig gemacht werden. Alle Projektdaten werden endgültig gelöscht und können nicht wieder hergestellt werden.
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>abbrechen</AlertDialogCancel>
								<AlertDialogAction
									className="bg-rose-500 hover:bg-rose-600 text-white"
									onClick={() => {
										onDelete(project?.id!);
									}}
								>
									Löschen
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</TabsContent>
			</Tabs>
		</div>
	);
};
