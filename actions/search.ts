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
			}
		}
	});
	if (noticeResults.length > 0) results.push(noticeResults);

	const todoResults = await db.todo.findMany({
		where: {
			title: {
				contains: query
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

	console.log("Full results are:", results);
	return results;
};
