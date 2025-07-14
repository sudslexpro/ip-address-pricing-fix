import React from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Star, Calendar, Tag, FileText } from "lucide-react";

const FeaturedResources: React.FC = () => {
	const featuredResources = [
		{
			title: "Personal Injury Claims Handbook 2025",
			description:
				"Comprehensive guide covering all aspects of personal injury claims, including recent legislative changes.",
			category: "Practice Guides",
			downloadCount: 1240,
			rating: 4.8,
			lastUpdated: "2025-01-15",
			type: "PDF",
			size: "2.4 MB",
			tags: ["Personal Injury", "Claims", "Litigation"],
		},
		{
			title: "Contract Templates Collection",
			description:
				"Essential contract templates for legal practitioners including service agreements, NDAs, and employment contracts.",
			category: "Legal Templates",
			downloadCount: 890,
			rating: 4.6,
			lastUpdated: "2025-01-10",
			type: "ZIP",
			size: "8.1 MB",
			tags: ["Contracts", "Templates", "Commercial Law"],
		},
		{
			title: "GDPR Compliance Toolkit",
			description:
				"Complete toolkit for ensuring GDPR compliance including checklists, policies, and assessment forms.",
			category: "Compliance Resources",
			downloadCount: 567,
			rating: 4.9,
			lastUpdated: "2024-12-20",
			type: "PDF",
			size: "5.2 MB",
			tags: ["GDPR", "Data Protection", "Privacy"],
		},
		{
			title: "Recent Court Judgments - Q4 2024",
			description:
				"Quarterly compilation of significant court judgments with analysis and implications.",
			category: "Case Law Database",
			downloadCount: 734,
			rating: 4.7,
			lastUpdated: "2025-01-05",
			type: "PDF",
			size: "12.8 MB",
			tags: ["Case Law", "Judgments", "Analysis"],
		},
	];

	return (
		<section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
			<div className="max-w-7xl mx-auto">
				<div className="text-center mb-12">
					<h2 className="text-3xl font-bold mb-4">Featured Resources</h2>
					<p className="text-lg text-muted-foreground">
						Most popular and recently updated legal resources
					</p>
				</div>

				<Tabs defaultValue="all" className="w-full">
					<TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 mb-8">
						<TabsTrigger value="all">All</TabsTrigger>
						<TabsTrigger value="templates">Templates</TabsTrigger>
						<TabsTrigger value="guides">Guides</TabsTrigger>
						<TabsTrigger value="compliance">Compliance</TabsTrigger>
						<TabsTrigger value="case-law">Case Law</TabsTrigger>
						<TabsTrigger value="training">Training</TabsTrigger>
					</TabsList>

					<TabsContent value="all" className="space-y-6">
						{featuredResources.map((resource, index) => (
							<Card
								key={index}
								className="group hover:shadow-lg transition-all duration-300">
								<CardHeader>
									<div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
										<div className="flex-1">
											<div className="flex items-center gap-2 mb-2">
												<Badge variant="outline">{resource.category}</Badge>
												{resource.tags.map((tag) => (
													<Badge
														key={tag}
														variant="secondary"
														className="text-xs">
														<Tag className="h-3 w-3 mr-1" />
														{tag}
													</Badge>
												))}
											</div>
											<CardTitle className="group-hover:text-primary transition-colors text-xl">
												{resource.title}
											</CardTitle>
											<CardDescription className="mt-2 text-base">
												{resource.description}
											</CardDescription>
										</div>
										<div className="flex flex-col items-end gap-2">
											<div className="flex items-center gap-1">
												<Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
												<span className="text-sm font-medium">
													{resource.rating}
												</span>
											</div>
											<Button className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
												<Download className="h-4 w-4 mr-2" />
												Download
											</Button>
										</div>
									</div>
								</CardHeader>
								<CardContent>
									<div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
										<div className="flex items-center gap-1">
											<Download className="h-4 w-4" />
											{resource.downloadCount} downloads
										</div>
										<div className="flex items-center gap-1">
											<Calendar className="h-4 w-4" />
											Updated{" "}
											{new Date(resource.lastUpdated).toLocaleDateString()}
										</div>
										<div className="flex items-center gap-1">
											<FileText className="h-4 w-4" />
											{resource.type} • {resource.size}
										</div>
									</div>
								</CardContent>
							</Card>
						))}
					</TabsContent>

					{/* Other tab contents would be filtered versions of the resources */}
					<TabsContent value="templates">
						<div className="text-center py-12">
							<p className="text-muted-foreground">
								Template resources will be displayed here.
							</p>
						</div>
					</TabsContent>

					<TabsContent value="guides">
						<div className="text-center py-12">
							<p className="text-muted-foreground">
								Practice guide resources will be displayed here.
							</p>
						</div>
					</TabsContent>

					<TabsContent value="compliance">
						<div className="text-center py-12">
							<p className="text-muted-foreground">
								Compliance resources will be displayed here.
							</p>
						</div>
					</TabsContent>

					<TabsContent value="case-law">
						<div className="text-center py-12">
							<p className="text-muted-foreground">
								Case law resources will be displayed here.
							</p>
						</div>
					</TabsContent>

					<TabsContent value="training">
						<div className="text-center py-12">
							<p className="text-muted-foreground">
								Training resources will be displayed here.
							</p>
						</div>
					</TabsContent>
				</Tabs>
			</div>
		</section>
	);
};

export default FeaturedResources;
