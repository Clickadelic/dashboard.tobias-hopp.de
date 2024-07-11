import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { IoIosNotificationsOutline } from "react-icons/io";

export const NotificationsButton = () => {
	return (
		<DropdownMenu modal={false}>
			<DropdownMenuTrigger asChild>
				<Button variant="link" className="hover:bg-slate-200 size-10 p-3 rounded">
					<IoIosNotificationsOutline className="size-5" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-[200px] p-3 overflow-hidden bg-white rounded-sm shadow-sm border">
				<span className="block font-medium mb-4">Alerts</span>
				<ul className="space-x-3">
					<li>List item</li>
				</ul>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
