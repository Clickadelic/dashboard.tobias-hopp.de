import { AdminUploadGrid } from "@/components/grids/admin-upload-grid";

const AdminUploadsPage = () => {
	return (
		<div className="page-wrapper">
			<h2 className="text-md font-bold text-slate-700 mb-5">Uploads</h2>
			<div className="bg-white rounded-xl shadow p-2 md:p-4">
				<AdminUploadGrid />
			</div>
		</div>
	);
};

export default AdminUploadsPage;
