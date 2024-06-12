import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Button } from "../../../components/ui/button";
import { CiMail } from "react-icons/ci";

export const InboxButton = () => {
	return (
		<li>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="link" className="hover:bg-slate-200 mx-1 inline-flex p-3 rounded">
						<CiMail className="size-5" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-[800px]">
					<div className="w-800 grid grid-cols-4">
						<div>Grid</div>
						<div>Grid</div>
						<div>Grid</div>
						<div>Grid</div>
					</div>
				</DropdownMenuContent>
			</DropdownMenu>
		</li>
	);
};
