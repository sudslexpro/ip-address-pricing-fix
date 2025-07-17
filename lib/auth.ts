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
					await prisma.user.update({
						where: { id: user.id },
						data: { lastLoginAt: new Date() },
					});

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
			if (account?.provider === "credentials") {
				return true;
			}

			// Skip database operations during build time
			if (process.env.NODE_ENV === "production" && !process.env.DATABASE_URL) {
				return true;
			}

			// For OAuth providers, ensure user is active
			if (user.email) {
				try {
					const existingUser = await prisma.user.findUnique({
						where: { email: user.email },
					});

					if (existingUser && !existingUser.isActive) {
						return false;
					}
				} catch (error) {
					console.error("SignIn error:", error);
					return true; // Allow sign in on error to prevent build failures
				}
			}

			return true;
		},
	},
	pages: {
		signIn: "/auth/signin",
		error: "/auth/error",
	},
	events: {
		async signIn({ user, account, profile, isNewUser }) {
			// Skip database operations during build time
			if (process.env.NODE_ENV === "production" && !process.env.DATABASE_URL) {
				return;
			}

			if (isNewUser && user.email) {
				try {
					// Create user profile for new users
					await prisma.userProfile.create({
						data: {
							userId: user.id,
							firstName: user.name?.split(" ")[0] || "",
							lastName: user.name?.split(" ").slice(1).join(" ") || "",
						},
					});
				} catch (error) {
					console.error("User profile creation error:", error);
					// Don't throw error to prevent build failures
				}
			}
		},
	},
};
