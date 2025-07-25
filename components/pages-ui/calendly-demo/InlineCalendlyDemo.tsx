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
	const [activeTab, setActiveTab] = useState<
		"overview" | "components" | "examples"
	>("overview");

	const handleOpenModal = (demoType: string) => {
		setSelectedDemo(demoType);
		setIsModalOpen(true);
	};

	const componentData = [
		{
			id: "inline",
			name: "InlineCalendlyScheduler",
			description: "Direct integration using Calendly's official widget script",
			features: [
				"Best UX",
				"Native Integration",
				"Responsive",
				"Theme Support",
			],
			bestFor: "Landing pages, dedicated scheduling sections",
			type: "inline",
		},
		{
			id: "versatile-inline",
			name: "VersatileCalendlyScheduler (Inline)",
			description:
				"Enhanced inline widget with additional customization options",
			features: [
				"Multiple Modes",
				"Custom Styling",
				"Enhanced Features",
				"Flexible",
			],
			bestFor: "Complex forms, multi-step flows",
			type: "versatile-inline",
		},
		{
			id: "original-modal",
			name: "CalendlyScheduler (Original)",
			description: "Traditional modal-based scheduler with feature showcase",
			features: [
				"Modal Interface",
				"Feature List",
				"Compact",
				"Legacy Support",
			],
			bestFor: "Existing implementations, feature highlighting",
			type: "modal",
		},
		{
			id: "versatile-modal",
			name: "VersatileCalendlyScheduler (Modal)",
			description: "Modal version of the versatile scheduler",
			features: ["Modal Mode", "Clean Interface", "Responsive", "Customizable"],
			bestFor: "CTAs, buttons, space-constrained layouts",
			type: "modal",
		},
		{
			id: "versatile-widget",
			name: "VersatileCalendlyScheduler (Widget)",
			description: "Embedded widget mode for compact integration",
			features: ["Embedded", "Compact", "Widget Mode", "Space Efficient"],
			bestFor: "Sidebars, small sections, embedded contexts",
			type: "widget",
		},
	];

	return (
		<div className="min-h-screen bg-background">
			{/* Header */}
			<div className="bg-gradient-to-r from-primary to-accent text-white py-16">
				<div className="max-w-7xl mx-auto px-6 lg:px-8">
					<div className="text-center space-y-6">
						<div className="inline-flex items-center space-x-2 bg-white/10 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
							<Icon name="Calendar" size={16} />
							<span>Calendly Integration Suite</span>
						</div>
						<h1 className="text-5xl font-bold">
							Calendly Scheduler Components
						</h1>
						<p className="text-xl text-white/90 max-w-3xl mx-auto">
							Comprehensive demo of all available Calendly integration
							components. Choose the perfect scheduler for your use case.
						</p>
					</div>
				</div>
			</div>

			{/* Navigation Tabs */}
			<div className="bg-white border-b border-border sticky top-0 z-10">
				<div className="max-w-7xl mx-auto px-6 lg:px-8">
					<div className="flex space-x-8">
						<button
							onClick={() => setActiveTab("overview")}
							className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
								activeTab === "overview"
									? "border-primary text-primary"
									: "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
							}`}>
							Overview
						</button>
						<button
							onClick={() => setActiveTab("components")}
							className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
								activeTab === "components"
									? "border-primary text-primary"
									: "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
							}`}>
							Live Components
						</button>
						<button
							onClick={() => setActiveTab("examples")}
							className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
								activeTab === "examples"
									? "border-primary text-primary"
									: "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
							}`}>
							Code Examples
						</button>
					</div>
				</div>
			</div>

			<div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
				{/* Overview Tab */}
				{activeTab === "overview" && (
					<div className="space-y-12">
						{/* Component Comparison */}
						<div>
							<h2 className="text-3xl font-bold text-foreground mb-8 text-center">
								Component Overview
							</h2>
							<div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
								{componentData.map((component) => (
									<div
										key={component.id}
										className="bg-white rounded-xl border border-border p-6 hover:shadow-lg transition-all duration-200">
										<div className="flex items-start justify-between mb-4">
											<div className="flex-1">
												<h3 className="text-lg font-semibold text-foreground mb-2">
													{component.name}
												</h3>
												<p className="text-sm text-muted-foreground mb-4">
													{component.description}
												</p>
											</div>
											<div
												className={`w-3 h-3 rounded-full ml-3 mt-1 ${
													component.type === "inline"
														? "bg-green-500"
														: component.type === "modal"
														? "bg-blue-500"
														: "bg-orange-500"
												}`}
											/>
										</div>

										{/* Features */}
										<div className="mb-4">
											<div className="flex flex-wrap gap-1 mb-3">
												{component.features.map((feature) => (
													<span
														key={feature}
														className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs">
														{feature}
													</span>
												))}
											</div>
										</div>

										{/* Best For */}
										<div className="mb-4">
											<p className="text-xs text-muted-foreground mb-1">
												Best for:
											</p>
											<p className="text-sm text-foreground">
												{component.bestFor}
											</p>
										</div>

										{/* Demo Button */}
										<Button
											onClick={() => handleOpenModal(component.id)}
											variant="outline"
											size="sm"
											className="w-full">
											<Icon name="Play" size={14} className="mr-2" />
											Try Demo
										</Button>
									</div>
								))}
							</div>
						</div>

						{/* Feature Matrix */}
						<div className="bg-white rounded-xl border border-border p-8">
							<h3 className="text-2xl font-bold text-foreground mb-6 text-center">
								Feature Comparison Matrix
							</h3>
							<div className="overflow-x-auto">
								<table className="w-full text-sm">
									<thead>
										<tr className="border-b border-border">
											<th className="text-left py-3 px-4">Component</th>
											<th className="text-center py-3 px-4">Display</th>
											<th className="text-center py-3 px-4">UX</th>
											<th className="text-center py-3 px-4">Customization</th>
											<th className="text-center py-3 px-4">Best Use Case</th>
										</tr>
									</thead>
									<tbody>
										<tr className="border-b border-border/50">
											<td className="py-3 px-4 font-medium">
												InlineCalendlyScheduler
											</td>
											<td className="text-center py-3 px-4">
												<span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
											</td>
											<td className="text-center py-3 px-4">★★★★★</td>
											<td className="text-center py-3 px-4">★★★☆☆</td>
											<td className="py-3 px-4 text-muted-foreground">
												Main pages
											</td>
										</tr>
										<tr className="border-b border-border/50">
											<td className="py-3 px-4 font-medium">
												VersatileCalendlyScheduler
											</td>
											<td className="text-center py-3 px-4">
												<span className="inline-block w-2 h-2 bg-blue-500 rounded-full"></span>
											</td>
											<td className="text-center py-3 px-4">★★★★☆</td>
											<td className="text-center py-3 px-4">★★★★★</td>
											<td className="py-3 px-4 text-muted-foreground">
												Flexible needs
											</td>
										</tr>
										<tr>
											<td className="py-3 px-4 font-medium">
												CalendlyScheduler (Original)
											</td>
											<td className="text-center py-3 px-4">
												<span className="inline-block w-2 h-2 bg-orange-500 rounded-full"></span>
											</td>
											<td className="text-center py-3 px-4">★★★☆☆</td>
											<td className="text-center py-3 px-4">★★☆☆☆</td>
											<td className="py-3 px-4 text-muted-foreground">
												Legacy support
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				)}

				{/* Components Tab */}
				{activeTab === "components" && (
					<div className="space-y-12">
						<div className="text-center mb-12">
							<h2 className="text-3xl font-bold text-foreground mb-4">
								Live Component Demos
							</h2>
							<p className="text-muted-foreground max-w-2xl mx-auto">
								Experience each component in action. These are fully functional
								Calendly integrations you can interact with directly.
							</p>
						</div>

						{/* Inline Components Section */}
						<div className="space-y-8">
							<h3 className="text-2xl font-semibold text-foreground text-center">
								Inline Components
							</h3>

							{/* Simple Inline Component */}
							<div className="bg-white rounded-xl border border-border p-8">
								<div className="mb-6">
									<h4 className="text-xl font-semibold mb-2">
										InlineCalendlyScheduler
									</h4>
									<p className="text-muted-foreground">
										Clean, simple inline integration perfect for dedicated
										scheduling sections.
									</p>
								</div>
								<InlineCalendlyScheduler
									calendlyUrl="https://calendly.com/lexprotector-int/30min"
									title="Schedule Your Demo"
									description="Book a personalized demo with our team"
									responsiveHeight={{
										mobile: "400px",
										tablet: "500px",
										desktop: "600px",
									}}
								/>
							</div>

							{/* Versatile Inline Component */}
							<div className="bg-white rounded-xl border border-border p-8">
								<div className="mb-6">
									<h4 className="text-xl font-semibold mb-2">
										VersatileCalendlyScheduler (Inline Mode)
									</h4>
									<p className="text-muted-foreground">
										Enhanced inline widget with additional customization options
										and styling.
									</p>
								</div>
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
									containerClassName="border border-accent/20 rounded-lg p-6 bg-accent/5"
								/>
							</div>
						</div>

						{/* Modal Demo Buttons */}
						<div className="space-y-8">
							<h3 className="text-2xl font-semibold text-foreground text-center">
								Modal & Widget Components
							</h3>

							<div className="grid md:grid-cols-2 gap-6">
								{/* Original Scheduler */}
								<div className="bg-white rounded-xl border border-border p-6">
									<div className="text-center space-y-4">
										<div>
											<h4 className="text-lg font-semibold">
												CalendlyScheduler
											</h4>
											<p className="text-sm text-muted-foreground">
												Original modal-based scheduler with feature showcase
											</p>
										</div>
										<Button
											onClick={() => handleOpenModal("original-modal")}
											className="w-full">
											<Icon name="Calendar" size={16} className="mr-2" />
											Open Modal Demo
										</Button>
									</div>
								</div>

								{/* Versatile Modal */}
								<div className="bg-white rounded-xl border border-border p-6">
									<div className="text-center space-y-4">
										<div>
											<h4 className="text-lg font-semibold">Versatile Modal</h4>
											<p className="text-sm text-muted-foreground">
												Enhanced modal version with clean interface
											</p>
										</div>
										<Button
											onClick={() => handleOpenModal("versatile-modal")}
											variant="outline"
											className="w-full">
											<Icon name="Calendar" size={16} className="mr-2" />
											Open Modal Demo
										</Button>
									</div>
								</div>

								{/* Versatile Widget */}
								<div className="bg-white rounded-xl border border-border p-6 md:col-span-2">
									<div className="text-center space-y-4">
										<div>
											<h4 className="text-lg font-semibold">
												Versatile Widget Mode
											</h4>
											<p className="text-sm text-muted-foreground">
												Compact widget mode perfect for embedded contexts
											</p>
										</div>
										<Button
											onClick={() => handleOpenModal("versatile-widget")}
											variant="secondary"
											className="w-full max-w-md">
											<Icon name="Calendar" size={16} className="mr-2" />
											Open Widget Demo
										</Button>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}

				{/* Examples Tab */}
				{activeTab === "examples" && (
					<div className="space-y-12">
						<div className="text-center mb-12">
							<h2 className="text-3xl font-bold text-foreground mb-4">
								Implementation Examples
							</h2>
							<p className="text-muted-foreground max-w-2xl mx-auto">
								Ready-to-use code examples for integrating Calendly components
								into your application.
							</p>
						</div>

						{/* Code Examples Grid */}
						<div className="grid lg:grid-cols-2 gap-8">
							{/* Inline Widget Example */}
							<div className="bg-white rounded-xl border border-border p-6">
								<h3 className="text-lg font-semibold mb-4 flex items-center">
									<Icon name="Code" size={20} className="mr-2 text-green-600" />
									Inline Widget
								</h3>
								<div className="bg-muted rounded-lg p-4 overflow-x-auto">
									<pre className="text-sm text-foreground">
										<code>{`import { InlineCalendlyScheduler } from "@/components/scheduling";

