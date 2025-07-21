import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import TwitterProvider from "next-auth/providers/twitter";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import type { Adapter } from "next-auth/adapters";

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma) as Adapter,
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
			httpOptions: {
				timeout: 10000, // 10 seconds timeout
			},
		}),
		FacebookProvider({
			clientId: process.env.FACEBOOK_CLIENT_ID!,
			clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
		}),
		TwitterProvider({
			clientId: process.env.TWITTER_CLIENT_ID!,
			clientSecret: process.env.TWITTER_CLIENT_SECRET!,
			version: "2.0",
		}),
		CredentialsProvider({
			name: "credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				// Skip database operations during build time
				if (
					process.env.NODE_ENV === "production" &&
					!process.env.DATABASE_URL
				) {
					return null;
				}

				if (!credentials?.email || !credentials?.password) {
					return null;
				}

				try {
					const user = await prisma.user.findUnique({
						where: {
							email: credentials.email,
						},
					});

					if (!user || !user.password) {
						return null;
					}

					const isPasswordValid = await bcrypt.compare(
						credentials.password,
						user.password
					);

					if (!isPasswordValid) {
						return null;
					}

					// Update last login
					console.log(
						"Updating lastLoginAt for credentials login:",
						user.email
					);
					await prisma.user.update({
						where: { id: user.id },
						data: { lastLoginAt: new Date() },
					});
					console.log("LastLoginAt updated successfully for:", user.email);

					return {
						id: user.id,
						email: user.email,
						name: user.name,
						image: user.image,
						role: user.role,
					};
				} catch (error) {
					console.error("Auth error:", error);
					return null;
				}
			},
		}),
	],
	session: {
		strategy: "jwt",
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.role = user.role;
				token.id = user.id;
			}
			return token;
		},
		async session({ session, token }) {
			if (token && session.user) {
				session.user.id = token.id as string;
				session.user.role = token.role as string;
			}
			return session;
		},
		async signIn({ user, account, profile, email, credentials }) {
			console.log("SignIn callback triggered:", {
				provider: account?.provider,
				userEmail: user.email,
				accountType: account?.type,
			});

			try {
				if (account?.provider === "credentials") {
					console.log(
						"Credentials login detected, lastLoginAt will be updated in credentials handler"
					);
					return true;
				}

				// Skip database operations during build time
				if (
					process.env.NODE_ENV === "production" &&
					!process.env.DATABASE_URL
				) {
					console.log("Skipping database operations - production build");
					return true;
				}

				// For OAuth providers, check user status and update lastLoginAt
				if (user.email) {
					try {
						console.log("Checking existing user for OAuth login:", user.email);
						const existingUser = await prisma.user.findUnique({
							where: { email: user.email },
						});

						if (existingUser && !existingUser.isActive) {
							console.log("User is inactive, denying login:", user.email);
							return false;
						}

						// Update last login for OAuth providers
						if (existingUser) {
							console.log("Updating lastLoginAt for OAuth user:", user.email);
							await prisma.user.update({
								where: { email: user.email },
								data: { lastLoginAt: new Date() },
							});
							console.log(
								"LastLoginAt updated successfully for OAuth user:",
								user.email
							);
						} else {
							console.log(
								"No existing user found for OAuth login:",
								user.email
							);
						}
					} catch (error) {
						console.error("SignIn error:", error);
						return true; // Allow sign in on error to prevent build failures
					}
				}

				return true;
			} catch (error) {
				console.error("SignIn callback error:", error);
				// Allow sign in on error to prevent complete failure
				return true;
			}
		},
	},
	pages: {
		signIn: "/auth/signin",
		error: "/auth/error",
	},
	debug: process.env.NODE_ENV === "development",
	logger: {
		error(code, metadata) {
			console.error(`[next-auth][error][${code}]`, metadata);
		},
		warn(code) {
			console.warn(`[next-auth][warn][${code}]`);
		},
		debug(code, metadata) {
			if (process.env.NODE_ENV === "development") {
				console.debug(`[next-auth][debug][${code}]`, metadata);
			}
		},
	},
	events: {
		async signIn({ user, account, profile, isNewUser }) {
			console.log("SignIn event triggered:", {
				userEmail: user.email,
				provider: account?.provider,
				isNewUser: isNewUser,
			});

			// Skip database operations during build time
			if (process.env.NODE_ENV === "production" && !process.env.DATABASE_URL) {
				console.log("Skipping database operations - production build");
				return;
			}

			if (user.email) {
				try {
					console.log("Updating lastLoginAt in signIn event for:", user.email);
					// Update lastLoginAt for all successful sign-ins as a fallback
					await prisma.user.update({
						where: { email: user.email },
						data: { lastLoginAt: new Date() },
					});
					console.log(
						"LastLoginAt updated successfully in signIn event for:",
						user.email
					);

					// Create user profile for new users
					if (isNewUser) {
						console.log("Creating user profile for new user:", user.email);
						await prisma.userProfile.create({
							data: {
								userId: user.id,
								firstName: user.name?.split(" ")[0] || "",
								lastName: user.name?.split(" ").slice(1).join(" ") || "",
							},
						});
						console.log("User profile created successfully for:", user.email);
					}
				} catch (error) {
					console.error("User profile creation/update error:", error);
					// Don't throw error to prevent build failures
				}
			}
		},
	},
};
