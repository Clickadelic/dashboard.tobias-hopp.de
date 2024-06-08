"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useCurrentUser } from "@/hooks/use-current-user";
import ProjectCard from "./project-card";

const ProjectOverview = () => {
	const { status } = useSession({ required: true });
	const userId = useCurrentUser()?.id;

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [projects, setProjects] = useState<any[]>([]);

	const fetchProjects = async () => {
		setIsLoading(true);
		await fetch(`/api/projects/${userId}`).then(async res => {
			const response = await res.json();
			setProjects(response);
		});
		setIsLoading(false);
	};

	return (
		<div className="project-overview project-cards">
			{projects.map((project: any) => (
				<ProjectCard
					key={project.id}
					id={project.id}
					title={project.title}
					description={project.description}
					userId={project.userId}
					createdAt={project.createdAt}
					updatedAt={project.updatedAt}
				/>
			))}
		</div>
	);
};

export default ProjectOverview;
