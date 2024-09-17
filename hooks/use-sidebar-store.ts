import { create } from "zustand";

interface SidebarState {
	sidebarOpen: boolean;
	toggleSidebar: () => void;
}

export const useSidebarStore = create<SidebarState>(set => ({
	sidebarOpen: false,
	toggleSidebar: () => set(state => ({ sidebarOpen: !state.sidebarOpen }))
}));
