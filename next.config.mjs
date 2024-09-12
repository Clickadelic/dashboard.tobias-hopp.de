/** @type {import('next').NextConfig} */
const nextConfig = {
	async headers() {
		return [
			{
				// matching all API routes
				source: "/api/:path*",
				headers: [
					{ key: "Access-Control-Allow-Credentials", value: "true" },
					{ key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
					{ key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
					{ key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" }
				]
			},
			{
				// matching all static files
				source: "/(.*)",
				headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }]
			}
		];
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "7ff1ulwyppw6zlvj.public.blob.vercel-storage.com"
			},
			{
				protocol: "https",
				hostname: "www.google.com"
			},
			{
				protocol: "https",
				hostname: "images.unsplash.com"
			}
		]
	}
};

export default nextConfig;
