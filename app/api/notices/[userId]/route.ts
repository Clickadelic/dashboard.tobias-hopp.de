import { db } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"

export async function GET(request: NextRequest, { params }: { params: { userId: string } }) {
	const userId = params.userId
	const path = request.nextUrl.searchParams.get("path") || ""

	if (!userId) {
		return NextResponse.json({ message: "Fehlende Benutzer-Id." })
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

	revalidatePath(path)
	return NextResponse.json(data, { status: 200 })
}
