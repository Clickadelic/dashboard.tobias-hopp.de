"use client"

import { useCurrentUser } from "@/hooks/use-current-user"
import { UserRole } from "@prisma/client"
import { RoleGate } from "@/components/auth/role-gate"

const UsersPage = () => {
	const user = useCurrentUser()

	return (
		<div>
			<RoleGate allowedRole={UserRole.ADMIN}>Super Secret Admin Content</RoleGate>
		</div>
	)
}

export default UsersPage
