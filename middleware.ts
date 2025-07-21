import { withAuth } from "next-auth/middleware";

export default withAuth(
	function middleware(req) {
		// Add any custom middleware logic here
	},
	{
		callbacks: {
			authorized: ({ token, req }) => {
				// Allow access to public routes
				const publicRoutes = [
					"/",
					"/auth/signin",
					"/auth/signup",
					"/auth/forgot-password",
					"/auth/reset-password",
					"/auth/error",
					"/api/auth",
					"/pricing",
					"/help-center",
					"/legal-resources",
					"/privacy-policy",
					"/terms-of-service",
					"/cookie-policy",
					"/gdpr-compliance",
					"/system-status",
				];

				const { pathname } = req.nextUrl;

				// Allow access to public routes
				if (publicRoutes.some((route) => pathname.startsWith(route))) {
					return true;
				}

				// Allow access to static files
				if (pathname.startsWith("/_next") || pathname.startsWith("/favicon")) {
					return true;
				}

				// Require authentication for protected routes
				return !!token;
			},
		},
	}
);

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 * - public files (public folder)
		 */
		"/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
	],
};
