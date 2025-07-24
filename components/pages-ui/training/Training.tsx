"use client";
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
	BookOpen,
	Clock,
	Download,
	ExternalLink,
	FileText,
	GraduationCap,
	Play,
	Star,
	Target,
	Users,
	Video,
	CheckCircle2,
	ArrowRight,
	Calendar,
	Award,
} from "lucide-react";

interface TrainingModule {
	id: string;
	title: string;
	description: string;
	duration: string;
	difficulty: "Beginner" | "Intermediate" | "Advanced";
	category: string;
	completed?: boolean;
	videoUrl?: string;
	documentsCount: number;
	rating: number;
}

interface TrainingCategory {
	id: string;
	name: string;
	description: string;
	moduleCount: number;
	icon: React.ReactNode;
}

const trainingModules: TrainingModule[] = [
	{
		id: "getting-started",
		title: "Getting Started with Lex Protector",
		description:
			"Learn the basics of using the Lex Protector portal for legal quotations and document generation.",
		duration: "45 min",
		difficulty: "Beginner",
		category: "Fundamentals",
		completed: true,
		videoUrl: "#",
		documentsCount: 3,
		rating: 4.8,
	},
	{
		id: "quote-generation",
		title: "Advanced Quote Generation",
		description:
			"Master the art of creating detailed, professional quotes with custom pricing and terms.",
		duration: "1h 20min",
		difficulty: "Intermediate",
		category: "Fundamentals",
		completed: true,
		videoUrl: "#",
		documentsCount: 5,
		rating: 4.9,
	},
	{
		id: "pdf-customization",
		title: "PDF Document Customization",
		description:
			"Customize letterheads, templates, and branding for professional PDF output.",
		duration: "55 min",
		difficulty: "Intermediate",
		category: "Documents",
		completed: false,
		videoUrl: "#",
		documentsCount: 4,
		rating: 4.7,
	},
	{
		id: "pricing-strategies",
		title: "Legal Pricing Strategies",
		description:
			"Learn effective pricing models and strategies for different types of legal services.",
		duration: "1h 30min",
		difficulty: "Intermediate",
		category: "Business",
		completed: false,
		videoUrl: "#",
		documentsCount: 6,
		rating: 4.8,
	},
	{
		id: "client-management",
		title: "Client Communication Best Practices",
		description:
			"Best practices for client communication and professional quote presentation.",
		duration: "1h",
		difficulty: "Beginner",
		category: "Business",
		completed: false,
		videoUrl: "#",
		documentsCount: 4,
		rating: 4.9,
	},
	{
		id: "compliance-security",
		title: "Legal Compliance & Security",
		description:
			"Understanding compliance requirements and security best practices for legal tech.",
		duration: "1h 45min",
		difficulty: "Advanced",
		category: "Compliance",
		completed: false,
		videoUrl: "#",
		documentsCount: 7,
		rating: 4.7,
	},
	{
		id: "workflow-automation",
		title: "Workflow Automation",
		description:
			"Automate repetitive tasks and streamline your legal practice workflow.",
		duration: "2h",
		difficulty: "Advanced",
		category: "Business",
		completed: false,
		videoUrl: "#",
		documentsCount: 9,
		rating: 4.8,
	},
];

const categories: TrainingCategory[] = [
	{
		id: "all",
		name: "All Courses",
		description: "View all available training modules",
		moduleCount: trainingModules.length,
		icon: <GraduationCap className="h-5 w-5" />,
	},
	{
		id: "Fundamentals",
		name: "Fundamentals",
		description: "Core concepts and basic operations",
		moduleCount: trainingModules.filter((m) => m.category === "Fundamentals")
			.length,
		icon: <BookOpen className="h-5 w-5" />,
	},
	{
		id: "Documents",
		name: "Documents",
		description: "PDF generation and customization",
		moduleCount: trainingModules.filter((m) => m.category === "Documents")
			.length,
		icon: <FileText className="h-5 w-5" />,
	},
	{
		id: "Business",
		name: "Business",
		description: "Pricing strategies and client management",
		moduleCount: trainingModules.filter((m) => m.category === "Business")
			.length,
		icon: <Users className="h-5 w-5" />,
	},
	{
		id: "Compliance",
		name: "Compliance",
		description: "Security and legal compliance",
		moduleCount: trainingModules.filter((m) => m.category === "Compliance")
			.length,
		icon: <Award className="h-5 w-5" />,
	},
];

