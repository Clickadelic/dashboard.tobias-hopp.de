import ProjectOverview from "@/app/(protected)/_components/project-overview";

import { HiOutlineChevronRight } from "react-icons/hi";
import Link from "next/link";
import { BiHomeAlt2 } from "react-icons/bi";

const ProjectPage = () => {
	return (
		<div className="page-wrapper">
			<h2 className="text-md font-bold text-slate-700 mb-5">Projekte</h2>
			<ProjectOverview />
		</div>
	);
};

export default ProjectPage;
