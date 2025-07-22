"use client";

import React from "react";
import { useRole } from "@/hooks/useRole";
import UserManagement from "../UserManagement";

const AdminUserManagementPage: React.FC = () => {
	const { role } = useRole();

	return <UserManagement currentUserRole={role || "ADMIN"} />;
};

export default AdminUserManagementPage;
