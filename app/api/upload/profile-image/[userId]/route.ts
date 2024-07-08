import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { put } from "@vercel/blob";
import { auth } from "@/auth";

export async function POST(req: NextRequest) {
	const session = await auth();
	const user = session?.user;
	const userId = user?.id;

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

	await db.user.update({
		where: {
			id: userId
		},
		data: {
			profileImage: blob.url
		}
	});

	return NextResponse.json({ blob });
}
