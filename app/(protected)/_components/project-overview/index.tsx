import { auth } from "@/auth";

import { MacBook } from "./mac-book";
import { getProjectsByUserId } from "@/actions/project";

const ProjectOverview = async () => {
	const session = await auth();
	const projects = await getProjectsByUserId(session?.user.id || "");

	return (
		<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
			{projects.map(project => (
				<MacBook key={project.id} {...project} />
			))}
		</div>
	);
};

export default ProjectOverview;
