import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET(request: NextRequest, { params }: { params: { userId: string } }) {
	const userId = params.userId

	if (!userId) {
		return NextResponse.json({ message: "Benutzer-Id fehlt." })
	}

	const relatedUser = await db.user.findFirst({
		where: {
			id: userId
		}
	})

	if (!relatedUser) {
		return NextResponse.json({ message: "Benutzer nicht gefunden." })
	}

	const data = await db.notice.findMany({
		where: {
			userId
		}
	})

	return NextResponse.json(data, { status: 200 })
}
