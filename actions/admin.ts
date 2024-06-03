"use server";

import { currentRole } from "@/lib/auth";
import { UserRole } from "@prisma/client";

export const admin = async () => {
	const role = await currentRole();

	if (role === UserRole.ADMIN) {
		return { success: "Server Action Admin Powers." };
	}
	return { error: "Keine Berechtigung für diese Aktion." };
};
