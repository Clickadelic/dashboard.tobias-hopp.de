import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
	const { prompt } = await req.json()

	try {
		const response = await fetch("https://api.openai.com/v1/engines/davinci-codex/completions", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
			},
			body: JSON.stringify({
				prompt,
				max_tokens: 100,
				temperature: 0.7
			})
		})
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 })
	}
}
