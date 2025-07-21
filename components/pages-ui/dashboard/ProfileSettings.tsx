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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
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
	User,
	Mail,
	Phone,
	MapPin,
	Building,
	Calendar,
	Shield,
	Settings,
	Bell,
	Lock,
	Camera,
	Save,
	Eye,
	EyeOff,
	AlertCircle,
	CheckCircle,
	Crown,
	LogOut,
	Trash2,
	Edit3,
	Clock,
	Globe,
	Smartphone,
	Monitor,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getRoleIcon, getRoleColor } from "@/lib/role-utils";
import UserProfileCard from "./UserProfileCard";

interface ProfileSettingsProps {
	user: any;
	role: string;
	onSignOut: () => void;
}

interface ProfileForm {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	company: string;
	position: string;
	address: string;
	city: string;
	country: string;
	bio: string;
	website: string;
	timezone: string;
	language: string;
}

interface NotificationSettings {
	emailNotifications: boolean;
	pushNotifications: boolean;
	smsNotifications: boolean;
	quoteUpdates: boolean;
	systemUpdates: boolean;
	marketingEmails: boolean;
	securityAlerts: boolean;
	weeklyDigest: boolean;
}

interface SecuritySettings {
	twoFactorEnabled: boolean;
	sessionTimeout: string;
	passwordChangeRequired: boolean;
	loginNotifications: boolean;
	deviceManagement: boolean;
}

