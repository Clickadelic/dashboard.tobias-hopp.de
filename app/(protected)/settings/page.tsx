"use client";

import { logout } from "@/actions/logout";
import { useCurrentUser } from "@/hooks/use-current-user";
import { UserInfo } from "@/components/user-info";

const SettingsPage = () => {
	const user = useCurrentUser();

	const onClick = () => {
		logout();
	};
	return (
		<div className="m-auto w-64 mt-12 flex flex-col justify-center">
			<div className="mb-3">
				<UserInfo user={user} label="Server Component" />
			</div>
			<button onClick={onClick} className="text-white p-2 bg-slate-600 rounded-sm hover:bg-slate-500">
				Logout
			</button>
		</div>
	);
};

export default SettingsPage;
