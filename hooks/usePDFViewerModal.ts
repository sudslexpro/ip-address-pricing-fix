"use client";

import { useState, useCallback } from "react";

interface UsePDFViewerModalProps {
	defaultTitle?: string;
	defaultSize?: "sm" | "default" | "md" | "lg" | "xl" | "full" | "auto";
}

interface PDFViewerModalOptions {
	title?: string;
	size?: "sm" | "default" | "md" | "lg" | "xl" | "full" | "auto";
}

export const usePDFViewerModal = ({
	defaultTitle = "PDF Document",
	defaultSize = "xl",
}: UsePDFViewerModalProps = {}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [content, setContent] = useState<React.ReactNode>(null);
	const [title, setTitle] = useState(defaultTitle);
	const [size, setSize] = useState<
		"sm" | "default" | "md" | "lg" | "xl" | "full" | "auto"
	>(defaultSize);

	const openModal = useCallback(
		(content: React.ReactNode, options: PDFViewerModalOptions = {}) => {
			setContent(content);
			setTitle(options.title || defaultTitle);
			setSize(options.size || defaultSize);
			setIsOpen(true);
		},
		[defaultTitle, defaultSize]
	);

	const closeModal = useCallback(() => {
		setIsOpen(false);
		// Clear content after animation completes
		setTimeout(() => {
			setContent(null);
		}, 300);
	}, []);

	return {
		isOpen,
		content,
		title,
		size,
		openModal,
		closeModal,
	};
};
