import { db } from "@/lib/db";
import { runMiddleware } from "@/lib/cors-middleware";
import { NextRequest, NextResponse } from "next/server";
import Cors from "cors";

// Initialisiere die cors-Middleware
const cors = Cors({
	methods: ["GET", "HEAD", "POST"], // Passen Sie die Methoden nach Bedarf an
	origin: "https://dasboard.tobias-hopp.de" // Ersetzen Sie dies durch die spezifische Domain
});

export async function GET() {
	const links = await db.link.findMany();
	return new Response(JSON.stringify(links));
}

export async function POST(request: Request) {
	const { url, title } = await request.json()
	console.log(url, title)
}
