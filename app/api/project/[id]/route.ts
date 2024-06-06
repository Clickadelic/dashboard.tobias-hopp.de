import { db } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"

export async function GET(request: NextRequest, { params }: { params: { projectId: string } }) {
	const projectId = params.projectId
	const path = request.nextUrl.searchParams.get("path") || ""

	if (!projectId) {
		return NextResponse.json({ message: "Fehlende Projekt-Id." })
	}

	// TODO: Project Logik einbauen

	revalidatePath(path)
	return NextResponse.json(data, { status: 200 })
}
