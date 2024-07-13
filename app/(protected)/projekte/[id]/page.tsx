import { getProjectById } from "@/actions/project"
import { FormProject } from "@/components/forms/form-project"

const ProjectByIdPage = async ({ params }: { params: { id: string } }) => {
	const id = params.id
	const project = await getProjectById(id)

	return (
		<div className="page-wrapper">
			<h2 className="text-md flex justify-start font-bold text-slate-700 mb-5">{project?.title}</h2>
			<div className="bg-white rounded-xl shadow-sm border p-4">
				<h3>{project?.title}</h3>
				<FormProject project={project} />
			</div>
		</div>
	)
}

export default ProjectByIdPage
