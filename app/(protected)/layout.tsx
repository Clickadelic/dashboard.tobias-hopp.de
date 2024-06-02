import BreadcrumbNav from "./_components/breadcrumb-nav"
import { SidebarNavbar } from "./_components/sidebar-navbar"
import { CockpitDrawer } from "./_components/cockpit-drawer"

interface ProtectedLayoutProps {
	children: React.ReactNode
}

// TODO Redirect merken after Logout
const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
	return (
		<div className="min-h-screen bg-[#fafafb]">
			<SidebarNavbar />
			<div className="pt-20 ml-4 md:ml-72 md:pt-20 md:pr-8">
				<BreadcrumbNav />
			</div>
			<main className="md:ml-64">
				<div className="container">{children}</div>
			</main>
			<CockpitDrawer />
		</div>
	)
}

export default ProtectedLayout
