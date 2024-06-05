export async function DELETE(request: Request) {
	const { searchParams } = new URL(request.url);
	const email = searchParams.get("email");
	console.log(email);

	// return Response.json({ user });
}
