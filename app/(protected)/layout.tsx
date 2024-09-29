import LayoutContext from "./layout-context"

interface ProtectedLayoutProps {
	children: React.ReactNode
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
	return (
		<div className="min-h-screen bg-mantis-background flex">
			<LayoutContext>{children}</LayoutContext>
		</div>
	)
}

export default ProtectedLayout
