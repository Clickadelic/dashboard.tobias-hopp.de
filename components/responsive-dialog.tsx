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
	isEditing?: boolean;
	setIsEditing?: React.Dispatch<React.SetStateAction<boolean>>;

	children: React.ReactNode;
}

export const ResponsiveDialog = ({ icon, title, description, isOpen, setIsOpen, isEditing, setIsEditing, editTitle, editDescription, children }: ResponsiveDialogProps) => {
	const isDesktop = useMediaQuery("(min-width: 768px)");

	if (isDesktop) {
		return (
			<Dialog open={isOpen} onOpenChange={setIsOpen}>
				{isEditing ? (
					<DialogContent>
						<DialogHeader>
							<DialogTitle>
								<span className="inline mr-2">{icon}</span> {editTitle}
							</DialogTitle>
							{editDescription && <DialogDescription>{editDescription}</DialogDescription>}
						</DialogHeader>
						{children}
					</DialogContent>
				) : (
					<DialogContent>
						<DialogHeader>
							<DialogTitle>
								{icon} {title}
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
			{isEditing ? (
				<DrawerContent>
					<DrawerHeader>
						<DrawerTitle>
							<span className="inline mr-2">{icon}</span> {editTitle}
						</DrawerTitle>
						{editDescription && <DrawerDescription>{editDescription}</DrawerDescription>}
					</DrawerHeader>
					{children}
				</DrawerContent>
			) : (
				<DrawerContent>
					<DrawerHeader>
						<DrawerTitle>
							{icon} {title}
						</DrawerTitle>
						{description && <DrawerDescription>{description}</DrawerDescription>}
					</DrawerHeader>
					{children}
				</DrawerContent>
			)}
		</Drawer>
	);
};
