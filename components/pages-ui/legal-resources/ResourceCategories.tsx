import React from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
	BookOpen,
	FileText,
	Scale,
	Shield,
	Users,
	ArrowRight,
} from "lucide-react";

const ResourceCategories: React.FC = () => {
	const resourceCategories = [
		{
			id: "templates",
			title: "Legal Templates",
			icon: FileText,
			description: "Pre-drafted legal documents and templates",
			count: 45,
			color: "bg-blue-500",
		},
		{
			id: "guides",
			title: "Practice Guides",
			icon: BookOpen,
			description: "Comprehensive guides for legal practice",
			count: 28,
			color: "bg-green-500",
		},
		{
			id: "compliance",
			title: "Compliance Resources",
			icon: Shield,
			description: "Regulatory compliance materials",
			count: 32,
			color: "bg-purple-500",
		},
		{
			id: "case-law",
			title: "Case Law Database",
			icon: Scale,
			description: "Recent judgments and legal precedents",
			count: 156,
			color: "bg-orange-500",
		},
		{
			id: "training",
			title: "Training Materials",
			icon: Users,
			description: "Educational content for legal professionals",
			count: 23,
			color: "bg-red-500",
		},
	];

	return (
		<section className="py-16 px-4 sm:px-6 lg:px-8">
			<div className="max-w-7xl mx-auto">
				<h2 className="text-3xl font-bold text-center mb-12">
					Browse by Category
				</h2>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{resourceCategories.map((category) => {
						const IconComponent = category.icon;
						return (
							<Card
								key={category.id}
								className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-primary/20">
								<CardHeader>
									<div className="flex items-center gap-4">
										<div
											className={`p-3 rounded-xl ${category.color} bg-opacity-10 text-white`}>
											<IconComponent
												className={`h-6 w-6 text-${
													category.color.split("-")[1]
												}-500`}
											/>
										</div>
										<div className="flex-1">
											<CardTitle className="group-hover:text-primary transition-colors">
												{category.title}
											</CardTitle>
											<CardDescription>{category.description}</CardDescription>
										</div>
									</div>
								</CardHeader>
								<CardContent>
									<div className="flex items-center justify-between">
										<Badge variant="secondary">
											{category.count} resources
										</Badge>
										<ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
									</div>
								</CardContent>
							</Card>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default ResourceCategories;
