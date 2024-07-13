"use server";
import { auth } from "@/auth";
import { UserInfo } from "@/app/(protected)/(examples)/user-info";

const ServerPage = async () => {
	const session = await auth();
	return (
		<div className="flex flex-col">
			<UserInfo label="Server Component" user={session?.user} />
		</div>
	);
};

export default ServerPage;
