import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { PlusCircledIcon } from "@radix-ui/react-icons"
import { IoMdClose } from "react-icons/io"

export const CockpitDrawer = () => {
	return (
		<Drawer>
			<DrawerTrigger asChild>
				<button className="absolute md:right-8 md:bottom-8 rounded-full bg-blue-600 text-white p-2 md:p-4 shadow-sm border border-slate-300 hover:bg-blue-500">
					<PlusCircledIcon className="size-6" />
				</button>
			</DrawerTrigger>
			<DrawerContent>
				<div className="mx-auto w-full max-w-sm">
					<DrawerHeader>
						<DrawerClose asChild>
							<Button variant="subtle" className="absolute top-3 right-3">
								<IoMdClose />
							</Button>
						</DrawerClose>
						<DrawerTitle>Editor</DrawerTitle>
						<DrawerDescription>Deine Schaltzentrale.</DrawerDescription>
					</DrawerHeader>
					<div className="container bg-red-100">
						<div className="flex items-center justify-between space-x-2"></div>
					</div>
					<DrawerFooter>
						<Button>Submit</Button>
					</DrawerFooter>
				</div>
			</DrawerContent>
		</Drawer>
	)
}
