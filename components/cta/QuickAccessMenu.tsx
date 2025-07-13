"use client";
import React, { useState } from "react";
import Icon from "@/components/icon/AppIcon";
import { Button } from "@/components/ui/button";
import { LucideProps, icons as LucideIcons } from "lucide-react";

const QuickAccessMenu = () => {
	const [isOpen, setIsOpen] = useState(false);

	const quickAccessItems: QuickAccessItem[] = [
		{
			id: "calculator",
			label: "Commission Calculator",
			description: "Calculate potential earnings",
			icon: "Calculator",
			action: () => {
				const element = document.querySelector("#pricing");
				if (element) {
					element.scrollIntoView({ behavior: "smooth", block: "start" });
					// Focus on calculator section within pricing
					setTimeout(() => {
						const calculator = element.querySelector("[data-calculator]");
						if (calculator) {
							calculator.scrollIntoView({
								behavior: "smooth",
								block: "center",
							});
						}
					}, 500);
				}
			},
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
		},
		{
			id: "resources",
			label: "Download Resources",
			description: "Guides and whitepapers",
			icon: "Download",
			action: () => {
				// This would typically trigger a download or open a resource modal
				window.open("/resources/trademark-guide.pdf", "_blank");
			},
		},
	];

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

  interface QuickAccessItem {
	id: string;
	label: string;
	description: string;
	icon: keyof typeof LucideIcons;
	action: () => void;
  }

  const handleItemClick = (item: QuickAccessItem): void => {
    item.action();
    setIsOpen(false);

    // Analytics tracking
    if (window.gtag) {
      window.gtag("event", "quick_access_click", {
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
							{quickAccessItems.map((item) => (
								<button
									key={item.id}
									onClick={() => handleItemClick(item)}
									className="w-full flex items-start space-x-3 p-3 rounded-md text-left hover:bg-surface transition-smooth group">
									<div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-smooth">
										<Icon
											name={item.icon}
											size={20}
											color="var(--color-primary)"
										/>
									</div>
									<div className="flex-1 min-w-0">
										<p className="text-sm font-medium text-text-primary group-hover:text-primary transition-smooth">
											{item.label}
										</p>
										<p className="text-xs text-text-secondary mt-1">
											{item.description}
										</p>
									</div>
									<Icon
										name="ChevronRight"
										size={16}
										className="text-text-muted group-hover:text-primary transition-smooth"
									/>
								</button>
							))}
						</div>

						{/* Footer */}
						<div className="p-4 border-t border-border bg-surface/50">
							<Button
								variant="default"
								size="sm"
								className="w-full"
								onClick={() => {
									const element = document.querySelector("#get-started");
									if (element) {
										element.scrollIntoView({
											behavior: "smooth",
											block: "start",
										});
									}
									setIsOpen(false);
								}}>
								Start Your Trial
								<Icon name="ArrowRight" size={16} className="ml-2" />
							</Button>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default QuickAccessMenu;
