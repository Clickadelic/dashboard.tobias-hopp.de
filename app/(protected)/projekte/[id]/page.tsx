import { getProjectById } from "@/actions/project";
import { FormProject } from "@/components/forms/form-project";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

const ProjectByIdPage = async ({ params }: { params: { id: string } }) => {
	const id = params.id;
	const project = await getProjectById(id);

	return (
		<div className="page-wrapper">
			<h2 className="text-md flex justify-start font-bold text-slate-700 mb-5">Projektdetails</h2>
			<div className="bg-white rounded-xl shadow-sm border p-4">
				<h3 className="text-md flex justify-start font-bold text-slate-700 mb-5">{project?.title}</h3>
				<Tabs defaultValue="view" className="w-[400px]">
					<TabsList>
						<TabsTrigger value="view">Übersicht</TabsTrigger>
						<TabsTrigger value="edit">Bearbeiten</TabsTrigger>
					</TabsList>
					<TabsContent value="view">
						<h3>{project?.title}</h3>
						<p>{project?.description}</p>
						<Link href="{project?.url}" target="_blank">
							{project?.url}
						</Link>
					</TabsContent>
					<TabsContent value="edit">{project && <FormProject project={project} />}</TabsContent>
				</Tabs>
			</div>
		</div>
	);
};

export default ProjectByIdPage;
