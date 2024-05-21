"use client";

import { useCurrentUser } from "@/hooks/use-current-user";

const ClientPage = () => {
	const user = useCurrentUser();

	return (
		<div className="flex flex-col">
			<div>Client Page:</div>
			<div>{JSON.stringify(user)}</div>
		</div>
	);
};

export default ClientPage;
