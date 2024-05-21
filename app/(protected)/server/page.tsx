"use server";
import { auth } from "@/auth";
import { UserInfo } from "@/components/user-info";
const ServerPage = async () => {
	const session = await auth();
	return (
		<div className="flex flex-col">
			<div>Server Page:</div>
			<div>{JSON.stringify(session?.user)}</div>
			<br />
			<UserInfo user={session?.user} label="Whatever" />
		</div>
	);
};

export default ServerPage;
