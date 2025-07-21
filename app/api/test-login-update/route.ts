import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// Test endpoint to manually update lastLoginAt
export async function POST(request: NextRequest) {
	try {
		const session = await getServerSession(authOptions);

		if (!session?.user?.email) {
			return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
		}

		// Update lastLoginAt for the current user
		const updatedUser = await prisma.user.update({
			where: { email: session.user.email },
			data: { lastLoginAt: new Date() },
			select: {
				id: true,
				email: true,
				lastLoginAt: true,
				name: true,
			},
		});

		return NextResponse.json({
			success: true,
			message: "LastLoginAt updated successfully",
			user: updatedUser,
		});
	} catch (error) {
		console.error("Error updating lastLoginAt:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}

// Test endpoint to get current user's lastLoginAt
export async function GET(request: NextRequest) {
	try {
		const session = await getServerSession(authOptions);

		if (!session?.user?.email) {
			return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
		}

		const user = await prisma.user.findUnique({
			where: { email: session.user.email },
			select: {
				id: true,
				email: true,
				lastLoginAt: true,
				name: true,
			},
		});

		if (!user) {
			return NextResponse.json({ error: "User not found" }, { status: 404 });
		}

		return NextResponse.json({
			success: true,
			user,
		});
	} catch (error) {
		console.error("Error fetching user:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
