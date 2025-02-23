"use client";

import { useCurrentRole } from "@/hooks/use-current-role";
import { UserRole } from "@prisma/client";
import { FormError } from "@/components/forms/form-error";

interface RoleGateProps {
	children: React.ReactNode;
	allowedRole: UserRole;
}

export const RoleGate = ({ children, allowedRole }: RoleGateProps) => {
	const role = useCurrentRole();

	if (role !== allowedRole) {
		return <FormError message="Für diesen Bereich sind Admin-Rechte notwendig." />;
	}
	return <>{children}</>;
};
