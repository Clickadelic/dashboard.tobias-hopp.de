import NavbarPublic from "./_components/navbar-public";

interface PublicLayoutProps {
	children: React.ReactNode;
}

const PublicLayout = ({ children }: PublicLayoutProps) => {
	return (
		<div className="min-h-screen bg-slate-100">
			<NavbarPublic />
			<main className="container-md m-auto">{children}</main>
		</div>
	);
};

export default PublicLayout;
