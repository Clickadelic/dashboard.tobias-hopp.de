import { FormUserProfile } from "@/components/forms/form-user-profile";

const ProfilePage = () => {
	return (
		<div className="page-wrapper">
			<h2 className="text-md font-bold text-slate-700 mb-5">Profil</h2>
			<FormUserProfile classNames="md:max-w-2xl mx-auto my-12 bg-white rounded-lg pb-12 border" />
		</div>
	);
};

export default ProfilePage;
