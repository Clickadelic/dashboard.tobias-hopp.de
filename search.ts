"use server";
import { db } from "@/lib/db";
import { auth } from "@/auth";

export const getFullStackSearchResults = async (query: string) => {
	const results = [];
	const session = await auth();
	const user = session?.user;
	const userId = user?.id;

	const linkresults = await db.link.findMany({
		where: {
			title: {
				contains: query
			},
			user: {
				id: userId
			},
			OR: [
				{
					title: {
						contains: query
					}
				},
				{
					description: {
						contains: query
					}
				}
			]
		}
	});
	if (linkresults.length > 0) results.push(linkresults);

	const noticeResults = await db.notice.findMany({
		where: {
			noticetext: {
				contains: query
			},
			user: {
				id: userId
			}
		}
	});
	if (noticeResults.length > 0) results.push(noticeResults);

	const todoResults = await db.todo.findMany({
		where: {
			title: {
				contains: query
			},
			user: {
				id: userId
			},
			OR: [
				{
					title: {
						contains: query
					}
				},
				{
					description: {
						contains: query
					}
				}
			]
		}
	});
	if (todoResults.length > 0) results.push(todoResults);

	const projectResults = await db.project.findMany({
		where: {
			title: {
				contains: query
			},
			user: {
				id: userId
			},
			OR: [
				{
					title: {
						contains: query
					}
				},
				{
					description: {
						contains: query
					}
				}
			]
		}
	});
	if (projectResults.length > 0) results.push(projectResults);

	const organizationResults = await db.organization.findMany({
		where: {
			name: {
				contains: query
			}
		}
	});
	if (organizationResults.length > 0) results.push(organizationResults);

	return results;
};
