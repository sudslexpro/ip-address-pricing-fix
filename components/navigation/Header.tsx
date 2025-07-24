"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowRight, X, User, Settings, LogOut, Shield } from "lucide-react";
import Icon from "../icon/AppIcon";

interface HeaderProps {
	isAdminRoute?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isAdminRoute = false }) => {
	const [isMenuOpen, setIsMenuOpen] = React.useState(false);
	const [activeSection, setActiveSection] = React.useState("");
	const [scrollProgress, setScrollProgress] = React.useState(0);
	const { data: session, status } = useSession();

	const navlinks = [
		{ id: "solution-demo", name: "Solution Demo", href: "#solution-demo" },
		{ id: "coverage", name: "Coverage", href: "#coverage" },
		{
			id: "success-stories",
			name: "Success Stories",
			href: "#success-stories",
		},
		{ id: "pricing", name: "Pricing", href: "#pricing" },
	];

	React.useEffect(() => {
		const handleScroll = () => {
			const scrollTop = window.scrollY;
			const docHeight =
				document.documentElement.scrollHeight - window.innerHeight;
			const progress = (scrollTop / docHeight) * 100;
			setScrollProgress(progress);

			// Update active section based on scroll position
			const sections = navlinks
				.map((item) => document.getElementById(item.id))
				.filter(Boolean);
			const currentSection = sections.find((section) => {
				if (!section) return false;
				const rect = section.getBoundingClientRect();
				return rect.top <= 100 && rect.bottom >= 100;
			});

			if (currentSection) {
				setActiveSection(currentSection.id);
			}
		};

		const handleResize = () => {
			if (window.innerWidth >= 768 && isMenuOpen) {
				setIsMenuOpen(false);
			}
		};

		window.addEventListener("scroll", handleScroll);
		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("scroll", handleScroll);
			window.removeEventListener("resize", handleResize);
		};
	}, [isMenuOpen, navlinks]);

	const handleNavClick = (href: string) => {
		const element = document.querySelector(href);
		if (element) {
			element.scrollIntoView({ behavior: "smooth", block: "start" });
		}
		setIsMenuOpen(false);
	};

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<header className="fixed top-0 left-0 right-0 z-100 bg-background/95 backdrop-blur-subtle border-b border-border">
			{/* Progress Bar */}
			<div
				className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600 transition-all duration-200 ease-out"
				style={{ width: `${scrollProgress}%` }}
			/>

			<div className="max-w-7xl mx-auto px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					{/* Logo */}
					<Link href="/" className="flex items-center space-x-2">
						<div className="flex items-center justify-center">
							<Image
								src="/assets/images/LP_Logo.png"
								alt="Lex Protector Logo"
								width={100}
								height={100}
								className="w-12 h-12 object-contain"
							/>
						</div>
						<div className="flex flex-col">
							<span className="text-xl font-bold text-primary font-inter">
								Lex Protector
							</span>
							<span className="text-xs text-text-secondary font-medium">
								Partner Portal
							</span>
						</div>
					</Link>

					{/* Desktop Navigation */}
					<nav className="hidden lg:flex items-center space-x-8">
						{navlinks.map((item) => (
							<Link
								key={item.id}
								href={item.href}
								onClick={() => handleNavClick(item.href)}
								className={`px-3 py-2 text-sm font-medium transition-smooth rounded-md ${
									activeSection === item.id
										? "text-yellow-600 bg-accent/10 dark:text-yellow-400 dark:bg-yellow-900/20"
										: "text-text-secondary hover:text-primary hover:bg-surface"
								}`}>
								{item.name}
							</Link>
						))}
					</nav>

					{/* Desktop CTA */}
					<div className="hidden lg:flex items-center space-x-4">
						{session?.user ? (
							// Authenticated user menu
							<DropdownMenu>
								<DropdownMenuTrigger className="flex items-center space-x-2">
									<Avatar className="h-8 w-8">
										<AvatarImage
											src={session.user.image || ""}
											alt={session.user.name || ""}
										/>
										<AvatarFallback>
											{session.user.name
												?.split(" ")
												.map((n) => n[0])
												.join("") || "U"}
										</AvatarFallback>
									</Avatar>
									<span className="text-sm font-medium">
										{session.user.name}
									</span>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end" className="w-56 mt-4">
									<DropdownMenuItem>
										<User className="mr-2 h-4 w-4" />
										<Link href="/dashboard">Dashboard</Link>
									</DropdownMenuItem>
									<DropdownMenuSeparator />
									<DropdownMenuItem
										onClick={() => signOut({ callbackUrl: "/" })}>
										<LogOut className="mr-2 h-4 w-4" />
										<span>Sign out</span>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						) : (
							// Unauthenticated user buttons
							<>
								{isAdminRoute ? (
									// Admin route - internal authentication
									<>
										<Link href="/auth/signin">
											<Button
												variant="outline"
												size="sm"
												className="text-[#1a365d] border-[#1a365d] hover:bg-[#1a365d] hover:text-white px-8 py-5">
												Sign In
											</Button>
										</Link>
										<Link href="/auth/signup">
											<Button
												variant="default"
												size="sm"
												className={`bg-[#1a365d] text-white hover:bg-[#1b3f6f] border border-[#8f9297] px-12 py-5`}>
												Sign Up
												<ArrowRight className="ml-0.5 size-4" />
											</Button>
										</Link>
									</>
								) : (
									// All other routes - external authentication
									<>
										<a
											href="https://partner.lexprotector.com/login"
											target="_blank"
											rel="noopener noreferrer">
											<Button
												variant="outline"
												size="sm"
												className="text-[#1a365d] border-[#1a365d] hover:bg-[#1a365d] hover:text-white px-8 py-5">
												Sign In
											</Button>
										</a>
										<a
											href="https://partner.lexprotector.com/signup"
											target="_blank"
											rel="noopener noreferrer">
											<Button
												variant="default"
												size="sm"
												className={`bg-[#1a365d] text-white hover:bg-[#1b3f6f] border border-[#8f9297] px-12 py-5`}>
												Get Started
												<ArrowRight className="ml-0.5 size-4" />
											</Button>
										</a>
									</>
								)}
							</>
						)}
					</div>

					{/* Mobile Menu Button */}
					<Button
						onClick={toggleMenu}
						className="lg:hidden p-0.5 rounded-lg bg-background border border-border text-secondary hover:text-primary hover:bg-surface transition-all duration-300 ease-in-out">
						<Icon
							name={isMenuOpen ? "X" : "Menu"}
							className={`text-black dark:text-white ${
								isMenuOpen ? "rotate-90" : ""
							}`}
							size={24}
						/>
					</Button>
				</div>
			</div>

			{/* Mobile Menu */}
			{isMenuOpen && (
				<div className="lg:hidden absolute top-16 left-0 right-0 bg-background border-b border-border shadow-lg animate-slide-down z-50">
					<div className="px-6 py-4 space-y-4">
						{/* Mobile Navigation */}
						<nav className="space-y-2">
							{navlinks.map((item) => (
								<button
									key={item.id}
									onClick={(e) => {
										e.preventDefault();
										handleNavClick(item.href);
									}}
									className={`block w-full text-left px-3 py-2 text-sm font-medium transition-smooth rounded-md cursor-pointer ${
										activeSection === item.id
											? "text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/20"
											: "text-text-secondary hover:text-primary hover:bg-surface"
									}`}>
									{item.name}
								</button>
							))}
						</nav>

						{/* Mobile CTAs */}
						<div className="pt-4 border-t border-border space-y-3 flex justify-center gap-3">
							{session?.user ? (
								<div className="w-full space-y-2">
									<Link href="/dashboard" className="w-full">
										<Button variant="outline" size="sm" className="w-full">
											<User className="mr-2 h-4 w-4" />
											Dashboard
										</Button>
									</Link>
									<Button
										variant="outline"
										size="sm"
										onClick={() => signOut({ callbackUrl: "/" })}
										className="w-full">
										<LogOut className="mr-2 h-4 w-4" />
										Sign Out
									</Button>
								</div>
							) : (
								<>
									{isAdminRoute ? (
										// Admin route - internal authentication
										<>
											<Link href="/auth/signin">
												<Button
													variant="outline"
													size="sm"
													className="text-primary border-primary hover:bg-primary hover:text-white">
													Sign In
												</Button>
											</Link>
											<Link href="/auth/signup">
												<Button variant="default" size="sm">
													Sign Up
												</Button>
											</Link>
										</>
									) : (
										// All other routes - external authentication
										<div className={`flex gap-2`}>
											<Link href="https://partner.lexprotector.com/login">
												<Button
													variant="outline"
													size="lg"
													className="text-primary border-primary hover:bg-primary hover:text-white">
													Sign In
												</Button>
											</Link>
											<Link href="https://partner.lexprotector.com/signup">
												<Button variant="default" size="lg">
													Get Started
												</Button>
											</Link>
										</div>
									)}
								</>
							)}
						</div>
					</div>
				</div>
			)}
		</header>
	);
};

export default Header;
