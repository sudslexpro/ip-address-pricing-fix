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
	Code,
	Copy,
	ExternalLink,
	FileText,
	Key,
	Search,
	Settings,
	Shield,
	User,
	Zap,
} from "lucide-react";

interface ApiEndpoint {
	id: string;
	method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
	path: string;
	title: string;
	description: string;
	category: string;
}

const apiEndpoints: ApiEndpoint[] = [
	{
		id: "get-quotes",
		method: "GET",
		path: "/api/v1/quotes",
		title: "Get All Quotes",
		description: "Retrieve a list of all legal quotes",
		category: "Quotes",
	},
	{
		id: "create-quote",
		method: "POST",
		path: "/api/v1/quotes",
		title: "Create Quote",
		description: "Create a new legal quote",
		category: "Quotes",
	},
	{
		id: "get-quote",
		method: "GET",
		path: "/api/v1/quotes/{id}",
		title: "Get Quote by ID",
		description: "Retrieve a specific quote by its ID",
		category: "Quotes",
	},
	{
		id: "update-quote",
		method: "PUT",
		path: "/api/v1/quotes/{id}",
		title: "Update Quote",
		description: "Update an existing quote",
		category: "Quotes",
	},
	{
		id: "delete-quote",
		method: "DELETE",
		path: "/api/v1/quotes/{id}",
		title: "Delete Quote",
		description: "Delete a quote by ID",
		category: "Quotes",
	},
	{
		id: "get-clients",
		method: "GET",
		path: "/api/v1/clients",
		title: "Get All Clients",
		description: "Retrieve a list of all clients",
		category: "Clients",
	},
	{
		id: "create-client",
		method: "POST",
		path: "/api/v1/clients",
		title: "Create Client",
		description: "Add a new client to the system",
		category: "Clients",
	},
	{
		id: "get-client",
		method: "GET",
		path: "/api/v1/clients/{id}",
		title: "Get Client by ID",
		description: "Retrieve client details by ID",
		category: "Clients",
	},
	{
		id: "authenticate",
		method: "POST",
		path: "/api/v1/auth/login",
		title: "User Authentication",
		description: "Authenticate user and get access token",
		category: "Authentication",
	},
	{
		id: "refresh-token",
		method: "POST",
		path: "/api/v1/auth/refresh",
		title: "Refresh Token",
		description: "Refresh the access token",
		category: "Authentication",
	},
	{
		id: "get-documents",
		method: "GET",
		path: "/api/v1/documents",
		title: "Get Documents",
		description: "Retrieve legal documents",
		category: "Documents",
	},
	{
		id: "generate-pdf",
		method: "POST",
		path: "/api/v1/documents/pdf",
		title: "Generate PDF",
		description: "Generate a PDF document for a quote",
		category: "Documents",
	},
];

const categories = Array.from(
	new Set(apiEndpoints.map((endpoint) => endpoint.category))
);

const getMethodColor = (method: string) => {
	switch (method) {
		case "GET":
			return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
		case "POST":
			return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
		case "PUT":
			return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
		case "DELETE":
			return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
		case "PATCH":
			return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
		default:
			return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
	}
};

