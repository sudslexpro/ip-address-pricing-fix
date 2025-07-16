"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useAuth(requireAuth = false) {
	const { data: session, status } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (requireAuth && status === "loading") return; // Still loading

		if (requireAuth && !session) {
			router.push("/auth/signin");
		}
	}, [session, status, router, requireAuth]);

	return {
		user: session?.user,
		session,
		status,
		isLoading: status === "loading",
		isAuthenticated: !!session,
	};
}

export function useRequireAuth() {
	return useAuth(true);
}
