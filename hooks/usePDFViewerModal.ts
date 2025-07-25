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
	const [pdfPath, setPdfPath] = useState<string | undefined>(undefined);
	const [title, setTitle] = useState(defaultTitle);
	const [size, setSize] = useState<
		"sm" | "default" | "md" | "lg" | "xl" | "full" | "auto"
	>(defaultSize);

	// Open modal with React content
	const openModal = useCallback(
		(content: React.ReactNode, options: PDFViewerModalOptions = {}) => {
			setContent(content);
			setPdfPath(undefined);
			setTitle(options.title || defaultTitle);
			setSize(options.size || defaultSize);
			setIsOpen(true);
		},
		[defaultTitle, defaultSize]
	);

	// Open modal with PDF file path
	const openPDFModal = useCallback(
		(pdfPath: string, options: PDFViewerModalOptions = {}) => {
			setContent(null);
			setPdfPath(pdfPath);
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
			setPdfPath(undefined);
		}, 300);
	}, []);

	return {
		isOpen,
		content,
		pdfPath,
		title,
		size,
		openModal,
		openPDFModal,
		closeModal,
	};
};
