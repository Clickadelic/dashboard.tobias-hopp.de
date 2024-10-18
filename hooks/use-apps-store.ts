import { create } from "zustand";
import { App } from "@prisma/client";

interface AppsStateProps {
	apps: App[];
	setApps: (Apps: App[]) => void;
	isAppDialogOpen: boolean;
	toggleAppDialogOpen: () => void;
	isAppEditing: boolean;
	toggleIsAppEditing: () => void;
}

export const useAppsStore = create<AppsStateProps>(set => ({
	apps: [],
	setApps: (apps: App[]) => set({ apps }),

	isAppDialogOpen: false,
	toggleAppDialogOpen: () => set(state => ({ isAppDialogOpen: !state.isAppDialogOpen })),

	isAppEditing: false,
	toggleIsAppEditing: () => set(state => ({ isAppEditing: !state.isAppEditing }))
}));
