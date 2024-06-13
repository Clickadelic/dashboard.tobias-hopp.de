"use client"

import { useAppContext } from "@/context/app-context"

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { GoGear } from "react-icons/go"

export const SidebarSheet = () => {
	const { isToggled } = useAppContext()
	return (
		<Sheet>
			<SheetTrigger asChild>
				<button className="hover:bg-slate-200 inline-flex p-3 rounded mx-2">
					<GoGear className="size-5" />
				</button>
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
