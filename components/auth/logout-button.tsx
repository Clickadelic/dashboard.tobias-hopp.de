"use client";

import { logout } from "@/actions/logout";
import { ExitIcon } from "@radix-ui/react-icons";

interface LogoutButtonProps {
	children?: React.ReactNode;
}

export const LogoutButton = ({ children }: LogoutButtonProps) => {
	const onClick = () => {
		logout();
	};
	return (
		<button onClick={onClick} className="cursor-pointer">
			<ExitIcon className="size-4 mr-2" />
			{children}
		</button>
	);
};
