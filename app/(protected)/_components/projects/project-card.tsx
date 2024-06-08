import Link from "next/link";

interface ProjectCardProps {
	id: string;
	title: string;
	description: string;
	userId: string;
	createdAt: Date;
	updatedAt: Date;
}

const ProjectCard = ({ id, title, description, userId, createdAt, updatedAt }: ProjectCardProps) => {
	return (
		<div className="card">
			<div className="card-body">
				<h2 className="card-title">{title}</h2>
				<p>{description}</p>
				<Link href={`/projekte/${id}`}>Details</Link>
			</div>
		</div>
	);
};

export default ProjectCard;
