import { NextRequest, NextResponse } from "next/server"

import { db } from "@/lib/db"

export async function GET(req: NextRequest, res: NextResponse) {
	const message = { message: "Hello World" }

	return NextResponse.json({ error: "Error capturing screenshot" }, { status: 500 })
}
