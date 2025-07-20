import { Session } from "next-auth";

export enum UserRole {
	USER = "USER",
	ADMIN = "ADMIN",
	SUPER_ADMIN = "SUPER_ADMIN",
}

export interface RolePermissions {
	canViewUsers: boolean;
	canManageUsers: boolean;
	canViewAnalytics: boolean;
	canManageSystem: boolean;
	canAccessAPI: boolean;
	canManageQuotes: boolean;
	canViewReports: boolean;
	canManageIntegrations: boolean;
	canManageSettings: boolean;
	canViewAuditLogs: boolean;
}

export const getRolePermissions = (role: string): RolePermissions => {
	switch (role) {
		case UserRole.SUPER_ADMIN:
			return {
				canViewUsers: true,
				canManageUsers: true,
				canViewAnalytics: true,
				canManageSystem: true,
				canAccessAPI: true,
				canManageQuotes: true,
				canViewReports: true,
				canManageIntegrations: true,
				canManageSettings: true,
				canViewAuditLogs: true,
			};
		case UserRole.ADMIN:
			return {
				canViewUsers: true,
				canManageUsers: true,
				canViewAnalytics: true,
				canManageSystem: false,
				canAccessAPI: true,
				canManageQuotes: true,
				canViewReports: true,
				canManageIntegrations: true,
				canManageSettings: false,
				canViewAuditLogs: true,
			};
		case UserRole.USER:
		default:
			return {
				canViewUsers: false,
				canManageUsers: false,
				canViewAnalytics: false,
				canManageSystem: false,
				canAccessAPI: true,
				canManageQuotes: true,
				canViewReports: false,
				canManageIntegrations: false,
				canManageSettings: false,
				canViewAuditLogs: false,
			};
	}
};

export const hasPermission = (
	session: Session | null,
	permission: keyof RolePermissions
): boolean => {
	if (!session?.user?.role) return false;
	const permissions = getRolePermissions(session.user.role);
	return permissions[permission];
};

export const isAdmin = (session: Session | null): boolean => {
	return (
		session?.user?.role === UserRole.ADMIN ||
		session?.user?.role === UserRole.SUPER_ADMIN
	);
};

export const isSuperAdmin = (session: Session | null): boolean => {
	return session?.user?.role === UserRole.SUPER_ADMIN;
};

export const getRoleColor = (role: string): string => {
	switch (role) {
		case UserRole.SUPER_ADMIN:
			return "destructive";
		case UserRole.ADMIN:
			return "default";
		case UserRole.USER:
		default:
			return "secondary";
	}
};

export const getRoleIcon = (role: string): string => {
	switch (role) {
		case UserRole.SUPER_ADMIN:
			return "Crown";
		case UserRole.ADMIN:
			return "Shield";
		case UserRole.USER:
		default:
			return "User";
	}
};
