import { create } from "zustand";
import { App } from "@prisma/client";

// Interface für den SidebarStore mit zwei Types anlegen
interface AppsStateProps {
	Apps: App[]; // Array mit Apps als Type App

	setApps: (Apps: App[]) => void;
}

export const useAppsStore = create<AppsStateProps>(set => ({
	Apps: [],
	setApps: (Apps: App[]) => set({ Apps })
}));
