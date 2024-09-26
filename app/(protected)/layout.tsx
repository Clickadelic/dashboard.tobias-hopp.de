import LayoutContext from "./layout-context"
import { getUserBackground } from "@/actions/upload"

interface ProtectedLayoutProps {
	children: React.ReactNode
}

const ProtectedLayout = async ({ children }: ProtectedLayoutProps) => {
	const userBackground = await getUserBackground()
	return (
		<div className="min-h-screen bg-mantis-background flex" style={{ backgroundImage: `url(${userBackground})` || "none", backgroundSize: "cover" }}>
			<LayoutContext>{children}</LayoutContext>
		</div>
	)
}

export default ProtectedLayout
