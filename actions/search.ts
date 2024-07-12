"use server"
import { db } from "@/lib/db"

export const getFullStackSearchResults = (query: string) => {
	const results = []

	const linkresults = db.link.findMany({
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
	})

	results.push(linkresults)

	const noticeResults = db.notice.findMany({
		where: {
			noticetext: {
				contains: query
			}
		}
	})
	results.push(noticeResults)

	return results
}
