import { useState } from "react"
import { useSession } from "next-auth/react"
import { useAppContext } from "@/context/app-context"

import { useAppsStore } from "@/hooks/use-apps-store"

import { BsApp } from "react-icons/bs"
import { BsBuildings } from "react-icons/bs"
import { BsListCheck } from "react-icons/bs"
import { CiEdit } from "react-icons/ci"
import { GoLink } from "react-icons/go"
import { FiPlus } from "react-icons/fi"

import { getAppsByUserId } from "@/actions/app"

import { FormApp } from "@/components/forms/form-app"
import { FormProject } from "@/components/forms/form-project"
import { FormNotice } from "@/components/forms/form-notice"
import { FormTodo } from "@/components/forms/form-todo"
import { FormLink } from "@/components/forms/form-link"

import { cn } from "@/lib/utils"

import { ResponsiveDialog } from "@/components/responsive-dialog"

export const CircularMenu = () => {
	const { status } = useSession({ required: true })
	const [showMenu, setShowMenu] = useState<boolean>(false)

	const apps = useAppsStore(state => state.apps)
	const setApps = useAppsStore(state => state.setApps)
	const isAppDialogOpen = useAppsStore(state => state.isAppDialogOpen)
	const toggleAppDialog = useAppsStore(state => state.toggleAppDialog)

	const { isLinkDialogOpen, setLinkDialogOpen } = useAppContext()
	const { isTodoDialogOpen, setTodoDialogOpen } = useAppContext()
	const { isNoticeDialogOpen, setNoticeDialogOpen } = useAppContext()
	const { isProjectDialogOpen, setProjectDialogOpen } = useAppContext()

	return (
		<div className="fixed right-4 bottom-4 md:bottom-8 md:right-8 max-w-12 shadow-sm">
			<div className={cn("absolute -top-64 left-[4px] flex justify-center space-y-2", showMenu ? "block" : "hidden")}>
				<button onClick={() => toggleAppDialog()} className="rounded-full bg-mantis-primary hover:bg-mantis-primary/90 text-white p-3">
					<BsApp />
				</button>
				<ResponsiveDialog isOpen={isAppDialogOpen} setIsOpen={toggleAppDialog} title="App hinzufügen" description="Füge eine App als Schnellzugriff hinzu" icon={<BsApp />}>
					<FormApp />
				</ResponsiveDialog>
				<button onClick={() => setLinkDialogOpen(true)} className="rounded-full bg-mantis-primary hover:bg-mantis-primary/90 text-white p-3">
					<GoLink />
				</button>
				<ResponsiveDialog isOpen={isLinkDialogOpen} setIsOpen={setLinkDialogOpen} title="Link hinzufügen" description="Füge einen Link zu Deiner Kollektion hinzu" icon={<GoLink />}>
					<FormLink />
				</ResponsiveDialog>
				<button onClick={() => setTodoDialogOpen(true)} className="rounded-full bg-mantis-primary hover:bg-mantis-primary/90 text-white p-3">
					<BsListCheck />
				</button>
				<ResponsiveDialog isOpen={isTodoDialogOpen} setIsOpen={setTodoDialogOpen} title="Todo hinzufügen" description="Füge ein neues Todo hinzu" icon={<BsListCheck />}>
					<FormTodo />
				</ResponsiveDialog>
				<button onClick={() => setNoticeDialogOpen(true)} className="rounded-full bg-mantis-primary hover:bg-mantis-primary/90 text-white p-3">
					<CiEdit />
				</button>
				<ResponsiveDialog isOpen={isNoticeDialogOpen} setIsOpen={setNoticeDialogOpen} title="Noziz hinzufügen" description="Füge eine neue Notiz hinzu" icon={<CiEdit />}>
					<FormNotice />
				</ResponsiveDialog>
				<button onClick={() => setProjectDialogOpen(true)} className="rounded-full bg-mantis-primary hover:bg-mantis-primary/90 text-white p-3">
					<BsBuildings />
				</button>
				<ResponsiveDialog isOpen={isProjectDialogOpen} setIsOpen={setProjectDialogOpen} title="Projekt hinzufügen" description="Füge ein neues Projekt hinzu" icon={<BsBuildings />}>
					<FormProject />
				</ResponsiveDialog>
			</div>
			<button aria-label="Neuen Inhalt anlegen" className="bg-mantis-primary hover:bg-mantis-primary/90 text-white p-4 text-lg rounded-full" onClick={() => setShowMenu(!showMenu)}>
				<FiPlus className={cn("transition", showMenu ? "rotate-45" : "")} />
			</button>
		</div>
	)
}
