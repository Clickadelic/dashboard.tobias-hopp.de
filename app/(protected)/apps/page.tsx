import { AppBar } from "../_components/app-bar";

const AppsPage = () => {
	return (
		<div className="page-wrapper">
			<h2 className="text-md font-bold text-slate-700 mb-5">Apps</h2>
			<div className="bg-white rounded-xl shadow-sm border p-2 md:p-4">
				<p>Die Anzahl an Apps, welche man hinzufügen kann, ist aktuell unbegrenzt. Auf dem Handy werden die Apps nicht angezeigt (aus Platzgründen).</p>
				<hr className="my-3" />
				<AppBar />
			</div>
		</div>
	);
};

export default AppsPage;
