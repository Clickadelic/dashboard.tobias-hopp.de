import BreadcrumbNav from "./_components/breadcrumb-nav";
import { SidebarNavbar } from "./_components/sidebar-navbar";
import { CockpitDrawer } from "./_components/cockpit-drawer";

interface ProtectedLayoutProps {
	children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
	return (
		<div className="min-h-screen bg-mantis-background">
			<SidebarNavbar />
			<main className="md:ml-64">
				<div className="container pt-20">
					{/* <div className="pt-20">
						<BreadcrumbNav />
					</div> */}
					{children}
				</div>
			</main>
			<CockpitDrawer />
		</div>
	);
};

export default ProtectedLayout;
