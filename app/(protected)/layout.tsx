import LayoutContext from "./layout-context"
import { getUserBackground } from "@/actions/upload"

interface ProtectedLayoutProps {
	children: React.ReactNode
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
	return (
		<div className="min-h-screen flex">
			<LayoutContext>{children}</LayoutContext>
		</div>
	)
}

export default ProtectedLayout
