"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, X } from "lucide-react";
import Icon from "../icon/AppIcon";

const Header: React.FC = () => {
	const [isMenuOpen, setIsMenuOpen] = React.useState(false);
	const [activeSection, setActiveSection] = React.useState("");
	const [scrollProgress, setScrollProgress] = React.useState(0);

	const navlinks = [
		{ id: "solution-demo", name: "Solution Demo", href: "/#solution-demo" },
		{ id: "coverage", name: "Coverage", href: "/#coverage" },
		{ id: "pricing", name: "Pricing", href: "/pricing" },
		{ id: "get-started", name: "Get Started", href: "/get-started" },
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
								src="/assets/images/LP_Logo_Only-1751558392904.jpeg"
								alt="Lex Quotes Logo"
								width={100}
								height={100}
								className="w-12 h-12 object-contain"
							/>
						</div>
						<div className="flex flex-col">
							<span className="text-xl font-bold text-primary font-inter">
								Lex Quotes
							</span>
							<span className="text-xs text-text-secondary font-medium">
								Professional Platform
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
						<Button
							variant="outline"
							size="sm"
							onClick={() => handleNavClick("#get-started")}
							className="text-[#1a365d] border-[#1a365d] hover:bg-[#1a365d] hover:text-white px-8 py-5">
							Request Demo
						</Button>
						<Link href={"/get-started"}>
							<Button
								variant="default"
								size="sm"
								onClick={() => handleNavClick("#get-started")}
								className={`bg-[#1a365d] text-white hover:bg-[#1b3f6f] border border-[#8f9297] px-12 py-5`}>
								Start Trial
								<ArrowRight className="ml-0.5 size-4" />
							</Button>
						</Link>
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
									onClick={() => handleNavClick(item.href)}
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
							<Button
								variant="outline"
								size="sm"
								onClick={() => handleNavClick("#get-started")}
								className="text-primary border-primary hover:bg-primary hover:text-white">
								Request Demo
							</Button>
							<Button
								variant="default"
								size="sm"
								onClick={() => handleNavClick("#get-started")}>
								Start Trial
							</Button>
						</div>
					</div>
				</div>
			)}
		</header>
	);
};

export default Header;
