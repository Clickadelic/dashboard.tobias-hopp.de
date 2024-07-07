import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { Button } from "@/components/ui/button"
import { PiTranslate } from "react-icons/pi"
import Link from "next/link"

export const LanguagesButton = () => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="link" className="hover:bg-slate-200 size-10 p-3 rounded">
					<PiTranslate className="size-5" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-[200px] p-3 overflow-hidden bg-white rounded-sm shadow-sm border">
				<ul className="space-y-3">
					<li>
						<Link href="/dashboard" className="mb-2 block hover:text-slate-500" target="_blank">
							Deutsch
						</Link>
					</li>
					<li>
						<Link href="/dashboard" className=" block hover:text-slate-500" target="_blank">
							Englisch
						</Link>
					</li>
				</ul>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
