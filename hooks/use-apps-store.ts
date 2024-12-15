import { create } from "zustand";
import { App } from "@prisma/client";

interface AppsStateProps {
	apps: App[];
	setApps: (Apps: App[]) => void;

	formData: App | null;
	setFormData: (formData: App) => void;

	resetFormData: () => void;

	isAppDialogOpen: boolean;
	setAppDialogOpen: (isOpen: boolean) => void;

	isEditMode: boolean;
	setIsEditMode: (isEditMode: boolean) => void;
}

export const useAppsStore = create<AppsStateProps>(set => ({
	apps: [],
	setApps: (apps: App[]) => set({ apps }),

	formData: null,
	setFormData: (formData: App) => set({ formData }),

	isAppDialogOpen: false,
	setAppDialogOpen: (isOpen: boolean) => set({ isAppDialogOpen: isOpen }),

	isEditMode: false,
	setIsEditMode: (isEditMode: boolean) => set({ isEditMode: isEditMode })
}));
