import { NextApiRequest, NextApiResponse } from "next"
import { db } from "@/lib/db"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	// Check the request method
	const links = await db.link.findMany()
	if (req.method === "GET") {
		// Send the hyperlinks data as JSON
		res.status(200).json(links)
	} else {
		// Handle any other HTTP method
		res.setHeader("Allow", ["GET"])
		res.status(405).end(`Method ${req.method} Not Allowed`)
	}
}
