"use client";

import { RoleGate } from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/form-success";
import { UserRole } from "@prisma/client";
import { toast } from "sonner";
import { admin } from "@/actions/admin";

const AdminPage = () => {
	const onServerActionclick = () => {
		admin().then(data => {
			if (data.error) {
				toast.error(data.error);
			}

			if (data.success) {
				toast.success(data.success);
			}
		});
	};
	// TODO Investigate Functionality
	const onApiRouteClick = () => {
		fetch("/api/admin").then(response => {
			if (response.ok) {
				toast.success("Yes, you have admin.");
			} else {
				toast.error("No permissions to view admin content.");
				console.log("Error fetching Admin.");
			}
		});
	};
	return (
		<div className="bg-white rounded-md px-3 py-2 space-y-3">
			<h2 className="text-xl mb-3">Admin</h2>
			<RoleGate allowedRole={UserRole.ADMIN}>
				<FormSuccess message="Admin-Power aktiviert." />
			</RoleGate>
			<div className="flex justify-between rounded-lg border p-3">
				<p className="text-sm font-medium mt-1">Admin only API-Route.</p>
				<button onClick={onApiRouteClick} className="bg-slate-500 text-white rounded-sm p-1 px-2 text-sm">
					Click to test
				</button>
			</div>
			<div className="flex justify-between rounded-lg border p-3">
				<p className="text-sm font-medium mt-1">Admin only Server-Action.</p>
				<button onClick={onServerActionclick} className="bg-slate-500 text-white rounded-sm p-1 px-2 text-sm">
					Click to test
				</button>
			</div>
		</div>
	);
};

export default AdminPage;
