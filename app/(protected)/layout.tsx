import LayoutContext from "./layout-context"
import { getUserBackground } from "@/actions/upload"

interface ProtectedLayoutProps {
	children: React.ReactNode
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
	const fetchPath = async () => {
		const imagePath = await getUserBackground()
	}

	const myPath = fetchPath()

	console.log("imagePath:", myPath)
	return (
		<div className="min-h-screen flex" style={{ backgroundImage: `url(${myPath})` }}>
			<LayoutContext>{children}</LayoutContext>
		</div>
	)
}

export default ProtectedLayout
