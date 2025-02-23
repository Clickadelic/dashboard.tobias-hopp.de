import { create } from "zustand";

interface CircularMenuStateProps {
	showCircularMenu: boolean;
	toggleCircularMenu: () => void;
}

export const useCircularMenuStore = create<CircularMenuStateProps>(set => ({
	showCircularMenu: false,
	toggleCircularMenu: () => set(state => ({ showCircularMenu: !state.showCircularMenu }))
}));
