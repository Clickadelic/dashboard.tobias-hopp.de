import LayoutContext from "./layout-context";

import { auth } from "@/auth";

import { getUserBackground } from "@/actions/user";

interface ProtectedLayoutProps {
	children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
	return (
		<div className="flex min-h-screen bg-mantis-background">
			<LayoutContext>{children}</LayoutContext>
		</div>
	);
};

export default ProtectedLayout;
