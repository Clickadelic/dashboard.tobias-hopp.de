"use client";
import { useCurrentUser } from "@/hooks/use-current-user";
import { UserInfo } from "@/components/user-info";

const AdminPage = () => {
	const user = useCurrentUser();

	return (
		<div className="flex flex-col">
			<UserInfo label="Admin Component (Client)" user={user} />
		</div>
	);
};

export default AdminPage;
