import LayoutContext from "./layout-context"
import { getUserBackground } from "@/actions/upload"

interface ProtectedLayoutProps {
	children: React.ReactNode
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
	const imagePath = getUserBackground()
	console.log("imagePath:", imagePath)
	return (
		<div className="min-h-screen flex" style={{ backgroundImage: `url(${imagePath})` }}>
			<LayoutContext>{children}</LayoutContext>
		</div>
	)
}

export default ProtectedLayout
