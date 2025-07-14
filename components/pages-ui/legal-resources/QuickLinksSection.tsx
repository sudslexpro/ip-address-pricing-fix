import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Clock } from "lucide-react";

const QuickLinksSection: React.FC = () => {
	const quickLinks = [
		"Legal Research Tools",
		"Court Forms Library",
		"Statutory Updates",
		"Professional Ethics Guidelines",
		"Client Communication Templates",
		"Billing & Time Tracking Resources",
	];

	const recentUpdates = [
		{
			title: "New Personal Injury Guidelines",
			description:
				"Updated compensation guidelines for personal injury claims effective January 2025.",
			timeAgo: "2 days ago",
		},
		{
			title: "Contract Law Template Updates",
			description:
				"Refreshed contract templates to comply with latest commercial law amendments.",
			timeAgo: "1 week ago",
		},
		{
			title: "Data Protection Resource Pack",
			description:
				"New comprehensive guide on data protection compliance for law firms.",
			timeAgo: "2 weeks ago",
		},
	];

	return (
		<section className="py-16 px-4 sm:px-6 lg:px-8">
			<div className="max-w-7xl mx-auto">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
					{/* Quick Links */}
					<div>
						<h3 className="text-2xl font-bold mb-6">Quick Access</h3>
						<div className="space-y-3">
							{quickLinks.map((link, index) => (
								<div
									key={index}
									className="flex items-center justify-between p-4 bg-card rounded-lg border border-border hover:border-primary/20 transition-colors cursor-pointer group">
									<span className="font-medium group-hover:text-primary transition-colors">
										{link}
									</span>
									<ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
								</div>
							))}
						</div>
					</div>

					{/* Recent Updates */}
					<div>
						<h3 className="text-2xl font-bold mb-6">Recent Updates</h3>
						<div className="space-y-4">
							{recentUpdates.map((update, index) => (
								<div
									key={index}
									className="flex items-start gap-4 p-4 bg-card rounded-lg border border-border">
									<div className="flex-shrink-0">
										<Clock className="h-5 w-5 text-primary mt-1" />
									</div>
									<div>
										<h4 className="font-semibold">{update.title}</h4>
										<p className="text-sm text-muted-foreground mb-2">
											{update.description}
										</p>
										<span className="text-xs text-muted-foreground">
											{update.timeAgo}
										</span>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>

			{/* CTA Section */}
			<div className="mt-16 py-16 px-4 sm:px-6 lg:px-8 bg-primary/5 rounded-2xl">
				<div className="max-w-4xl mx-auto text-center">
					<h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
					<p className="text-lg text-muted-foreground mb-8">
						Subscribe to our newsletter to receive notifications about new
						resources and legal updates.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
						<Input placeholder="Enter your email" className="flex-1" />
						<Button className="px-8">Subscribe</Button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default QuickLinksSection;
