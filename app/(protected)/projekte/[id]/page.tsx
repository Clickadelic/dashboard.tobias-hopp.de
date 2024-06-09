import { getProjectById } from "@/actions/project"
import { HiOutlineChevronRight } from "react-icons/hi"

const ProjectByIdPage = async ({ params }: { params: { id: string } }) => {
	const id = params.id
	const project = await getProjectById(id)
	return (
		<div className="page-wrapper">
			<h2 className="text-md flex justify-start font-bold text-slate-700 mb-5">
				Projekt <HiOutlineChevronRight className="size-4 mx-2 mt-1" />
				{project?.title}
			</h2>
			<div className="bg-white rounded-xl shadow-sm border p-4">
				<div>{project?.id}</div>
				<div>{project?.title}</div>
				<div>{project?.url}</div>
				<div>{project?.description}</div>
			</div>
		</div>
	)
}

export default ProjectByIdPage
