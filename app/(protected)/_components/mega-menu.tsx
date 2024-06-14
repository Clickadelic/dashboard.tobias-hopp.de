import Link from "next/link";
import { AiOutlineWindows } from "react-icons/ai";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export const MegaMenu = () => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="link" className="hover:bg-slate-200 inline-flex p-3 rounded">
					<AiOutlineWindows className="size-5" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-[800px] grid md:grid-cols-4 gap-4 p-0 overflow-hidden">
				<div className="gradient bg-sky-500 p-8 flex flex-col">
					<h2 className="text-md font-bold text-slate-700 mb-3">Dashboard</h2>
					<p className="text-white mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, quod.</p>
					<a className="text-slate-600 bg-slate-50 p-2 mt-5 rounded-md">View</a>
				</div>
				<div className="p-8">
					<h3 className="text-md font-bold mb-3">Empty Column</h3>
					<ul className="list-disc ml-5">
						<li>
							<Link href="#" className="mb-2 block hover:text-slate-500" target="_blank">
								Empty Slot
							</Link>
						</li>
						<li>
							<Link href="#" className="mb-2 block hover:text-slate-500" target="_blank">
								Empty Slot
							</Link>
						</li>
						<li>
							<Link href="#" className="mb-2 block hover:text-slate-500" target="_blank">
								Empty Slot
							</Link>
						</li>
						<li>
							<Link href="#" className="mb-2 block hover:text-slate-500" target="_blank">
								Empty Slot
							</Link>
						</li>
					</ul>
				</div>
				<div className="p-8">
					<span className="block font-medium mb-4">Empty Column</span>
					<ul className="list-disc ml-5">
						<li>
							<Link href="#" className="mb-2 block hover:text-slate-500" target="_blank">
								Empty Slot
							</Link>
						</li>
						<li>
							<Link href="#" className="mb-2 block hover:text-slate-500" target="_blank">
								Empty Slot
							</Link>
						</li>
						<li>
							<Link href="#" className="mb-2 block hover:text-slate-500" target="_blank">
								Empty Slot
							</Link>
						</li>
					</ul>
				</div>
				<div className="p-8">
					<span className="block font-medium mb-4">Empty Column</span>
					<ul className="list-disc ml-5">
						<li>
							<Link href="#" className="mb-2 block hover:text-slate-500">
								Empty Slot
							</Link>
						</li>
						<li>
							<Link href="#" className="mb-2 block hover:text-slate-500" target="_blank">
								Empty Slot
							</Link>
						</li>
						<li>
							<Link href="#" className="mb-2 block hover:text-slate-500" target="_blank">
								Empty Slot
							</Link>
						</li>
						<li>
							<Link href="#" className="mb-2 block hover:text-slate-500" target="_blank">
								Empty Slot
							</Link>
						</li>
					</ul>
				</div>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
