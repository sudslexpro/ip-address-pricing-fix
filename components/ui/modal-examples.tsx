"use client";

import React from "react";
import Image from "next/image";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalTitle,
	ModalDescription,
	ModalFooter,
	ModalTrigger,
} from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { CalendlyScheduler } from "@/components/scheduling";

// Example 1: Simple confirmation modal
export const ConfirmationModal = ({
	title,
	description,
	onConfirm,
	onCancel,
	trigger,
	confirmText = "Confirm",
	cancelText = "Cancel",
}: {
	title: string;
	description: string;
	onConfirm: () => void;
	onCancel?: () => void;
	trigger: React.ReactNode;
	confirmText?: string;
	cancelText?: string;
}) => {
	const [open, setOpen] = React.useState(false);

	const handleConfirm = () => {
		onConfirm();
		setOpen(false);
	};

	const handleCancel = () => {
		onCancel?.();
		setOpen(false);
	};

	return (
		<Modal open={open} onOpenChange={setOpen}>
			<ModalTrigger asChild>{trigger}</ModalTrigger>
			<ModalContent size="sm">
				<ModalHeader>
					<ModalTitle>{title}</ModalTitle>
					<ModalDescription>{description}</ModalDescription>
				</ModalHeader>
				<ModalFooter>
					<Button variant="outline" onClick={handleCancel}>
						{cancelText}
					</Button>
					<Button onClick={handleConfirm}>{confirmText}</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

// Example 2: Form modal
export const FormModal = ({
	title,
	description,
	trigger,
	children,
	size = "default",
}: {
	title: string;
	description?: string;
	trigger: React.ReactNode;
	children: React.ReactNode;
	size?: "sm" | "default" | "md" | "lg" | "xl" | "full" | "auto";
}) => {
	return (
		<Modal>
			<ModalTrigger asChild>{trigger}</ModalTrigger>
			<ModalContent size={size}>
				<ModalHeader>
					<ModalTitle>{title}</ModalTitle>
					{description && <ModalDescription>{description}</ModalDescription>}
				</ModalHeader>
				{children}
			</ModalContent>
		</Modal>
	);
};

// Example 3: Calendly modal (ready-to-use)
export const CalendlyModal = ({
	trigger,
	eventType = "consultation",
	title,
	description,
	features,
	compact = false,
	widgetHeight,
}: {
	trigger: React.ReactNode;
	eventType?: "consultation" | "demo" | "30min" | "60min";
	title?: string;
	description?: string;
	features?: string[];
	compact?: boolean;
	widgetHeight?: string;
}) => {
	const [open, setOpen] = React.useState(false);

	return (
		<Modal open={open} onOpenChange={setOpen}>
			<ModalTrigger asChild>{trigger}</ModalTrigger>
			<ModalContent size={compact ? "md" : "xl"}>
				<ModalHeader className="sr-only">
					<ModalTitle>Schedule Meeting</ModalTitle>
					<ModalDescription>Book a meeting with our team</ModalDescription>
				</ModalHeader>
				<CalendlyScheduler
					eventType={eventType}
					title={title}
					description={description}
					features={features}
					compact={compact}
					widgetHeight={widgetHeight}
				/>
			</ModalContent>
		</Modal>
	);
};

// Example 4: Custom content modal
export const CustomContentModal = ({
	trigger,
	children,
	size = "default",
}: {
	trigger: React.ReactNode;
	children: React.ReactNode;
	size?: "sm" | "default" | "md" | "lg" | "xl" | "full" | "auto";
}) => {
	return (
		<Modal>
			<ModalTrigger asChild>{trigger}</ModalTrigger>
			<ModalContent size={size}>{children}</ModalContent>
		</Modal>
	);
};

// Example 5: Image/Media modal
export const MediaModal = ({
	trigger,
	src,
	alt,
	title,
	description,
}: {
	trigger: React.ReactNode;
	src: string;
	alt: string;
	title?: string;
	description?: string;
}) => {
	return (
		<Modal>
			<ModalTrigger asChild>{trigger}</ModalTrigger>
			<ModalContent size="xl">
				{title && (
					<ModalHeader>
						<ModalTitle>{title}</ModalTitle>
						{description && <ModalDescription>{description}</ModalDescription>}
					</ModalHeader>
				)}
				<div className="flex items-center justify-center">
					<Image
						src={src}
						alt={alt}
						width={800}
						height={600}
						className="max-w-full max-h-[70vh] object-contain rounded-lg"
					/>
				</div>
			</ModalContent>
		</Modal>
	);
};

// Example 6: Iframe/Web content modal
export const WebContentModal = ({
	trigger,
	url,
	title,
	description,
	height = "500px",
}: {
	trigger: React.ReactNode;
	url: string;
	title?: string;
	description?: string;
	height?: string;
}) => {
	return (
		<Modal>
			<ModalTrigger asChild>{trigger}</ModalTrigger>
			<ModalContent size="xl">
				{title && (
					<ModalHeader>
						<ModalTitle>{title}</ModalTitle>
						{description && <ModalDescription>{description}</ModalDescription>}
					</ModalHeader>
				)}
				<div className="w-full" style={{ height }}>
					<iframe
						src={url}
						className="w-full h-full border-0 rounded-lg"
						title={title || "Web Content"}
					/>
				</div>
			</ModalContent>
		</Modal>
	);
};
