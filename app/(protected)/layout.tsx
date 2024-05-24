import Navbar from "@/app/(protected)/_components/navbar";

interface ProtectedLayoutProps {
	children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
	return (
		<div className="min-h-screen bg-slate-100">
			<Navbar />
			<main>{children}</main>
		</div>
	);
};

export default ProtectedLayout;
