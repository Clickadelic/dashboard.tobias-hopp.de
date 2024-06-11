import { FormUserProfile } from "@/components/form-user-profile";

const SettingsPage = () => {
	return (
		<div className="page-wrapper">
			<h2 className="text-md font-bold text-slate-700 mb-5">Profil</h2>
			<div className="bg-white rounded shadow-sm border p-3">
				<FormUserProfile />
			</div>
		</div>
	);
};

export default SettingsPage;