const getDifficultyColor = (difficulty: string) => {
	switch (difficulty) {
		case "Beginner":
			return "bg-success/10 text-success dark:bg-success/20 dark:text-success";
		case "Intermediate":
			return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300";
		case "Advanced":
			return "bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive";
		default:
			return "bg-muted text-muted-foreground";
	}
};

const Training: React.FC = () => {
	const [selectedCategory, setSelectedCategory] = useState<string>("all");
	const [selectedModule, setSelectedModule] = useState<string | null>(null);

	const filteredModules =
		selectedCategory === "all"
			? trainingModules
			: trainingModules.filter(
					(module) => module.category === selectedCategory
			  );

	const completedModules = trainingModules.filter(
		(module) => module.completed
	).length;
	const totalModules = trainingModules.length;
	const progressPercentage = (completedModules / totalModules) * 100;

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
			{/* Hero Section */}
			<section className="relative py-20 px-4 sm:px-6 lg:px-8">
				<div className="max-w-7xl mx-auto">
					<div className="text-center mb-16">
						<Badge className="mb-4 px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200">
							<GraduationCap className="h-4 w-4 mr-2" />
							Training Center
						</Badge>
						<h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
							Master{" "}
							<span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
								Legal Technology
							</span>
						</h1>
						<p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
							Comprehensive training resources to help you maximize the
							potential of Lex Protector. From basic operations to advanced
							features.
						</p>

						{/* Progress Overview */}
						<div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
							<div className="flex items-center justify-between mb-3">
								<span className="text-sm font-medium text-gray-700 dark:text-gray-300">
									Your Progress
								</span>
								<span className="text-sm text-gray-500 dark:text-gray-400">
									{completedModules}/{totalModules} completed
								</span>
							</div>
							<div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
								<div
									className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
									style={{ width: `${progressPercentage}%` }}
								/>
							</div>
							<p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
								{Math.round(progressPercentage)}% complete
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Main Content */}
			<section className="py-16 px-4 sm:px-6 lg:px-8">
				<div className="max-w-7xl mx-auto">
					<Tabs defaultValue="courses" className="w-full">
						<TabsList className="grid w-full grid-cols-3 lg:w-fit mb-8">
							<TabsTrigger value="courses" className="flex items-center gap-2">
								<BookOpen className="h-4 w-4" />
								Courses
							</TabsTrigger>
							<TabsTrigger
								value="resources"
								className="flex items-center gap-2">
								<FileText className="h-4 w-4" />
								Resources
							</TabsTrigger>
							<TabsTrigger value="webinars" className="flex items-center gap-2">
								<Calendar className="h-4 w-4" />
								Webinars
							</TabsTrigger>
						</TabsList>

						{/* Courses Tab */}
						<TabsContent value="courses" className="space-y-8">
							{/* Category Filter */}
							<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
								{categories.map((category) => (
									<Card
										key={category.id}
										className={cn(
											"cursor-pointer transition-all duration-200 hover:shadow-md",
											selectedCategory === category.id
												? "ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-950"
												: "hover:shadow-lg"
										)}
										onClick={() => setSelectedCategory(category.id)}>
										<CardContent className="p-4 text-center">
											<div className="flex justify-center mb-2 text-blue-600 dark:text-blue-400">
												{category.icon}
											</div>
											<h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-1">
												{category.name}
											</h3>
											<p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
												{category.moduleCount} modules
											</p>
										</CardContent>
									</Card>
								))}
							</div>

							{/* Training Modules Grid */}
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
								{filteredModules.map((module) => (
									<Card
										key={module.id}
										className="group hover:shadow-xl transition-all duration-300 cursor-pointer"
										onClick={() => setSelectedModule(module.id)}>
										<CardHeader className="pb-4">
											<div className="flex items-start justify-between mb-2">
												<Badge
													className={getDifficultyColor(module.difficulty)}>
													{module.difficulty}
												</Badge>
												{module.completed && (
													<CheckCircle2 className="h-5 w-5 text-green-500" />
												)}
											</div>
											<CardTitle className="text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
												{module.title}
											</CardTitle>
											<CardDescription className="text-sm">
												{module.description}
											</CardDescription>
										</CardHeader>
										<CardContent className="pt-0">
											<div className="space-y-4">
												<div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
													<div className="flex items-center gap-1">
														<Clock className="h-4 w-4" />
														{module.duration}
													</div>
													<div className="flex items-center gap-1">
														<Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
														{module.rating}
													</div>
												</div>

												<div className="flex items-center justify-between text-sm">
													<span className="text-gray-600 dark:text-gray-400">
														{module.documentsCount} resources
													</span>
													<div className="flex items-center gap-2">
														<Video className="h-4 w-4 text-blue-500" />
														<span className="text-blue-600 dark:text-blue-400">
															Video included
														</span>
													</div>
												</div>

												<Button
													className="w-full group-hover:bg-blue-600 transition-colors"
													variant={module.completed ? "outline" : "default"}>
													{module.completed ? (
														<>
															<CheckCircle2 className="h-4 w-4 mr-2" />
															Review
														</>
													) : (
														<>
															<Play className="h-4 w-4 mr-2" />
															Start Learning
														</>
													)}
													<ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
												</Button>
											</div>
										</CardContent>
									</Card>
								))}
							</div>
						</TabsContent>

						{/* Resources Tab */}
						<TabsContent value="resources" className="space-y-6">
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
								{/* Quick Reference */}
								<Card className="hover:shadow-lg transition-shadow">
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<FileText className="h-5 w-5 text-blue-500" />
											Quick Reference Guides
										</CardTitle>
										<CardDescription>
											Downloadable PDFs for quick reference while working
										</CardDescription>
									</CardHeader>
									<CardContent>
										<div className="space-y-3">
											<div className="flex items-center justify-between">
												<span className="text-sm">
													API Endpoints Cheat Sheet
												</span>
												<Button size="sm" variant="outline">
													<Download className="h-4 w-4" />
												</Button>
											</div>
											<div className="flex items-center justify-between">
												<span className="text-sm">Pricing Formula Guide</span>
												<Button size="sm" variant="outline">
													<Download className="h-4 w-4" />
												</Button>
											</div>
											<div className="flex items-center justify-between">
												<span className="text-sm">PDF Template Examples</span>
												<Button size="sm" variant="outline">
													<Download className="h-4 w-4" />
												</Button>
											</div>
										</div>
									</CardContent>
								</Card>

								{/* Video Library */}
								<Card className="hover:shadow-lg transition-shadow">
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<Video className="h-5 w-5 text-purple-500" />
											Video Library
										</CardTitle>
										<CardDescription>
											Step-by-step video tutorials and walkthroughs
										</CardDescription>
									</CardHeader>
									<CardContent>
										<div className="space-y-3">
											<div className="flex items-center justify-between">
												<span className="text-sm">
													Getting Started (5 videos)
												</span>
												<Button size="sm" variant="outline">
													<Play className="h-4 w-4" />
												</Button>
											</div>
											<div className="flex items-center justify-between">
												<span className="text-sm">
													Advanced Features (8 videos)
												</span>
												<Button size="sm" variant="outline">
													<Play className="h-4 w-4" />
												</Button>
											</div>
											<div className="flex items-center justify-between">
												<span className="text-sm">
													Business Training (6 videos)
												</span>
												<Button size="sm" variant="outline">
													<Play className="h-4 w-4" />
												</Button>
											</div>
										</div>
									</CardContent>
								</Card>

								{/* Knowledge Base */}
								<Card className="hover:shadow-lg transition-shadow">
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<BookOpen className="h-5 w-5 text-green-500" />
											Knowledge Base
										</CardTitle>
										<CardDescription>
											Comprehensive documentation and FAQs
										</CardDescription>
									</CardHeader>
									<CardContent>
										<div className="space-y-3">
											<Button
												variant="outline"
												className="w-full justify-start">
												<ExternalLink className="h-4 w-4 mr-2" />
												Browse Documentation
											</Button>
											<Button
												variant="outline"
												className="w-full justify-start">
												<ExternalLink className="h-4 w-4 mr-2" />
												View FAQ
											</Button>
											<Button
												variant="outline"
												className="w-full justify-start">
												<ExternalLink className="h-4 w-4 mr-2" />
												Community Forum
											</Button>
										</div>
									</CardContent>
								</Card>
							</div>
						</TabsContent>

						{/* Webinars Tab */}
						<TabsContent value="webinars" className="space-y-6">
							<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
								{/* Upcoming Webinars */}
								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<Calendar className="h-5 w-5 text-blue-500" />
											Upcoming Webinars
										</CardTitle>
									</CardHeader>
									<CardContent className="space-y-4">
										<div className="border rounded-lg p-4">
											<h4 className="font-semibold mb-2">
												Advanced PDF Customization
											</h4>
											<p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
												Learn advanced techniques for customizing PDF outputs
												and branding
											</p>
											<div className="flex items-center justify-between">
												<span className="text-sm font-medium">
													July 18, 2025 - 2:00 PM EST
												</span>
												<Button size="sm">Register</Button>
											</div>
										</div>

										<div className="border rounded-lg p-4">
											<h4 className="font-semibold mb-2">
												Legal Practice Optimization
											</h4>
											<p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
												Workshop on streamlining legal practice workflows
											</p>
											<div className="flex items-center justify-between">
												<span className="text-sm font-medium">
													July 25, 2025 - 3:00 PM EST
												</span>
												<Button size="sm">Register</Button>
											</div>
										</div>
									</CardContent>
								</Card>

								{/* Past Recordings */}
								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<Video className="h-5 w-5 text-purple-500" />
											Recorded Sessions
										</CardTitle>
									</CardHeader>
									<CardContent className="space-y-4">
										<div className="border rounded-lg p-4">
											<h4 className="font-semibold mb-2">
												Getting Started with Lex Protector
											</h4>
											<p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
												Complete walkthrough of the platform features and
												capabilities
											</p>
											<div className="flex items-center justify-between">
												<span className="text-sm text-gray-500">
													Recorded July 2, 2025
												</span>
												<Button size="sm" variant="outline">
													<Play className="h-4 w-4 mr-2" />
													Watch
												</Button>
											</div>
										</div>

										<div className="border rounded-lg p-4">
											<h4 className="font-semibold mb-2">
												Legal Pricing Best Practices
											</h4>
											<p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
												Expert insights on effective legal service pricing
												strategies
											</p>
											<div className="flex items-center justify-between">
												<span className="text-sm text-gray-500">
													Recorded June 15, 2025
												</span>
												<Button size="sm" variant="outline">
													<Play className="h-4 w-4 mr-2" />
													Watch
												</Button>
											</div>
										</div>
									</CardContent>
								</Card>
							</div>
						</TabsContent>
					</Tabs>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
				<div className="max-w-4xl mx-auto text-center">
					<h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
						Ready to Become a Lex Protector Expert?
					</h2>
					<p className="text-xl text-blue-100 mb-8">
						Start with our fundamentals course and work your way up to advanced
						features.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Button
							size="lg"
							className="bg-white text-blue-600 hover:bg-gray-100">
							<GraduationCap className="h-5 w-5 mr-2" />
							Start Learning Today
						</Button>
						<Button
							size="lg"
							variant="outline"
							className="border-white text-white hover:bg-white hover:text-blue-600">
							<Calendar className="h-5 w-5 mr-2" />
							Schedule 1-on-1 Training
						</Button>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Training;
