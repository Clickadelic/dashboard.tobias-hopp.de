import { BsTrash } from "react-icons/bs"

export const UserRow = (user: any) => {
	console.log("User Row:", user)
	return (
		<tr key={user.id}>
			<td className="p-2">{user.id}</td>
			<td className="p-2">{user.name}</td>

			<td className="p-2">{user.role}</td>
			<td className="p-2">
				<button className="btn btn-primary btn-sm">
					<BsTrash />
				</button>
			</td>
			<td className="p-2">
				<button className="btn btn-error btn-sm">
					<BsTrash />
				</button>
			</td>
		</tr>
	)
}
