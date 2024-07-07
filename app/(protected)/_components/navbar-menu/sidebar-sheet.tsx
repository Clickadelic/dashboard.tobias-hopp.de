"use client"

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { GoGear } from "react-icons/go"
import { Button } from "@/components/ui/button"
import { BackgroundImageUploadForm } from "@/app/(protected)/_components/backround-image-upload"

export const SidebarSheet = () => {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="link" className="hover:bg-slate-200 size-10 p-3 rounded">
					<GoGear className="size-5" />
				</Button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader className="mb-5">
					<SheetTitle>Dashboard-Einstellungen</SheetTitle>
					<SheetDescription>Hintergrundbild, Logo und andere Einstellungen.</SheetDescription>
				</SheetHeader>
				<BackgroundImageUploadForm classNames="border-2 border-slate-300 border-dashed rounded-xl p-8" />
			</SheetContent>
		</Sheet>
	)
}
