"use client";

import React from "react";
import { useRole } from "@/hooks/useRole";
import { signOut } from "next-auth/react";
import ProfileSettings from "./ProfileSettings";

const SettingsPage: React.FC = () => {
	const { session, role } = useRole();

	const handleSignOut = () => {
		signOut({ callbackUrl: "/" });
	};

	return (
		<ProfileSettings
			user={session?.user}
			role={role || "USER"}
			onSignOut={handleSignOut}
		/>
	);
};

export default SettingsPage;
