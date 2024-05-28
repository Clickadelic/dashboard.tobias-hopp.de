import { Button } from "@/components/ui/button";

const OverviewPage = () => {
	return (
		<div className="custom-grid">
			<div className="bg-white rounded-lg shadow-sm border px-3 py-2">
				<h2 className="text-sm mb-2">Projekte</h2>
				<button>Plus</button>
			</div>
			<div className="bg-white rounded-lg shadow-sm border px-3 py-2">
				<h2 className="text-sm border-bottom">ToDo&apos;s</h2>
			</div>
			<div className="bg-white rounded-lg shadow-sm border px-3 py-2">
				<h2 className="text-sm border-bottom">Links</h2>
				<button>Plus</button>
			</div>
			<div className="bg-white rounded-lg shadow-sm border px-3 py-2">
				<h2 className="text-sm border-bottom">News</h2>
			</div>
		</div>
	);
};

export default OverviewPage;
