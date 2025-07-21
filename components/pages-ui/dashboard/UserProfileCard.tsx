"use client";

import React from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	User,
	Mail,
	Calendar,
	Shield,
	Settings,
	LogOut,
	Crown,
	CheckCircle,
	Clock,
} from "lucide-react";
import { getRoleColor, getRoleIcon } from "@/lib/role-utils";

interface UserProfileCardProps {
	user: any;
	onSignOut: () => void;
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({
	user,
	onSignOut,
}) => {
	const roleIcon = getRoleIcon(user.role);
	const roleColor = getRoleColor(user.role);

	const getCreatedDate = () => {
		// Mock creation date - in real app, this would come from user data
		return new Date(
			Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000
		).toLocaleDateString();
	};

	const getLastLoginDate = () => {
		// Mock last login - in real app, this would come from user data
		return new Date().toLocaleDateString();
	};

	const getRoleDescription = (role: string) => {
		switch (role) {
			case "SUPER_ADMIN":
				return "Full system administrator with complete access to all features and settings.";
			case "ADMIN":
				return "Administrator with user management and system oversight capabilities.";
			case "USER":
			default:
				return "Standard user with access to quote generation and personal account management.";
		}
	};

	const getRoleFeatures = (role: string) => {
		switch (role) {
			case "SUPER_ADMIN":
				return [
					"Complete system control",
					"User & role management",
					"Database administration",
					"Security management",
					"Performance monitoring",
					"All user features",
				];
			case "ADMIN":
				return [
					"User management",
					"Quote oversight",
					"Analytics access",
					"Integration management",
					"Audit log access",
					"All user features",
				];
			case "USER":
			default:
				return [
					"Quote generation",
					"Account management",
					"Basic reporting",
					"Integration setup",
				];
		}
	};

	return (
		<Card className="lg:col-span-2">
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<User className="h-5 w-5" />
					Profile Information
				</CardTitle>
				<CardDescription>
					Your account details and role permissions
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-6">
				{/* Basic Profile Info */}
				<div className="flex items-center space-x-4">
					<Avatar className="h-16 w-16">
						<AvatarImage src={user.image || ""} alt={user.name || ""} />
						<AvatarFallback>
							{user.name
								?.split(" ")
								.map((n: string) => n[0])
								.join("") || "U"}
						</AvatarFallback>
					</Avatar>
					<div className="space-y-2">
						<h3 className="text-xl font-semibold">{user.name}</h3>
						<div className="flex items-center text-muted-foreground">
							<Mail className="h-4 w-4 mr-2" />
							{user.email}
						</div>
						<div className="flex items-center gap-2">
							<Badge
								variant={roleColor as any}
								className="flex items-center gap-1">
								{roleIcon === "Crown" && <Crown className="h-3 w-3" />}
								{roleIcon === "Shield" && <Shield className="h-3 w-3" />}
								{roleIcon === "User" && <User className="h-3 w-3" />}
								{user.role || "USER"}
							</Badge>
							<Badge variant="outline" className="flex items-center gap-1">
								<CheckCircle className="h-3 w-3 text-green-500" />
								Active
							</Badge>
						</div>
					</div>
				</div>

				{/* Role Description */}
				<div className="bg-muted/50 rounded-lg p-4">
					<h4 className="font-medium text-foreground mb-2">
						Role: {user.role}
					</h4>
					<p className="text-sm text-muted-foreground mb-3">
						{getRoleDescription(user.role)}
					</p>
					<div className="space-y-1">
						<h5 className="text-xs font-medium text-foreground">
							Permissions:
						</h5>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
							{getRoleFeatures(user.role).map((feature, index) => (
								<div
									key={index}
									className="flex items-center gap-1 text-xs text-muted-foreground">
									<CheckCircle className="h-3 w-3 text-green-500" />
									{feature}
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Account Details */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div className="space-y-2">
						<h4 className="font-medium text-foreground">Account Status</h4>
						<Badge variant="default" className="flex items-center gap-1 w-fit">
							<CheckCircle className="h-3 w-3" />
							Active & Verified
						</Badge>
					</div>
					<div className="space-y-2">
						<h4 className="font-medium text-foreground">Member Since</h4>
						<div className="flex items-center text-muted-foreground">
							<Calendar className="h-4 w-4 mr-2" />
							{getCreatedDate()}
						</div>
					</div>
					<div className="space-y-2">
						<h4 className="font-medium text-foreground">Last Login</h4>
						<div className="flex items-center text-muted-foreground">
							<Clock className="h-4 w-4 mr-2" />
							{getLastLoginDate()}
						</div>
					</div>
					<div className="space-y-2">
						<h4 className="font-medium text-foreground">Account Type</h4>
						<Badge variant="secondary">
							{user.role === "SUPER_ADMIN"
								? "Enterprise"
								: user.role === "ADMIN"
								? "Professional"
								: "Standard"}
						</Badge>
					</div>
				</div>

				{/* Action Buttons */}
				<div className="flex flex-wrap gap-3 pt-4 border-t">
					<Button variant="outline" className="flex items-center gap-2">
						<Settings className="h-4 w-4" />
						Edit Profile
					</Button>
					<Button variant="outline" className="flex items-center gap-2">
						<Shield className="h-4 w-4" />
						Security Settings
					</Button>
					<Button
						variant="outline"
						onClick={onSignOut}
						className="flex items-center gap-2">
						<LogOut className="h-4 w-4" />
						Sign Out
					</Button>
				</div>
			</CardContent>
		</Card>
	);
};

export default UserProfileCard;
