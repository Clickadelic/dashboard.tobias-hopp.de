"use client"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"

import { Button } from "@/components/ui/button"
import { IoMdClose } from "react-icons/io"
import { BsChatRightText } from "react-icons/bs"
export const Cockpit = () => {
	return (
		<Drawer>
			<DrawerTrigger className="fixed bottom-0 w-full">
				<div className="w-40 bg-black text-white p-2 rounded-tl-lg rounded-tr-lg mx-auto hover:bg-black/90">
					<BsChatRightText className="inline-block mr-2 mt-[-3px]" /> Ai-Cockpit
				</div>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader>
					<DrawerClose asChild>
						<Button variant="subtle" className="absolute top-3 right-3">
							<IoMdClose />
						</Button>
					</DrawerClose>
					<DrawerTitle>Chat GPT</DrawerTitle>
					<DrawerDescription>Deine Schaltzentrale</DrawerDescription>
				</DrawerHeader>
				<div className="min-h-[500px]">
					<div className="flex items-center justify-between space-x-2">Cockpit content</div>
				</div>
				<DrawerFooter>
					<Button>Submit</Button>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	)
}
