import { getProjectById } from "@/actions/project";
import { FormProject } from "@/components/forms/form-project";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { deleteProjectById } from "@/actions/project";
import { toast } from "sonner";

const ProjectByIdPage = async ({ params }: { params: { id: string } }) => {
	const id = params.id;
	const project = await getProjectById(id);

	const onDelete = async () => {
		try {
			const result = await deleteProjectById(id);
			if (result.error) {
				toast.error(result.error);
			} else if (result.success) {
				toast.success(result.success);
				window.location.href = "/projekte";
			}
		} catch (error) {
			toast.error("Irgendwas ging schief - Ursache unbekannt");
		}
	};
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
				<button
					onClick={() => {
						onDelete();
					}}
					className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
				>
					Delete Projekt
				</button>
			</div>
		</div>
	);
};

export default ProjectByIdPage;
