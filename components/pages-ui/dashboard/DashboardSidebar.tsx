"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
	LayoutDashboard,
	Users,
	Settings,
	BarChart3,
	FileText,
	Shield,
	Activity,
	Key,
	Webhook,
	Database,
	Eye,
	Crown,
	Zap,
	ChevronLeft,
	ChevronRight,
} from "lucide-react";

interface SidebarItem {
	id: string;
	label: string;
	icon: React.ComponentType<{ className?: string }>;
	requiredRole?: "ADMIN" | "SUPER_ADMIN";
}

interface DashboardSidebarProps {
	role: string;
	roleRoute?: string;
	activeSection: string;
	onSectionChange: (section: string) => void;
	collapsed?: boolean;
	onToggleCollapse?: () => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
	role,
	roleRoute,
	activeSection,
	onSectionChange,
	collapsed = false,
	onToggleCollapse,
}) => {
	const getSidebarItems = (): SidebarItem[] => {
		// Determine which role's navigation to show based on roleRoute
		const targetRole = roleRoute
			? roleRoute.toUpperCase().replace("-", "_")
			: role;

		const baseItems: SidebarItem[] = [
			{
				id: "overview",
				label: "Overview",
				icon: LayoutDashboard,
			},
		];

		// User-specific items (always available)
		if (targetRole === "USER" || !roleRoute) {
			baseItems.push(
				{
					id: "quotes",
					label: "Quotes",
					icon: FileText,
				},
				{
					id: "settings",
					label: "Settings",
					icon: Settings,
				}
			);
		}

		// Admin-specific items
		if (targetRole === "ADMIN" || targetRole === "SUPER_ADMIN") {
			baseItems.push(
				{
					id: "users",
					label: "User Management",
					icon: Users,
					requiredRole: "ADMIN",
				},
				{
					id: "analytics",
					label: "Analytics",
					icon: BarChart3,
					requiredRole: "ADMIN",
				}
			);
		}

		// Super admin-specific items
		if (targetRole === "SUPER_ADMIN") {
			baseItems.push(
				{
					id: "system",
					label: "System Admin",
					icon: Crown,
					requiredRole: "SUPER_ADMIN",
				},
				{
					id: "security",
					label: "Security",
					icon: Shield,
					requiredRole: "SUPER_ADMIN",
				},
				{
					id: "monitoring",
					label: "Monitoring",
					icon: Eye,
					requiredRole: "SUPER_ADMIN",
				}
			);
		}

		// Add settings at the end for admin/super-admin routes
		if (targetRole === "ADMIN" || targetRole === "SUPER_ADMIN") {
			baseItems.push({
				id: "settings",
				label: "Settings",
				icon: Settings,
			});
		}

		return baseItems;
	};

	const sidebarItems = getSidebarItems();

	const handleItemClick = (itemId: string) => {
		onSectionChange(itemId);
	};

	return (
		<div
			className={cn(
				"bg-card border-r border-border flex flex-col h-full transition-all duration-300",
				collapsed ? "w-16" : "w-64"
			)}>
			{/* Sidebar Header */}
			<div className="p-4 border-b border-border flex-shrink-0">
				<div className="flex items-center justify-between">
					{!collapsed && (
						<div className="flex-1">
							<h2 className="text-lg font-semibold text-foreground">
								Dashboard
							</h2>
							{roleRoute && (
								<p className="text-xs text-muted-foreground">
									{roleRoute.charAt(0).toUpperCase() +
										roleRoute.slice(1).replace("-", " ")}{" "}
									View
								</p>
							)}
						</div>
					)}
					{onToggleCollapse && (
						<Button
							variant="ghost"
							size="sm"
							onClick={onToggleCollapse}
							className="p-2">
							{collapsed ? (
								<ChevronRight className="h-4 w-4" />
							) : (
								<ChevronLeft className="h-4 w-4" />
							)}
						</Button>
					)}
				</div>

				{/* Role Switcher - only show if user has multiple role access */}
				{!collapsed && (role === "ADMIN" || role === "SUPER_ADMIN") && (
					<div className="mt-3 space-y-1">
						<p className="text-xs text-muted-foreground mb-2">Switch View:</p>
						<div className="flex flex-wrap gap-1">
							<Button
								variant={roleRoute === "user" ? "secondary" : "ghost"}
								size="sm"
								className="text-xs h-7"
								onClick={() => onSectionChange("../user/overview")}>
								User
							</Button>
							{(role === "ADMIN" || role === "SUPER_ADMIN") && (
								<Button
									variant={roleRoute === "admin" ? "secondary" : "ghost"}
									size="sm"
									className="text-xs h-7"
									onClick={() => onSectionChange("../admin/overview")}>
									Admin
								</Button>
							)}
							{role === "SUPER_ADMIN" && (
								<Button
									variant={roleRoute === "super-admin" ? "secondary" : "ghost"}
									size="sm"
									className="text-xs h-7"
									onClick={() => onSectionChange("../super-admin/overview")}>
									Super Admin
								</Button>
							)}
						</div>
					</div>
				)}
			</div>

			{/* Sidebar Navigation */}
			<div className="flex-1 overflow-hidden">
				<ScrollArea className="h-full px-3 py-4">
					<nav className="space-y-2">
						{sidebarItems.map((item, index) => {
							const IconComponent = item.icon;
							const isActive = activeSection === item.id;

							// For role-based routes, show items based on the target role
							// For direct dashboard access, check user permissions
							const targetRole = roleRoute
								? roleRoute.toUpperCase().replace("-", "_")
								: role;
							const isAccessible =
								!item.requiredRole ||
								role === "SUPER_ADMIN" || // Super admin can access everything
								(item.requiredRole === "ADMIN" &&
									(role === "ADMIN" || role === "SUPER_ADMIN"));

							if (!isAccessible && !roleRoute) return null;

							return (
								<div key={item.id}>
									{/* Add separator before admin sections */}
									{((item.requiredRole === "ADMIN" && index > 0) ||
										(item.requiredRole === "SUPER_ADMIN" && index > 0)) && (
										<Separator className="my-2" />
									)}

									<Button
										variant={isActive ? "secondary" : "ghost"}
										className={cn(
											"w-full justify-start gap-3 h-10",
											collapsed ? "px-2" : "px-3",
											isActive && "bg-primary/10 text-primary border-primary/20"
										)}
										onClick={() => handleItemClick(item.id)}>
										<IconComponent
											className={cn(
												"h-4 w-4 shrink-0",
												isActive ? "text-primary" : "text-muted-foreground"
											)}
										/>
										{!collapsed && (
											<span
												className={cn(
													"text-sm font-medium",
													isActive ? "text-primary" : "text-foreground"
												)}>
												{item.label}
											</span>
										)}
									</Button>

									{/* Role indicators for special sections */}
									{!collapsed && item.requiredRole && (
										<div className="ml-7 mt-1">
											<span
												className={cn(
													"text-xs px-2 py-0.5 rounded-full",
													item.requiredRole === "SUPER_ADMIN"
														? "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300"
														: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300"
												)}>
												{item.requiredRole === "SUPER_ADMIN"
													? "Super Admin"
													: "Admin"}
											</span>
										</div>
									)}
								</div>
							);
						})}
					</nav>
				</ScrollArea>
			</div>

			{/* Sidebar Footer */}
			{!collapsed && (
				<div className="p-4 border-t border-border flex-shrink-0">
					<div className="text-xs text-muted-foreground">
						<div className="flex items-center gap-2">
							<span>Role:</span>
							<span
								className={cn(
									"font-medium px-2 py-1 rounded-full text-xs",
									role === "SUPER_ADMIN"
										? "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300"
										: role === "ADMIN"
										? "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300"
										: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
								)}>
								{role || "USER"}
							</span>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default DashboardSidebar;
