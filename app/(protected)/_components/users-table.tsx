"use client"
import { getUsers } from "@/actions/get-users"

export const UsersTable = () => {
	const users = getUsers()
	console.log(users)
	return (
		<div className="flex flex-col">
			<div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
				<div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
					<div className="overflow-hidden">
						<table className="min-w-full text-left text-sm font-light text-surface dark:text-white">
							<thead className="p-2">
								<tr>
									<td className="p-2">Id</td>
									<td className="p-2">Name</td>
									<td className="p-2">E-Mail</td>
									<td className="p-2">Benutzerrolle</td>
									<td className="p-2">Bearbeiten</td>
									<td className="p-2">Löschen</td>
								</tr>
							</thead>
							<tbody>asd</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	)
}
