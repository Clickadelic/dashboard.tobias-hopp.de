import { NextRequest, NextResponse } from "next/server";
// import { db } from "@/lib/db";
import { put } from "@vercel/blob";

export async function POST(req: NextRequest) {
	const form = await req.formData();
	const file = form.get("file") as File;

	if (!file.name) {
		return NextResponse.json(
			{
				error: "No file name specified"
			},
			{
				status: 400
			}
		);
	}
	const blob = await put(file.name, file, {
		access: "public"
	});

	return NextResponse.json({ blob });
}
