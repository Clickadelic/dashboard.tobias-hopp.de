import { FormUserProfile } from "@/components/form-user-profile";
import { UserProfile } from "../_components/user-profile";
const SettingsPage = () => {
	return (
		<div className="page-wrapper">
			<h2 className="text-md font-bold text-slate-700 mb-5">Profil</h2>
			<UserProfile />
			<div className="bg-white rounded-xl shadow-sm border p-2 md:p-4">
				<FormUserProfile />
			</div>
		</div>
	);
};

export default SettingsPage;
