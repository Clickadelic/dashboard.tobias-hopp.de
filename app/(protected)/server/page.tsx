import { useCurrentUser } from "@/hooks/use-current-user";

const ServerPage = async () => {
	const user = await useCurrentUser();

	return <div className="text-white">{JSON.stringify(user)}</div>;
};

export default ServerPage;
