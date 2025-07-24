"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/icon/AppIcon";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalTitle,
	ModalDescription,
	ModalFooter,
} from "@/components/ui/modal";
import { CalendlyScheduler } from "@/components/scheduling";

const ModalShowcasePage: React.FC = () => {
	// State for different modal types
	const [basicModal, setBasicModal] = useState(false);
	const [smallModal, setSmallModal] = useState(false);
	const [mediumModal, setMediumModal] = useState(false);
	const [largeModal, setLargeModal] = useState(false);
	const [xlModal, setXlModal] = useState(false);
	const [fullModal, setFullModal] = useState(false);
	const [autoModal, setAutoModal] = useState(false);
	const [scrollableModal, setScrollableModal] = useState(false);
	const [calendlyModal, setCalendlyModal] = useState(false);
	const [confirmationModal, setConfirmationModal] = useState(false);
	const [formModal, setFormModal] = useState(false);
	const [alertModal, setAlertModal] = useState(false);

	const modalSizes = [
		{
			name: "Small (sm)",
			key: "sm",
			state: smallModal,
			setState: setSmallModal,
		},
		{
			name: "Default",
			key: "default",
			state: basicModal,
			setState: setBasicModal,
		},
		{
			name: "Medium (md)",
			key: "md",
			state: mediumModal,
			setState: setMediumModal,
		},
		{
			name: "Large (lg)",
			key: "lg",
			state: largeModal,
			setState: setLargeModal,
		},
		{
			name: "Extra Large (xl)",
			key: "xl",
			state: xlModal,
			setState: setXlModal,
		},
		{
			name: "Full Screen",
			key: "full",
			state: fullModal,
			setState: setFullModal,
		},
		{
			name: "Auto Size",
			key: "auto",
			state: autoModal,
			setState: setAutoModal,
		},
	];

	const specialModals = [
		{
			name: "Scrollable Content",
			state: scrollableModal,
			setState: setScrollableModal,
		},
		{
			name: "Calendly Scheduler",
			state: calendlyModal,
			setState: setCalendlyModal,
		},
		{
			name: "Confirmation Dialog",
			state: confirmationModal,
			setState: setConfirmationModal,
		},
		{ name: "Form Modal", state: formModal, setState: setFormModal },
		{ name: "Alert Modal", state: alertModal, setState: setAlertModal },
	];

	return (
		<div className="min-h-screen bg-background">
			{/* Header */}
			<div className="bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border">
				<div className="max-w-7xl mx-auto px-6 py-16">
					<div className="text-center">
						<div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
							<Icon name="Layout" size={16} />
							<span>UI Components</span>
						</div>
						<h1 className="text-4xl font-bold text-foreground mb-4">
							Modal Components Showcase
						</h1>
						<p className="text-xl text-muted-foreground max-w-3xl mx-auto">
							Explore all modal variants and implementations available in the
							Lex Protector Portal. Built with Radix UI primitives and shadcn/ui
							styling.
						</p>
					</div>
				</div>
			</div>

			<div className="max-w-7xl mx-auto px-6 py-12">
				{/* Modal Sizes Section */}
				<section className="mb-16">
					<div className="mb-8">
						<h2 className="text-2xl font-bold text-foreground mb-4">
							Modal Sizes
						</h2>
						<p className="text-muted-foreground">
							Different modal sizes for various content types and screen sizes.
						</p>
					</div>

					<div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
						{modalSizes.map((modal) => (
							<Button
								key={modal.key}
								variant="outline"
								size="lg"
								onClick={() => modal.setState(true)}
								className="h-20 flex flex-col items-center justify-center space-y-2">
								<Icon name="Square" size={20} />
								<span className="text-sm font-medium">{modal.name}</span>
							</Button>
						))}
					</div>
				</section>

				{/* Special Modal Types */}
				<section className="mb-16">
					<div className="mb-8">
						<h2 className="text-2xl font-bold text-foreground mb-4">
							Special Modal Types
						</h2>
						<p className="text-muted-foreground">
							Specialized modals for common use cases and interactions.
						</p>
					</div>

					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
						{specialModals.map((modal, index) => (
							<Button
								key={index}
								variant="outline"
								size="lg"
								onClick={() => modal.setState(true)}
								className="h-20 flex flex-col items-center justify-center space-y-2">
								<Icon name="Layers" size={20} />
								<span className="text-sm font-medium">{modal.name}</span>
							</Button>
						))}
					</div>
				</section>

				{/* Code Examples */}
				<section>
					<div className="mb-8">
						<h2 className="text-2xl font-bold text-foreground mb-4">
							Implementation Guide
						</h2>
						<p className="text-muted-foreground mb-6">
							Quick reference for implementing modals in your components.
						</p>
					</div>

					<div className="bg-card rounded-lg border border-border p-6">
						<h3 className="text-lg font-semibold text-foreground mb-4">
							Basic Modal Usage
						</h3>
						<div className="bg-muted rounded-md p-4 text-sm font-mono">
							<pre className="text-muted-foreground">{`import { Modal, ModalContent, ModalHeader, ModalTitle } from "@/components/ui/modal";

const [isOpen, setIsOpen] = useState(false);

<Modal open={isOpen} onOpenChange={setIsOpen}>
  <ModalContent size="md">
    <ModalHeader>
      <ModalTitle>Modal Title</ModalTitle>
    </ModalHeader>
    <div className="p-6">
      Your content here
    </div>
  </ModalContent>
</Modal>`}</pre>
						</div>
					</div>
				</section>
			</div>

			{/* Modal Size Implementations */}
			{modalSizes.map((modal) => (
				<Modal key={modal.key} open={modal.state} onOpenChange={modal.setState}>
					<ModalContent size={modal.key as any}>
						<ModalHeader>
							<ModalTitle>{modal.name} Modal</ModalTitle>
							<ModalDescription>
								This is a {modal.name.toLowerCase()} modal example with sample
								content.
							</ModalDescription>
						</ModalHeader>
						<div className="p-6">
							<div className="space-y-4">
								<p className="text-muted-foreground">
									This modal uses the{" "}
									<code className="bg-muted px-2 py-1 rounded text-sm">
										size="{modal.key}"
									</code>{" "}
									prop. It automatically adjusts its width and behavior based on
									the screen size.
								</p>
								<div className="grid grid-cols-2 gap-4 text-sm">
									<div className="bg-muted rounded-lg p-3">
										<div className="font-medium text-foreground mb-1">
											Width
										</div>
										<div className="text-muted-foreground">
											{modal.key === "sm" && "384px (24rem)"}
											{modal.key === "default" && "512px (32rem)"}
											{modal.key === "md" && "640px (40rem)"}
											{modal.key === "lg" && "768px (48rem)"}
											{modal.key === "xl" && "896px (56rem)"}
											{modal.key === "full" && "100% viewport"}
											{modal.key === "auto" && "Fit content"}
										</div>
									</div>
									<div className="bg-muted rounded-lg p-3">
										<div className="font-medium text-foreground mb-1">
											Use Case
										</div>
										<div className="text-muted-foreground">
											{modal.key === "sm" && "Alerts, confirmations"}
											{modal.key === "default" && "General purpose"}
											{modal.key === "md" && "Forms, details"}
											{modal.key === "lg" && "Rich content"}
											{modal.key === "xl" && "Calendly, complex UI"}
											{modal.key === "full" && "Immersive experience"}
											{modal.key === "auto" && "Dynamic content"}
										</div>
									</div>
								</div>
							</div>
						</div>
						<ModalFooter>
							<Button variant="outline" onClick={() => modal.setState(false)}>
								Close
							</Button>
							<Button onClick={() => modal.setState(false)}>Confirm</Button>
						</ModalFooter>
					</ModalContent>
				</Modal>
			))}

			{/* Scrollable Modal */}
			<Modal open={scrollableModal} onOpenChange={setScrollableModal}>
				<ModalContent size="md">
					<ModalHeader>
						<ModalTitle>Scrollable Content Modal</ModalTitle>
						<ModalDescription>
							This modal demonstrates scrollable content when the content
							exceeds the viewport height.
						</ModalDescription>
					</ModalHeader>
					<div className="p-6 space-y-6">
						{Array.from({ length: 50 }, (_, i) => (
							<div key={i} className="p-4 bg-muted rounded-lg">
								<h4 className="font-medium text-foreground mb-2">
									Content Block {i + 1}
								</h4>
								<p className="text-sm text-muted-foreground">
									This is a sample content block to demonstrate scrollable
									behavior. When content exceeds the modal height, it becomes
									scrollable automatically.
								</p>
							</div>
						))}
					</div>
					<ModalFooter>
						<Button variant="outline" onClick={() => setScrollableModal(false)}>
							Close
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>

			{/* Calendly Modal */}
			<Modal open={calendlyModal} onOpenChange={setCalendlyModal}>
				<ModalContent size="xl">
					<ModalHeader className="sr-only">
						<ModalTitle>Schedule Demo</ModalTitle>
						<ModalDescription>Book a demo with our team</ModalDescription>
					</ModalHeader>
					<CalendlyScheduler
						calendlyUrl="https://calendly.com/lexprotectortech"
						eventType="demo"
						title="Schedule Your Demo"
						description="This is a demo of the Calendly scheduler component integrated with our modal system."
						buttonText="Schedule Demo"
						widgetHeight="700px"
					/>
				</ModalContent>
			</Modal>

			{/* Confirmation Modal */}
			<Modal open={confirmationModal} onOpenChange={setConfirmationModal}>
				<ModalContent size="sm">
					<ModalHeader>
						<ModalTitle>Confirm Action</ModalTitle>
						<ModalDescription>
							Are you sure you want to proceed? This action cannot be undone.
						</ModalDescription>
					</ModalHeader>
					<div className="p-6">
						<div className="flex items-center space-x-3 text-destructive">
							<Icon name="AlertTriangle" size={20} />
							<span className="text-sm">
								This will permanently delete the selected items.
							</span>
						</div>
					</div>
					<ModalFooter>
						<Button
							variant="outline"
							onClick={() => setConfirmationModal(false)}>
							Cancel
						</Button>
						<Button
							variant="destructive"
							onClick={() => setConfirmationModal(false)}>
							Delete
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>

			{/* Form Modal */}
			<Modal open={formModal} onOpenChange={setFormModal}>
				<ModalContent size="md">
					<ModalHeader>
						<ModalTitle>Contact Information</ModalTitle>
						<ModalDescription>
							Please fill out your contact details below.
						</ModalDescription>
					</ModalHeader>
					<div className="p-6 space-y-4">
						<div className="space-y-2">
							<label className="text-sm font-medium text-foreground">
								Name
							</label>
							<input
								type="text"
								placeholder="Enter your name"
								className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
							/>
						</div>
						<div className="space-y-2">
							<label className="text-sm font-medium text-foreground">
								Email
							</label>
							<input
								type="email"
								placeholder="Enter your email"
								className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
							/>
						</div>
						<div className="space-y-2">
							<label className="text-sm font-medium text-foreground">
								Message
							</label>
							<textarea
								placeholder="Enter your message"
								rows={4}
								className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none"
							/>
						</div>
					</div>
					<ModalFooter>
						<Button variant="outline" onClick={() => setFormModal(false)}>
							Cancel
						</Button>
						<Button onClick={() => setFormModal(false)}>Submit</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>

			{/* Alert Modal */}
			<Modal open={alertModal} onOpenChange={setAlertModal}>
				<ModalContent size="sm">
					<ModalHeader>
						<ModalTitle>Success!</ModalTitle>
						<ModalDescription>
							Your action has been completed successfully.
						</ModalDescription>
					</ModalHeader>
					<div className="p-6">
						<div className="flex items-center justify-center">
							<div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
								<Icon name="Check" size={32} className="text-green-600" />
							</div>
						</div>
						<p className="text-center text-muted-foreground mt-4">
							The operation was completed without any errors.
						</p>
					</div>
					<ModalFooter>
						<Button onClick={() => setAlertModal(false)} className="w-full">
							Continue
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</div>
	);
};

export default ModalShowcasePage;
