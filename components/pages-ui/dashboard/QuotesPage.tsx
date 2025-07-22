"use client";

import React from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

const QuotesPage: React.FC = () => {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<FileText className="h-5 w-5" />
					Quote Management
				</CardTitle>
				<CardDescription>
					Manage your trademark quotes and applications
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="text-center py-8">
					<FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
					<p className="text-muted-foreground">
						Quote management interface would be implemented here...
					</p>
					<Button className="mt-4">Create New Quote</Button>
				</div>
			</CardContent>
		</Card>
	);
};

export default QuotesPage;
