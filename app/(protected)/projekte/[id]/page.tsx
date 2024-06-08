import { getProjectById } from "@/actions/project";

const ProjectByIdPage = async ({ params }: { params: { id: string } }) => {
	const id = params.id;
	const project = await getProjectById(id);
	return (
		<div className="page-wrapper">
			<h2 className="text-md font-bold text-slate-700 mb-5">Projektdetails</h2>
			<div className="bg-white rounded-xl shadow-sm border p-3">
				<div>{project?.id}</div>
				<div>{project?.title}</div>
				<div>{project?.url}</div>
				<div>{project?.description}</div>
			</div>
		</div>
	);
};

export default ProjectByIdPage;
