import Image from "next/image"
import Link from "next/link"
import logoSrc from "@/public/favicon.svg"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { cn } from "@/lib/utils"

import { La_Belle_Aurore } from "next/font/google"
const laBelleAurore = La_Belle_Aurore({ subsets: ["latin"], weight: ["400"] })

const Logo = () => {
	return (
		<h1>
			<Link href={DEFAULT_LOGIN_REDIRECT} className="flex justify-between mt-2 text-slate-900 hover:opacity-75">
				<Image src={logoSrc} width={16} height={16} className="logo inline -mt-1 size-8" alt="Tailwind Dashboard" />
				<span className="ml-2">
					<span className={cn("md:inline-block font-medium mr-1 text-xl", laBelleAurore.className)}>Toby&apos;s</span>
					<span className="md:inline-block font-bold">Dashboard</span>
				</span>
			</Link>
		</h1>
	)
}

export default Logo
