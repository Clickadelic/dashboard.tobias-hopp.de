import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
	const data = await db.todo.findMany();
	return NextResponse.json(data);
}
