import { NextResponse } from "next/server";
import { unsplash } from "@/lib/unsplash";

export async function GET() {
	try {
		const result = await unsplash.photos.getRandom({
			collectionIds: ["317099"],
			count: 15
		});
		if (result && result.response) {
			return NextResponse.json(result.response);
		} else {
			return NextResponse.json({ error: "Failed to load images" }, { status: 500 });
		}
	} catch (error) {
		console.error("Unsplash API error:", error);
		return NextResponse.json({ error: "Server error" }, { status: 500 });
	}
}
