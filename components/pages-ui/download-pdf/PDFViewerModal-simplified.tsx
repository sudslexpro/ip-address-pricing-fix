"use client";

import React from "react";
import {
	EnhancedModal as Modal,
	ModalContent,
	ModalHeader,
	ModalTitle,
	ModalFooter,
} from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import Icon from "@/components/icon/AppIcon";
import { cn } from "@/lib/utils";

interface PDFViewerModalProps {
	isOpen: boolean;
	onClose: () => void;
	title?: string;
	content: React.ReactNode;
	size?: "sm" | "default" | "md" | "lg" | "xl" | "full" | "auto";
}

const PDFViewerModal: React.FC<PDFViewerModalProps> = ({
	isOpen,
	onClose,
	title = "PDF Document",
	content,
	size = "xl",
}) => {
	return (
		<Modal
			open={isOpen}
			onOpenChange={onClose}
			modalId={`pdf-viewer-${title.replace(/\s+/g, "-").toLowerCase()}`}>
			<ModalContent size={size} className="max-h-[90vh] flex flex-col">
				<ModalHeader className="flex-shrink-0">
					<div className="flex items-center gap-2">
						<Icon name="FileText" size={20} />
						<ModalTitle>{title}</ModalTitle>
					</div>
				</ModalHeader>

				{/* PDF Content */}
				<div className="flex-1 overflow-auto p-6">
					<div
						className={cn(
							"w-full mx-auto bg-white text-black p-8 shadow-lg rounded-lg",
							"border border-gray-200"
						)}
						style={{
							minHeight: "297mm", // A4 height
							maxWidth: "210mm", // A4 width
						}}>
						{content}
					</div>
				</div>

				{/* Action Buttons */}
				<ModalFooter className="flex-shrink-0 border-t border-border pt-4">
					<div className="flex justify-end w-full">
						<Button
							variant="secondary"
							onClick={onClose}
							className="flex items-center gap-2">
							<Icon name="X" size={16} />
							Close
						</Button>
					</div>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default PDFViewerModal;
