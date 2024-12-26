import { useState } from "react";
import { useAppContext } from "@/context/app-context";

import { BsApp } from "react-icons/bs";
import { BsBuildings } from "react-icons/bs";
import { GrCheckboxSelected } from "react-icons/gr";
import { CiEdit } from "react-icons/ci";
import { GoLink } from "react-icons/go";
import { FiPlus } from "react-icons/fi";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, TooltipArrow } from "@/components/ui/tooltip";

import { FormApp } from "@/components/forms/form-app";
import { FormProject } from "@/components/forms/form-project";
import { FormNotice } from "@/components/forms/form-notice";
import { FormTodo } from "@/components/forms/form-todo";
import { FormLink } from "@/components/forms/form-link";

import { cn } from "@/lib/utils";

import { ResponsiveDialog } from "@/components/responsive-dialog";
import { useAppsStore } from "@/hooks/use-apps-store";
import { useTodosStore } from "@/hooks/use-todos-store";
import { useCircularMenuStore } from "@/hooks/use-circular-menu-store";

export const CircularMenu = () => {
	const showCircularMenu = useCircularMenuStore(state => state.showCircularMenu);
	const toggleCircularMenu = useCircularMenuStore(state => state.toggleCircularMenu);

	// Apps Store and Hooks
	const isAppDialogOpen = useAppsStore(state => state.isAppDialogOpen);
	const setAppDialogOpen = useAppsStore(state => state.setAppDialogOpen);

	const isAppEditMode = useAppsStore(state => state.isAppEditMode);
	const setIsAppEditMode = useAppsStore(state => state.setIsAppEditMode);

	// Todo Store and Hooks
	const isTodoDialogOpen = useTodosStore(state => state.isTodoDialogOpen);
	const setTodoDialogOpen = useTodosStore(state => state.setTodoDialogOpen);

	const isTodoEditMode = useTodosStore(state => state.isTodoEditMode);
	const setIsTodoEditMode = useTodosStore(state => state.setIsTodoEditMode);

	// TODO: Clean up / harmonize / sync with the rest of the architecture
	const { isLinkDialogOpen, setLinkDialogOpen } = useAppContext();
	const { isNoticeDialogOpen, setNoticeDialogOpen } = useAppContext();
	const { isProjectDialogOpen, setProjectDialogOpen } = useAppContext();

	const openAppDialog = () => {
		setIsAppEditMode(false);
		setAppDialogOpen(true);
	};

	const openTodoDialog = () => {
		setIsTodoEditMode(false);
		setTodoDialogOpen(true);
	};

	return (
		<div className="fixed right-4 bottom-4 md:bottom-8 md:right-8 max-w-12 shadow-sm">
			<div className={cn("absolute -top-64 left-[4px] flex justify-center space-y-2", showCircularMenu ? "block" : "hidden")}>
				{/* Apps */}
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild data-state="instant-open">
							<button onClick={openAppDialog} className="rounded-full bg-mantis-primary hover:bg-mantis-primary/90 text-white p-3">
								<BsApp />
							</button>
						</TooltipTrigger>
						<TooltipContent side="left">
							<p>Neue App</p>
							<TooltipArrow className="arrow-mantis-primary" />
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
				<ResponsiveDialog
					icon={<BsApp />}
					title="App hinzufügen"
					description="Füge eine App als Schnellzugriff hinzu"
					editTitle="App bearbeiten"
					editDescription="Ändere Titel oder Url der App"
					isOpen={isAppDialogOpen}
					setIsOpen={() => setAppDialogOpen(true ? false : true)}
					isDialogEditMode={isAppEditMode}
				>
					<FormApp isAppEditMode={isAppEditMode} />
				</ResponsiveDialog>

				{/* Todos */}
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild data-state="instant-open">
							<button onClick={openTodoDialog} className="rounded-full bg-mantis-primary hover:bg-mantis-primary/90 text-white p-3">
								<GrCheckboxSelected />
							</button>
						</TooltipTrigger>
						<TooltipContent side="left">
							<p>Neues Todo</p>
							<TooltipArrow className="arrow-mantis-primary" />
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
				<ResponsiveDialog
					icon={<GrCheckboxSelected />}
					title="Todo hinzufügen"
					description="Füge ein Todo hinzu"
					editTitle="Todo bearbeiten"
					editDescription="Ändere den Titel oder die Beschreibung des Todos"
					isOpen={isTodoDialogOpen}
					setIsOpen={() => setTodoDialogOpen(true ? false : true)}
					isDialogEditMode={isTodoEditMode}
				>
					<FormTodo isTodoEditMode={isTodoEditMode} />
				</ResponsiveDialog>

				{/* Links */}
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild data-state="instant-open">
							<button onClick={() => setLinkDialogOpen(true)} className="rounded-full bg-mantis-primary hover:bg-mantis-primary/90 text-white p-3">
								<GoLink />
							</button>
						</TooltipTrigger>
						<TooltipContent side="left">
							<p>Neuer Link</p>
							<TooltipArrow className="arrow-mantis-primary" />
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
				<ResponsiveDialog isOpen={isLinkDialogOpen} setIsOpen={setLinkDialogOpen} title="Link hinzufügen" description="Füge einen Link zu Deiner Kollektion hinzu" icon={<GoLink />}>
					<FormLink />
				</ResponsiveDialog>

				{/* Notices */}
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild data-state="instant-open">
							<button onClick={() => setNoticeDialogOpen(true)} className="rounded-full bg-mantis-primary hover:bg-mantis-primary/90 text-white p-3">
								<CiEdit />
							</button>
						</TooltipTrigger>
						<TooltipContent side="left">
							<p>Neue Notiz</p>
							<TooltipArrow className="arrow-mantis-primary" />
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
				<ResponsiveDialog isOpen={isNoticeDialogOpen} setIsOpen={setNoticeDialogOpen} title="Notiz hinzufügen" description="Füge eine neue Notiz hinzu" icon={<CiEdit />}>
					<FormNotice />
				</ResponsiveDialog>

				{/* Projects */}
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild data-state="instant-open">
							<button onClick={() => setProjectDialogOpen(true)} className="rounded-full bg-mantis-primary hover:bg-mantis-primary/90 text-white p-3">
								<BsBuildings />
							</button>
						</TooltipTrigger>
						<TooltipContent side="left">
							<p>Neues Projekt</p>
							<TooltipArrow className="arrow-mantis-primary" />
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
				<ResponsiveDialog isOpen={isProjectDialogOpen} setIsOpen={setProjectDialogOpen} title="Projekt hinzufügen" description="Füge ein neues Projekt hinzu" icon={<BsBuildings />}>
					<FormProject />
				</ResponsiveDialog>
			</div>
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild data-state="instant-open">
						<button aria-label="Neuen Inhalt anlegen" className="bg-mantis-primary hover:bg-mantis-primary/90 text-white p-4 text-lg rounded-full" onClick={() => toggleCircularMenu()}>
							<FiPlus className={cn("transition", showCircularMenu ? "rotate-45" : "")} />
						</button>
					</TooltipTrigger>
					<TooltipContent side="left">
						<p>Neuen Inhalt anlegen</p>
						<TooltipArrow className="arrow-mantis-primary" />
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</div>
	);
};
