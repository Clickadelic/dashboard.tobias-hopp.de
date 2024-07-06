import Link from "next/link";
import { AiOutlineWindows } from "react-icons/ai";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export const MegaMenu = () => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="link" className="hover:bg-slate-200 size-10 p-3 rounded">
					<AiOutlineWindows className="size-5" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-[840px] grid md:grid-cols-4 gap-4 p-0 overflow-hidden md:mr-8">
				<div className="bg-mantis-primary bg-wave-pattern bg-cover p-6 flex flex-col">
					<h2 className="text-md font-bold text-white mb-3">Toby&apos;s Dashboard</h2>
					<p className="text-white text-sm mb-4">Management von Web-Projekten, Entwicklung und Reports.</p>
					<a className="text-slate-600 bg-slate-50 p-2 mt-5 rounded-md">About</a>
				</div>
				<div className="p-6">
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
				<div className="p-6">
					<span className="block font-bold mb-4">Empty Column</span>
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
				<div className="p-6">
					<span className="block font-bold mb-4">Empty Column</span>
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
