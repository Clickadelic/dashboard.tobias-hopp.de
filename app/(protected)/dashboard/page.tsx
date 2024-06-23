import { AppBar } from "../_components/app-bar";

import { ProjectCard } from "../_components/cards/project-card";
import { TodoCard } from "../_components/cards/todo-card";
import { LinkCard } from "../_components/cards/link-card";
import { NoticeCard } from "../_components/cards/notice-card";

const DashboardPage = () => {
	return (
		<div className="page-wrapper">
			<h2 className="text-md font-bold text-slate-700 mb-5">Dashboard</h2>
			<div className="mb-3">
				<AppBar />
			</div>
			<div className="grid grid-cols-2 gap-3 md:grid-cols-4 mb-5">
				<ProjectCard />
				<TodoCard />
				<NoticeCard />
				<LinkCard />
			</div>
			<h2 className="text-md font-bold text-slate-700 mb-5">Stats</h2>
			<div className="grid grid-cols-3 gap-4">
				<div className="col-span-2 bg-white rounded-md shadow-sm border p-3">Stats</div>
				<div className="bg-white rounded-md shadow-sm border p-3">
					<ul>
						<li>
							<a href="">Link</a>
						</li>
						<li>
							<a href="">Link</a>
						</li>
						<li>
							<a href="">Link</a>
						</li>
						<li>
							<a href="">Link</a>
						</li>
						<li>
							<a href="">Link</a>
						</li>
					</ul>
				</div>
				<div className="bg-white rounded-md shadow-sm border p-3">06</div>
				<div className="col-span-2 bg-white rounded-md shadow-sm border p-3">07</div>
			</div>
		</div>
	);
};

export default DashboardPage;
