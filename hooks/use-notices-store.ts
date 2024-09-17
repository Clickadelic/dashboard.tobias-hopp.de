import { create } from "zustand";
import { Notice } from "@prisma/client";

interface NoticesStateProps {
	notices: Notice[];
	setNotices: (notices: Notice[]) => void;
}

export const useNoticesStore = create<NoticesStateProps>(set => ({
	notices: [],
	setNotices: (notices: Notice[]) => set({ notices: notices }),
}));
