import { AdminLinkGrid } from "@/components/grids/admin-link-grid";

const AdminPage = () => {
	return (
		<div className="page-wrapper">
			<h2 className="text-md font-bold text-slate-700 mb-5">Admin</h2>
			<AdminLinkGrid />
		</div>
	);
};

export default AdminPage;
