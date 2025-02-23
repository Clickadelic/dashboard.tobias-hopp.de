import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";
import path from "path";
// import fs from "fs";

export async function POST(req: NextRequest) {
	const { url } = await req.json();

	if (!url) {
		return NextResponse.json({ error: "URL is required" }, { status: 400 });
	}

	try {
		const browser = await puppeteer.launch();
		const page = await browser.newPage();
		await page.goto(url, { waitUntil: "networkidle2" });
		const screenshotPath = path.join(process.cwd(), "public", "screenshots", "screenshot.png");
		await page.screenshot({ path: screenshotPath });
		await browser.close();

		return NextResponse.json({ message: "Screenshot captured", path: "/screenshots/screenshot.png" });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error: "Error capturing screenshot" }, { status: 500 });
	}
}
