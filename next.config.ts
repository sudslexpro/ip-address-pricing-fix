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
	allowedDevOrigins: [
		"local-origin.dev",
		"*.local-origin.dev",
		"192.168.0.144",
		"192.168.0.112",
		"192.168.29.183",
		"192.168.76.219"
	],
	crossOrigin: "anonymous",
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
