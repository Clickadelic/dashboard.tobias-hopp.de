import Link from "next/link";
import { AiOutlineWindows } from "react-icons/ai";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { IoArrowForwardOutline } from "react-icons/io5";

import Image from "next/image";

import knifeSrc from "@/public/images/png/knife.png";

export const MegaMenu = () => {
	return (
		<DropdownMenu modal={false}>
			<DropdownMenuTrigger asChild>
				<Button variant="link" className="hover:bg-slate-100 size-10 p-3 rounded">
					<AiOutlineWindows className="size-5" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="md:w-[940px] min-h-[300px] grid md:grid-cols-4 gap-4 p-0 overflow-hidden md:mr-8">
				<div className="bg-mantis-primary bg-wave-pattern bg-cover p-8 flex flex-col w-[240px]">
					<h2 className="text-md font-bold text-white mb-3">Toby&apos;s Dashboard</h2>
					<p className="text-white text-sm mb-4">Das schweizer Taschen&shy;messer für Developer.</p>
					<Image src={knifeSrc} width={64} height={64} className="mx-auto my-4 bg-transparent rounded-lg" alt="Data Chart" />
					<Link href="/blog" className="flex justify-between text-white mt-4 rounded-sm hover:bg-white/30 p-4" title="Zum Blog">
						zum Blog
						<IoArrowForwardOutline className="ml-2 mt-1 inline" />
					</Link>
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
				<div className="p-8">
					<span className="block font-bold mb-4">Community</span>
					<ul className="list-disc ml-5">
						<li>
							<Link href="/blog" className="mb-2 block hover:text-slate-500">
								Blog
							</Link>
						</li>
						<li>
							<Link href="/community/benutzer" className="mb-2 block hover:text-slate-500" title="Zur Benutzerübersicht">
								Benutzer
							</Link>
						</li>
						<li>
							<Link href="#" className="mb-2 block hover:text-slate-500">
								Einladungen
							</Link>
						</li>
						<li>
							<Link href="#" className="mb-2 block hover:text-slate-500">
								Newsletter
							</Link>
						</li>
					</ul>
				</div>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
