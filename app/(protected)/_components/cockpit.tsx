"use client"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"

import { Button } from "@/components/ui/button"
import { IoMdClose } from "react-icons/io"
import { BsChatRightText } from "react-icons/bs"
import { BsSend } from "react-icons/bs"

export const Cockpit = () => {
	return (
		<Drawer>
			<DrawerTrigger className="fixed bottom-[-26px] hover:bottom-0 transition-all w-full">
				<div className="w-32 bg-mantis-primary hover:bg-mantis-primary/90 text-white text-sm p-1 py-2 rounded-tl-lg rounded-tr-lg mx-auto">
					<BsChatRightText className="inline-block mr-2 mt-[-1px]" /> Ai-Cockpit
				</div>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerClose asChild>
					<Button variant="subtle" className="absolute top-3 right-3">
						<IoMdClose />
					</Button>
				</DrawerClose>
				<DrawerHeader className="container mx-auto">
					<DrawerTitle>
						<BsChatRightText className="inline-block mr-2 mt-[-3px]" /> Chat GPT
					</DrawerTitle>
					<DrawerDescription>Frag&apos; die k&uuml;nstliche Intelligenz</DrawerDescription>
				</DrawerHeader>
				<div className="min-h-[500px] container mx-auto">
					<div className="flex items-center justify-between space-x-2">ChatGPTs antwort</div>
				</div>
				<DrawerFooter className="container mx-auto mb-12">
					<form className="w-full flex justify-between">
						<span className="rounded-tl-full rounded-bl-full border border-r-0 p-2">
							<BsChatRightText className="mt-2 ml-3 inline-block text-slate-500" />
						</span>
						<input type="text" placeholder="Deine Frage an ChatGPT..." className="border-l-0 border-r-0 w-full border p-3" />
						<button type="submit" aria-label="ChatGPT öffnen" className="rounded-tr-full rounded-br-full border border-l-0 p-2">
							<BsSend className="inline-block mx-3" />
						</button>
					</form>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	)
}
