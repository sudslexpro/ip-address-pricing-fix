import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "images.unsplash.com",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "lh3.googleusercontent.com",
				port: "",
				pathname: "/**",
			},
		],
	},
	serverExternalPackages: ["@prisma/client"],
	async headers() {
		return [
			{
				source: "/api/auth/:path*",
				headers: [
					{
						key: "Cache-Control",
						value: "no-store, max-age=0",
					},
				],
			},
		];
	},
};

export default nextConfig;
