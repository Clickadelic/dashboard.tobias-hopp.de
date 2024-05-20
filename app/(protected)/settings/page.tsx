"use client";

import { logout } from "@/actions/logout";
import { useCurrentUser } from "@/hooks/use-current-user";

const SettingsPage = () => {
	const user = useCurrentUser();

	const onClick = () => {
		logout();
	};
	return (
		<div className="m-auto w-32 mt-12">
			<button onClick={onClick} className="text-white p-2 bg-slate-600 rounded-sm hover:bg-slate-500">
				Logout
			</button>
		</div>
	);
};

export default SettingsPage;
