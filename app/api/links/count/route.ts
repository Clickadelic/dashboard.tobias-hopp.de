import { NextApiRequest, NextApiResponse } from "next";
import { countLinks } from "@/data/links";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const links = await countLinks();
	// Check the request method
	if (req.method === "GET") {
		// Send the hyperlinks data as JSON
		res.status(200).json({ count: links });
		console.log(links);
	} else {
		// Handle any other HTTP method
		res.setHeader("Allow", ["GET"]);
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}
}
