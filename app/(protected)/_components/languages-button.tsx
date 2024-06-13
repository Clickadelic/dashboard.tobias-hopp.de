import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { Button } from "../../../components/ui/button"
import { PiTranslate } from "react-icons/pi"

export const LanguagesButton = () => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="link" className="hover:bg-slate-200 mx-1 inline-flex p-3 rounded">
					<PiTranslate className="size-5" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-[200px]">
				<div className="grid grid-cols-2">
					<div className="p-2">Grid</div>
					<div className="p-2">Grid</div>
				</div>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
