"use client";

import React, { useState, useEffect } from "react";
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
import { Label } from "@/components/ui/label";
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
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Alert, AlertDescription } from "@/components/ui/alert";
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
	Loader2,
	AlertCircle,
	Eye,
	UserX,
	ChevronLeft,
	ChevronRight,
	RefreshCw,
} from "lucide-react";
import { getRoleColor } from "@/lib/role-utils";

interface User {
	id: string;
	name: string;
	email: string;
	role: string;
	isActive: boolean;
	lastLoginAt: string | null;
	createdAt: string;
	image?: string;
	profile?: {
		firstName: string;
		lastName: string;
		company: string;
		position: string;
	};
}

interface UserManagementProps {
	currentUserRole: string;
}

interface CreateUserForm {
	name: string;
	email: string;
	password: string;
	role: string;
}

const UserManagement: React.FC<UserManagementProps> = ({ currentUserRole }) => {
	const [users, setUsers] = useState<User[]>([]);
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState("");
	const [roleFilter, setRoleFilter] = useState("all");
	const [statusFilter, setStatusFilter] = useState("all");
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [error, setError] = useState<string>("");

	// Dialog states
	const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);
	const [isEditUserOpen, setIsEditUserOpen] = useState(false);
	const [selectedUser, setSelectedUser] = useState<User | null>(null);
	const [deleteUserId, setDeleteUserId] = useState<string>("");

	// Form states
	const [createForm, setCreateForm] = useState<CreateUserForm>({
		name: "",
		email: "",
		password: "",
		role: "USER",
	});
	const [createLoading, setCreateLoading] = useState(false);
	const [editLoading, setEditLoading] = useState(false);
	const [deleteLoading, setDeleteLoading] = useState(false);
	const [refreshLoading, setRefreshLoading] = useState(false);
	const [permanentDeleteUserId, setPermanentDeleteUserId] =
		useState<string>("");
	const [permanentDeleteLoading, setPermanentDeleteLoading] = useState(false);

	// Fetch users from API
	const fetchUsers = async (isManualRefresh = false) => {
		try {
			if (isManualRefresh) {
				setRefreshLoading(true);
			} else {
				setLoading(true);
			}
			setError("");

			const params = new URLSearchParams({
				page: currentPage.toString(),
				limit: "10",
				...(searchTerm && { search: searchTerm }),
				...(roleFilter !== "all" && { role: roleFilter }),
				...(statusFilter !== "all" && { status: statusFilter }),
			});

			const response = await fetch(`/api/admin/users?${params}`);
			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || "Failed to fetch users");
			}

			setUsers(data.users);
			setTotalPages(data.pagination.totalPages);
		} catch (err: any) {
			setError(err.message);
		} finally {
			setLoading(false);
			setRefreshLoading(false);
		}
	};

	// Create user
	const handleCreateUser = async (e: React.FormEvent) => {
		e.preventDefault();
		setCreateLoading(true);
		setError("");

		try {
			const response = await fetch("/api/admin/users", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(createForm),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || "Failed to create user");
			}

			setIsCreateUserOpen(false);
			setCreateForm({ name: "", email: "", password: "", role: "USER" });
			fetchUsers();
		} catch (err: any) {
			setError(err.message);
		} finally {
			setCreateLoading(false);
		}
	};

	// Update user
	const handleUpdateUser = async (userId: string, updates: Partial<User>) => {
		setEditLoading(true);
		setError("");

		try {
			const response = await fetch(`/api/admin/users/${userId}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(updates),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || "Failed to update user");
			}

			setIsEditUserOpen(false);
			setSelectedUser(null);
			fetchUsers();
		} catch (err: any) {
			setError(err.message);
		} finally {
			setEditLoading(false);
		}
	};

	// Delete user (Deactivate - reversible)
	const handleDeleteUser = async (userId: string) => {
		setDeleteLoading(true);
		setError("");

		try {
			const response = await fetch(`/api/admin/users/${userId}/deactivate`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || "Failed to deactivate user");
			}

			setDeleteUserId("");
			fetchUsers();
		} catch (err: any) {
			setError(err.message);
		} finally {
			setDeleteLoading(false);
		}
	};

	// Permanent delete user (Super Admin only)
	const handlePermanentDeleteUser = async (userId: string) => {
		setPermanentDeleteLoading(true);
		setError("");

		try {
			const response = await fetch(`/api/admin/users/${userId}/delete`, {
				method: "DELETE",
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || "Failed to permanently delete user");
			}

			setPermanentDeleteUserId("");
			fetchUsers();
		} catch (err: any) {
			setError(err.message);
		} finally {
			setPermanentDeleteLoading(false);
		}
	};

	// Manual refresh handler
	const handleManualRefresh = () => {
		// Add a visual delay to show the rotation animation
		setRefreshLoading(true);

		// Small delay to ensure the animation is visible
		setTimeout(() => {
			fetchUsers(true);
		}, 1000);
	};

	// Effects
	useEffect(() => {
		fetchUsers();
	}, [currentPage, searchTerm, roleFilter, statusFilter]);

	useEffect(() => {
		setCurrentPage(1);
	}, [searchTerm, roleFilter, statusFilter]);

	// Auto-refresh every 30 seconds
	useEffect(() => {
		const interval = setInterval(() => {
			// Only auto-refresh if not loading and no dialogs are open
			if (
				!loading &&
				!refreshLoading &&
				!isCreateUserOpen &&
				!isEditUserOpen &&
				!deleteUserId &&
				!permanentDeleteUserId
			) {
				fetchUsers();
			}
		}, 30000);

		return () => clearInterval(interval);
	}, [
		loading,
		refreshLoading,
		isCreateUserOpen,
		isEditUserOpen,
		deleteUserId,
		permanentDeleteUserId,
		currentPage,
		searchTerm,
		roleFilter,
		statusFilter,
	]);

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

	const getStatusBadge = (user: User) => {
		if (user.isActive) {
			return (
				<Badge
					variant="default"
					className="bg-green-100 text-green-800 border-green-200">
					<CheckCircle className="h-3 w-3 mr-1" />
					Active
				</Badge>
			);
		} else {
			return (
				<Badge variant="secondary" className={`text-white`}>
					<XCircle className="h-3 w-3 mr-1" />
					Inactive
				</Badge>
			);
		}
	};

	const canManageUser = (userRole: string) => {
		if (currentUserRole === "SUPER_ADMIN") return true;
		if (currentUserRole === "ADMIN" && userRole !== "SUPER_ADMIN") return true;
		return false;
	};

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString();
	};

	const formatDateTime = (dateString: string | null) => {
		if (!dateString) return "Never";
		return new Date(dateString).toLocaleString();
	};

	return (
		<div className="space-y-6">
			{error && (
				<Alert variant="destructive">
					<AlertCircle className="h-4 w-4" />
					<AlertDescription>{error}</AlertDescription>
				</Alert>
			)}

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
						<div className="flex items-center gap-2">
							<Button
								variant="outline"
								size="sm"
								onClick={handleManualRefresh}
								disabled={refreshLoading}
								className="flex items-center gap-2 transition-all duration-200 hover:scale-105 group">
								<RefreshCw
									className={`h-4 w-4 transition-transform duration-500 ease-in-out ${
										refreshLoading ? "animate-spin" : ""
									}`}
								/>
								Refresh
							</Button>
							<Dialog
								open={isCreateUserOpen}
								onOpenChange={setIsCreateUserOpen}>
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
									<form onSubmit={handleCreateUser} className="space-y-4">
										<div className="space-y-2">
											<Label htmlFor="name">Full Name</Label>
											<Input
												id="name"
												value={createForm.name}
												onChange={(e) =>
													setCreateForm({ ...createForm, name: e.target.value })
												}
												placeholder="Enter full name"
												required
											/>
										</div>
										<div className="space-y-2">
											<Label htmlFor="email">Email</Label>
											<Input
												id="email"
												type="email"
												value={createForm.email}
												onChange={(e) =>
													setCreateForm({
														...createForm,
														email: e.target.value,
													})
												}
												placeholder="Enter email address"
												required
											/>
										</div>
										<div className="space-y-2">
											<Label htmlFor="password">Password</Label>
											<Input
												id="password"
												type="password"
												value={createForm.password}
												onChange={(e) =>
													setCreateForm({
														...createForm,
														password: e.target.value,
													})
												}
												placeholder="Enter password"
												required
											/>
										</div>
										<div className="space-y-2">
											<Label htmlFor="role">Role</Label>
											<Select
												value={createForm.role}
												onValueChange={(value) =>
													setCreateForm({ ...createForm, role: value })
												}>
												<SelectTrigger>
													<SelectValue placeholder="Select role" />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="USER">User</SelectItem>
													<SelectItem value="ADMIN">Admin</SelectItem>
													{currentUserRole === "SUPER_ADMIN" && (
														<SelectItem value="SUPER_ADMIN">
															Super Admin
														</SelectItem>
													)}
												</SelectContent>
											</Select>
										</div>
										<DialogFooter>
											<Button
												type="button"
												variant="outline"
												onClick={() => setIsCreateUserOpen(false)}>
												Cancel
											</Button>
											<Button type="submit" disabled={createLoading}>
												{createLoading && (
													<Loader2 className="mr-2 h-4 w-4 animate-spin" />
												)}
												Create User
											</Button>
										</DialogFooter>
									</form>
								</DialogContent>
							</Dialog>
						</div>
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
								{loading ? (
									<TableRow>
										<TableCell colSpan={6} className="text-center py-8">
											<Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
											<p>Loading users...</p>
										</TableCell>
									</TableRow>
								) : users.length === 0 ? (
									<TableRow>
										<TableCell colSpan={6} className="text-center py-8">
											<Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
											<p className="text-muted-foreground">
												No users found matching your criteria.
											</p>
										</TableCell>
									</TableRow>
								) : (
									users.map((user) => (
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
													className="flex items-center gap-1 text-white w-fit">
													{getRoleIcon(user.role)}
													{user.role}
												</Badge>
											</TableCell>
											<TableCell>{getStatusBadge(user)}</TableCell>
											<TableCell>
												<div className="text-sm">
													{formatDateTime(user.lastLoginAt)}
												</div>
											</TableCell>
											<TableCell>
												<div className="text-sm">
													{formatDate(user.createdAt)}
												</div>
											</TableCell>
											<TableCell className="text-right">
												<DropdownMenu>
													<DropdownMenuTrigger asChild>
														<Button variant="ghost" size="sm">
															<MoreHorizontal className="h-4 w-4" />
														</Button>
													</DropdownMenuTrigger>
													<DropdownMenuContent align="end">
														<DropdownMenuLabel>Actions</DropdownMenuLabel>
														<DropdownMenuItem
															onClick={() => {
																setSelectedUser(user);
																setIsEditUserOpen(true);
															}}>
															<Eye className="mr-2 h-4 w-4" />
															View Details
														</DropdownMenuItem>
														{canManageUser(user.role) && (
															<>
																<DropdownMenuItem
																	onClick={() => {
																		setSelectedUser(user);
																		setIsEditUserOpen(true);
																	}}>
																	<Edit className="mr-2 h-4 w-4" />
																	Edit User
																</DropdownMenuItem>
																<DropdownMenuSeparator />
																<DropdownMenuItem
																	onClick={() => setDeleteUserId(user.id)}
																	className="text-destructive">
																	<UserX className="mr-2 h-4 w-4" />
																	Deactivate User
																</DropdownMenuItem>
																{currentUserRole === "SUPER_ADMIN" && (
																	<DropdownMenuItem
																		onClick={() =>
																			setPermanentDeleteUserId(user.id)
																		}
																		className="text-destructive">
																		<Trash2 className="mr-2 h-4 w-4" />
																		Delete User
																	</DropdownMenuItem>
																)}
															</>
														)}
													</DropdownMenuContent>
												</DropdownMenu>
											</TableCell>
										</TableRow>
									))
								)}
							</TableBody>
						</Table>
					</div>

					{/* Pagination */}
					{totalPages > 1 && (
						<div className="flex items-center justify-between mt-4">
							<div className="text-sm text-muted-foreground">
								Page {currentPage} of {totalPages}
							</div>
							<div className="flex items-center gap-2">
								<Button
									variant="outline"
									size="sm"
									onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
									disabled={currentPage === 1}>
									<ChevronLeft className="h-4 w-4" />
									Previous
								</Button>
								<Button
									variant="outline"
									size="sm"
									onClick={() =>
										setCurrentPage(Math.min(totalPages, currentPage + 1))
									}
									disabled={currentPage === totalPages}>
									Next
									<ChevronRight className="h-4 w-4" />
								</Button>
							</div>
						</div>
					)}
				</CardContent>
			</Card>

			{/* Edit User Dialog */}
			<Dialog open={isEditUserOpen} onOpenChange={setIsEditUserOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Edit User</DialogTitle>
						<DialogDescription>
							Update user information and permissions.
						</DialogDescription>
					</DialogHeader>
					{selectedUser && (
						<div className="space-y-4">
							<div className="space-y-2">
								<Label>Name</Label>
								<Input
									value={selectedUser.name}
									onChange={(e) =>
										setSelectedUser({ ...selectedUser, name: e.target.value })
									}
								/>
							</div>
							<div className="space-y-2">
								<Label>Email</Label>
								<Input
									type="email"
									value={selectedUser.email}
									onChange={(e) =>
										setSelectedUser({ ...selectedUser, email: e.target.value })
									}
								/>
							</div>
							<div className="space-y-2">
								<Label>Role</Label>
								<Select
									value={selectedUser.role}
									onValueChange={(value) =>
										setSelectedUser({ ...selectedUser, role: value })
									}>
									<SelectTrigger>
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="USER">User</SelectItem>
										<SelectItem value="ADMIN">Admin</SelectItem>
										{currentUserRole === "SUPER_ADMIN" && (
											<SelectItem value="SUPER_ADMIN">Super Admin</SelectItem>
										)}
									</SelectContent>
								</Select>
							</div>
							<div className="flex items-center space-x-2">
								<input
									type="checkbox"
									id="isActive"
									checked={selectedUser.isActive}
									onChange={(e) =>
										setSelectedUser({
											...selectedUser,
											isActive: e.target.checked,
										})
									}
								/>
								<Label htmlFor="isActive">Active</Label>
							</div>
						</div>
					)}
					<DialogFooter>
						<Button variant="outline" onClick={() => setIsEditUserOpen(false)}>
							Cancel
						</Button>
						<Button
							onClick={() =>
								selectedUser && handleUpdateUser(selectedUser.id, selectedUser)
							}
							disabled={editLoading}>
							{editLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
							Update User
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{/* Delete Confirmation Dialog */}
			<AlertDialog
				open={!!deleteUserId}
				onOpenChange={() => setDeleteUserId("")}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Deactivate User</AlertDialogTitle>
						<AlertDialogDescription>
							This will deactivate the user account. The user will no longer be
							able to sign in, but their data will be preserved. This action can
							be reversed.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction
							onClick={() => handleDeleteUser(deleteUserId)}
							disabled={deleteLoading}
							className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
							{deleteLoading && (
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							)}
							Deactivate
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>

			{/* Permanent Delete Confirmation Dialog */}
			<AlertDialog
				open={!!permanentDeleteUserId}
				onOpenChange={() => setPermanentDeleteUserId("")}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Permanently Delete User</AlertDialogTitle>
						<AlertDialogDescription>
							<div className="space-y-2">
								<p className="font-medium text-destructive">
									⚠️ This action cannot be undone!
								</p>
								<p className={`text-justify`}>
									This will permanently delete the user account and all
									associated data. The user will be completely removed from the
									system and cannot be restored.
								</p>
								<p className="text-sm text-muted-foreground text-justify">
									Consider deactivating the user instead if you might need to
									restore access later.
								</p>
							</div>
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction
							onClick={() => handlePermanentDeleteUser(permanentDeleteUserId)}
							disabled={permanentDeleteLoading}
							className="bg-red-600 text-white hover:bg-red-700">
							{permanentDeleteLoading && (
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							)}
							Permanently Delete
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
};

export default UserManagement;
