export async function GET() {
	return new Response("Hello, Next.js!");
}

export async function POST(request: Request) {
	const { url, title } = await request.json();
	console.log(url, title);
}
