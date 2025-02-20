import { ProjectCard } from "./project-card";
import { getProjectsByUserId } from "@/actions/project";

const ProjectGrid = async () => {
	const projects = await getProjectsByUserId();
	return (
		<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
			{projects.map(project => (
				<ProjectCard key={project.id} project={project} />
			))}
		</div>
	);
};

export default ProjectGrid;
