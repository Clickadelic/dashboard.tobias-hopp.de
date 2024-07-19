import { UserProfileCard } from "@/components/cards/user-profile-card";

const ProfilePage = () => {
	return (
		<div className="page-wrapper">
			<h2 className="text-md font-bold text-slate-700 mb-5">Profil</h2>

			<UserProfileCard classNames="w-full mx-auto my-12" />
		</div>
	);
};

export default ProfilePage;
