import { NextRequest, NextResponse } from "next/server"

import { runMiddleware, cors } from "@/lib/cors-middleware"

import { db } from "@/lib/db"

export async function GET(req: NextRequest, res: NextResponse) {
	await runMiddleware(req, res, cors)
	const message = { message: "Hello World" }

	return NextResponse.json({ error: "Error capturing screenshot" }, { status: 500 })
}
