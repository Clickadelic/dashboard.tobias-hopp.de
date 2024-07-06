"use client";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Button } from "@/components/ui/button";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { IoMdClose } from "react-icons/io";
import { useAppContext } from "@/context/app-context";

export const CockpitDrawer = () => {
	const { isToggled, setToggle } = useAppContext();
	return (
		<Drawer>
			<DrawerTrigger asChild>
				<button className="fixed right-8 bottom-8 text-white bg-primary rounded-full md:p-4 shadow-sm">
					<PlusCircledIcon className="size-6" />
				</button>
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
						<div className="flex items-center justify-between space-x-2">
							<Tabs defaultValue="account" className="w-[400px]">
								<TabsList>
									<TabsTrigger value="apps">Apps</TabsTrigger>
									<TabsTrigger value="password">Projekte</TabsTrigger>
								</TabsList>
								<TabsContent value="apps">Apps Form</TabsContent>
								<TabsContent value="password">Projekte Form</TabsContent>
							</Tabs>
						</div>
					</div>
					<DrawerFooter>
						<Button>Submit</Button>
					</DrawerFooter>
				</div>
			</DrawerContent>
		</Drawer>
	);
};