// Basic usage
<InlineCalendlyScheduler
  calendlyUrl="https://calendly.com/your-url/30min"
  height="600px"
/>

// With responsive heights
<InlineCalendlyScheduler
  calendlyUrl="https://calendly.com/your-url/30min"
  responsiveHeight={{
    mobile: "400px",
    tablet: "500px",
    desktop: "600px"
  }}
  title="Schedule Your Demo"
  description="Book a personalized demo"
/>`}</code>
									</pre>
								</div>
							</div>

							{/* Versatile Component Example */}
							<div className="bg-white rounded-xl border border-border p-6">
								<h3 className="text-lg font-semibold mb-4 flex items-center">
									<Icon name="Code" size={20} className="mr-2 text-blue-600" />
									Versatile Component
								</h3>
								<div className="bg-muted rounded-lg p-4 overflow-x-auto">
									<pre className="text-sm text-foreground">
										<code>{`import { VersatileCalendlyScheduler } from "@/components/scheduling";

// Inline mode
<VersatileCalendlyScheduler
  calendlyUrl="https://calendly.com/your-url"
  eventType="30min"
  mode="inline"
  title="Schedule Demo"
  showFeatures={false}
/>

// Modal mode (controlled)
const [isOpen, setIsOpen] = useState(false);
<VersatileCalendlyScheduler
  calendlyUrl="https://calendly.com/your-url"
  eventType="30min"
  mode="modal"
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
/>`}</code>
									</pre>
								</div>
							</div>

							{/* Original Component Example */}
							<div className="bg-white rounded-xl border border-border p-6">
								<h3 className="text-lg font-semibold mb-4 flex items-center">
									<Icon
										name="Code"
										size={20}
										className="mr-2 text-orange-600"
									/>
									Original Modal
								</h3>
								<div className="bg-muted rounded-lg p-4 overflow-x-auto">
									<pre className="text-sm text-foreground">
										<code>{`import { CalendlyScheduler } from "@/components/scheduling";

