"use client";
import React from "react";
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
	Check,
	CheckCircle,
	Code,
	Copy,
	Download,
	ExternalLink,
	FileText,
	GitBranch,
	Globe,
	HelpCircle,
	Key,
	Layers,
	Menu,
	Package,
	Play,
	Plug,
	Settings,
	Shield,
	Smartphone,
	Terminal,
	Users,
	Webhook,
	X,
	Zap,
} from "lucide-react";

interface IntegrationGuide {
	id: string;
	title: string;
	description: string;
	category: string;
	difficulty: "Beginner" | "Intermediate" | "Advanced";
	timeEstimate: string;
	icon: React.ComponentType<{ className?: string }>;
}

interface IntegrationStep {
	id: string;
	title: string;
	description: string;
	code?: string;
	note?: string;
}

const integrationGuides: IntegrationGuide[] = [
	{
		id: "rest-api",
		title: "REST API Integration",
		description: "Integrate Lex Protector using our RESTful API endpoints",
		category: "API",
		difficulty: "Beginner",
		timeEstimate: "15-30 minutes",
		icon: Globe,
	},
	{
		id: "webhook-setup",
		title: "Webhook Configuration",
		description: "Set up real-time notifications for quote status changes",
		category: "Webhooks",
		difficulty: "Intermediate",
		timeEstimate: "30-45 minutes",
		icon: Webhook,
	},
	{
		id: "sdk-javascript",
		title: "JavaScript SDK",
		description:
			"Use our official JavaScript/TypeScript SDK for faster integration",
		category: "SDK",
		difficulty: "Beginner",
		timeEstimate: "10-20 minutes",
		icon: Package,
	},
	{
		id: "sdk-python",
		title: "Python SDK",
		description: "Integrate with Python applications using our official SDK",
		category: "SDK",
		difficulty: "Beginner",
		timeEstimate: "10-20 minutes",
		icon: Code,
	},
	{
		id: "embed-widget",
		title: "Quote Widget Embed",
		description: "Embed interactive quote widgets directly in your website",
		category: "Widgets",
		difficulty: "Beginner",
		timeEstimate: "5-15 minutes",
		icon: Plug,
	},
	{
		id: "mobile-sdk",
		title: "Mobile SDK",
		description: "Native iOS and Android SDKs for mobile app integration",
		category: "Mobile",
		difficulty: "Intermediate",
		timeEstimate: "1-2 hours",
		icon: Smartphone,
	},
	{
		id: "zapier-integration",
		title: "Zapier Integration",
		description: "Connect Lex Protector with 5000+ apps using Zapier",
		category: "Automation",
		difficulty: "Beginner",
		timeEstimate: "10-15 minutes",
		icon: Zap,
	},
	{
		id: "crm-connectors",
		title: "CRM Connectors",
		description: "Pre-built connectors for popular CRM systems",
		category: "Enterprise",
		difficulty: "Advanced",
		timeEstimate: "2-4 hours",
		icon: Users,
	},
];

const categories = Array.from(
	new Set(integrationGuides.map((guide) => guide.category))
);

const getDifficultyColor = (difficulty: string) => {
	switch (difficulty) {
		case "Beginner":
			return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
		case "Intermediate":
			return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
		case "Advanced":
			return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
		default:
			return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
	}
};

