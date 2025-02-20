import Link from "next/link";
import { slugify } from "@/lib/utils";
import { FaArrowRightLong } from "react-icons/fa6";
import { ProjectSchema } from "@/schemas";

import { Project } from "@prisma/client";

interface ProjectProps {
	formClasses?: string;
	project?: Project;
}

export const ProjectCard = ({ formClasses, project }: ProjectProps) => {
	const { id, title, url, description } = project || {};

	return (
		<div key={id}>
			<div className="w-full h-auto hover:opacity-90">
				<h3 className="text-md font-bold ml-12 mb-1 mt-3 text-slate-700">{title}</h3>
				<Link href={`projekte/${id}`} title="zum Projekt" className="mb-3 w-full block">
					<div className="w-full py-1 macbook">
						<div className="screen">
							<div className="viewport text-xs p-2 text-slate-200 bg-cover bg-center bg-no-repeat">{description}</div>
						</div>
						<div className="base"></div>
						<div className="notch"></div>
					</div>
				</Link>
			</div>
			<div className="flex flex-end">
				<Link href={`projekte/${id}`} title="zum Projekt" className="flex py-2 px-4 mx-6 w-full rounded-full border-black text-black justify-end">
					zum Projekt <FaArrowRightLong className="mt-1 ml-2" />
				</Link>
			</div>
		</div>
	);
};
