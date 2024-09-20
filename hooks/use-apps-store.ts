import { create } from "zustand"
import { App } from "@prisma/client"

interface AppsStateProps {
	apps: App[]
	setApps: (Apps: App[]) => void
	isAppDialogOpen: boolean
	toggleAppDialog: () => void
}

export const useAppsStore = create<AppsStateProps>(set => ({
	apps: [],
	setApps: (apps: App[]) => set({ apps }),
	isAppDialogOpen: false,
	toggleAppDialog: () => set(state => ({ isAppDialogOpen: !state.isAppDialogOpen }))
}))
