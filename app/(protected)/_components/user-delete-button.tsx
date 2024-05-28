"use client"
import { deleteUserByUserId } from "@/actions/delete-user"
import { toast } from "sonner"

export const UserDeleteButton = (userId: any) => {
	const deleteUser = () => {
		const result = deleteUserByUserId(userId)
		console.log(result)
	}

	return <button onClick={deleteUser}>Delete</button>
}
