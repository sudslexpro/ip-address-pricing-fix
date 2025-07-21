import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { UserRole } from "@/lib/role-utils";

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

// PATCH /api/admin/users/[id]/deactivate - Deactivate user (set isActive to false)
export async function PATCH(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const session = await getServerSession(authOptions);
		const { id: userId } = await params;

		// Get current user to check permissions
		const currentUser = await prisma.user.findUnique({
			where: { id: userId },
			select: { role: true, isActive: true, name: true, email: true },
		});

		if (!currentUser) {
			return NextResponse.json({ error: "User not found" }, { status: 404 });
		}

		if (!checkUserPermission(session, userId, currentUser.role)) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
		}

		// Check if user is already inactive
		if (!currentUser.isActive) {
			return NextResponse.json(
				{ error: "User is already inactive" },
				{ status: 400 }
			);
		}

		// Deactivate the user
		const updatedUser = await prisma.user.update({
			where: { id: userId },
			data: {
				isActive: false,
				updatedAt: new Date(),
			},
			select: {
				id: true,
				name: true,
				email: true,
				role: true,
				isActive: true,
				updatedAt: true,
			},
		});

		return NextResponse.json({
			message: "User deactivated successfully",
			user: updatedUser,
		});
	} catch (error) {
		console.error("Error deactivating user:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
