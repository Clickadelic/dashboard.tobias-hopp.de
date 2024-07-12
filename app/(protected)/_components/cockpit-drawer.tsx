"use client";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";

import { Button } from "@/components/ui/button";
import { IoMdClose } from "react-icons/io";
import { useAppContext } from "@/context/app-context";

export const CockpitDrawer = () => {
	const { isToggled, setToggle } = useAppContext();

	return (
		<Drawer>
			<DrawerTrigger className="fixed bottom-0 w-full">
				<div className="w-48 bg-black text-white px-4 py-2 rounded-tl-lg rounded-tr-lg mx-auto hover:bg-black/90">Cockpit</div>
			</DrawerTrigger>
			<DrawerContent>
				<div className="container mx-auto">
					<DrawerHeader>
						<DrawerClose asChild>
							<Button variant="subtle" className="absolute top-3 right-3">
								<IoMdClose />
							</Button>
						</DrawerClose>
						<DrawerTitle>Editor</DrawerTitle>
						<DrawerDescription>Deine Schaltzentrale</DrawerDescription>
					</DrawerHeader>
					<div className="container min-h-[500px]">
						<div className="flex items-center justify-between space-x-2">Cockpit content</div>
					</div>
					<DrawerFooter>
						<Button>Submit</Button>
					</DrawerFooter>
				</div>
			</DrawerContent>
		</Drawer>
	);
};
