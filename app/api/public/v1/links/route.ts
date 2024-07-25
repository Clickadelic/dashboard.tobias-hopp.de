import { NextRequest, NextResponse } from "next/server"

import { db } from "@/lib/db"

export async function GET(req: NextRequest, res: NextResponse) {
	const links = await db.link.findMany()

	if (!links) {
		return NextResponse.json({ error: "No links found" }, { status: 404 })
	}

	return NextResponse.json(links, { status: 200 })
}
