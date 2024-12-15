import * as React from "react";

import { useMediaQuery } from "@/hooks/use-media-query";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerDescription, DrawerTitle } from "@/components/ui/drawer";

interface ResponsiveDialogProps {
	icon: React.ReactNode;
	title: string;
	editTitle?: string;
	description?: string;
	editDescription?: string;

	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	isEditMode?: boolean;
	setIsEditMode?: React.Dispatch<React.SetStateAction<boolean>>;

	children: React.ReactNode;
}

export const ResponsiveDialog = ({ icon, title, description, isOpen, setIsOpen, isEditMode, setIsEditMode, editTitle, editDescription, children }: ResponsiveDialogProps) => {
	const isDesktop = useMediaQuery("(min-width: 768px)");

	if (isDesktop) {
		return (
			<Dialog open={isOpen} onOpenChange={setIsOpen}>
				{isEditMode ? (
					<DialogContent>
						<DialogHeader>
							<DialogTitle className="flex">
								<span className="mr-2">{icon}</span>
								<span>{editTitle}</span>
							</DialogTitle>
							{editDescription && <DialogDescription>{editDescription}</DialogDescription>}
						</DialogHeader>
						{children}
					</DialogContent>
				) : (
					<DialogContent>
						<DialogHeader>
							<DialogTitle className="flex">
								<span className="mr-2">{icon}</span>
								<span>{title}</span>
							</DialogTitle>
							{description && <DialogDescription>{description}</DialogDescription>}
						</DialogHeader>
						{children}
					</DialogContent>
				)}
			</Dialog>
		);
	}

	return (
		<Drawer open={isOpen} onOpenChange={setIsOpen}>
			{isEditMode ? (
				<DrawerContent>
					<DrawerHeader>
						<DrawerTitle className="flex">
							<span className="mr-2">{icon}</span>
							<span>{editTitle}</span>
						</DrawerTitle>
						{editDescription && <DrawerDescription>{editDescription}</DrawerDescription>}
					</DrawerHeader>
					{children}
				</DrawerContent>
			) : (
				<DrawerContent>
					<DrawerHeader>
						<DrawerTitle className="flex">
							<span className="mr-2">{icon}</span>
							<span>{title}</span>
						</DrawerTitle>
						{description && <DrawerDescription>{description}</DrawerDescription>}
					</DrawerHeader>
					{children}
				</DrawerContent>
			)}
		</Drawer>
	);
};
