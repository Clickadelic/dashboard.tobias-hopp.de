"use client";

import { useCurrentUser } from "@/hooks/use-current-user";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import { FaUser } from "react-icons/fa";
import { ProfileImageUploadForm } from "./profile-image-upload-form";

export const UserProfile = () => {
	const user = useCurrentUser();
	console.log(user);
	return (
		<div className="bg-white/30 backdrop p-4 rounded-xl mb-5">
			<Avatar className="size-16 mb-3 mx-auto">
				<AvatarImage className="border border-slate-200" src={user?.profileImage || ""} alt="User Avatar" />
				<AvatarFallback className="bg-slate-200 border border-slate-300">
					<FaUser className="text-slate-400" />
				</AvatarFallback>
			</Avatar>
			<h3 className="text-lg font-bold text-slate-700 text-center">{user?.name}</h3>
			<h4 className="text-md font-light text-slate-500 text-center">{user?.email}</h4>
			<ProfileImageUploadForm />
		</div>
	);
};
