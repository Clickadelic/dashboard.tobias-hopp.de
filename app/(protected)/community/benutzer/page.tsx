import { UserList } from "@/components/lists/user-list";

const CommunityUsersPage = () => {
	return (
		<div className="page-wrapper">
			<h2 className="text-md font-bold text-slate-700 mb-5">Angemeldete Benutzer - Community</h2>
			<div className="bg-white rounded-xl shadow-sm border p-2 md:p-4">
				<div className="rounded-xl shadow-sm p-4">
					<UserList />
				</div>
			</div>
		</div>
	);
};

export default CommunityUsersPage;
