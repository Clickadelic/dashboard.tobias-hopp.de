import ProjectOverview from "@/app/(protected)/_components/projects/project-overview";

const ProjectPage = () => {
	return (
		<div className="page-wrapper">
			<h2 className="text-md font-bold text-slate-700 mb-5">Projekte</h2>
			<ProjectOverview />
		</div>
	);
};

export default ProjectPage;
