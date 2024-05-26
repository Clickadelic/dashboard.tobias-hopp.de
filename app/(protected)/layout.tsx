import Navbar from "@/app/(protected)/_components/navbar-auth";
import { SidebarNavbar } from "./_components/sidebar-navbar";

interface ProtectedLayoutProps {
	children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
	return (
		<div className="min-h-screen bg-slate-100">
			<SidebarNavbar />
			<main className="md:pl-72 md:pt-24">{children}</main>
		</div>
	);
};

export default ProtectedLayout;
