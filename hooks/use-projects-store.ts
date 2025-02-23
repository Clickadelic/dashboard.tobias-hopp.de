import { create } from "zustand";
import { Project } from "@prisma/client";

interface ProjectsStateProps {
	projects: Project[];
	setProjects: (Projects: Project[]) => void;
}

export const useProjectsStore = create<ProjectsStateProps>(set => ({
	projects: [],
	setProjects: (projects: Project[]) => set({ projects })
}));
