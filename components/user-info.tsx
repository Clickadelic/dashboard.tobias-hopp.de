import { ExtendedUser } from "@/next-auth";
import { Card, CardHeader } from "@/components/ui/card";

interface UserInterfaceProps {
	user?: ExtendedUser;
	label: string;
}

export const UserInfo = ({ user, label }: UserInterfaceProps) => {
	return (
		<Card>
			<CardHeader>
				<p className="font-semibold text-center">{label}</p>
			</CardHeader>
		</Card>
	);
};
