import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { randomBytes } from "crypto";
import { z } from "zod";

const forgotPasswordSchema = z.object({
	email: z.string().email("Invalid email address"),
});

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const { email } = forgotPasswordSchema.parse(body);

		// Check if user exists
		const user = await prisma.user.findUnique({
			where: { email },
		});

		if (!user) {
			// Don't reveal whether user exists or not
			return NextResponse.json(
				{ message: "If that email is registered, you'll receive a reset link" },
				{ status: 200 }
			);
		}

		// Generate reset token
		const resetToken = randomBytes(32).toString("hex");
		const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

		// Save reset token to database
		await prisma.passwordResetToken.create({
			data: {
				email,
				token: resetToken,
				expires: resetTokenExpiry,
			},
		});

		// Here you would send an email with the reset link
		// For now, we'll just return success
		// In production, use a service like SendGrid, Resend, or similar

		console.log(`Password reset token for ${email}: ${resetToken}`);
		console.log(
			`Reset link: ${process.env.NEXTAUTH_URL}/auth/reset-password?token=${resetToken}`
		);

		return NextResponse.json(
			{ message: "If that email is registered, you'll receive a reset link" },
			{ status: 200 }
		);
	} catch (error) {
		if (error instanceof z.ZodError) {
			return NextResponse.json(
				{ message: error.errors[0].message },
				{ status: 400 }
			);
		}

		console.error("Forgot password error:", error);
		return NextResponse.json(
			{ message: "Internal server error" },
			{ status: 500 }
		);
	}
}
