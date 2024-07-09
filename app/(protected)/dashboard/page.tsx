import { AppBar } from "../_components/app-bar";

import { ProjectCard } from "../_components/cards/project-card";
import { TodoCard } from "../_components/cards/todo-card";
import { LinkCard } from "../_components/cards/link-card";
import { NoticeCard } from "../_components/cards/notice-card";

import { TodoWidget } from "../_components/widgets/todo-widget";

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
			<div className="grid grid-cols-3 gap-4">
				<div className="col-span-2">
					<h2 className="text-md font-bold text-slate-700 mb-5">Stats</h2>
					<div className="bg-white rounded-xl shadow-sm border p-2 md:p-4">
						<p>
							Lorem, ipsum dolor sit amet consectetur adipisicing elit. Et blanditiis temporibus esse optio alias, ipsa a non obcaecati suscipit nobis eveniet vel quidem doloremque ullam
							dolore nisi? Facilis dolor possimus fuga rem, alias magnam animi inventore numquam quas aspernatur beatae? Earum suscipit id debitis? Repudiandae optio sequi delectus quae
							assumenda, saepe eum voluptatum voluptas et magnam quidem laudantium tempore amet consequatur velit nisi earum voluptates, quam quasi provident fugit. Tempora,
							necessitatibus dignissimos expedita dicta quos itaque facilis explicabo saepe veritatis quisquam, nulla nesciunt dolorem odit impedit magnam sint molestiae beatae cum
							similique ullam accusantium. Vitae laboriosam quasi quas quibusdam architecto.
						</p>
					</div>
				</div>
				<div>
					<h2 className="text-md font-bold text-slate-700 mb-5">Todos</h2>
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
