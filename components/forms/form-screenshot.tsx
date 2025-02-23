"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const ScreenshotForm = () => {
	const [url, setUrl] = useState("");
	const [screenshotPath, setScreenshotPath] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		setLoading(true);
		setError(null);

		try {
			const response = await fetch("/api/screenshot", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ url })
			});

			if (response.ok) {
				const data = await response.json();
				setScreenshotPath(data.path);
			} else {
				const data = await response.json();
				setError(data.error);
			}
		} catch (err) {
			setError("An unexpected error occurred");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input type="text" value={url} onChange={e => setUrl(e.target.value)} placeholder="Enter URL" required />
				<button type="submit" disabled={loading}>
					{loading ? "Capturing..." : "Capture Screenshot"}
				</button>
			</form>
			{error && <p style={{ color: "red" }}>{error}</p>}
			{screenshotPath && (
				<div>
					<h2>Screenshot:</h2>
					<Image width="400" height="300" src={screenshotPath} alt="Screenshot" />
					<Link href={screenshotPath}>Download</Link>
				</div>
			)}
		</div>
	);
};

export default ScreenshotForm;
