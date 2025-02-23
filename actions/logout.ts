"use server";

import { signOut } from "@/auth";

export const logout = async () => {
	// Server Stuff here before logout
	await signOut({ redirect: true, redirectTo: "/auth/login" });
};
