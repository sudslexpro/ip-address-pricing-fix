import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { UserRole } from "@/lib/role-utils";
import { z } from "zod";

const updateUserSchema = z.object({
	name: z.string().min(2, "Name must be at least 2 characters").optional(),
	email: z.string().email("Invalid email address").optional(),
	role: z.enum(["USER", "ADMIN", "SUPER_ADMIN"]).optional(),
	isActive: z.boolean().optional(),
});

// Check if user has permission to manage users
async function checkUserPermission(
	session: any,
	targetUserId: string,
	targetRole?: string
) {
	if (!session?.user?.role) return false;

	// Users cannot modify themselves through admin API
	if (session.user.id === targetUserId) return false;

	if (session.user.role === UserRole.SUPER_ADMIN) return true;
	if (session.user.role === UserRole.ADMIN) {
		// Admins can manage users but not super admins
		return !targetRole || targetRole !== UserRole.SUPER_ADMIN;
	}

	return false;
}

// GET /api/admin/users/[id] - Get user by ID
export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const session = await getServerSession(authOptions);
		const { id: userId } = await params;

		if (!session?.user?.role || !checkUserPermission(session, userId)) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
		}

		const user = await prisma.user.findUnique({
			where: { id: userId },
			select: {
				id: true,
				name: true,
				email: true,
				role: true,
				isActive: true,
				lastLoginAt: true,
				createdAt: true,
				updatedAt: true,
				image: true,
				profile: {
					select: {
						firstName: true,
						lastName: true,
						phoneNumber: true,
						company: true,
						position: true,
						bio: true,
						location: true,
						website: true,
					},
				},
				_count: {
					select: {
						sessions: true,
						accounts: true,
					},
				},
			},
		});

		if (!user) {
			return NextResponse.json({ error: "User not found" }, { status: 404 });
		}

		// Admins cannot view super admin details
		if (
			session.user.role === UserRole.ADMIN &&
			user.role === UserRole.SUPER_ADMIN
		) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
		}

		const response = NextResponse.json({ user });

		// Add cache control headers to ensure fresh data
		response.headers.set(
			"Cache-Control",
			"no-cache, no-store, must-revalidate"
		);
		response.headers.set("Pragma", "no-cache");
		response.headers.set("Expires", "0");

		return response;
	} catch (error) {
		console.error("Error fetching user:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}

// PUT /api/admin/users/[id] - Update user
export async function PUT(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const session = await getServerSession(authOptions);
		const { id: userId } = await params;
		const body = await request.json();

		// Get current user to check permissions
		const currentUser = await prisma.user.findUnique({
			where: { id: userId },
			select: { role: true },
		});

		if (!currentUser) {
			return NextResponse.json({ error: "User not found" }, { status: 404 });
		}

		const updateData = updateUserSchema.parse(body);

		if (!checkUserPermission(session, userId, currentUser.role)) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
		}

		// Additional check for role updates
		if (
			updateData.role &&
			!checkUserPermission(session, userId, updateData.role)
		) {
			return NextResponse.json(
				{ error: "Cannot assign this role" },
				{ status: 403 }
			);
		}

		// Check if email is already taken by another user
		if (updateData.email) {
			const existingUser = await prisma.user.findFirst({
				where: {
					email: updateData.email,
					id: { not: userId },
				},
			});

			if (existingUser) {
				return NextResponse.json(
					{ error: "Email already in use" },
					{ status: 400 }
				);
			}
		}

		const updatedUser = await prisma.user.update({
			where: { id: userId },
			data: updateData,
			select: {
				id: true,
				name: true,
				email: true,
				role: true,
				isActive: true,
				lastLoginAt: true,
				createdAt: true,
				updatedAt: true,
			},
		});

		return NextResponse.json({
			message: "User updated successfully",
			user: updatedUser,
		});
	} catch (error) {
		if (error instanceof z.ZodError) {
			return NextResponse.json(
				{ error: error.errors[0].message },
				{ status: 400 }
			);
		}

		console.error("Error updating user:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}

// DELETE /api/admin/users/[id] - Delete user
export async function DELETE(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const session = await getServerSession(authOptions);
		const { id: userId } = await params;

		// Get current user to check permissions
		const currentUser = await prisma.user.findUnique({
			where: { id: userId },
			select: { role: true },
		});

		if (!currentUser) {
			return NextResponse.json({ error: "User not found" }, { status: 404 });
		}

		if (!checkUserPermission(session, userId, currentUser.role)) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
		}

		// Instead of deleting, we'll deactivate the user for data integrity
		await prisma.user.update({
			where: { id: userId },
			data: { isActive: false },
		});

		return NextResponse.json({
			message: "User deactivated successfully",
		});
	} catch (error) {
		console.error("Error deleting user:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
