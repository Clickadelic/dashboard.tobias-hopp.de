import { ClickableCard } from "@/components/cards/clickable/clickable-card";

import { FiUploadCloud } from "react-icons/fi";
import { BsHouseGear } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";

const AdminPage = () => {
	return (
		<div className="page-wrapper">
			<h2 className="text-md font-bold text-slate-700 mb-5">Admin</h2>
			<div className="grid grid-cols-2 md:grid-cols-4 gap-3">
				<ClickableCard href="/admin/benutzer" icon={<FiUsers className="size-10 mb-3" />} label="Benutzer" description="Verwalte registrierte Benutzer" />
				<ClickableCard href="/admin/uploads" icon={<FiUploadCloud className="size-10 mb-3" />} label="Uploads" description="Uploadverwaltung des Vercel Blobs" />
				<ClickableCard href="/admin/systemeinstellungen" icon={<BsHouseGear className="size-10 mb-3" />} label="Systemeinstellungen" description="Systemeinstellungen des Dashboards" />
			</div>
		</div>
	);
};

export default AdminPage;
