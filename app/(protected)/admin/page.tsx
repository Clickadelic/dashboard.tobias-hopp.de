import { useCurrentUser } from "@/hooks/use-current-user";

const AdminPage = () => {
	const user = useCurrentUser();

	return (
		<div className="flex flex-col">
			<div>Admin Page:</div>
			<div>{JSON.stringify(user)}</div>
		</div>
	);
};

export default AdminPage;
