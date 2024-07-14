import { UserProfileCard } from "@/components/cards/user-profile-card";

const ProfilePage = () => {
	return (
		<div className="page-wrapper">
			<h2 className="text-md font-bold text-slate-700 mb-5">Profil</h2>
			<div className="bg-white rounded-xl shadow-sm border p-2 md:p-4">
				<UserProfileCard classNames="md:max-w-3xl mx-auto my-12" />
			</div>
		</div>
	);
};

export default ProfilePage;
