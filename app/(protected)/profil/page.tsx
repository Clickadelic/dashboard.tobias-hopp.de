import { UserProfileCard } from "../../../components/cards/user-profile-card"

const ProfilePage = () => {
	return (
		<div className="page-wrapper">
			<h2 className="text-md font-bold text-slate-700 mb-5">Profil</h2>
			<UserProfileCard classNames="bg-white/30 backdrop-blur p-2 md:p-4 rounded-xl mb-5 shadow-sm" />
		</div>
	)
}

export default ProfilePage
