import { UserList } from "@/components/lists/user-list"

const CommunityUsersPage = () => {
	return (
		<div className="page-wrapper">
			<h2 className="mb-5 font-bold text-md text-slate-700">Angemeldete Benutzer - Community</h2>
			<div className="p-2 bg-white border shadow-sm rounded-xl md:p-4">
				<UserList />
			</div>
		</div>
	)
}

export default CommunityUsersPage
