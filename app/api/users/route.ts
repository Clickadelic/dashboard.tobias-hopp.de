import { db } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"

export async function GET(request: NextRequest) {
	const data = await db.user.findMany()
	const allUsersWithoutPassword = data.map(user => {
		const { password, ...userWithoutPassword } = user
		return userWithoutPassword
	})
	const path = request.nextUrl.searchParams.get("path") || ""
	revalidatePath(path)
	return NextResponse.json(allUsersWithoutPassword)
}
