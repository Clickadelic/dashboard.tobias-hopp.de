/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "7ff1ulwyppw6zlvj.public.blob.vercel-storage.com"
			}
		]
	}
};

export default nextConfig;
