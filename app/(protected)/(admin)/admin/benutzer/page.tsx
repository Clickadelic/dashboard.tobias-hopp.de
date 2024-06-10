import UsersTable from "@/app/(protected)/_components/tables/users-table";

const BenutzerPage = () => {
	return (
		<div className="page-wrapper">
			<h2 className="text-md font-bold text-slate-700 mb-5">Benutzer</h2>
			<div className="bg-white rounded-xl shadow p-3">
				<UsersTable />
			</div>
		</div>
	);
};

export default BenutzerPage;
