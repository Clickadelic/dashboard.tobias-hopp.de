import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { Button } from "../../../components/ui/button"

import { IoIosNotificationsOutline } from "react-icons/io"

export const NotificationsButton = () => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="link" className="hover:bg-slate-200 mx-1 inline-flex p-3 rounded">
					<IoIosNotificationsOutline className="size-5" />
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