const quickStartSteps: IntegrationStep[] = [
	{
		id: "step-1",
		title: "Get API Credentials",
		description: "Sign up for a developer account and obtain your API key",
		note: "Your API key provides access to all Lex Protector endpoints",
	},
	{
		id: "step-2",
		title: "Install SDK",
		description: "Choose your preferred SDK and install it in your project",
		code: `# JavaScript/TypeScript
npm install @lex-protector/sdk

# Python
pip install lex-protector-sdk

# PHP
composer require lex-protector/sdk`,
	},
	{
		id: "step-3",
		title: "Initialize Client",
		description: "Set up the client with your API credentials",
		code: `// JavaScript/TypeScript
import { LexProtectorClient } from '@lex-protector/sdk';

const client = new LexProtectorClient({
  apiKey: 'your-api-key',
  environment: 'sandbox' // or 'production'
});

# Python
from lex_protector import Client

client = Client(
    api_key='your-api-key',
    environment='sandbox'
)`,
	},
	{
		id: "step-4",
		title: "Create Your First Quote",
		description: "Test the integration by creating a sample quote",
		code: `// JavaScript/TypeScript
const quote = await client.quotes.create({
  clientId: 'client-123',
  serviceType: 'Legal Consultation',
  amount: 2500.00,
  currency: 'USD'
});

# Python
quote = client.quotes.create(
    client_id='client-123',
    service_type='Legal Consultation',
    amount=2500.00,
    currency='USD'
)`,
	},
];

