import { getProjectById } from "@/actions/project";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useCurrentUser } from "@/hooks/use-current-user";

const ProjectByIdPage = () => {
	const { status } = useSession({ required: true });
	const user = useCurrentUser();
	const id = useSearchParams().get("id") || "";
	const project = getProjectById(id);
	console.log({ project });
	return <div>Projektdetails</div>;
};

export default ProjectByIdPage;
