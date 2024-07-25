import type { NextApiRequest, NextApiResponse } from "next"
import { db } from "@/lib/db"
import { runMiddleware, cors } from "@/lib/cors-middleware"

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
	// Laufen Sie die CORS-Middleware
	await runMiddleware(req, res, cors)

	// Verarbeiten Sie die POST-Anfrage
	try {
		res.status(200).json({ message: "Data saved successfully" })
	} catch (error) {
		res.status(500).json({ error: "Internal Server Error" })
	}
}
