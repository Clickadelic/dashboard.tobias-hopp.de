"use client";

import { RoleGate } from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/forms/form-success";
import { UserRole } from "@prisma/client";

import { BackgroundImageUploadForm } from "@/app/(protected)/_components/backround-image-upload";
const SystemPage = () => {
	return (
		<div className="page-wrapper">
			<h2 className="text-md font-bold text-slate-700 mb-5">Login Background</h2>
			<div className="bg-white rounded-xl shadow-sm border p-2 md:p-4 space-y-3">
				<BackgroundImageUploadForm />
			</div>
		</div>
	);
};

export default SystemPage;
