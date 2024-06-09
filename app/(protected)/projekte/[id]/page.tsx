import { getProjectById } from "@/actions/project";
import { HiOutlineChevronRight } from "react-icons/hi";
import Link from "next/link";
import { BiHomeAlt2 } from "react-icons/bi";

const ProjectByIdPage = async ({ params }: { params: { id: string } }) => {
	const id = params.id;
	const project = await getProjectById(id);
	return (
		<div className="page-wrapper">
			<h2 className="text-md flex justify-start font-bold text-slate-700 mb-5">
				<BiHomeAlt2 />
				<Link href="/projekte" className="hover:text-slate-500" title="zurück zur Projektübersicht">
					Projekte
				</Link>
				<HiOutlineChevronRight className="size-4 mx-2 mt-1" />
				{project?.title}
			</h2>
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
