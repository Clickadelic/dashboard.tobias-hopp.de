import { AppBar } from "../_components/app-bar";

import { ProjectCard } from "@/components/cards/project-card";
import { TodoCard } from "@/components/cards/todo-card";
import { LinkCard } from "@/components/cards/link-card";
import { NoticeCard } from "@/components/cards/notice-card";

import { TodoWidget } from "@/components/widgets/todo-widget";
import { NoticeWidget } from "@/components/widgets/notice-widget";
import { LinkWidget } from "@/components/widgets/link-widget";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { HackerNewsWidget } from "@/components/widgets/hackernews-widget";

import { Charts } from "../_components/charts";

const DashboardPage = () => {
	return (
		<div className="page-wrapper pb-16">
			<h2 className="text-md font-bold text-slate-900 mb-5">Dashboard</h2>
			<div className="mb-3">
				<AppBar />
			</div>
			<div className="grid grid-cols-1 gap-3 md:grid-cols-4 mb-5">
				<ProjectCard />
				<NoticeCard />
				<TodoCard />
				<LinkCard />
			</div>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<div className="col-span-2">
					<h2 className="text-md font-bold text-slate-900 mt-3 mb-5">Stats</h2>
					<div className="bg-white rounded-xl shadow-sm border p-2 md:p-4">
						<Charts />
					</div>
				</div>
				<div className="col-span-2 md:col-span-1">
					<h2 className="text-md font-bold text-slate-900 mt-3 mb-5">Widgets</h2>
					<div className="bg-white rounded-xl shadow-sm border p-2 md:p-4 md:min-h-96">
						{/* TODO: Build widget master component (with Tabs) */}
						<Tabs defaultValue="todos" className="w-full">
							<TabsList className="w-full flex justify-start mb-3">
								<TabsTrigger
									value="todos"
									className="flex-grow border border-transparent text-slate-900 hover:text-mantis-primary data-[state=active]:bg-white data-[state=active]:text-mantis-primary data-[state=active]:border-mantis-primary"
								>
									Todo&apos;s
								</TabsTrigger>
								<TabsTrigger
									value="notices"
									className="flex-grow border border-transparent text-slate-900 hover:text-mantis-primary data-[state=active]:bg-white data-[state=active]:text-mantis-primary data-[state=active]:border-mantis-primary"
								>
									Notizen
								</TabsTrigger>
								<TabsTrigger
									value="links"
									className="flex-grow border border-transparent text-slate-900 hover:text-mantis-primary data-[state=active]:bg-white data-[state=active]:text-mantis-primary data-[state=active]:border-mantis-primary"
								>
									Links
								</TabsTrigger>
							</TabsList>
							<TabsContent value="todos">
								<TodoWidget />
							</TabsContent>
							<TabsContent value="notices">
								<NoticeWidget />
							</TabsContent>
							<TabsContent value="links">
								<LinkWidget />
							</TabsContent>
						</Tabs>
					</div>
				</div>
				<div className="col-span-2 md:col-span-1">
					<h2 className="text-md font-bold text-slate-900 mt-3 mb-5">Hackernews</h2>
					<div className="bg-white rounded-xl shadow-sm border p-2 md:p-4">News API</div>
				</div>
				<div className="col-span-2">
					<div>
						<h2 className="text-md font-bold text-slate-900 mt-3 mb-5">E.Mails</h2>
						<div className="bg-white rounded-xl shadow-sm border p-2 md:p-4">E-Mail Liste</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DashboardPage;
