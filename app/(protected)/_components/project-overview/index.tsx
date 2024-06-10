import Link from "next/link";
import { auth } from "@/auth";

import { Card, CardContent, CardHeader, CardDescription, CardFooter } from "@/components/ui/card";
import { BsArrowRight } from "react-icons/bs";

import { getProjectsByUserId } from "@/actions/project";

const ProjectOverview = async () => {
	const session = await auth();
	const projects = await getProjectsByUserId(session?.user.id || "");
	return (
		<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
			{projects.map(project => (
				<Card key={project.id}>
					<CardHeader className="p-3">
						<Link className="inline text-xl font-medium hover:text-mantis-primary" href={`/projekte/${project.id}`}>
							{project.title}
						</Link>
						<Link className="inline text-xl font-medium hover:text-mantis-primary" href={`/projekte/${project.id}`}>
							{project.url}
						</Link>
					</CardHeader>
					<CardContent className="h-28 overflow-hidden text-truncate text-ellipsis">
						<p className="text-sm text-muted-foreground">{project.description}</p>
					</CardContent>
					<CardFooter className="flex justify-end items-end">
						<Link className="flex justify-between font-medium hover:text-mantis-primary hover:underline" href={`/projekte/${project.id}`}>
							Zu den Projektdetails
							<BsArrowRight className="ml-2 mt-1 size-4" />
						</Link>
					</CardFooter>
				</Card>
			))}
		</div>
	);
};

export default ProjectOverview;