const Integration: React.FC = () => {
	const [selectedGuide, setSelectedGuide] = React.useState<string>("rest-api");
	const [selectedCategory, setSelectedCategory] = React.useState<string>("All");
	const [isSidebarOpen, setIsSidebarOpen] = React.useState<boolean>(false);
	const [copiedCode, setCopiedCode] = React.useState<string>("");

	const filteredGuides =
		selectedCategory === "All"
			? integrationGuides
			: integrationGuides.filter(
					(guide) => guide.category === selectedCategory
			  );

	const currentGuide = integrationGuides.find(
		(guide) => guide.id === selectedGuide
	);

	const handleGuideSelect = (guideId: string) => {
		setSelectedGuide(guideId);
		setIsSidebarOpen(false);
	};

	const copyToClipboard = async (code: string, stepId: string) => {
		try {
			await navigator.clipboard.writeText(code);
			setCopiedCode(stepId);
			setTimeout(() => setCopiedCode(""), 2000);
		} catch (err) {
			console.error("Failed to copy code:", err);
		}
	};

	const sampleWebhookPayload = `{
  "event": "quote.status_changed",
  "timestamp": "2024-01-15T10:30:00Z",
  "data": {
    "quote_id": "quote-123",
    "previous_status": "pending",
    "new_status": "approved",
    "client_id": "client-456",
    "amount": 2500.00,
    "currency": "USD"
  },
  "signature": "sha256=..."
}`;

	const embedCode = `<!-- Basic Quote Widget -->
<div id="lex-protector-widget"></div>
<script src="https://cdn.lexprotector.com/widget/v1/widget.js"></script>
<script>
  LexProtectorWidget.init({
    apiKey: 'your-public-api-key',
    element: '#lex-protector-widget',
    theme: 'light', // or 'dark'
    services: ['consultation', 'contract-review', 'litigation']
  });
</script>`;

	return (
		<div className="flex min-h-[calc(100vh-8rem)] bg-background relative">
			{/* Mobile Menu Button */}
			<Button
				variant="outline"
				size="sm"
				className="fixed top-20 left-4 z-50 lg:hidden"
				onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
				{isSidebarOpen ? (
					<X className="h-4 w-4" />
				) : (
					<Menu className="h-4 w-4" />
				)}
			</Button>

			{/* Mobile Overlay */}
			{isSidebarOpen && (
				<div
					className="fixed inset-0 bg-black/50 z-30 lg:hidden"
					onClick={() => setIsSidebarOpen(false)}
				/>
			)}

			{/* Sidebar */}
			<div
				className={cn(
					"w-80 border-r bg-muted transition-transform duration-300 ease-in-out z-40",
					"lg:relative lg:translate-x-0",
					"fixed inset-y-0 left-0",
					isSidebarOpen ? "translate-x-0" : "-translate-x-full"
				)}>
				<div className="p-6 border-b">
					<div className="flex items-center gap-2 mb-4">
						<Shield className="h-6 w-6 text-primary" />
						<h1 className="text-xl font-bold">Integration Guide</h1>
					</div>
					<p className="text-sm text-muted-foreground">
						Complete integration documentation for the Lex Protector platform
					</p>
				</div>

				<div className="p-4">
					<div className="mb-4">
						<div className="flex items-center gap-2 mb-2">
							<Layers className="h-4 w-4 text-muted-foreground" />
							<span className="text-sm font-medium">Categories</span>
						</div>
						<div className="space-y-1">
							<Button
								variant={selectedCategory === "All" ? "secondary" : "ghost"}
								className="w-full justify-start text-sm"
								onClick={() => setSelectedCategory("All")}>
								All Integrations
							</Button>
							{categories.map((category) => (
								<Button
									key={category}
									variant={
										selectedCategory === category ? "secondary" : "ghost"
									}
									className="w-full justify-start text-sm"
									onClick={() => setSelectedCategory(category)}>
									{category === "API" && <Globe className="h-4 w-4 mr-2" />}
									{category === "SDK" && <Package className="h-4 w-4 mr-2" />}
									{category === "Webhooks" && (
										<Webhook className="h-4 w-4 mr-2" />
									)}
									{category === "Widgets" && <Plug className="h-4 w-4 mr-2" />}
									{category === "Mobile" && (
										<Smartphone className="h-4 w-4 mr-2" />
									)}
									{category === "Automation" && (
										<Zap className="h-4 w-4 mr-2" />
									)}
									{category === "Enterprise" && (
										<Users className="h-4 w-4 mr-2" />
									)}
									{category}
								</Button>
							))}
						</div>
					</div>

					<Separator className="my-4" />

					<ScrollArea className="h-[calc(100vh-20rem)]">
						<div className="space-y-2">
							{filteredGuides.map((guide) => {
								const IconComponent = guide.icon;
								return (
									<Card
										key={guide.id}
										className={cn(
											"cursor-pointer transition-all hover:shadow-sm",
											selectedGuide === guide.id && "ring-2 ring-primary"
										)}
										onClick={() => handleGuideSelect(guide.id)}>
										<CardContent className="p-3">
											<div className="flex items-center gap-2 mb-2">
												<IconComponent className="h-4 w-4 text-primary" />
												<Badge
													className={cn(
														"text-xs",
														getDifficultyColor(guide.difficulty)
													)}>
													{guide.difficulty}
												</Badge>
											</div>
											<h4 className="text-sm font-medium leading-tight mb-1">
												{guide.title}
											</h4>
											<p className="text-xs text-muted-foreground mb-2">
												{guide.description}
											</p>
											<div className="flex items-center gap-1 text-xs text-muted-foreground">
												<Terminal className="h-3 w-3" />
												<span>{guide.timeEstimate}</span>
											</div>
										</CardContent>
									</Card>
								);
							})}
						</div>
					</ScrollArea>
				</div>
			</div>

			{/* Main Content */}
			<div className="flex-1 overflow-hidden lg:ml-0">
				<ScrollArea className="h-[calc(100vh-8rem)]">
					<div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
						{currentGuide && (
							<>
								{/* Header */}
								<div className="mb-6 lg:mb-8 mt-12 lg:mt-0">
									<div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
										<div className="flex items-center gap-2">
											<currentGuide.icon className="h-6 w-6 text-primary" />
											<Badge
												className={cn(
													"text-sm px-3 py-1",
													getDifficultyColor(currentGuide.difficulty)
												)}>
												{currentGuide.difficulty}
											</Badge>
										</div>
										<div className="flex items-center gap-2 text-sm text-muted-foreground">
											<Terminal className="h-4 w-4" />
											<span>{currentGuide.timeEstimate}</span>
										</div>
									</div>
									<h1 className="text-2xl lg:text-3xl font-bold mb-2">
										{currentGuide.title}
									</h1>
									<p className="text-base lg:text-lg text-muted-foreground">
										{currentGuide.description}
									</p>
								</div>

								{/* Quick Start Section - Always show this first */}
								{currentGuide.id === "rest-api" && (
									<Card className="mb-6 lg:mb-8">
										<CardHeader>
											<CardTitle className="flex items-center gap-2">
												<Play className="h-5 w-5" />
												Quick Start Guide
											</CardTitle>
											<CardDescription>
												Get started with Lex Protector in 4 simple steps
											</CardDescription>
										</CardHeader>
										<CardContent>
											<div className="space-y-6">
												{quickStartSteps.map((step, index) => (
													<div key={step.id} className="flex gap-4">
														<div className="flex-shrink-0">
															<div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
																{index + 1}
															</div>
														</div>
														<div className="flex-1 space-y-2">
															<h3 className="font-medium">{step.title}</h3>
															<p className="text-sm text-muted-foreground">
																{step.description}
															</p>
															{step.code && (
																<div className="relative">
																	<pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
																		<code>{step.code}</code>
																	</pre>
																	<Button
																		size="sm"
																		variant="outline"
																		className="absolute top-2 right-2"
																		onClick={() =>
																			copyToClipboard(step.code!, step.id)
																		}>
																		{copiedCode === step.id ? (
																			<Check className="h-4 w-4" />
																		) : (
																			<Copy className="h-4 w-4" />
																		)}
																	</Button>
																</div>
															)}
															{step.note && (
																<div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
																	<p className="text-sm text-blue-700 dark:text-blue-300">
																		💡 {step.note}
																	</p>
																</div>
															)}
														</div>
													</div>
												))}
											</div>
										</CardContent>
									</Card>
								)}

								{/* Main Integration Content */}
								<Tabs defaultValue="overview" className="mb-6 lg:mb-8">
									<TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
										<TabsTrigger
											value="overview"
											className="text-xs sm:text-sm">
											Overview
										</TabsTrigger>
										<TabsTrigger
											value="implementation"
											className="text-xs sm:text-sm">
											Implementation
										</TabsTrigger>
										<TabsTrigger
											value="examples"
											className="text-xs sm:text-sm">
											Examples
										</TabsTrigger>
										<TabsTrigger value="support" className="text-xs sm:text-sm">
											Support
										</TabsTrigger>
									</TabsList>

									<TabsContent value="overview" className="space-y-4">
										{currentGuide.id === "rest-api" && (
											<>
												<Card>
													<CardHeader>
														<CardTitle>REST API Overview</CardTitle>
														<CardDescription>
															Comprehensive RESTful API for all Lex Protector
															functionality
														</CardDescription>
													</CardHeader>
													<CardContent>
														<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
															<div className="space-y-3">
																<h4 className="font-medium">Key Features</h4>
																<ul className="space-y-2 text-sm">
																	<li className="flex items-center gap-2">
																		<CheckCircle className="h-4 w-4 text-green-500" />
																		Quote management and generation
																	</li>
																	<li className="flex items-center gap-2">
																		<CheckCircle className="h-4 w-4 text-green-500" />
																		Client and case management
																	</li>
																	<li className="flex items-center gap-2">
																		<CheckCircle className="h-4 w-4 text-green-500" />
																		PDF document generation
																	</li>
																	<li className="flex items-center gap-2">
																		<CheckCircle className="h-4 w-4 text-green-500" />
																		Real-time status updates
																	</li>
																</ul>
															</div>
															<div className="space-y-3">
																<h4 className="font-medium">Authentication</h4>
																<div className="bg-muted p-3 rounded-lg">
																	<code className="text-sm">
																		Authorization: Bearer your-api-key
																	</code>
																</div>
																<p className="text-sm text-muted-foreground">
																	All requests require a valid API key in the
																	Authorization header.
																</p>
															</div>
														</div>
													</CardContent>
												</Card>
											</>
										)}

										{currentGuide.id === "webhook-setup" && (
											<Card>
												<CardHeader>
													<CardTitle>Webhook Configuration</CardTitle>
													<CardDescription>
														Set up real-time event notifications for your
														application
													</CardDescription>
												</CardHeader>
												<CardContent>
													<div className="space-y-4">
														<div>
															<h4 className="font-medium mb-2">
																Supported Events
															</h4>
															<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
																<Badge variant="outline">quote.created</Badge>
																<Badge variant="outline">quote.updated</Badge>
																<Badge variant="outline">
																	quote.status_changed
																</Badge>
																<Badge variant="outline">client.created</Badge>
																<Badge variant="outline">
																	document.generated
																</Badge>
																<Badge variant="outline">
																	payment.received
																</Badge>
															</div>
														</div>
														<div>
															<h4 className="font-medium mb-2">
																Sample Webhook Payload
															</h4>
															<div className="relative">
																<pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
																	<code>{sampleWebhookPayload}</code>
																</pre>
																<Button
																	size="sm"
																	variant="outline"
																	className="absolute top-2 right-2"
																	onClick={() =>
																		copyToClipboard(
																			sampleWebhookPayload,
																			"webhook-payload"
																		)
																	}>
																	{copiedCode === "webhook-payload" ? (
																		<Check className="h-4 w-4" />
																	) : (
																		<Copy className="h-4 w-4" />
																	)}
																</Button>
															</div>
														</div>
													</div>
												</CardContent>
											</Card>
										)}

										{currentGuide.id === "embed-widget" && (
											<Card>
												<CardHeader>
													<CardTitle>Quote Widget Embed</CardTitle>
													<CardDescription>
														Add interactive quote widgets to your website
													</CardDescription>
												</CardHeader>
												<CardContent>
													<div className="space-y-4">
														<div>
															<h4 className="font-medium mb-2">
																Widget Features
															</h4>
															<ul className="space-y-1 text-sm">
																<li className="flex items-center gap-2">
																	<CheckCircle className="h-4 w-4 text-green-500" />
																	Customizable themes (light/dark)
																</li>
																<li className="flex items-center gap-2">
																	<CheckCircle className="h-4 w-4 text-green-500" />
																	Responsive design
																</li>
																<li className="flex items-center gap-2">
																	<CheckCircle className="h-4 w-4 text-green-500" />
																	Real-time quote calculation
																</li>
																<li className="flex items-center gap-2">
																	<CheckCircle className="h-4 w-4 text-green-500" />
																	Lead capture integration
																</li>
															</ul>
														</div>
														<div>
															<h4 className="font-medium mb-2">Embed Code</h4>
															<div className="relative">
																<pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
																	<code>{embedCode}</code>
																</pre>
																<Button
																	size="sm"
																	variant="outline"
																	className="absolute top-2 right-2"
																	onClick={() =>
																		copyToClipboard(embedCode, "embed-code")
																	}>
																	{copiedCode === "embed-code" ? (
																		<Check className="h-4 w-4" />
																	) : (
																		<Copy className="h-4 w-4" />
																	)}
																</Button>
															</div>
														</div>
													</div>
												</CardContent>
											</Card>
										)}
									</TabsContent>

									<TabsContent value="implementation" className="space-y-4">
										<Card>
											<CardHeader>
												<CardTitle>Implementation Details</CardTitle>
												<CardDescription>
													Step-by-step implementation guide for{" "}
													{currentGuide.title}
												</CardDescription>
											</CardHeader>
											<CardContent>
												<div className="space-y-6">
													<div className="border-l-4 border-primary pl-4">
														<h4 className="font-medium">Prerequisites</h4>
														<ul className="mt-2 space-y-1 text-sm text-muted-foreground">
															<li>• Valid Lex Protector API credentials</li>
															<li>• Development environment setup</li>
															<li>• Basic understanding of REST APIs</li>
															{currentGuide.category === "SDK" && (
																<li>• Node.js 16+ or Python 3.8+ installed</li>
															)}
														</ul>
													</div>
													<div>
														<h4 className="font-medium mb-2">
															Environment Setup
														</h4>
														<div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
															<p className="text-sm text-yellow-700 dark:text-yellow-300">
																⚠️ Always use the sandbox environment for
																testing before switching to production.
															</p>
														</div>
													</div>
												</div>
											</CardContent>
										</Card>
									</TabsContent>

									<TabsContent value="examples" className="space-y-4">
										<Card>
											<CardHeader>
												<CardTitle>Code Examples</CardTitle>
												<CardDescription>
													Real-world implementation examples
												</CardDescription>
											</CardHeader>
											<CardContent>
												<div className="space-y-4">
													<div>
														<h4 className="font-medium mb-2">
															Error Handling Best Practices
														</h4>
														<div className="relative">
															<pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
																<code>{`try {
  const quote = await client.quotes.create(quoteData);
  console.log('Quote created:', quote.id);
} catch (error) {
  if (error.status === 400) {
    console.error('Invalid request:', error.message);
  } else if (error.status === 401) {
    console.error('Authentication failed');
  } else {
    console.error('Unexpected error:', error);
  }
}`}</code>
															</pre>
														</div>
													</div>
												</div>
											</CardContent>
										</Card>
									</TabsContent>

									<TabsContent value="support" className="space-y-4">
										<Card>
											<CardHeader>
												<CardTitle>Support & Resources</CardTitle>
												<CardDescription>
													Get help and find additional resources
												</CardDescription>
											</CardHeader>
											<CardContent>
												<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
													<div className="space-y-3">
														<h4 className="font-medium">Documentation</h4>
														<div className="space-y-2">
															<Button
																variant="outline"
																className="w-full justify-start"
																asChild>
																<a href="#" className="flex items-center gap-2">
																	<Download className="h-4 w-4" />
																	SDK Documentation
																</a>
															</Button>
														</div>
													</div>
													<div className="space-y-3">
														<h4 className="font-medium">Support Channels</h4>
														<div className="space-y-2">
															<Button
																variant="outline"
																className="w-full justify-start"
																asChild>
																<a
																	href="mailto:support@lexprotector.com"
																	className="flex items-center gap-2">
																	<Settings className="h-4 w-4" />
																	Technical Support
																</a>
															</Button>
															<Button
																variant="outline"
																className="w-full justify-start"
																asChild>
																<a href="#" className="flex items-center gap-2">
																	<ExternalLink className="h-4 w-4" />
																	Developer Community
																</a>
															</Button>
														</div>
													</div>
												</div>
											</CardContent>
										</Card>
									</TabsContent>
								</Tabs>

								{/* Additional Resources */}
								<Card>
									<CardHeader>
										<CardTitle>Next Steps</CardTitle>
										<CardDescription>
											Continue your integration journey
										</CardDescription>
									</CardHeader>
									<CardContent>
										<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
											<Button variant="outline" className="h-auto p-4" asChild>
												<a href="/help-center" className="block">
													<div className="space-y-2">
														<HelpCircle className="h-6 w-6 mx-auto" />
														<div>
															<h4 className="font-medium">Help Center</h4>
															<p className="text-sm text-muted-foreground">
																Get support and tutorials
															</p>
														</div>
													</div>
												</a>
											</Button>
											<Button variant="outline" className="h-auto p-4">
												<div className="space-y-2">
													<GitBranch className="h-6 w-6 mx-auto" />
													<div>
														<h4 className="font-medium">Sample Apps</h4>
														<p className="text-sm text-muted-foreground">
															Ready-to-run examples
														</p>
													</div>
												</div>
											</Button>
											<Button variant="outline" className="h-auto p-4">
												<div className="space-y-2">
													<Users className="h-6 w-6 mx-auto" />
													<div>
														<h4 className="font-medium">Community</h4>
														<p className="text-sm text-muted-foreground">
															Join our developers
														</p>
													</div>
												</div>
											</Button>
										</div>
									</CardContent>
								</Card>
							</>
						)}
					</div>
				</ScrollArea>
			</div>
		</div>
	);
};

export default Integration;
