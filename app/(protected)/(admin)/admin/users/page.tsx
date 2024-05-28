import { UsersTable } from "@/app/(protected)/_components/users-table"

const UsersPage = () => {
	return (
		<div className="bg-white rounded-md p-3">
			<h2 className="text-2xl mb-3">Benutzerübersicht</h2>
			<UsersTable />
		</div>
	)
}

export default UsersPage
