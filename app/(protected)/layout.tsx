import LayoutContext from "./layout-context"

import { auth } from "@/auth"

import { getUserBackground } from "@/actions/user"

interface ProtectedLayoutProps {
	children: React.ReactNode
}

const getCurrentUserBackground = async () => {
	const session = await auth()
	const user = session?.user
	const userId = user?.id
	const currentUserBackground = getUserBackground()
	return currentUserBackground
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
	const test = getCurrentUserBackground()

	console.log("ProtectedLayout", test)

	return (
		<div className="min-h-screen bg-mantis-background flex">
			<LayoutContext>{children}</LayoutContext>
		</div>
	)
}

export default ProtectedLayout