interface ActivityLog {
	id: string;
	action: string;
	description: string;
	timestamp: string;
	device: string;
	location: string;
	ipAddress: string;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({
	user,
	role,
	onSignOut,
}) => {
	// Form states
	const [profileForm, setProfileForm] = useState<ProfileForm>({
		firstName: user.name?.split(" ")[0] || "",
		lastName: user.name?.split(" ").slice(1).join(" ") || "",
		email: user.email || "",
		phone: "",
		company: "",
		position: "",
		address: "",
		city: "",
		country: "",
		bio: "",
		website: "",
		timezone: "UTC",
		language: "en",
	});

	const [notifications, setNotifications] = useState<NotificationSettings>({
		emailNotifications: true,
		pushNotifications: true,
		smsNotifications: false,
		quoteUpdates: true,
		systemUpdates: true,
		marketingEmails: false,
		securityAlerts: true,
		weeklyDigest: true,
	});

	const [security, setSecurity] = useState<SecuritySettings>({
		twoFactorEnabled: false,
		sessionTimeout: "8h",
		passwordChangeRequired: false,
		loginNotifications: true,
		deviceManagement: true,
	});

	const [activityLogs] = useState<ActivityLog[]>([
		{
			id: "1",
			action: "Login",
			description: "Successful login to dashboard",
			timestamp: new Date().toISOString(),
			device: "Chrome on Windows",
			location: "New York, US",
			ipAddress: "192.168.1.1",
		},
		{
			id: "2",
			action: "Profile Update",
			description: "Updated profile information",
			timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
			device: "Safari on macOS",
			location: "San Francisco, US",
			ipAddress: "192.168.1.2",
		},
		{
			id: "3",
			action: "Password Change",
			description: "Password successfully changed",
			timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
			device: "Firefox on Linux",
			location: "London, UK",
			ipAddress: "192.168.1.3",
		},
		{
			id: "4",
			action: "Quote Generated",
			description: "Generated new trademark quote #TM-2024-001",
			timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
			device: "Chrome on Android",
			location: "Toronto, CA",
			ipAddress: "192.168.1.4",
		},
	]);

	// UI states
	const [loading, setLoading] = useState(false);
	const [saving, setSaving] = useState(false);
	const [success, setSuccess] = useState("");
	const [error, setError] = useState("");
	const [showChangePassword, setShowChangePassword] = useState(false);
	const [showDeleteAccount, setShowDeleteAccount] = useState(false);
	const [avatarUploading, setAvatarUploading] = useState(false);

	// Password change form
	const [passwordForm, setPasswordForm] = useState({
		currentPassword: "",
		newPassword: "",
		confirmPassword: "",
	});
	const [showPasswords, setShowPasswords] = useState({
		current: false,
		new: false,
		confirm: false,
	});

	// Handlers
	const handleProfileSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setSaving(true);
		setError("");
		setSuccess("");

		try {
			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1000));
			setSuccess("Profile updated successfully!");
		} catch (err: any) {
			setError(err.message || "Failed to update profile");
		} finally {
			setSaving(false);
		}
	};

	const handleNotificationChange = (key: keyof NotificationSettings) => {
		setNotifications((prev) => ({
			...prev,
			[key]: !prev[key],
		}));
	};

	const handleSecurityChange = (key: keyof SecuritySettings, value: any) => {
		setSecurity((prev) => ({
			...prev,
			[key]: value,
		}));
	};

	const handlePasswordChange = async (e: React.FormEvent) => {
		e.preventDefault();
		if (passwordForm.newPassword !== passwordForm.confirmPassword) {
			setError("New passwords do not match");
			return;
		}

		setSaving(true);
		setError("");

		try {
			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1000));
			setSuccess("Password changed successfully!");
			setShowChangePassword(false);
			setPasswordForm({
				currentPassword: "",
				newPassword: "",
				confirmPassword: "",
			});
		} catch (err: any) {
			setError(err.message || "Failed to change password");
		} finally {
			setSaving(false);
		}
	};

	const handleAvatarUpload = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const file = event.target.files?.[0];
		if (!file) return;

		setAvatarUploading(true);
		try {
			// Simulate avatar upload
			await new Promise((resolve) => setTimeout(resolve, 1500));
			setSuccess("Avatar updated successfully!");
		} catch (err: any) {
			setError("Failed to upload avatar");
		} finally {
			setAvatarUploading(false);
		}
	};

	const formatTimestamp = (timestamp: string) => {
		return new Date(timestamp).toLocaleString();
	};

	const getDeviceIcon = (device: string) => {
		if (device.includes("Android") || device.includes("iPhone")) {
			return <Smartphone className="h-4 w-4" />;
		}
		return <Monitor className="h-4 w-4" />;
	};

	useEffect(() => {
		if (success) {
			const timer = setTimeout(() => setSuccess(""), 5000);
			return () => clearTimeout(timer);
		}
	}, [success]);

	return (
		<div className="space-y-6">
			{/* Success/Error Messages */}
			{success && (
				<Alert>
					<CheckCircle className="h-4 w-4" />
					<AlertDescription>{success}</AlertDescription>
				</Alert>
			)}
			{error && (
				<Alert variant="destructive">
					<AlertCircle className="h-4 w-4" />
					<AlertDescription>{error}</AlertDescription>
				</Alert>
			)}

			<Tabs defaultValue="profile" className="w-full">
				<TabsList className="grid w-full grid-cols-5">
					<TabsTrigger value="profile">Profile</TabsTrigger>
					<TabsTrigger value="account">Account</TabsTrigger>
					<TabsTrigger value="notifications">Notifications</TabsTrigger>
					<TabsTrigger value="security">Security</TabsTrigger>
					<TabsTrigger value="activity">Activity</TabsTrigger>
				</TabsList>

				{/* Profile Tab */}
				<TabsContent value="profile" className="space-y-6">
					{/* User Profile Card */}
					<UserProfileCard user={user} onSignOut={onSignOut} />

					{/* Profile Information */}
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Edit3 className="h-5 w-5" />
								Edit Profile Information
							</CardTitle>
							<CardDescription>
								Update your personal information and preferences
							</CardDescription>
						</CardHeader>
						<CardContent>
							<form onSubmit={handleProfileSubmit} className="space-y-6">
								{/* Avatar Upload */}
								<div className="flex items-center gap-4">
									<Avatar className="h-20 w-20">
										<AvatarImage src={user.image || ""} alt={user.name || ""} />
										<AvatarFallback className="text-lg">
											{user.name?.charAt(0) || "U"}
										</AvatarFallback>
									</Avatar>
									<div className="space-y-2">
										<Label htmlFor="avatar-upload" className="cursor-pointer">
											<Button
												type="button"
												variant="outline"
												disabled={avatarUploading}
												className="flex items-center gap-2">
												<Camera className="h-4 w-4" />
												{avatarUploading ? "Uploading..." : "Change Avatar"}
											</Button>
										</Label>
										<input
											id="avatar-upload"
											type="file"
											accept="image/*"
											onChange={handleAvatarUpload}
											className="hidden"
										/>
										<p className="text-xs text-muted-foreground">
											JPG, PNG or GIF. Max size 5MB.
										</p>
									</div>
								</div>

								<Separator />

								{/* Basic Information */}
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label htmlFor="firstName">First Name</Label>
										<Input
											id="firstName"
											value={profileForm.firstName}
											onChange={(e) =>
												setProfileForm((prev) => ({
													...prev,
													firstName: e.target.value,
												}))
											}
											placeholder="Enter your first name"
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor="lastName">Last Name</Label>
										<Input
											id="lastName"
											value={profileForm.lastName}
											onChange={(e) =>
												setProfileForm((prev) => ({
													...prev,
													lastName: e.target.value,
												}))
											}
											placeholder="Enter your last name"
										/>
									</div>
								</div>

								<div className="space-y-2">
									<Label htmlFor="email">Email Address</Label>
									<Input
										id="email"
										type="email"
										value={profileForm.email}
										onChange={(e) =>
											setProfileForm((prev) => ({
												...prev,
												email: e.target.value,
											}))
										}
										placeholder="Enter your email"
									/>
								</div>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label htmlFor="phone">Phone Number</Label>
										<Input
											id="phone"
											value={profileForm.phone}
											onChange={(e) =>
												setProfileForm((prev) => ({
													...prev,
													phone: e.target.value,
												}))
											}
											placeholder="Enter your phone number"
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor="website">Website</Label>
										<Input
											id="website"
											value={profileForm.website}
											onChange={(e) =>
												setProfileForm((prev) => ({
													...prev,
													website: e.target.value,
												}))
											}
											placeholder="https://yourwebsite.com"
										/>
									</div>
								</div>

								{/* Professional Information */}
								<Separator />
								<h3 className="text-lg font-medium">
									Professional Information
								</h3>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label htmlFor="company">Company</Label>
										<Input
											id="company"
											value={profileForm.company}
											onChange={(e) =>
												setProfileForm((prev) => ({
													...prev,
													company: e.target.value,
												}))
											}
											placeholder="Enter your company name"
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor="position">Position</Label>
										<Input
											id="position"
											value={profileForm.position}
											onChange={(e) =>
												setProfileForm((prev) => ({
													...prev,
													position: e.target.value,
												}))
											}
											placeholder="Enter your job title"
										/>
									</div>
								</div>

								<div className="space-y-2">
									<Label htmlFor="bio">Bio</Label>
									<Textarea
										id="bio"
										value={profileForm.bio}
										onChange={(e) =>
											setProfileForm((prev) => ({
												...prev,
												bio: e.target.value,
											}))
										}
										placeholder="Tell us about yourself..."
										rows={3}
									/>
								</div>

								{/* Location */}
								<Separator />
								<h3 className="text-lg font-medium">Location</h3>

								<div className="space-y-4">
									<div className="space-y-2">
										<Label htmlFor="address">Address</Label>
										<Input
											id="address"
											value={profileForm.address}
											onChange={(e) =>
												setProfileForm((prev) => ({
													...prev,
													address: e.target.value,
												}))
											}
											placeholder="Enter your address"
										/>
									</div>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div className="space-y-2">
											<Label htmlFor="city">City</Label>
											<Input
												id="city"
												value={profileForm.city}
												onChange={(e) =>
													setProfileForm((prev) => ({
														...prev,
														city: e.target.value,
													}))
												}
												placeholder="Enter your city"
											/>
										</div>
										<div className="space-y-2">
											<Label htmlFor="country">Country</Label>
											<Select
												value={profileForm.country}
												onValueChange={(value) =>
													setProfileForm((prev) => ({
														...prev,
														country: value,
													}))
												}>
												<SelectTrigger>
													<SelectValue placeholder="Select country" />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="us">United States</SelectItem>
													<SelectItem value="ca">Canada</SelectItem>
													<SelectItem value="uk">United Kingdom</SelectItem>
													<SelectItem value="au">Australia</SelectItem>
													<SelectItem value="de">Germany</SelectItem>
													<SelectItem value="fr">France</SelectItem>
													<SelectItem value="other">Other</SelectItem>
												</SelectContent>
											</Select>
										</div>
									</div>
								</div>

								{/* Preferences */}
								<Separator />
								<h3 className="text-lg font-medium">Preferences</h3>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label htmlFor="timezone">Timezone</Label>
										<Select
											value={profileForm.timezone}
											onValueChange={(value) =>
												setProfileForm((prev) => ({
													...prev,
													timezone: value,
												}))
											}>
											<SelectTrigger>
												<SelectValue placeholder="Select timezone" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="UTC">UTC</SelectItem>
												<SelectItem value="EST">Eastern Time</SelectItem>
												<SelectItem value="PST">Pacific Time</SelectItem>
												<SelectItem value="GMT">Greenwich Mean Time</SelectItem>
												<SelectItem value="CET">
													Central European Time
												</SelectItem>
											</SelectContent>
										</Select>
									</div>
									<div className="space-y-2">
										<Label htmlFor="language">Language</Label>
										<Select
											value={profileForm.language}
											onValueChange={(value) =>
												setProfileForm((prev) => ({
													...prev,
													language: value,
												}))
											}>
											<SelectTrigger>
												<SelectValue placeholder="Select language" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="en">English</SelectItem>
												<SelectItem value="es">Spanish</SelectItem>
												<SelectItem value="fr">French</SelectItem>
												<SelectItem value="de">German</SelectItem>
												<SelectItem value="it">Italian</SelectItem>
											</SelectContent>
										</Select>
									</div>
								</div>

								<Button type="submit" disabled={saving} className="w-full">
									<Save className="h-4 w-4 mr-2" />
									{saving ? "Saving..." : "Save Profile"}
								</Button>
							</form>
						</CardContent>
					</Card>
				</TabsContent>

				{/* Account Tab */}
				<TabsContent value="account" className="space-y-6">
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<User className="h-5 w-5" />
								Account Information
							</CardTitle>
							<CardDescription>
								View and manage your account details
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label>Account ID</Label>
									<div className="flex items-center gap-2">
										<code className="text-sm bg-muted px-2 py-1 rounded">
											{user.id || "USER-12345"}
										</code>
									</div>
								</div>
								<div className="space-y-2">
									<Label>Account Type</Label>
									<Badge
										variant={getRoleColor(role)}
										className="flex items-center gap-1 w-fit">
										{role === "SUPER_ADMIN" && <Crown className="h-3 w-3" />}
										{role === "ADMIN" && <Shield className="h-3 w-3" />}
										{role === "USER" && <User className="h-3 w-3" />}
										{role}
									</Badge>
								</div>
								<div className="space-y-2">
									<Label>Member Since</Label>
									<p className="text-sm text-muted-foreground flex items-center gap-2">
										<Calendar className="h-4 w-4" />
										{new Date(
											user.createdAt || Date.now()
										).toLocaleDateString()}
									</p>
								</div>
								<div className="space-y-2">
									<Label>Email Verified</Label>
									<Badge
										variant="default"
										className="flex items-center gap-1 w-fit">
										<CheckCircle className="h-3 w-3" />
										Verified
									</Badge>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Password Management */}
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Lock className="h-5 w-5" />
								Password & Authentication
							</CardTitle>
							<CardDescription>
								Manage your login credentials and authentication methods
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="flex items-center justify-between">
								<div>
									<h4 className="font-medium">Password</h4>
									<p className="text-sm text-muted-foreground">
										Last changed 30 days ago
									</p>
								</div>
								<Dialog
									open={showChangePassword}
									onOpenChange={setShowChangePassword}>
									<DialogTrigger asChild>
										<Button variant="outline">Change Password</Button>
									</DialogTrigger>
									<DialogContent>
										<DialogHeader>
											<DialogTitle>Change Password</DialogTitle>
											<DialogDescription>
												Enter your current password and choose a new one
											</DialogDescription>
										</DialogHeader>
										<form onSubmit={handlePasswordChange} className="space-y-4">
											<div className="space-y-2">
												<Label htmlFor="currentPassword">
													Current Password
												</Label>
												<div className="relative">
													<Input
														id="currentPassword"
														type={showPasswords.current ? "text" : "password"}
														value={passwordForm.currentPassword}
														onChange={(e) =>
															setPasswordForm((prev) => ({
																...prev,
																currentPassword: e.target.value,
															}))
														}
														required
													/>
													<Button
														type="button"
														variant="ghost"
														size="icon"
														className="absolute right-2 top-0 h-full px-3"
														onClick={() =>
															setShowPasswords((prev) => ({
																...prev,
																current: !prev.current,
															}))
														}>
														{showPasswords.current ? (
															<EyeOff className="h-4 w-4" />
														) : (
															<Eye className="h-4 w-4" />
														)}
													</Button>
												</div>
											</div>
											<div className="space-y-2">
												<Label htmlFor="newPassword">New Password</Label>
												<div className="relative">
													<Input
														id="newPassword"
														type={showPasswords.new ? "text" : "password"}
														value={passwordForm.newPassword}
														onChange={(e) =>
															setPasswordForm((prev) => ({
																...prev,
																newPassword: e.target.value,
															}))
														}
														required
													/>
													<Button
														type="button"
														variant="ghost"
														size="icon"
														className="absolute right-2 top-0 h-full px-3"
														onClick={() =>
															setShowPasswords((prev) => ({
																...prev,
																new: !prev.new,
															}))
														}>
														{showPasswords.new ? (
															<EyeOff className="h-4 w-4" />
														) : (
															<Eye className="h-4 w-4" />
														)}
													</Button>
												</div>
											</div>
											<div className="space-y-2">
												<Label htmlFor="confirmPassword">
													Confirm New Password
												</Label>
												<div className="relative">
													<Input
														id="confirmPassword"
														type={showPasswords.confirm ? "text" : "password"}
														value={passwordForm.confirmPassword}
														onChange={(e) =>
															setPasswordForm((prev) => ({
																...prev,
																confirmPassword: e.target.value,
															}))
														}
														required
													/>
													<Button
														type="button"
														variant="ghost"
														size="icon"
														className="absolute right-2 top-0 h-full px-3"
														onClick={() =>
															setShowPasswords((prev) => ({
																...prev,
																confirm: !prev.confirm,
															}))
														}>
														{showPasswords.confirm ? (
															<EyeOff className="h-4 w-4" />
														) : (
															<Eye className="h-4 w-4" />
														)}
													</Button>
												</div>
											</div>
											<DialogFooter>
												<Button
													type="button"
													variant="outline"
													onClick={() => setShowChangePassword(false)}>
													Cancel
												</Button>
												<Button type="submit" disabled={saving}>
													{saving ? "Changing..." : "Change Password"}
												</Button>
											</DialogFooter>
										</form>
									</DialogContent>
								</Dialog>
							</div>
						</CardContent>
					</Card>

					{/* Danger Zone */}
					<Card className="border-destructive">
						<CardHeader>
							<CardTitle className="flex items-center gap-2 text-destructive">
								<Trash2 className="h-5 w-5" />
								Danger Zone
							</CardTitle>
							<CardDescription>
								Irreversible actions that affect your account
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								<div className="flex items-center justify-between">
									<div>
										<h4 className="font-medium">Delete Account</h4>
										<p className="text-sm text-muted-foreground">
											Permanently delete your account and all associated data
										</p>
									</div>
									<Dialog
										open={showDeleteAccount}
										onOpenChange={setShowDeleteAccount}>
										<DialogTrigger asChild>
											<Button variant="destructive">Delete Account</Button>
										</DialogTrigger>
										<DialogContent>
											<DialogHeader>
												<DialogTitle>Delete Account</DialogTitle>
												<DialogDescription>
													This action cannot be undone. This will permanently
													delete your account and remove all your data from our
													servers.
												</DialogDescription>
											</DialogHeader>
											<DialogFooter>
												<Button
													variant="outline"
													onClick={() => setShowDeleteAccount(false)}>
													Cancel
												</Button>
												<Button variant="destructive">
													I understand, delete my account
												</Button>
											</DialogFooter>
										</DialogContent>
									</Dialog>
								</div>
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				{/* Notifications Tab */}
				<TabsContent value="notifications" className="space-y-6">
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Bell className="h-5 w-5" />
								Notification Preferences
							</CardTitle>
							<CardDescription>
								Choose how you want to be notified about updates and activities
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
							{/* Communication Preferences */}
							<div className="space-y-4">
								<h3 className="text-lg font-medium">Communication Methods</h3>
								<div className="space-y-4">
									<div className="flex items-center justify-between">
										<div className="space-y-0.5">
											<Label>Email Notifications</Label>
											<p className="text-sm text-muted-foreground">
												Receive notifications via email
											</p>
										</div>
										<Switch
											checked={notifications.emailNotifications}
											onCheckedChange={() =>
												handleNotificationChange("emailNotifications")
											}
										/>
									</div>
									<div className="flex items-center justify-between">
										<div className="space-y-0.5">
											<Label>Push Notifications</Label>
											<p className="text-sm text-muted-foreground">
												Receive browser push notifications
											</p>
										</div>
										<Switch
											checked={notifications.pushNotifications}
											onCheckedChange={() =>
												handleNotificationChange("pushNotifications")
											}
										/>
									</div>
									<div className="flex items-center justify-between">
										<div className="space-y-0.5">
											<Label>SMS Notifications</Label>
											<p className="text-sm text-muted-foreground">
												Receive text message notifications
											</p>
										</div>
										<Switch
											checked={notifications.smsNotifications}
											onCheckedChange={() =>
												handleNotificationChange("smsNotifications")
											}
										/>
									</div>
								</div>
							</div>

							<Separator />

							{/* Content Preferences */}
							<div className="space-y-4">
								<h3 className="text-lg font-medium">Content Preferences</h3>
								<div className="space-y-4">
									<div className="flex items-center justify-between">
										<div className="space-y-0.5">
											<Label>Quote Updates</Label>
											<p className="text-sm text-muted-foreground">
												Updates about your quotes and applications
											</p>
										</div>
										<Switch
											checked={notifications.quoteUpdates}
											onCheckedChange={() =>
												handleNotificationChange("quoteUpdates")
											}
										/>
									</div>
									<div className="flex items-center justify-between">
										<div className="space-y-0.5">
											<Label>System Updates</Label>
											<p className="text-sm text-muted-foreground">
												Important system maintenance and feature updates
											</p>
										</div>
										<Switch
											checked={notifications.systemUpdates}
											onCheckedChange={() =>
												handleNotificationChange("systemUpdates")
											}
										/>
									</div>
									<div className="flex items-center justify-between">
										<div className="space-y-0.5">
											<Label>Security Alerts</Label>
											<p className="text-sm text-muted-foreground">
												Security-related notifications and alerts
											</p>
										</div>
										<Switch
											checked={notifications.securityAlerts}
											onCheckedChange={() =>
												handleNotificationChange("securityAlerts")
											}
										/>
									</div>
									<div className="flex items-center justify-between">
										<div className="space-y-0.5">
											<Label>Marketing Emails</Label>
											<p className="text-sm text-muted-foreground">
												Promotional emails and newsletters
											</p>
										</div>
										<Switch
											checked={notifications.marketingEmails}
											onCheckedChange={() =>
												handleNotificationChange("marketingEmails")
											}
										/>
									</div>
									<div className="flex items-center justify-between">
										<div className="space-y-0.5">
											<Label>Weekly Digest</Label>
											<p className="text-sm text-muted-foreground">
												Weekly summary of your account activity
											</p>
										</div>
										<Switch
											checked={notifications.weeklyDigest}
											onCheckedChange={() =>
												handleNotificationChange("weeklyDigest")
											}
										/>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				{/* Security Tab */}
				<TabsContent value="security" className="space-y-6">
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Shield className="h-5 w-5" />
								Security Settings
							</CardTitle>
							<CardDescription>
								Manage your account security and authentication preferences
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
							<div className="space-y-4">
								<div className="flex items-center justify-between">
									<div className="space-y-0.5">
										<Label>Two-Factor Authentication</Label>
										<p className="text-sm text-muted-foreground">
											Add an extra layer of security to your account
										</p>
									</div>
									<Switch
										checked={security.twoFactorEnabled}
										onCheckedChange={(checked) =>
											handleSecurityChange("twoFactorEnabled", checked)
										}
									/>
								</div>
								<div className="flex items-center justify-between">
									<div className="space-y-0.5">
										<Label>Login Notifications</Label>
										<p className="text-sm text-muted-foreground">
											Get notified when someone logs into your account
										</p>
									</div>
									<Switch
										checked={security.loginNotifications}
										onCheckedChange={(checked) =>
											handleSecurityChange("loginNotifications", checked)
										}
									/>
								</div>
								<div className="flex items-center justify-between">
									<div className="space-y-0.5">
										<Label>Device Management</Label>
										<p className="text-sm text-muted-foreground">
											Track and manage devices that access your account
										</p>
									</div>
									<Switch
										checked={security.deviceManagement}
										onCheckedChange={(checked) =>
											handleSecurityChange("deviceManagement", checked)
										}
									/>
								</div>
							</div>

							<Separator />

							<div className="space-y-4">
								<h3 className="text-lg font-medium">Session Management</h3>
								<div className="space-y-2">
									<Label>Session Timeout</Label>
									<Select
										value={security.sessionTimeout}
										onValueChange={(value) =>
											handleSecurityChange("sessionTimeout", value)
										}>
										<SelectTrigger className="w-48">
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="1h">1 hour</SelectItem>
											<SelectItem value="4h">4 hours</SelectItem>
											<SelectItem value="8h">8 hours</SelectItem>
											<SelectItem value="24h">24 hours</SelectItem>
											<SelectItem value="never">Never</SelectItem>
										</SelectContent>
									</Select>
									<p className="text-sm text-muted-foreground">
										Automatically log out after period of inactivity
									</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				{/* Activity Tab */}
				<TabsContent value="activity" className="space-y-6">
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Clock className="h-5 w-5" />
								Account Activity
							</CardTitle>
							<CardDescription>
								View your recent account activity and login history
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								{activityLogs.map((log) => (
									<div
										key={log.id}
										className="flex items-start gap-4 p-4 border rounded-lg">
										<div className="p-2 bg-muted rounded-full">
											{getDeviceIcon(log.device)}
										</div>
										<div className="flex-1 space-y-1">
											<div className="flex items-center gap-2">
												<h4 className="font-medium">{log.action}</h4>
												<Badge variant="secondary" className="text-xs">
													{log.device}
												</Badge>
											</div>
											<p className="text-sm text-muted-foreground">
												{log.description}
											</p>
											<div className="flex items-center gap-4 text-xs text-muted-foreground">
												<span className="flex items-center gap-1">
													<Clock className="h-3 w-3" />
													{formatTimestamp(log.timestamp)}
												</span>
												<span className="flex items-center gap-1">
													<MapPin className="h-3 w-3" />
													{log.location}
												</span>
												<span className="flex items-center gap-1">
													<Globe className="h-3 w-3" />
													{log.ipAddress}
												</span>
											</div>
										</div>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default ProfileSettings;
