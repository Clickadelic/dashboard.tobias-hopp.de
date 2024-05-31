import BreadcrumbNav from "./_components/breadcrumb-nav"
import { SidebarNavbar } from "./_components/sidebar-navbar"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { PlusCircledIcon } from "@radix-ui/react-icons"
import { IoMdClose } from "react-icons/io"

interface ProtectedLayoutProps {
	children: React.ReactNode
}

// TODO Redirect merken after Logout
const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
	return (
		<div className="min-h-screen bg-slate-100">
			<SidebarNavbar />
			<main className="pt-20 px-4 md:pl-72 md:pt-20 md:pr-8">
				<BreadcrumbNav />
				{children}
			</main>
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
							<DrawerTitle>Cockpit</DrawerTitle>
							<DrawerDescription>Deine Schaltzentrale.</DrawerDescription>
						</DrawerHeader>
						<div className="p-4 pb-0">
							<div className="flex items-center justify-center space-x-2">
								<Button variant="outline" size="icon" className="h-8 w-8 shrink-0 rounded-full">
									Minus
									<span className="sr-only">Decrease</span>
								</Button>
								<div className="flex-1 text-center">
									<div className="text-7xl font-bold tracking-tighter">Text</div>
									<div className="text-[0.70rem] uppercase text-muted-foreground">Calories/day</div>
								</div>
								<Button variant="outline" size="icon" className="h-8 w-8 shrink-0 rounded-full">
									Plus
									<span className="sr-only">Increase</span>
								</Button>
							</div>
							<div className="mt-3 h-[120px]"></div>
						</div>
						<DrawerFooter>
							<Button>Submit</Button>
						</DrawerFooter>
					</div>
				</DrawerContent>
			</Drawer>
		</div>
	)
}

export default ProtectedLayout
