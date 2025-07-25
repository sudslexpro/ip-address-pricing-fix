"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/icon/AppIcon";
import {
	CalendlyScheduler,
	VersatileCalendlyScheduler,
	InlineCalendlyScheduler,
} from "@/components/scheduling";
import {
	EnhancedModal as Modal,
	ModalContent,
	ModalHeader,
	ModalTitle,
	ModalDescription,
} from "@/components/ui/modal";

const InlineCalendlyDemo: React.FC = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedDemo, setSelectedDemo] = useState<string | null>(null);

	const handleOpenModal = (demoType: string) => {
		setSelectedDemo(demoType);
		setIsModalOpen(true);
	};

	return (
		<div className="min-h-screen bg-background">
			{/* Header */}
			<div className="bg-primary text-white py-12">
				<div className="max-w-7xl mx-auto px-6 lg:px-8">
					<div className="text-center space-y-4">
						<h1 className="text-4xl font-bold">
							Calendly Scheduler Components Demo
						</h1>
						<p className="text-xl text-blue-100">
							Explore different ways to integrate Calendly scheduling into your
							application
						</p>
					</div>
				</div>
			</div>

			{/* Demo Grid */}
			<div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
				<div className="grid lg:grid-cols-2 gap-12">
					{/* Inline Widget Demo */}
					<div className="space-y-6">
						<div className="text-center">
							<h2 className="text-2xl font-bold text-foreground mb-4">
								Inline Calendly Widget
							</h2>
							<p className="text-muted-foreground">
								Direct integration using Calendly's official widget script for
								the best user experience
							</p>
						</div>

						{/* Simple Inline Component */}
						<div className="bg-white rounded-lg border border-border p-6">
							<h3 className="text-lg font-semibold mb-4">
								InlineCalendlyScheduler
							</h3>
							<InlineCalendlyScheduler
								calendlyUrl="https://calendly.com/lexprotector-int/30min"
								title="Schedule Your Demo"
								description="Book a personalized demo with our team"
								responsiveHeight={{
									mobile: "400px",
									tablet: "500px",
									desktop: "600px",
								}}
								containerClassName="border border-border rounded-lg p-4"
							/>
						</div>

						{/* Versatile Component in Inline Mode */}
						<div className="bg-white rounded-lg border border-border p-6">
							<h3 className="text-lg font-semibold mb-4">
								VersatileCalendlyScheduler (Inline Mode)
							</h3>
							<VersatileCalendlyScheduler
								calendlyUrl="https://calendly.com/lexprotector-int"
								eventType="30min"
								title="Schedule Your Consultation"
								description="Book a consultation with our experts"
								mode="inline"
								responsiveHeight={{
									mobile: "400px",
									tablet: "500px",
									desktop: "600px",
								}}
								containerClassName="border border-accent/20 rounded-lg p-4 bg-accent/5"
							/>
						</div>
					</div>

					{/* Modal Demos */}
					<div className="space-y-6">
						<div className="text-center">
							<h2 className="text-2xl font-bold text-foreground mb-4">
								Modal & Widget Demos
							</h2>
							<p className="text-muted-foreground">
								Traditional modal and widget implementations for compact layouts
							</p>
						</div>

						{/* Demo Cards */}
						<div className="space-y-4">
							{/* Original Scheduler */}
							<div className="bg-white rounded-lg border border-border p-6">
								<div className="flex items-center justify-between">
									<div>
										<h3 className="text-lg font-semibold">
											CalendlyScheduler (Original)
										</h3>
										<p className="text-sm text-muted-foreground">
											The original modal-based scheduler with features view
										</p>
									</div>
									<Button
										onClick={() => handleOpenModal("original")}
										variant="outline"
										size="sm">
										<Icon name="Calendar" size={16} className="mr-2" />
										Try Demo
									</Button>
								</div>
							</div>

							{/* Versatile Modal */}
							<div className="bg-white rounded-lg border border-border p-6">
								<div className="flex items-center justify-between">
									<div>
										<h3 className="text-lg font-semibold">
											VersatileCalendlyScheduler (Modal)
										</h3>
										<p className="text-sm text-muted-foreground">
											Enhanced version with modal mode
										</p>
									</div>
									<Button
										onClick={() => handleOpenModal("versatile-modal")}
										variant="outline"
										size="sm">
										<Icon name="Calendar" size={16} className="mr-2" />
										Try Demo
									</Button>
								</div>
							</div>

							{/* Versatile Widget */}
							<div className="bg-white rounded-lg border border-border p-6">
								<div className="flex items-center justify-between">
									<div>
										<h3 className="text-lg font-semibold">
											VersatileCalendlyScheduler (Widget)
										</h3>
										<p className="text-sm text-muted-foreground">
											Widget mode with compact layout
										</p>
									</div>
									<Button
										onClick={() => handleOpenModal("versatile-widget")}
										variant="outline"
										size="sm">
										<Icon name="Calendar" size={16} className="mr-2" />
										Try Demo
									</Button>
								</div>
							</div>
						</div>

						{/* Feature Comparison */}
						<div className="bg-white rounded-lg border border-border p-6">
							<h3 className="text-lg font-semibold mb-4">Feature Comparison</h3>
							<div className="space-y-3 text-sm">
								<div className="flex items-center justify-between">
									<span>Inline Widget</span>
									<div className="flex space-x-2">
										<span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
											Best UX
										</span>
										<span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
											Native
										</span>
									</div>
								</div>
								<div className="flex items-center justify-between">
									<span>Modal</span>
									<div className="flex space-x-2">
										<span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
											Compact
										</span>
										<span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">
											Features
										</span>
									</div>
								</div>
								<div className="flex items-center justify-between">
									<span>Widget</span>
									<div className="flex space-x-2">
										<span className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-xs">
											Embedded
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Implementation Examples */}
				<div className="mt-12 bg-white rounded-lg border border-border p-8">
					<h2 className="text-2xl font-bold text-foreground mb-6 text-center">
						Implementation Examples
					</h2>

					<div className="grid md:grid-cols-2 gap-8">
						{/* Inline Example */}
						<div>
							<h3 className="text-lg font-semibold mb-3">Inline Widget</h3>
							<div className="bg-muted rounded-lg p-4 overflow-x-auto">
								<pre className="text-sm text-foreground">
									<code>{`// Simple inline widget
<InlineCalendlyScheduler
  calendlyUrl="https://calendly.com/your-url/30min"
  height="600px"
  responsiveHeight={{
    mobile: "400px",
    tablet: "500px",
    desktop: "600px"
  }}
/>`}</code>
								</pre>
							</div>
						</div>

						{/* Modal Example */}
						<div>
							<h3 className="text-lg font-semibold mb-3">Modal Widget</h3>
							<div className="bg-muted rounded-lg p-4 overflow-x-auto">
								<pre className="text-sm text-foreground">
									<code>{`// Modal with features
<VersatileCalendlyScheduler
  calendlyUrl="https://calendly.com/your-url"
  eventType="30min"
  mode="modal"
  title="Schedule Demo"
  showFeatures={true}
/>`}</code>
								</pre>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Demo Modal */}
			<Modal
				open={isModalOpen}
				onOpenChange={setIsModalOpen}
				modalId="calendly-demo-modal">
				<ModalContent
					size="xl"
					className="mt-4 max-w-[95vw] md:max-w-4xl max-h-[90vh] w-full overflow-hidden">
					<ModalHeader>
						<ModalTitle>
							{selectedDemo === "original" && "CalendlyScheduler Demo"}
							{selectedDemo === "versatile-modal" &&
								"VersatileCalendlyScheduler (Modal)"}
							{selectedDemo === "versatile-widget" &&
								"VersatileCalendlyScheduler (Widget)"}
						</ModalTitle>
						<ModalDescription>
							Experience the different Calendly integration methods
						</ModalDescription>
					</ModalHeader>
					<div className="overflow-y-auto max-h-[calc(90vh-8rem)] p-1">
						{selectedDemo === "original" && (
							<CalendlyScheduler
								calendlyUrl="https://calendly.com/lexprotector-int"
								eventType="30min"
								title="Schedule Your Demo"
								description="Book a personalized demo with our team to see how Lex Protector can transform your legal practice."
								responsiveHeight={{
									mobile: "500px",
									tablet: "600px",
									desktop: "700px",
								}}
							/>
						)}

						{selectedDemo === "versatile-modal" && (
							<VersatileCalendlyScheduler
								calendlyUrl="https://calendly.com/lexprotector-int"
								eventType="30min"
								title="Schedule Your Demo"
								description="Book a personalized demo with our team to see how Lex Protector can transform your legal practice."
								mode="modal"
								responsiveHeight={{
									mobile: "500px",
									tablet: "600px",
									desktop: "700px",
								}}
							/>
						)}

						{selectedDemo === "versatile-widget" && (
							<VersatileCalendlyScheduler
								calendlyUrl="https://calendly.com/lexprotector-int"
								eventType="30min"
								title="Schedule Your Demo"
								description="Book a personalized demo with our team."
								mode="widget"
								compact={true}
								responsiveHeight={{
									mobile: "500px",
									tablet: "600px",
									desktop: "700px",
								}}
							/>
						)}
					</div>
				</ModalContent>
			</Modal>
		</div>
	);
};

export default InlineCalendlyDemo;
