"use client"

import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { UserButton } from "@/components/auth/user-button"

const Navbar = () => {
	const pathname = usePathname()

	return (
		<nav className="flex flex-row items-center justify-between p-4 bg-slate-800 space-x-2 mb-4 w-[600px] rounded-xl shadow-sm m-auto">
			<span className="space-x-3">
				<Button asChild variant={pathname === "/server" ? "default" : "outline"}>
					<Link href="/server" className="p-2">
						Server
					</Link>
				</Button>
				<Button asChild variant={pathname === "/client" ? "default" : "outline"}>
					<Link href="/client" className="p-2">
						Client
					</Link>
				</Button>
				<Button asChild variant={pathname === "/admin" ? "default" : "outline"}>
					<Link href="/admin" className="p-2">
						Admin
					</Link>
				</Button>
				<Button asChild variant={pathname === "/settings" ? "default" : "outline"}>
					<Link href="/settings" className="p-2">
						Settings
					</Link>
				</Button>
			</span>
			<UserButton />
		</nav>
	)
}

export default Navbar
