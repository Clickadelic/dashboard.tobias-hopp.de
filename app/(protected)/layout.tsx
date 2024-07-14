import LayoutContext from "./layout-context";

interface ProtectedLayoutProps {
	children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
	return (
		<div className="min-h-screen bg-slate-50 flex">
			<LayoutContext>{children}</LayoutContext>
		</div>
	);
};

export default ProtectedLayout;
