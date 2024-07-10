import { AppBar } from "../_components/app-bar";

import { ProjectCard } from "@/components/cards/project-card";
import { TodoCard } from "@/components/cards/todo-card";
import { LinkCard } from "@/components/cards/link-card";
import { NoticeCard } from "@/components/cards/notice-card";

import { TodoWidget } from "@/components/widgets/todo-widget";

import { ContextComponent } from "../_components/child-context";

const DashboardPage = () => {
	return (
		<div className="page-wrapper">
			<h2 className="text-md font-bold text-slate-900 mb-5">Dashboard</h2>
			<div className="mb-3">
				<AppBar />
			</div>
			<div className="grid grid-cols-2 gap-3 md:grid-cols-4 mb-5">
				<ProjectCard />
				<NoticeCard />
				<TodoCard />
				<LinkCard />
			</div>
			<div className="grid grid-cols-3 gap-4">
				<div className="col-span-2">
					<h2 className="text-md font-bold text-slate-900 mb-5">Stats</h2>
					<div className="bg-white rounded-xl shadow-sm border p-2 md:p-4">
						<ContextComponent />
					</div>
				</div>
				<div>
					<h2 className="text-md font-bold text-slate-900 mb-5">Todos</h2>
					<div className="bg-white rounded-xl shadow-sm border p-2 md:p-4">
						<TodoWidget />
					</div>
				</div>
				<div className="bg-white rounded-xl shadow-sm border p-2 md:p-4">06</div>
				<div className="col-span-2 bg-white rounded-xl shadow-sm border p-2 md:p-4">07</div>
			</div>
		</div>
	);
};

export default DashboardPage;
