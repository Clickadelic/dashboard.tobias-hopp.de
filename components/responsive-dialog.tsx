import * as React from "react";

import { useMediaQuery } from "@/hooks/use-media-query";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";

interface ResponsiveDialogProps {
	icon: React.ReactNode;
	title: string;
	description?: string;
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	children: React.ReactNode;
}

export const ResponsiveDialog = ({ icon, title, description, isOpen, setIsOpen, children }: ResponsiveDialogProps) => {
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
			</DrawerContent>
		</Drawer>
	);
};
