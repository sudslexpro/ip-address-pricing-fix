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

	// Only SUPER_ADMIN can permanently delete users
	if (session.user.role === UserRole.SUPER_ADMIN) return true;

	return false;
}

// DELETE /api/admin/users/[id]/delete - Permanently delete user (Super Admin only)
export async function DELETE(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const session = await getServerSession(authOptions);
		const { id: userId } = await params;

		// Only SUPER_ADMIN can permanently delete users
		if (session?.user?.role !== UserRole.SUPER_ADMIN) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
		}

		// Get current user to check permissions and get user info
		const currentUser = await prisma.user.findUnique({
			where: { id: userId },
			select: {
				id: true,
				role: true,
				name: true,
				email: true,
				_count: {
					select: {
						sessions: true,
						accounts: true,
					},
				},
			},
		});

		if (!currentUser) {
			return NextResponse.json({ error: "User not found" }, { status: 404 });
		}

		if (!checkUserPermission(session, userId, currentUser.role)) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
		}

		// Prevent deletion of the current user
		if (session.user.id === userId) {
			return NextResponse.json(
				{ error: "Cannot delete your own account" },
				{ status: 400 }
			);
		}

		// Start a transaction to delete user and related data
		await prisma.$transaction(async (tx) => {
			// Delete user profile
			await tx.userProfile.deleteMany({
				where: { userId: userId },
			});

			// Delete user sessions
			await tx.session.deleteMany({
				where: { userId: userId },
			});

			// Delete user accounts
			await tx.account.deleteMany({
				where: { userId: userId },
			});

			// Finally delete the user
			await tx.user.delete({
				where: { id: userId },
			});
		});

		return NextResponse.json({
			message: "User permanently deleted successfully",
			deletedUser: {
				id: currentUser.id,
				name: currentUser.name,
				email: currentUser.email,
				role: currentUser.role,
			},
		});
	} catch (error) {
		console.error("Error permanently deleting user:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
