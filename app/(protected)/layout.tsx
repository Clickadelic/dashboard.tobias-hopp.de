import BreadcrumbNav from "./_components/breadcrumb-nav";
import { SidebarNavbar } from "./_components/sidebar-navbar";

interface ProtectedLayoutProps {
	children: React.ReactNode;
}

// TODO Redirect merken after Logout
const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
	return (
		<div className="min-h-screen bg-slate-100">
			<SidebarNavbar />
			<main className="pt-20 px-4 md:pl-72 md:pt-20 md:pr-8">
				<BreadcrumbNav />
				{children}
			</main>
		</div>
	);
};

export default ProtectedLayout;
