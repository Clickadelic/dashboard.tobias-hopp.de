import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState, useEffect, useTransition } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";

import Image from "next/image";
import Link from "next/link";

import { AppSchema } from "@/schemas";

import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { toast } from "sonner";

import { BsBuildings } from "react-icons/bs";
import { BsListCheck } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import { GoLink } from "react-icons/go";
import { FiPlus } from "react-icons/fi";

import { FormProject } from "@/components/forms/form-project";
import { FormNotice } from "@/components/forms/form-notice";
import { FormTodo } from "@/components/forms/form-todo";
import { FormLink } from "@/components/forms/form-link";

import { cn } from "@/lib/utils";
export const CircularMenu = () => {
	const { status } = useSession({ required: true });
	const [showMenu, setShowMenu] = useState<boolean>(false);

	const [isProjectDialogOpen, setIsProjectDialogOpen] = useState<boolean>(false);
	const [isTodoDialogOpen, setIsTodoDialogOpen] = useState<boolean>(false);
	const [isNoticeDialogOpen, setIsNoticeDialogOpen] = useState<boolean>(false);
	const [isLinkDialogOpen, setIsLinkDialogOpen] = useState<boolean>(false);

	return (
		<div className="fixed right-4 bottom-4 md:bottom-8 md:right-8 max-w-12 shadow-sm">
			<div className={cn("absolute -top-48 left-1 flex justify-center space-y-2", showMenu ? "block" : "hidden")}>
				<Dialog open={isTodoDialogOpen} onOpenChange={setIsTodoDialogOpen}>
					<DialogTrigger className="relative bg-mantis-primary hover:bg-mantis-primary/90 p-3 text-white rounded-full">
						<BsListCheck />
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>
								<BsListCheck className="inline -mt-.5 mr-2" /> Todo hinzufügen
							</DialogTitle>
							<DialogDescription>Was gibt es zu erledigen?</DialogDescription>
						</DialogHeader>
						<FormTodo />
					</DialogContent>
				</Dialog>
				<Dialog open={isLinkDialogOpen} onOpenChange={setIsLinkDialogOpen}>
					<DialogTrigger className="relative bg-mantis-primary hover:bg-mantis-primary/90 p-3 text-white rounded-full">
						<GoLink />
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>
								<GoLink className="inline -mt-.5 mr-2" /> Link hinzufügen
							</DialogTitle>
							<DialogDescription>Lege einen neuen Link an.</DialogDescription>
						</DialogHeader>
						<FormLink />
					</DialogContent>
				</Dialog>
				<Dialog open={isNoticeDialogOpen} onOpenChange={setIsNoticeDialogOpen}>
					<DialogTrigger className="relative bg-mantis-primary hover:bg-mantis-primary/90 p-3 text-white rounded-full">
						<CiEdit />
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>
								<CiEdit className="inline -mt-.5 mr-2" /> Notiz hinzufügen
							</DialogTitle>
							<DialogDescription>Lege eine neue Notiz an.</DialogDescription>
						</DialogHeader>
						<FormNotice />
					</DialogContent>
				</Dialog>
				<Dialog open={isProjectDialogOpen} onOpenChange={setIsProjectDialogOpen}>
					<DialogTrigger className="relative bg-mantis-primary hover:bg-mantis-primary/90 p-3 text-white rounded-full">
						<BsBuildings />
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>
								<BsBuildings className="inline -mt-.5 mr-2" />
								Projekt hinzufügen
							</DialogTitle>
							<DialogDescription>Lege ein neues Projekt an.</DialogDescription>
						</DialogHeader>
						<FormProject />
					</DialogContent>
				</Dialog>
			</div>
			<button aria-label="Neuen Inhalt anlegen" className="bg-mantis-primary hover:bg-mantis-primary/90 text-white p-4 text-lg rounded-full" onClick={() => setShowMenu(!showMenu)}>
				{showMenu ? <FiPlus className="rotate-45 transition-all" /> : <FiPlus className="transition-all" />}
			</button>
		</div>
	);
};
