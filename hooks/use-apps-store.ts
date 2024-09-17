import { create } from "zustand";
import { App } from "@prisma/client";

interface AppsStateProps {
	apps: App[];
	setApps: (Apps: App[]) => void;
	isAppDialogOpen: boolean;
	setAppDialogOpen: () => void;
}

export const useAppsStore = create<AppsStateProps>(set => ({
	apps: [],
	setApps: (apps: App[]) => set({ apps }),
	isAppDialogOpen: false,
	setAppDialogOpen: () => set(state => ({ isAppDialogOpen: !state.isAppDialogOpen }))
}));
