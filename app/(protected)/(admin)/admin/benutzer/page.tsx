"use client"
import { useTransition, useState, useEffect } from "react"

const BenutzerPage = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [users, setUsers] = useState<any[]>([])

	const fetchUsers = async () => {
		setIsLoading(true)
		await fetch("/api/users/").then(async res => {
			const response = await res.json()
			setUsers(response)
		})
		setIsLoading(false)
	}

	useEffect(() => {
		setIsLoading(true)
		fetchUsers()
		setIsLoading(false)
	}, [])

	return (
		<div className="page-wrapper">
			<h2 className="text-md font-bold text-slate-700 mb-5">Benutzer</h2>
			<div className="bg-white rounded-sm shadow p-3">
				<table>
					<thead>
						<tr>
							<th>Id</th>
							<th>Name</th>
							<th>E-Mail verifiziert</th>
							<th>Rolle</th>
						</tr>
					</thead>
					<tbody>
						{isLoading ? (
							<tr>
								<td colSpan={4}>Loading</td>
							</tr>
						) : (
							users.map((user: any) => (
								<tr key={user.id}>
									<td>{user.id}</td>
									<td>{user.name}</td>
									<td>{user.emailVerified}</td>
									<td>{user.role}</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default BenutzerPage
