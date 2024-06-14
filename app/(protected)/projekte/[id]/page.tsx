import { getProjectById } from "@/actions/project";

const ProjectByIdPage = async ({ params }: { params: { id: string } }) => {
	const id = params.id;
	const project = await getProjectById(id);
	return (
		<div className="page-wrapper">
			<h2 className="text-md flex justify-start font-bold text-slate-700 mb-5">{project?.title}</h2>
			<div className="bg-white rounded-xl shadow-sm border p-4">
				<h3>{project?.title}</h3>
				<div>
					<h4>URL</h4>
					<a href={project?.url}>{project?.url}</a>
				</div>
				<div>{project?.description}</div>
			</div>
		</div>
	);
};

export default ProjectByIdPage;
