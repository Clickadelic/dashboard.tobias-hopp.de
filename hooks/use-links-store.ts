import { create } from "zustand";
import { Link } from "@prisma/client";

interface LinksStateProps {
	links: Link[];
	setLinks: (links: Link[]) => void;
}

export const useLinksStore = create<LinksStateProps>(set => ({
	links: [],
	setLinks: (links: Link[]) => set({ links: links })
}));
