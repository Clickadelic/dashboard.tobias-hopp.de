import { create } from "zustand";

// Interface für den SidebarStore mit zwei Types anlegen
interface SidebarState {
	sidebarOpen: boolean; // Wert des Zustands als Boolean
	toggleSidebar: () => void; // Funktion um den Zustand umzuschalten
}

export const useSidebarStore = create<SidebarState>(set => ({
	sidebarOpen: false,
	toggleSidebar: () => set(state => ({ sidebarOpen: !state.sidebarOpen }))
}));
