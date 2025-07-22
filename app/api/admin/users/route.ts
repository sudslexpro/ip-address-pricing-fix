import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { UserRole } from "@/lib/role-utils";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { generateLPPUserId } from "@/lib/user-id-generator";

const createUserSchema = z.object({
	name: z.string().min(2, "Name must be at least 2 characters"),
	email: z.string().email("Invalid email address"),
	password: z.string().min(8, "Password must be at least 8 characters"),
	role: z.enum(["USER", "ADMIN", "SUPER_ADMIN"]).default("USER"),
});

const updateUserSchema = z.object({
	name: z.string().min(2, "Name must be at least 2 characters").optional(),
	email: z.string().email("Invalid email address").optional(),
	role: z.enum(["USER", "ADMIN", "SUPER_ADMIN"]).optional(),
	isActive: z.boolean().optional(),
});

// Check if user has permission to manage users
async function checkUserPermission(session: any, targetRole?: string) {
	if (!session?.user?.role) return false;

	if (session.user.role === UserRole.SUPER_ADMIN) return true;
	if (session.user.role === UserRole.ADMIN) {
		// Admins can manage users but not super admins
		return !targetRole || targetRole !== UserRole.SUPER_ADMIN;
	}

	return false;
}

// GET /api/admin/users - Get all users
export async function GET(request: NextRequest) {
	try {
		const session = await getServerSession(authOptions);

		if (!checkUserPermission(session)) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
		}

		const { searchParams } = new URL(request.url);
		const page = parseInt(searchParams.get("page") || "1");
		const limit = parseInt(searchParams.get("limit") || "10");
		const search = searchParams.get("search") || "";
		const role = searchParams.get("role") || "";
		const status = searchParams.get("status") || "";

		const skip = (page - 1) * limit;

		const where: any = {};

		if (search) {
			where.OR = [
				{ name: { contains: search, mode: "insensitive" } },
				{ email: { contains: search, mode: "insensitive" } },
			];
		}

		if (role && role !== "all") {
			where.role = role;
		}

		if (status && status !== "all") {
			where.isActive = status === "active";
		}

		// Admins cannot see super admins
		if (session?.user?.role === UserRole.ADMIN) {
			where.role = {
				not: UserRole.SUPER_ADMIN,
			};
		}

		const [users, total] = await Promise.all([
			prisma.user.findMany({
				where,
				skip,
				take: limit,
				select: {
					id: true,
					name: true,
					email: true,
					role: true,
					isActive: true,
					lastLoginAt: true,
					createdAt: true,
					image: true,
					profile: {
						select: {
							firstName: true,
							lastName: true,
							company: true,
							position: true,
						},
					},
				},
				orderBy: { createdAt: "desc" },
			}),
			prisma.user.count({ where }),
		]);

		const response = NextResponse.json({
			users,
			pagination: {
				page,
				limit,
				total,
				totalPages: Math.ceil(total / limit),
			},
		});

		// Add cache control headers to ensure fresh data
		response.headers.set(
			"Cache-Control",
			"no-cache, no-store, must-revalidate"
		);
		response.headers.set("Pragma", "no-cache");
		response.headers.set("Expires", "0");

		return response;
	} catch (error) {
		console.error("Error fetching users:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}

// POST /api/admin/users - Create new user
export async function POST(request: NextRequest) {
	try {
		const session = await getServerSession(authOptions);
		const body = await request.json();
		const { name, email, password, role } = createUserSchema.parse(body);

		if (!checkUserPermission(session, role)) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
		}

		// Check if user already exists
		const existingUser = await prisma.user.findUnique({
			where: { email },
		});

		if (existingUser) {
			return NextResponse.json(
				{ error: "User with this email already exists" },
				{ status: 400 }
			);
		}

		// Hash password
		const hashedPassword = await bcrypt.hash(password, 12);

		// Generate unique LPP user ID
		let userId = generateLPPUserId();

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

			userId = generateLPPUserId();
			attempts++;
		}

		if (attempts >= maxAttempts) {
			return NextResponse.json(
				{ error: "Unable to generate unique user ID. Please try again." },
				{ status: 500 }
			);
		}

		// Create user
		const user = await prisma.user.create({
			data: {
				id: userId,
				name,
				email,
				password: hashedPassword,
				role: role as any,
			},
			select: {
				id: true,
				name: true,
				email: true,
				role: true,
				isActive: true,
				createdAt: true,
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

		return NextResponse.json(
			{
				message: "User created successfully",
				user,
			},
			{ status: 201 }
		);
	} catch (error) {
		if (error instanceof z.ZodError) {
			return NextResponse.json(
				{ error: error.errors[0].message },
				{ status: 400 }
			);
		}

		console.error("Error creating user:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