// Modal with features showcase
<CalendlyScheduler
  calendlyUrl="https://calendly.com/your-url"
  eventType="30min"
  title="Schedule Your Demo"
  description="Book a personalized demo"
  buttonText="Schedule Demo"
  showFeatures={true}
  responsiveHeight={{
    mobile: "500px",
    tablet: "600px",
    desktop: "700px"
  }}
/>`}</code>
									</pre>
								</div>
							</div>

							{/* Integration Tips */}
							<div className="bg-white rounded-xl border border-border p-6">
								<h3 className="text-lg font-semibold mb-4 flex items-center">
									<Icon
										name="Lightbulb"
										size={20}
										className="mr-2 text-yellow-600"
									/>
									Integration Tips
								</h3>
								<div className="space-y-3 text-sm">
									<div className="flex items-start space-x-3">
										<Icon
											name="Check"
											size={16}
											className="text-green-600 mt-0.5 flex-shrink-0"
										/>
										<div>
											<strong>Use InlineCalendlyScheduler</strong> for main
											scheduling pages
										</div>
									</div>
									<div className="flex items-start space-x-3">
										<Icon
											name="Check"
											size={16}
											className="text-green-600 mt-0.5 flex-shrink-0"
										/>
										<div>
											<strong>Use VersatileCalendlyScheduler</strong> when you
											need multiple modes
										</div>
									</div>
									<div className="flex items-start space-x-3">
										<Icon
											name="Check"
											size={16}
											className="text-green-600 mt-0.5 flex-shrink-0"
										/>
										<div>
											<strong>Set responsive heights</strong> for better mobile
											experience
										</div>
									</div>
									<div className="flex items-start space-x-3">
										<Icon
											name="Check"
											size={16}
											className="text-green-600 mt-0.5 flex-shrink-0"
										/>
										<div>
											<strong>Include event type</strong> in the Calendly URL
											for specific durations
										</div>
									</div>
									<div className="flex items-start space-x-3">
										<Icon
											name="Check"
											size={16}
											className="text-green-600 mt-0.5 flex-shrink-0"
										/>
										<div>
											<strong>Test in both light and dark modes</strong> for
											consistent theming
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Usage Patterns */}
						<div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl border border-primary/20 p-8">
							<h3 className="text-2xl font-bold text-foreground mb-6 text-center">
								Common Usage Patterns
							</h3>
							<div className="grid md:grid-cols-3 gap-6">
								<div className="text-center space-y-3">
									<div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto">
										<Icon name="Monitor" size={24} className="text-green-600" />
									</div>
									<h4 className="font-semibold">Landing Pages</h4>
									<p className="text-sm text-muted-foreground">
										Use InlineCalendlyScheduler for primary scheduling CTAs
									</p>
								</div>
								<div className="text-center space-y-3">
									<div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto">
										<Icon
											name="Smartphone"
											size={24}
											className="text-blue-600"
										/>
									</div>
									<h4 className="font-semibold">Mobile Apps</h4>
									<p className="text-sm text-muted-foreground">
										VersatileCalendlyScheduler with responsive heights
									</p>
								</div>
								<div className="text-center space-y-3">
									<div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto">
										<Icon name="Layout" size={24} className="text-orange-600" />
									</div>
									<h4 className="font-semibold">Embedded Widgets</h4>
									<p className="text-sm text-muted-foreground">
										Widget mode for sidebars and compact layouts
									</p>
								</div>
							</div>
						</div>
					</div>
				)}
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
							{selectedDemo === "original-modal" && "CalendlyScheduler Demo"}
							{selectedDemo === "versatile-modal" &&
								"VersatileCalendlyScheduler (Modal)"}
							{selectedDemo === "versatile-widget" &&
								"VersatileCalendlyScheduler (Widget)"}
							{selectedDemo === "inline" && "InlineCalendlyScheduler Demo"}
							{selectedDemo === "versatile-inline" &&
								"VersatileCalendlyScheduler (Inline)"}
						</ModalTitle>
						<ModalDescription>
							Experience the different Calendly integration methods
						</ModalDescription>
					</ModalHeader>
					<div className="overflow-y-auto max-h-[calc(90vh-8rem)] p-1">
						{selectedDemo === "original-modal" && (
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

						{selectedDemo === "inline" && (
							<InlineCalendlyScheduler
								calendlyUrl="https://calendly.com/lexprotector-int/30min"
								title="Schedule Your Demo"
								description="Book a personalized demo with our team"
								responsiveHeight={{
									mobile: "400px",
									tablet: "500px",
									desktop: "600px",
								}}
							/>
						)}

						{selectedDemo === "versatile-inline" && (
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
							/>
						)}
					</div>
				</ModalContent>
			</Modal>
		</div>
	);
};

export default InlineCalendlyDemo;
