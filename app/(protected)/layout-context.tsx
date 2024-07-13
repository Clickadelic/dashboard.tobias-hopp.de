"use client"

import { useAppContext } from "@/context/app-context"

import { SidebarNavbar } from "./_components/sidebar-navbar"
import { Cockpit } from "./_components/cockpit"
import { CircularMenu } from "./_components/circular-menu"
import { cn } from "@/lib/utils"

interface LayoutContextProps {
	children: React.ReactNode
}

const LayoutContext = ({ children }: LayoutContextProps) => {
	const { isToggled } = useAppContext()
	return (
		<>
			<SidebarNavbar />
			<main className={cn("flex-1 transition-all duration-300 ease-in-out", isToggled ? "md:ml-16" : "md:ml-64")}>
				<div className="container pt-20">{children}</div>
			</main>
			<Cockpit />
			<CircularMenu />
		</>
	)
}

export default LayoutContext
