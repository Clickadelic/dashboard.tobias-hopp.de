import { UserRole } from "@prisma/client";
import { RoleGate } from "@/components/auth/role-gate";

interface AdminLayoutWithRoleGateProps {
	children: React.ReactNode;
}

const AdminLayoutWithRoleGate = async ({ children }: AdminLayoutWithRoleGateProps) => {
	return <RoleGate allowedRole={UserRole.ADMIN}>{children}</RoleGate>;
};

export default AdminLayoutWithRoleGate;
