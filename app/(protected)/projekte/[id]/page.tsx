"use client";

import { getProjectByProjectId } from "@/actions/project";
import { useSearchParams } from "next/navigation";

import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";

import { useCurrentRole } from "@/hooks/use-current-role";
import { useCurrentUser } from "@/hooks/use-current-user";
import { UserRole } from "@prisma/client";

const ProjectByIdPage = () => {
	const { status } = useSession({ required: true });
	const user = useCurrentUser();
	console.log(user);
	const id = useSearchParams().get("id") || "";
	const project = getProjectByProjectId(id);
	console.log(user);
	return <></>;
};

export default ProjectByIdPage;
