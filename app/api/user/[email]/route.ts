import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function DELETE(request: NextRequest, { params }: { params: { email: string } }) {
	const email = params.email;

	if (!email) {
		return NextResponse.json({ message: "E-Mail Adresse fehlt." });
	}

	const existingUser = await db.user.findFirst({
		where: {
			email
		}
	});

	if (!existingUser) {
		return NextResponse.json({ message: "Benutzer nicht gefunden." });
	}

	await db.user.delete({
		where: {
			email
		}
	});

	return NextResponse.json({ status: 200 });
}