const ApiDocumentationPage: React.FC = () => {
	const [selectedEndpoint, setSelectedEndpoint] =
		React.useState<string>("get-quotes");
	const [selectedCategory, setSelectedCategory] = React.useState<string>("All");

	const filteredEndpoints =
		selectedCategory === "All"
			? apiEndpoints
			: apiEndpoints.filter(
					(endpoint) => endpoint.category === selectedCategory
			  );

	const currentEndpoint = apiEndpoints.find(
		(endpoint) => endpoint.id === selectedEndpoint
	);

	const sampleResponse = {
		success: true,
		data: {
			id: "quote-123",
			client_id: "client-456",
			service_type: "Legal Consultation",
			description: "Business contract review and consultation",
			amount: 2500.0,
			currency: "USD",
			status: "pending",
			created_at: "2024-01-15T10:30:00Z",
			expires_at: "2024-02-15T10:30:00Z",
		},
		meta: {
			version: "1.0",
			rate_limit: {
				remaining: 95,
				reset_at: "2024-01-15T11:00:00Z",
			},
		},
	};

	const sampleRequest = {
		client_id: "client-456",
		service_type: "Legal Consultation",
		description: "Business contract review and consultation",
		amount: 2500.0,
		currency: "USD",
	};

	return (
		<div className="flex h-screen bg-background">
			{/* Sidebar */}
			<div className="w-80 border-r bg-muted/30">
				<div className="p-6 border-b">
					<div className="flex items-center gap-2 mb-4">
						<Shield className="h-6 w-6 text-primary" />
						<h1 className="text-xl font-bold">Lex Protector API</h1>
					</div>
					<p className="text-sm text-muted-foreground">
						Complete API documentation for the Lex Protector legal quotation
						platform
					</p>
				</div>

				<div className="p-4">
					<div className="mb-4">
						<div className="flex items-center gap-2 mb-2">
							<Search className="h-4 w-4 text-muted-foreground" />
							<span className="text-sm font-medium">Categories</span>
						</div>
						<div className="space-y-1">
							<Button
								variant={selectedCategory === "All" ? "secondary" : "ghost"}
								className="w-full justify-start text-sm"
								onClick={() => setSelectedCategory("All")}>
								All Endpoints
							</Button>
							{categories.map((category) => (
								<Button
									key={category}
									variant={
										selectedCategory === category ? "secondary" : "ghost"
									}
									className="w-full justify-start text-sm"
									onClick={() => setSelectedCategory(category)}>
									{category === "Authentication" && (
										<Key className="h-4 w-4 mr-2" />
									)}
									{category === "Quotes" && (
										<FileText className="h-4 w-4 mr-2" />
									)}
									{category === "Clients" && <User className="h-4 w-4 mr-2" />}
									{category === "Documents" && (
										<Settings className="h-4 w-4 mr-2" />
									)}
									{category}
								</Button>
							))}
						</div>
					</div>

					<Separator className="my-4" />

					<ScrollArea className="h-[calc(100vh-300px)]">
						<div className="space-y-2">
							{filteredEndpoints.map((endpoint) => (
								<Card
									key={endpoint.id}
									className={cn(
										"cursor-pointer transition-all hover:shadow-sm",
										selectedEndpoint === endpoint.id && "ring-2 ring-primary"
									)}
									onClick={() => setSelectedEndpoint(endpoint.id)}>
									<CardContent className="p-3">
										<div className="flex items-center gap-2 mb-1">
											<Badge
												className={cn(
													"text-xs font-mono",
													getMethodColor(endpoint.method)
												)}>
												{endpoint.method}
											</Badge>
										</div>
										<h4 className="text-sm font-medium leading-tight">
											{endpoint.title}
										</h4>
										<p className="text-xs text-muted-foreground mt-1 font-mono">
											{endpoint.path}
										</p>
									</CardContent>
								</Card>
							))}
						</div>
					</ScrollArea>
				</div>
			</div>

			{/* Main Content */}
			<div className="flex-1 overflow-hidden">
				<ScrollArea className="h-full">
					<div className="p-8 max-w-4xl">
						{currentEndpoint && (
							<>
								{/* Header */}
								<div className="mb-8">
									<div className="flex items-center gap-3 mb-4">
										<Badge
											className={cn(
												"text-sm font-mono px-3 py-1",
												getMethodColor(currentEndpoint.method)
											)}>
											{currentEndpoint.method}
										</Badge>
										<code className="text-lg font-mono bg-muted px-3 py-1 rounded">
											{currentEndpoint.path}
										</code>
									</div>
									<h1 className="text-3xl font-bold mb-2">
										{currentEndpoint.title}
									</h1>
									<p className="text-lg text-muted-foreground">
										{currentEndpoint.description}
									</p>
								</div>

								{/* Quick Start */}
								<Card className="mb-8">
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<Zap className="h-5 w-5" />
											Quick Start
										</CardTitle>
										<CardDescription>
											Get started with this endpoint in seconds
										</CardDescription>
									</CardHeader>
									<CardContent>
										<div className="space-y-4">
											<div>
												<label className="text-sm font-medium">
													cURL Example
												</label>
												<div className="relative mt-2">
													<pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
														<code>{`curl -X ${
															currentEndpoint.method
														} "https://api.lexprotector.com${
															currentEndpoint.path
														}" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"${
		currentEndpoint.method === "POST" || currentEndpoint.method === "PUT"
			? ' \\\n  -d \'{"client_id": "client-456", "service_type": "Legal Consultation"}\''
			: ""
	}`}</code>
													</pre>
													<Button
														size="sm"
														variant="outline"
														className="absolute top-2 right-2">
														<Copy className="h-4 w-4" />
													</Button>
												</div>
											</div>
										</div>
									</CardContent>
								</Card>

								{/* Detailed Documentation */}
								<Tabs defaultValue="parameters" className="mb-8">
									<TabsList className="grid w-full grid-cols-4">
										<TabsTrigger value="parameters">Parameters</TabsTrigger>
										<TabsTrigger value="request">Request</TabsTrigger>
										<TabsTrigger value="response">Response</TabsTrigger>
										<TabsTrigger value="examples">Examples</TabsTrigger>
									</TabsList>

									<TabsContent value="parameters" className="space-y-4">
										<Card>
											<CardHeader>
												<CardTitle>Request Parameters</CardTitle>
												<CardDescription>
													Parameters required for this endpoint
												</CardDescription>
											</CardHeader>
											<CardContent>
												<div className="space-y-4">
													<div className="grid grid-cols-4 gap-4 text-sm font-medium border-b pb-2">
														<div>Name</div>
														<div>Type</div>
														<div>Required</div>
														<div>Description</div>
													</div>
													{currentEndpoint.path.includes("{id}") && (
														<div className="grid grid-cols-4 gap-4 text-sm">
															<code className="font-mono">id</code>
															<Badge variant="outline">string</Badge>
															<Badge variant="destructive">Required</Badge>
															<div>Unique identifier for the resource</div>
														</div>
													)}
													{(currentEndpoint.method === "POST" ||
														currentEndpoint.method === "PUT") && (
														<>
															<div className="grid grid-cols-4 gap-4 text-sm">
																<code className="font-mono">client_id</code>
																<Badge variant="outline">string</Badge>
																<Badge variant="destructive">Required</Badge>
																<div>ID of the client for this quote</div>
															</div>
															<div className="grid grid-cols-4 gap-4 text-sm">
																<code className="font-mono">service_type</code>
																<Badge variant="outline">string</Badge>
																<Badge variant="destructive">Required</Badge>
																<div>Type of legal service</div>
															</div>
															<div className="grid grid-cols-4 gap-4 text-sm">
																<code className="font-mono">amount</code>
																<Badge variant="outline">number</Badge>
																<Badge variant="destructive">Required</Badge>
																<div>Quote amount in specified currency</div>
															</div>
														</>
													)}
												</div>
											</CardContent>
										</Card>
									</TabsContent>

									<TabsContent value="request" className="space-y-4">
										<Card>
											<CardHeader>
												<CardTitle>Request Body</CardTitle>
												<CardDescription>
													Structure of the request payload
												</CardDescription>
											</CardHeader>
											<CardContent>
												<div className="relative">
													<pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
														<code>
															{JSON.stringify(sampleRequest, null, 2)}
														</code>
													</pre>
													<Button
														size="sm"
														variant="outline"
														className="absolute top-2 right-2">
														<Copy className="h-4 w-4" />
													</Button>
												</div>
											</CardContent>
										</Card>
									</TabsContent>

									<TabsContent value="response" className="space-y-4">
										<Card>
											<CardHeader>
												<CardTitle>Response Format</CardTitle>
												<CardDescription>
													Example response from this endpoint
												</CardDescription>
											</CardHeader>
											<CardContent>
												<div className="relative">
													<pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
														<code>
															{JSON.stringify(sampleResponse, null, 2)}
														</code>
													</pre>
													<Button
														size="sm"
														variant="outline"
														className="absolute top-2 right-2">
														<Copy className="h-4 w-4" />
													</Button>
												</div>
											</CardContent>
										</Card>
									</TabsContent>

									<TabsContent value="examples" className="space-y-4">
										<Card>
											<CardHeader>
												<CardTitle>Code Examples</CardTitle>
												<CardDescription>
													Implementation examples in different languages
												</CardDescription>
											</CardHeader>
											<CardContent>
												<Tabs defaultValue="javascript">
													<TabsList>
														<TabsTrigger value="javascript">
															JavaScript
														</TabsTrigger>
														<TabsTrigger value="python">Python</TabsTrigger>
														<TabsTrigger value="php">PHP</TabsTrigger>
													</TabsList>

													<TabsContent value="javascript">
														<div className="relative">
															<pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
																<code>{`const response = await fetch('https://api.lexprotector.com${
																	currentEndpoint.path
																}', {
  method: '${currentEndpoint.method}',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }${
		currentEndpoint.method === "POST" || currentEndpoint.method === "PUT"
			? `,
  body: JSON.stringify(${JSON.stringify(sampleRequest, null, 2)})`
			: ""
	}
});

const data = await response.json();
console.log(data);`}</code>
															</pre>
															<Button
																size="sm"
																variant="outline"
																className="absolute top-2 right-2">
																<Copy className="h-4 w-4" />
															</Button>
														</div>
													</TabsContent>

													<TabsContent value="python">
														<div className="relative">
															<pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
																<code>{`import requests

url = 'https://api.lexprotector.com${currentEndpoint.path}'
headers = {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
}${
																	currentEndpoint.method === "POST" ||
																	currentEndpoint.method === "PUT"
																		? `
data = ${JSON.stringify(sampleRequest, null, 2)}

response = requests.${currentEndpoint.method.toLowerCase()}(url, headers=headers, json=data)`
																		: `

response = requests.${currentEndpoint.method.toLowerCase()}(url, headers=headers)`
																}
print(response.json())`}</code>
															</pre>
															<Button
																size="sm"
																variant="outline"
																className="absolute top-2 right-2">
																<Copy className="h-4 w-4" />
															</Button>
														</div>
													</TabsContent>

													<TabsContent value="php">
														<div className="relative">
															<pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
																<code>{`<?php
$url = 'https://api.lexprotector.com${currentEndpoint.path}';
$headers = [
    'Authorization: Bearer YOUR_API_KEY',
    'Content-Type: application/json'
];${
																	currentEndpoint.method === "POST" ||
																	currentEndpoint.method === "PUT"
																		? `
$data = json_encode(${JSON.stringify(sampleRequest, null, 2)});`
																		: ""
																}

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);${
																	currentEndpoint.method === "POST" ||
																	currentEndpoint.method === "PUT"
																		? `
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, '${currentEndpoint.method}');
curl_setopt($ch, CURLOPT_POSTFIELDS, $data);`
																		: ""
																}

$response = curl_exec($ch);
curl_close($ch);

echo $response;
?>`}</code>
															</pre>
															<Button
																size="sm"
																variant="outline"
																className="absolute top-2 right-2">
																<Copy className="h-4 w-4" />
															</Button>
														</div>
													</TabsContent>
												</Tabs>
											</CardContent>
										</Card>
									</TabsContent>
								</Tabs>

								{/* Status Codes */}
								<Card>
									<CardHeader>
										<CardTitle>Response Status Codes</CardTitle>
										<CardDescription>
											HTTP status codes returned by this endpoint
										</CardDescription>
									</CardHeader>
									<CardContent>
										<div className="space-y-3">
											<div className="flex items-center gap-4">
												<Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
													200
												</Badge>
												<span className="text-sm">
													Success - Request completed successfully
												</span>
											</div>
											<div className="flex items-center gap-4">
												<Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
													400
												</Badge>
												<span className="text-sm">
													Bad Request - Invalid request parameters
												</span>
											</div>
											<div className="flex items-center gap-4">
												<Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
													401
												</Badge>
												<span className="text-sm">
													Unauthorized - Invalid or missing API key
												</span>
											</div>
											<div className="flex items-center gap-4">
												<Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
													404
												</Badge>
												<span className="text-sm">
													Not Found - Resource does not exist
												</span>
											</div>
											<div className="flex items-center gap-4">
												<Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
													500
												</Badge>
												<span className="text-sm">
													Internal Server Error - Server error occurred
												</span>
											</div>
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

export default ApiDocumentationPage;
