"use client";

import { useState, useCallback } from "react";

interface UsePDFViewerModalProps {
	defaultTitle?: string;
	defaultFilename?: string;
	defaultSize?: "sm" | "default" | "md" | "lg" | "xl" | "full" | "auto";
}

interface PDFViewerModalOptions {
	title?: string;
	filename?: string;
	size?: "sm" | "default" | "md" | "lg" | "xl" | "full" | "auto";
}

export const usePDFViewerModal = ({
	defaultTitle = "PDF Document",
	defaultFilename = "document.pdf",
	defaultSize = "xl",
}: UsePDFViewerModalProps = {}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [content, setContent] = useState<React.ReactNode>(null);
	const [title, setTitle] = useState(defaultTitle);
	const [filename, setFilename] = useState(defaultFilename);
	const [size, setSize] = useState<
		"sm" | "default" | "md" | "lg" | "xl" | "full" | "auto"
	>(defaultSize);

	const openModal = useCallback(
		(content: React.ReactNode, options: PDFViewerModalOptions = {}) => {
			setContent(content);
			setTitle(options.title || defaultTitle);
			setFilename(options.filename || defaultFilename);
			setSize(options.size || defaultSize);
			setIsOpen(true);
		},
		[defaultTitle, defaultFilename, defaultSize]
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
		filename,
		size,
		openModal,
		closeModal,
	};
};
