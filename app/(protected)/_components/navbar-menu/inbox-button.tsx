import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { CiMail } from "react-icons/ci";

export const InboxButton = () => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="link" className="hover:bg-slate-200 size-10 p-3 rounded">
					<CiMail className="size-5" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-[200px] grid md:grid-cols-2 bg-slate-200">
				<div className="p-8">
					<h2 className="text-md font-bold text-white mb-3">Inbox</h2>
					<p className="text-white text-sm mb-4">Management von Web-Projekten, Entwicklung und Reports.</p>
					<a className="text-slate-600 bg-slate-50 p-2 mt-5 rounded-md">About</a>
				</div>
				<div className="p-8">
					<h3 className="text-md font-bold mb-3">Empty Column</h3>
					<ul className="list-disc ml-5">
						<li>Inbox Items</li>
						<li>Inbox Items</li>
						<li>Inbox Items</li>
						<li>Inbox Items</li>
						<li>Inbox Items</li>
					</ul>
				</div>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
