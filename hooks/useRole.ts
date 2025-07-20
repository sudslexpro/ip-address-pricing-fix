"use client";

import { useSession } from "next-auth/react";
import {
	getRolePermissions,
	hasPermission,
	isAdmin,
	isSuperAdmin,
	type RolePermissions,
} from "@/lib/role-utils";

export function useRole() {
	const { data: session, status } = useSession();

	const permissions = session?.user?.role
		? getRolePermissions(session.user.role)
		: null;

	return {
		session,
		status,
		user: session?.user,
		role: session?.user?.role,
		permissions,
		isLoading: status === "loading",
		isAuthenticated: !!session,
		isAdmin: isAdmin(session),
		isSuperAdmin: isSuperAdmin(session),
		hasPermission: (permission: keyof RolePermissions) =>
			hasPermission(session, permission),
	};
}
