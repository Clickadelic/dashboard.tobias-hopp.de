"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import { UserInfo } from "@/app/(protected)/(examples)/user-info";

const ClientPage = () => {
	const user = useCurrentUser();

	return (
		<div className="flex flex-col">
			<UserInfo label="Client Component" user={user} />
		</div>
	);
};

export default ClientPage;
