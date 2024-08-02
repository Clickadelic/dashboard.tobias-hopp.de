import * as React from "react";

import { useMediaQuery } from "@/hooks/use-media-query";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@radix-ui/react-dialog";

interface ResponsiveDialogProps {
	icon: React.ReactNode;
	title: string;
	description?: string;
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	children: React.ReactNode;
}

export const ResponsiveDialog = ({ children, isOpen, setIsOpen, title, description, icon }: ResponsiveDialogProps) => {
	const isDesktop = useMediaQuery("(min-width: 768px)");

	if (isDesktop) {
		return (
			<Dialog open={isOpen} onOpenChange={setIsOpen}>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle className="flex flex-start">
							{icon && <span className="inline mr-2 size-4">{icon}</span>}
							{title}
						</DialogTitle>
						{description && <DialogDescription>{description}</DialogDescription>}
					</DialogHeader>
					{children}
					<DialogClose>
						<Button variant="outline" className="w-full">
							abbrechen
						</Button>
					</DialogClose>
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<Drawer open={isOpen} onOpenChange={setIsOpen}>
			<DrawerContent>
				<DrawerHeader className="text-left">
					<DrawerTitle>{title}</DrawerTitle>
					{description && <DialogDescription>{description}</DialogDescription>}
				</DrawerHeader>
				{children}
				<DrawerFooter className="pt-2">
					<DrawerClose asChild>
						<Button variant="outline">abbrechen</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
};
