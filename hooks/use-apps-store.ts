import { create } from "zustand";
import { App } from "@prisma/client";

interface AppsStateProps {
	apps: App[];
	setApps: (Apps: App[]) => void;
}

export const useAppsStore = create<AppsStateProps>(set => ({
	apps: [],
	setApps: (apps: App[]) => set({ apps })
}));
