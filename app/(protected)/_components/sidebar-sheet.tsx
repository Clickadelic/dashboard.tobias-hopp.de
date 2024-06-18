"use client"

import { useAppContext } from "@/context/app-context"

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { GoGear } from "react-icons/go"
import { Button } from "@/components/ui/button"

export const SidebarSheet = () => {
	const { isToggled } = useAppContext()
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="link" className="hover:bg-slate-200 size-10 p-3 rounded">
					<GoGear className="size-5" />
				</Button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Dashboard-Einstellungen</SheetTitle>
					<SheetDescription>
						Hintergrundbild, Logo und andere Einstellungen.
						<div>
							<h2>Context Component</h2>
							<p>The toggle is: {isToggled ? "On" : "Off"}</p>
						</div>
					</SheetDescription>
				</SheetHeader>
			</SheetContent>
		</Sheet>
	)
}
