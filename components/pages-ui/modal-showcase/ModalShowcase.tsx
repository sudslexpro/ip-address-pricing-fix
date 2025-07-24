"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
	ConfirmationModal,
	FormModal,
	CalendlyModal,
	CustomContentModal,
	MediaModal,
	WebContentModal,
} from "@/components/ui/modal-examples";
import { CalendlyScheduler } from "@/components/scheduling";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalTitle,
	ModalDescription,
} from "@/components/ui/modal";

const ModalShowcase = () => {
	const [customModalOpen, setCustomModalOpen] = React.useState(false);

	return (
		<div className="max-w-4xl mx-auto p-8 space-y-8">
			<div className="text-center mb-12">
				<h1 className="text-3xl font-bold mb-4">Modal Components Showcase</h1>
				<p className="text-muted-foreground">
					Demonstrating the versatile modal system with various use cases
				</p>
			</div>

			{/* Calendly Modals */}
			<section className="space-y-4">
				<h2 className="text-2xl font-semibold">Calendly Modals</h2>
				<div className="flex flex-wrap gap-4">
					<CalendlyModal
						trigger={<Button>Schedule Demo</Button>}
						eventType="demo"
					/>
					<CalendlyModal
						trigger={<Button variant="outline">30min Consultation</Button>}
						eventType="30min"
						compact={true}
					/>
					<Button onClick={() => setCustomModalOpen(true)}>
						Custom Calendly Modal
					</Button>
				</div>
			</section>

			{/* Confirmation Modals */}
			<section className="space-y-4">
				<h2 className="text-2xl font-semibold">Confirmation Modals</h2>
				<div className="flex flex-wrap gap-4">
					<ConfirmationModal
						title="Delete Item"
						description="Are you sure you want to delete this item? This action cannot be undone."
						trigger={<Button variant="destructive">Delete</Button>}
						onConfirm={() => alert("Item deleted!")}
					/>
					<ConfirmationModal
						title="Save Changes"
						description="Do you want to save your changes before leaving?"
						trigger={<Button>Save & Exit</Button>}
						onConfirm={() => alert("Changes saved!")}
						confirmText="Save"
						cancelText="Don't Save"
					/>
				</div>
			</section>

			{/* Form Modals */}
			<section className="space-y-4">
				<h2 className="text-2xl font-semibold">Form Modals</h2>
				<div className="flex flex-wrap gap-4">
					<FormModal
						title="Edit Profile"
						description="Update your profile information"
						trigger={<Button variant="outline">Edit Profile</Button>}
						size="md">
						<div className="space-y-4">
							<div>
								<label className="block text-sm font-medium mb-1">Name</label>
								<input
									type="text"
									className="w-full p-2 border border-border rounded-md"
									placeholder="Your name"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium mb-1">Email</label>
								<input
									type="email"
									className="w-full p-2 border border-border rounded-md"
									placeholder="your@email.com"
								/>
							</div>
							<div className="flex justify-end space-x-2">
								<Button variant="outline">Cancel</Button>
								<Button>Save Changes</Button>
							</div>
						</div>
					</FormModal>

					<FormModal
						title="Quick Feedback"
						trigger={<Button variant="outline">Give Feedback</Button>}
						size="lg">
						<div className="space-y-4">
							<textarea
								className="w-full p-3 border border-border rounded-md h-32"
								placeholder="Tell us what you think..."
							/>
							<div className="flex justify-end">
								<Button>Submit Feedback</Button>
							</div>
						</div>
					</FormModal>
				</div>
			</section>

			{/* Content Modals */}
			<section className="space-y-4">
				<h2 className="text-2xl font-semibold">Content Modals</h2>
				<div className="flex flex-wrap gap-4">
					<CustomContentModal
						trigger={<Button variant="outline">Video Demo</Button>}
						size="xl">
						<div className="space-y-4">
							<h3 className="text-xl font-semibold">Product Demo Video</h3>
							<div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
								<p className="text-gray-500">Video player would go here</p>
							</div>
							<p className="text-sm text-muted-foreground">
								This would contain an actual video embed in a real application.
							</p>
						</div>
					</CustomContentModal>

					<WebContentModal
						trigger={<Button variant="outline">External Content</Button>}
						url="https://example.com"
						title="External Website"
						description="Embedded external content"
						height="400px"
					/>
				</div>
			</section>

			{/* Size Variations */}
			<section className="space-y-4">
				<h2 className="text-2xl font-semibold">Size Variations</h2>
				<div className="flex flex-wrap gap-4">
					{["sm", "default", "md", "lg", "xl"].map((size) => (
						<CustomContentModal
							key={size}
							trigger={<Button variant="outline">{size.toUpperCase()}</Button>}
							size={size as any}>
							<div className="p-8 text-center">
								<h3 className="text-xl font-semibold mb-4">
									{size.toUpperCase()} Modal
								</h3>
								<p>This is a {size} sized modal.</p>
							</div>
						</CustomContentModal>
					))}
				</div>
			</section>

			{/* Custom Calendly Modal */}
			<Modal open={customModalOpen} onOpenChange={setCustomModalOpen}>
				<ModalContent size="md">
					<ModalHeader className="sr-only">
						<ModalTitle>Schedule Consultation</ModalTitle>
						<ModalDescription>
							Book a consultation with our team
						</ModalDescription>
					</ModalHeader>
					<CalendlyScheduler
						eventType="consultation"
						title="Book Your Consultation"
						description="Let's discuss how we can help your legal practice grow."
						features={[
							"Personalized consultation",
							"Custom solution design",
							"Implementation roadmap",
							"ROI analysis",
						]}
						onCalendlyOpen={() => setCustomModalOpen(false)}
					/>
				</ModalContent>
			</Modal>
		</div>
	);
};

export default ModalShowcase;
