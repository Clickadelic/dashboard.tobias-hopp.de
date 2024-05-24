import { UserRole } from "@prisma/client";
import { RoleGate } from "@/components/auth/role-gate";
import { getUsers } from "@/actions/get-users";

const UsersPage = async () => {
	const users = await getUsers();
	return (
		<div>
			<RoleGate allowedRole={UserRole.ADMIN}>
				{users.map(user => {
					return <div key={user.id}>{user.name}</div>;
				})}
			</RoleGate>
		</div>
	);
};

export default UsersPage;
