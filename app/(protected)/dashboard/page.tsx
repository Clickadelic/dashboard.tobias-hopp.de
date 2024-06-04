import LinkCard from "../_components/link-card";
import TodoCard from "../_components/todo-card";
import ProjectCard from "../_components/project-card";
import NoticeCard from "../_components/notice-card";

const DashboardPage = () => {
	return (
		<div className="page-wrapper">
			<h2 className="text-md font-bold text-slate-700 mb-5">Dashboard</h2>
			<div className="grid grid-cols-2 gap-3 md:grid-cols-4">
				<ProjectCard />
				<TodoCard />
				<NoticeCard />
				<LinkCard />
			</div>
		</div>
	);
};

export default DashboardPage;
