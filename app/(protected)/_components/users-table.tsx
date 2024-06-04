"use client"

import { useTransition, useState, useEffect } from "react"

import { UserRow } from "./user-row"
export const UsersTable = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [users, setUsers] = useState<any[]>([])

	const fetchUsers = async () => {
		setIsLoading(true)
		try {
			await fetch("/api/users/").then(async res => {
				const response = await res.json()
				setUsers(response)
				setIsLoading(false)
			})
		} catch (error) {
			console.error("Error fetching users:", error)
		}
	}

	useEffect(() => {
		setIsLoading(true)
		fetchUsers()
		setIsLoading(false)
	}, [])

	return (
		<div className="flex flex-col">
			<div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
				<div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
					<div className="overflow-hidden">
						<table className="min-w-full text-left text-sm dark:text-white">
							<thead className="p-2">
								<tr>
									<td className="p-2">Id</td>
									<td className="p-2">Name</td>
									<td className="p-2">Benutzerrolle</td>
									<td className="p-2">Bearbeiten</td>
									<td className="p-2">Löschen</td>
								</tr>
							</thead>
							<tbody>
								{users.map(user => {
									return <UserRow key={user.id} user={user} />
								})}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	)
}
