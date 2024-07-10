import ProjectGrid from "@/app/(protected)/_components/project-grid"

import { HiOutlineChevronRight } from "react-icons/hi"
import Link from "next/link"
import { BiHomeAlt2 } from "react-icons/bi"

const ProjectPage = () => {
	return (
		<div className="page-wrapper">
			<h2 className="text-md font-bold text-slate-700 mb-5">Projekte</h2>
			{/* TODO: Umlagern des Layouts ??? */}
			<div className="bg-white p-2 md:p-4 rounded-lg border shadow-sm">
				<ProjectGrid />
			</div>
		</div>
	)
}

export default ProjectPage
