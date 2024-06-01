import { LinkCard } from "../_components/link-card";

const DashboardPage = () => {
	return (
		<div className="page-wrapper">
			<h2 className="text-md font-bold text-slate-700 mb-5">Dashboard</h2>
			<div className="grid grid-cols-2 gap-3 md:grid-cols-4">
				<div className="bg-white rounded shadow-sm border px-3 py-4">
					<h2 className="text-sm mb-2">Projekte</h2>
				</div>
				<div className="bg-white rounded shadow-sm border px-3 py-4">
					<h2 className="text-sm border-bottom">ToDo&apos;s</h2>
				</div>
				<LinkCard />
				<div className="bg-white rounded shadow-sm border px-3 py-4">
					<h2 className="text-sm border-bottom">News</h2>
				</div>
			</div>
		</div>
	);
};

export default DashboardPage;
