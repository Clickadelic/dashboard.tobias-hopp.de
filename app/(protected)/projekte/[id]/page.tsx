import { getProjectById } from "@/actions/project";
import { ProjectTabs } from "../project-tabs";

const ProjectByIdPage = async (props: { params: Promise<{ id: string }> }) => {
	const params = await props.params;
	const id = params.id;
	const project = await getProjectById(id);
	return (
		<div className="page-wrapper">
			<h2 className="text-md flex justify-start font-bold text-slate-700 mb-5">Projektdetails</h2>
			<div className="bg-white rounded-xl shadow-sm border p-4">
				<h3 className="text-md flex justify-start font-bold text-slate-700 mb-5">{project?.title}</h3>
				<ProjectTabs project={project!} />
			</div>
		</div>
	);
};

export default ProjectByIdPage;
