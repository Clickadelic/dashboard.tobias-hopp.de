import { AppBar } from "../_components/app-bar";

import { ProjectCard } from "../_components/cards/project-card";
import { TodoCard } from "../_components/cards/todo-card";
import { LinkCard } from "../_components/cards/link-card";
import { NoticeCard } from "../_components/cards/notice-card";
import { getAppLinksByUser } from "@/actions/link";

const userApps = getAppLinksByUser();
console.log(userApps);

const DashboardPage = () => {
	return (
		<div className="page-wrapper">
			<h2 className="text-md font-bold text-slate-700 mb-5">Dashboard</h2>
			<div className="flex mb-3">
				<AppBar />
			</div>
			<div className="grid grid-cols-2 gap-3 md:grid-cols-4 mb-3">
				<ProjectCard />
				<TodoCard />
				<NoticeCard />
				<LinkCard />
			</div>
		</div>
	);
};

export default DashboardPage;
