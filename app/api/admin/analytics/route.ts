import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { UserRole } from "@/lib/role-utils";

// GET /api/admin/analytics - Get dashboard analytics
export async function GET(request: NextRequest) {
	try {
		const session = await getServerSession(authOptions);

		// Check permissions
		if (
			!session?.user?.role ||
			(session.user.role !== UserRole.ADMIN &&
				session.user.role !== UserRole.SUPER_ADMIN)
		) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
		}

		const { searchParams } = new URL(request.url);
		const period = searchParams.get("period") || "30"; // days
		const startDate = new Date();
		startDate.setDate(startDate.getDate() - parseInt(period));

		// Get user statistics
		const [
			totalUsers,
			activeUsers,
			newUsers,
			usersByRole,
			userRegistrations,
			recentActivity,
		] = await Promise.all([
			// Total users
			prisma.user.count(),

			// Active users (logged in within last 30 days)
			prisma.user.count({
				where: {
					lastLoginAt: {
						gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
					},
				},
			}),

			// New users in period
			prisma.user.count({
				where: {
					createdAt: {
						gte: startDate,
					},
				},
			}),

			// Users by role
			prisma.user.groupBy({
				by: ["role"],
				_count: true,
				where:
					session.user.role === UserRole.ADMIN
						? {
								role: { not: UserRole.SUPER_ADMIN },
						  }
						: undefined,
			}),

			// User registrations over time
			prisma.$queryRaw`
				SELECT 
					DATE(created_at) as date,
					COUNT(*) as count
				FROM "User"
				WHERE created_at >= ${startDate}
				GROUP BY DATE(created_at)
				ORDER BY date ASC
			`,

			// Recent user activity
			prisma.user.findMany({
				where: {
					lastLoginAt: {
						gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
					},
				},
				select: {
					id: true,
					name: true,
					email: true,
					role: true,
					lastLoginAt: true,
				},
				orderBy: {
					lastLoginAt: "desc",
				},
				take: 10,
			}),
		]);

		// Calculate growth rate
		const previousPeriodUsers = await prisma.user.count({
			where: {
				createdAt: {
					gte: new Date(
						startDate.getTime() - parseInt(period) * 24 * 60 * 60 * 1000
					),
					lt: startDate,
				},
			},
		});

		const growthRate =
			previousPeriodUsers > 0
				? ((newUsers - previousPeriodUsers) / previousPeriodUsers) * 100
				: newUsers > 0
				? 100
				: 0;

		// Get system health metrics if super admin
		let systemMetrics = null;
		if (session.user.role === UserRole.SUPER_ADMIN) {
			const [sessionCount, accountCount] = await Promise.all([
				prisma.session.count(),
				prisma.account.count(),
			]);

			systemMetrics = {
				totalSessions: sessionCount,
				totalOAuthAccounts: accountCount,
				// Add more system metrics as needed
			};
		}

		return NextResponse.json({
			users: {
				total: totalUsers,
				active: activeUsers,
				new: newUsers,
				growthRate: Math.round(growthRate * 100) / 100,
				byRole: usersByRole.reduce((acc: any, curr: any) => {
					acc[curr.role] = curr._count;
					return acc;
				}, {}),
			},
			registrations: userRegistrations,
			recentActivity,
			systemMetrics,
			period: parseInt(period),
		});
	} catch (error) {
		console.error("Error fetching analytics:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
