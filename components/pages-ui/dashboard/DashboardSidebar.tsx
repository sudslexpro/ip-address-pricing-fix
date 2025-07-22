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
		const baseItems: SidebarItem[] = [
			{
				id: "overview",
				label: "Overview",
				icon: LayoutDashboard,
			},
			{
				id: "quotes",
				label: "Quotes",
				icon: FileText,
			},
			{
				id: "settings",
				label: "Settings",
				icon: Settings,
			},
		];

		// Add admin-specific items
		if (role === "ADMIN" || role === "SUPER_ADMIN") {
			baseItems.splice(2, 0, {
				id: "users",
				label: "User Management",
				icon: Users,
				requiredRole: "ADMIN",
			});
			baseItems.splice(3, 0, {
				id: "analytics",
				label: "Analytics",
				icon: BarChart3,
				requiredRole: "ADMIN",
			});
		}

		// Add super admin-specific items
		if (role === "SUPER_ADMIN") {
			baseItems.splice(-1, 0, {
				id: "system",
				label: "System Admin",
				icon: Crown,
				requiredRole: "SUPER_ADMIN",
			});
			baseItems.splice(-1, 0, {
				id: "security",
				label: "Security",
				icon: Shield,
				requiredRole: "SUPER_ADMIN",
			});
			baseItems.splice(-1, 0, {
				id: "monitoring",
				label: "Monitoring",
				icon: Eye,
				requiredRole: "SUPER_ADMIN",
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
						<h2 className="text-lg font-semibold text-foreground">Dashboard</h2>
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
			</div>

			{/* Sidebar Navigation */}
			<div className="flex-1 overflow-hidden">
				<ScrollArea className="h-full px-3 py-4">
					<nav className="space-y-2">
						{sidebarItems.map((item, index) => {
							const IconComponent = item.icon;
							const isActive = activeSection === item.id;
							const isAccessible =
								!item.requiredRole ||
								role === item.requiredRole ||
								(item.requiredRole === "ADMIN" && role === "SUPER_ADMIN");

							if (!isAccessible) return null;

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
