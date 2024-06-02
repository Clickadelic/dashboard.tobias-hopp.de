import { Poppins } from "next/font/google"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { La_Belle_Aurore } from "next/font/google"
import logoSrc from "@/public/favicon.svg"

const font = Poppins({
	subsets: ["latin"],
	weight: ["600"]
})

const laBelleAurore = La_Belle_Aurore({ subsets: ["latin"], weight: ["400"] })

interface HeaderProps {
	label: string
}

export const Header = ({ label }: HeaderProps) => {
	return (
		<div className="w-full flex flex-col gap-y-4 items-center justify-center">
			<h1 className={cn("text-xl font-semibold cursor-default", font.className)}>
				<Image src={logoSrc} width={48} height={48} className="mt-[-5px] inline mr-2" alt="Dashboard Icon" />
				<span className={cn("text-2xl font-semibold mr-2", laBelleAurore.className)}>Toby&apos;s</span>
				Dashboard
			</h1>
			<p className="text-muted-foreground text-sm">{label}</p>
		</div>
	)
}
