import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import {
	generateLPPUserId,
	generateRobustLPPUserId,
} from "@/lib/user-id-generator";

const registerSchema = z.object({
	name: z.string().min(2, "Name must be at least 2 characters"),
	email: z.string().email("Invalid email address"),
	password: z.string().min(8, "Password must be at least 8 characters"),
});

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();

		// Validate input
		const { name, email, password } = registerSchema.parse(body);

		// Check if user already exists
		const existingUser = await prisma.user.findUnique({
			where: { email },
		});

		if (existingUser) {
			return NextResponse.json(
				{ message: "User with this email already exists" },
				{ status: 400 }
			);
		}

		// Hash password
		const hashedPassword = await bcrypt.hash(password, 12);

		// Generate unique LPP user ID
		let userId = generateRobustLPPUserId();

		// Ensure the generated ID is unique (retry if collision occurs)
		let attempts = 0;
		const maxAttempts = 10;

		while (attempts < maxAttempts) {
			const existingUserWithId = await prisma.user.findUnique({
				where: { id: userId },
			});

			if (!existingUserWithId) {
				break; // ID is unique
			}

			userId = generateRobustLPPUserId();
			attempts++;
		}

		if (attempts >= maxAttempts) {
			return NextResponse.json(
				{ message: "Unable to generate unique user ID. Please try again." },
				{ status: 500 }
			);
		} // Create user
		const user = await prisma.user.create({
			data: {
				id: userId,
				name,
				email,
				password: hashedPassword,
				role: "USER",
			},
		});

		// Create user profile
		await prisma.userProfile.create({
			data: {
				userId: user.id,
				firstName: name.split(" ")[0] || "",
				lastName: name.split(" ").slice(1).join(" ") || "",
			},
		});

		// Return success response (don't include password)
		const { password: _, ...userWithoutPassword } = user;

		return NextResponse.json(
			{
				message: "User created successfully",
				user: userWithoutPassword,
			},
			{ status: 201 }
		);
	} catch (error) {
		if (error instanceof z.ZodError) {
			return NextResponse.json(
				{ message: error.errors[0].message },
				{ status: 400 }
			);
		}

		console.error("Registration error:", error);
		return NextResponse.json(
			{ message: "Internal server error" },
			{ status: 500 }
		);
	}
}
