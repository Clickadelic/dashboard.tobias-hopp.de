import LayoutContext from "./layout-context"
import { getUserBackground } from "@/actions/upload"

interface ProtectedLayoutProps {
	children: React.ReactNode
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
	const fetchedBg = async () => {
		const userBackground = await getUserBackground()
		return userBackground
	}
	return (
		<div className="min-h-screen bg-mantis-background flex" style={{ backgroundImage: `url(${fetchedBg})` || "none", backgroundSize: "cover" }}>
			<LayoutContext>{children}</LayoutContext>
		</div>
	)
}

export default ProtectedLayout
