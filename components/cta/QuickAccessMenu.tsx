"use client";
import React, { useState } from "react";
import Link from "next/link";
import Icon from "@/components/icon/AppIcon";
import { Button } from "@/components/ui/button";
import { icons as LucideIcons } from "lucide-react";

const QuickAccessMenu = () => {
	const [isOpen, setIsOpen] = useState(false);

	const quickAccessItems: QuickAccessItem[] = [
		{
			id: "calculator",
			label: "Commission Calculator",
			description: "Calculate potential earnings",
			icon: "Calculator",
			href: "/#pricing",
		},
		{
			id: "demo",
			label: "Interactive Demo",
			description: "Try quote generation",
			icon: "Play",
			action: () => {
				const element = document.querySelector("#solution-demo");
				if (element) {
					element.scrollIntoView({ behavior: "smooth", block: "start" });
				}
			},
			href: "/#solution-demo",
		},
		{
			id: "coverage-map",
			label: "Coverage Map",
			description: "View supported countries",
			icon: "Globe",
			action: () => {
				const element = document.querySelector("#coverage");
				if (element) {
					element.scrollIntoView({ behavior: "smooth", block: "start" });
				}
			},
			href: "/#coverage",
		},
		{
			id: "testimonials",
			label: "Client Stories",
			description: "Read success testimonials",
			icon: "MessageSquare",
			action: () => {
				const element = document.querySelector("#success-stories");
				if (element) {
					element.scrollIntoView({ behavior: "smooth", block: "start" });
				}
			},
			href: "/#success-stories",
		},
		// {
		// 	id: "resources",
		// 	label: "Download Resources",
		// 	description: "Guides and whitepapers",
		// 	icon: "Download",
		// 	href: "/legal-resources",
		// },
		// {
		// 	id: "help",
		// 	label: "Help Center",
		// 	description: "Support & tutorials",
		// 	icon: "Info",
		// 	href: "/help-center",
		// },
		// {
		// 	id: "training",
		// 	label: "Training Center",
		// 	description: "Learn the platform",
		// 	icon: "GraduationCap",
		// 	href: "/training",
		// },
	];

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	interface QuickAccessItem {
		id: string;
		label: string;
		description: string;
		icon: keyof typeof LucideIcons;
		href?: string; // For navigation links
		action?: () => void; // For scroll actions or custom behavior
		external?: boolean; // For external links
	}

	const handleItemClick = (item: QuickAccessItem): void => {
		// If it's a navigation link, let Next.js handle it
		if (item.href) {
			// Analytics tracking for navigation
			if (window.gtag) {
				window.gtag("event", "quick_access_navigation", {
					item_id: item.id,
					item_label: item.label,
					destination: item.href,
				});
			}
			return; // Let the Link component handle navigation
		}

		// If it's a custom action (scroll, etc.)
		if (item.action) {
			item.action();
		}

		setIsOpen(false);

		// Analytics tracking for actions
		if (window.gtag) {
			window.gtag("event", "quick_access_action", {
				item_id: item.id,
				item_label: item.label,
			});
		}
	};

	const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>): void => {
		if (e.target === e.currentTarget) {
			setIsOpen(false);
		}
	};

	return (
		<>
			{/* Quick Access Trigger Button */}
			<div className="fixed top-20 right-6 z-150">
				<Button
					variant="secondary"
					size="sm"
					onClick={toggleMenu}
					className="shadow-cta hover:shadow-elevation transition-all duration-200 bg-[#1a365d] hover:bg-surface-secondary border border-blue-200 text-white"
					aria-label="Quick access menu">
					<span className="hidden sm:inline ml-2">Quick Access</span>
					<Icon name="Zap" size={20} className="ml-0 md:ml-2" />
				</Button>
			</div>

			{/* Overlay and Menu Panel */}
			{isOpen && (
				<>
					{/* Mobile Backdrop */}
					<div
						className="fixed inset-0 bg-black/20 backdrop-blur-subtle z-200 md:hidden animate-fade-in"
						onClick={handleBackdropClick}
					/>

					{/* Menu Panel */}
					<div
						className={`
            fixed z-200 bg-background border border-border shadow-elevation rounded-lg
            ${
							window.innerWidth < 768
								? "inset-x-4 top-24 animate-slide-down"
								: "top-20 right-6 w-80 animate-slide-down"
						}
          `}>
						{/* Header */}
						<div className="flex items-center justify-between p-4 border-b border-border">
							<h3 className="text-lg font-semibold text-text-primary">
								Quick Access
							</h3>
							<button
								onClick={toggleMenu}
								className="p-1 rounded-md text-text-secondary hover:text-primary hover:bg-surface transition-smooth"
								aria-label="Close menu">
								<Icon name="X" size={20} />
							</button>
						</div>

						{/* Menu Items */}
						<div className="p-2 space-y-1 max-h-96 overflow-y-auto">
							{quickAccessItems.map((item) => {
								const itemContent = (
									<div className="w-full flex items-start space-x-3 p-3 rounded-md text-left hover:bg-surface transition-smooth group">
										<div className="flex-shrink-0 w-10 h-10 bg-primary/10 dark:bg-blue-600/10 border border-border rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-smooth">
											<Icon
												name={item.icon}
												size={20}
												// color="var(--color-primary)"
												className={`text-primary dark:text-blue-600 group-hover:text-primary/80 transition-smooth`}
											/>
										</div>
										<div className="flex-1 min-w-0">
											<p className="text-sm font-medium text-text-primary group-hover:text-primary dark:text-blue-600 dark:group-hover:text-blue-600/80 transition-smooth">
												{item.label}
											</p>
											<p className="text-xs text-text-secondary mt-1">
												{item.description}
											</p>
										</div>
										<Icon
											name="ChevronRight"
											size={16}
											className="text-text-muted group-hover:text-primary dark:text-blue-600 dark:group-hover:text-blue-600/60 transition-smooth"
										/>
									</div>
								);

								return item.href ? (
									<Link
										key={item.id}
										href={item.href}
										onClick={() => {
											setIsOpen(false);
											// Analytics tracking for navigation
											if (window.gtag && item.href) {
												window.gtag("event", "quick_access_navigation", {
													item_id: item.id,
													item_label: item.label,
													destination: item.href,
												});
											}
										}}
										className="block">
										{itemContent}
									</Link>
								) : (
									<button key={item.id} onClick={() => handleItemClick(item)}>
										{itemContent}
									</button>
								);
							})}
						</div>

						{/* Footer */}
						<div className="p-4 border-t border-border bg-surface/50">
							<Link
								href="https://partner.lexprotector.com/signup"
								onClick={() => setIsOpen(false)}>
								<Button variant="default" size="sm" className="w-full dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white">
									Get Started with your free trial
									<Icon name="ArrowRight" size={16} className="ml-2" />
								</Button>
							</Link>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default QuickAccessMenu;
