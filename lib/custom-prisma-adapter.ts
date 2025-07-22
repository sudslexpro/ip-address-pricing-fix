import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@/lib/generated/prisma";
import { generateLPPUserId } from "@/lib/user-id-generator";
import type { Adapter } from "next-auth/adapters";

/**
 * Custom Prisma adapter that generates LPP-prefixed user IDs
 * Extends the default PrismaAdapter to handle custom ID generation
 */
export function CustomPrismaAdapter(prisma: PrismaClient): Adapter {
	const baseAdapter = PrismaAdapter(prisma) as Adapter;

	return {
		...baseAdapter,
		async createUser(data: any) {
			// Generate unique LPP user ID
			let userId = generateLPPUserId();

			// Ensure the generated ID is unique (retry if collision occurs)
			let attempts = 0;
			const maxAttempts = 10;

			while (attempts < maxAttempts) {
				const existingUser = await prisma.user.findUnique({
					where: { id: userId },
				});

				if (!existingUser) {
					break; // ID is unique
				}

				userId = generateLPPUserId();
				attempts++;
			}

			if (attempts >= maxAttempts) {
				throw new Error("Unable to generate unique user ID");
			}

			// Create user with custom LPP ID
			const user = await prisma.user.create({
				data: {
					id: userId,
					name: data.name,
					email: data.email,
					emailVerified: data.emailVerified,
					image: data.image,
				},
			});

			// Create user profile for OAuth users
			try {
				await prisma.userProfile.create({
					data: {
						userId: user.id,
						firstName: user.name?.split(" ")[0] || "",
						lastName: user.name?.split(" ").slice(1).join(" ") || "",
					},
				});
			} catch (error) {
				console.error("Error creating user profile for OAuth user:", error);
				// Don't throw error to prevent OAuth registration failure
			}

			return {
				id: user.id,
				name: user.name,
				email: user.email,
				emailVerified: user.emailVerified,
				image: user.image,
			};
		},
	};
}
