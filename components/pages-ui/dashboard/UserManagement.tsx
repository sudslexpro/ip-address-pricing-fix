"use client";

import React, { useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Users,
	Search,
	Plus,
	MoreHorizontal,
	Edit,
	Trash2,
	Shield,
	User,
	Crown,
	CheckCircle,
	XCircle,
	Filter,
} from "lucide-react";
import { getRoleColor } from "@/lib/role-utils";

interface UserManagementProps {
	currentUserRole: string;
}

interface MockUser {
	id: string;
	name: string;
	email: string;
	role: string;
	status: "active" | "inactive" | "suspended";
	lastLogin: string;
	created: string;
	image?: string;
}

const UserManagement: React.FC<UserManagementProps> = ({ currentUserRole }) => {
	const [searchTerm, setSearchTerm] = useState("");
	const [roleFilter, setRoleFilter] = useState("all");
	const [statusFilter, setStatusFilter] = useState("all");
	const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);

	// Mock data - in real app, this would come from API
	const mockUsers: MockUser[] = [
		{
			id: "1",
			name: "John Doe",
			email: "john.doe@example.com",
			role: "USER",
			status: "active",
			lastLogin: "2024-01-15",
			created: "2023-06-15",
			image:
				"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
		},
		{
			id: "2",
			name: "Sarah Wilson",
			email: "sarah.wilson@example.com",
			role: "ADMIN",
			status: "active",
			lastLogin: "2024-01-14",
			created: "2023-03-10",
		},
		{
			id: "3",
			name: "Mike Johnson",
			email: "mike.johnson@example.com",
			role: "USER",
			status: "inactive",
			lastLogin: "2024-01-10",
			created: "2023-08-22",
		},
		{
			id: "4",
			name: "Emily Chen",
			email: "emily.chen@example.com",
			role: "USER",
			status: "suspended",
			lastLogin: "2024-01-05",
			created: "2023-11-30",
		},
		{
			id: "5",
			name: "David Brown",
			email: "david.brown@example.com",
			role: "SUPER_ADMIN",
			status: "active",
			lastLogin: "2024-01-15",
			created: "2023-01-01",
		},
	];

	const getRoleIcon = (role: string) => {
		switch (role) {
			case "SUPER_ADMIN":
				return <Crown className="h-4 w-4" />;
			case "ADMIN":
				return <Shield className="h-4 w-4" />;
			case "USER":
			default:
				return <User className="h-4 w-4" />;
		}
	};

	const getStatusBadge = (status: string) => {
		switch (status) {
			case "active":
				return (
					<Badge
						variant="default"
						className="bg-green-100 text-green-800 border-green-200">
						<CheckCircle className="h-3 w-3 mr-1" />
						Active
					</Badge>
				);
			case "inactive":
				return (
					<Badge variant="secondary">
						<XCircle className="h-3 w-3 mr-1" />
						Inactive
					</Badge>
				);
			case "suspended":
				return (
					<Badge variant="destructive">
						<XCircle className="h-3 w-3 mr-1" />
						Suspended
					</Badge>
				);
			default:
				return <Badge variant="secondary">{status}</Badge>;
		}
	};

	const filteredUsers = mockUsers.filter((user) => {
		const matchesSearch =
			user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			user.email.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesRole = roleFilter === "all" || user.role === roleFilter;
		const matchesStatus =
			statusFilter === "all" || user.status === statusFilter;

		return matchesSearch && matchesRole && matchesStatus;
	});

	const canManageUser = (userRole: string) => {
		if (currentUserRole === "SUPER_ADMIN") return true;
		if (currentUserRole === "ADMIN" && userRole !== "SUPER_ADMIN") return true;
		return false;
	};

	return (
		<div className="space-y-6">
			<Card>
				<CardHeader>
					<div className="flex items-center justify-between">
						<div>
							<CardTitle className="flex items-center gap-2">
								<Users className="h-5 w-5" />
								User Management
							</CardTitle>
							<CardDescription>
								Manage user accounts, roles, and permissions
							</CardDescription>
						</div>
						<Dialog open={isCreateUserOpen} onOpenChange={setIsCreateUserOpen}>
							<DialogTrigger asChild>
								<Button className="flex items-center gap-2">
									<Plus className="h-4 w-4" />
									Add User
								</Button>
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle>Create New User</DialogTitle>
									<DialogDescription>
										Add a new user to the system with appropriate role and
										permissions.
									</DialogDescription>
								</DialogHeader>
								{/* Add form content here */}
								<div className="space-y-4">
									<p className="text-sm text-muted-foreground">
										User creation form would be implemented here...
									</p>
								</div>
							</DialogContent>
						</Dialog>
					</div>
				</CardHeader>
				<CardContent>
					{/* Filters and Search */}
					<div className="flex flex-col sm:flex-row gap-4 mb-6">
						<div className="relative flex-1">
							<Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
							<Input
								placeholder="Search users..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="pl-8"
							/>
						</div>
						<Select value={roleFilter} onValueChange={setRoleFilter}>
							<SelectTrigger className="w-[150px]">
								<SelectValue placeholder="All Roles" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">All Roles</SelectItem>
								<SelectItem value="USER">User</SelectItem>
								<SelectItem value="ADMIN">Admin</SelectItem>
								{currentUserRole === "SUPER_ADMIN" && (
									<SelectItem value="SUPER_ADMIN">Super Admin</SelectItem>
								)}
							</SelectContent>
						</Select>
						<Select value={statusFilter} onValueChange={setStatusFilter}>
							<SelectTrigger className="w-[150px]">
								<Filter className="h-4 w-4 mr-2" />
								<SelectValue placeholder="All Status" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">All Status</SelectItem>
								<SelectItem value="active">Active</SelectItem>
								<SelectItem value="inactive">Inactive</SelectItem>
								<SelectItem value="suspended">Suspended</SelectItem>
							</SelectContent>
						</Select>
					</div>

					{/* Users Table */}
					<div className="rounded-md border">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>User</TableHead>
									<TableHead>Role</TableHead>
									<TableHead>Status</TableHead>
									<TableHead>Last Login</TableHead>
									<TableHead>Created</TableHead>
									<TableHead className="text-right">Actions</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{filteredUsers.map((user) => (
									<TableRow key={user.id}>
										<TableCell>
											<div className="flex items-center space-x-3">
												<Avatar className="h-8 w-8">
													<AvatarImage src={user.image} alt={user.name} />
													<AvatarFallback>
														{user.name
															.split(" ")
															.map((n) => n[0])
															.join("")}
													</AvatarFallback>
												</Avatar>
												<div>
													<div className="font-medium">{user.name}</div>
													<div className="text-sm text-muted-foreground">
														{user.email}
													</div>
												</div>
											</div>
										</TableCell>
										<TableCell>
											<Badge
												variant={getRoleColor(user.role) as any}
												className="flex items-center gap-1 w-fit">
												{getRoleIcon(user.role)}
												{user.role}
											</Badge>
										</TableCell>
										<TableCell>{getStatusBadge(user.status)}</TableCell>
										<TableCell>
											<div className="text-sm">{user.lastLogin}</div>
										</TableCell>
										<TableCell>
											<div className="text-sm">{user.created}</div>
										</TableCell>
										<TableCell className="text-right">
											<div className="flex items-center justify-end space-x-2">
												{canManageUser(user.role) && (
													<>
														<Button variant="ghost" size="sm">
															<Edit className="h-4 w-4" />
														</Button>
														<Button
															variant="ghost"
															size="sm"
															className="text-destructive hover:text-destructive">
															<Trash2 className="h-4 w-4" />
														</Button>
													</>
												)}
												<Button variant="ghost" size="sm">
													<MoreHorizontal className="h-4 w-4" />
												</Button>
											</div>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>

					{filteredUsers.length === 0 && (
						<div className="text-center py-8">
							<Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
							<p className="text-muted-foreground">
								No users found matching your criteria.
							</p>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
};

export default UserManagement;
