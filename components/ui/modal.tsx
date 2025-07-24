/**
 * Modal UI Component with Enhanced Provider Integration
 *
 * This module provides two types of modal components:
 *
 * 1. **Modal** - Basic Radix UI modal wrapper
 * 2. **EnhancedModal** - Integrated with ModalProvider for automatic floating element management
 *
 * ## Usage with EnhancedModal (Recommended)
 *
 * ```tsx
 * import { EnhancedModal as Modal, ModalContent } from "@/components/ui/modal";
 *
 * function MyComponent() {
 *   const [isOpen, setIsOpen] = useState(false);
 *
 *   return (
 *     <Modal
 *       open={isOpen}
 *       onOpenChange={setIsOpen}
 *       modalId="my-unique-modal" // Optional: auto-generated if not provided
 *     >
 *       <ModalContent>
 *         Your modal content here
 *       </ModalContent>
 *     </Modal>
 *   );
 * }
 * ```
 *
 * ## Features
 *
 * - **Automatic Floating Element Management**: Floating CTAs and menus are automatically hidden when modal opens
 * - **Multiple Modal Support**: Track multiple modals simultaneously
 * - **Responsive Design**: Built-in responsive sizing options
 * - **Accessibility**: Full ARIA support via Radix UI
 *
 * ## Provider Setup
 *
 * The ModalProvider must be wrapped around your app (already configured in LayoutClient):
 *
 * ```tsx
 * import { ModalProvider } from "@/components/ui/modal";
 *
 * function App() {
 *   return (
 *     <ModalProvider>
 *       <YourApp />
 *     </ModalProvider>
 *   );
 * }
 * ```
 * ```
 */

"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import {
	createContext,
	useContext,
	useState,
	useCallback,
	useEffect,
} from "react";

import { cn } from "@/lib/utils";

// Modal Provider Context and Types
interface ModalContextType {
	isAnyModalOpen: boolean;
	openModals: Set<string>;
	registerModal: (modalId: string) => void;
	unregisterModal: (modalId: string) => void;
	setModalOpen: (modalId: string, isOpen: boolean) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

const useModalContext = () => {
	const context = useContext(ModalContext);
	if (!context) {
		throw new Error("useModalContext must be used within a ModalProvider");
	}
	return context;
};

// Modal Provider Component
interface ModalProviderProps {
	children: React.ReactNode;
}

const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
	const [openModals, setOpenModals] = useState<Set<string>>(new Set());

	const registerModal = useCallback((modalId: string) => {
		// Modal registration is handled implicitly when opening
	}, []);

	const unregisterModal = useCallback((modalId: string) => {
		setOpenModals((prev) => {
			const newSet = new Set(prev);
			newSet.delete(modalId);
			return newSet;
		});
	}, []);

	const setModalOpen = useCallback((modalId: string, isOpen: boolean) => {
		setOpenModals((prev) => {
			const newSet = new Set(prev);
			if (isOpen) {
				newSet.add(modalId);
			} else {
				newSet.delete(modalId);
			}
			return newSet;
		});
	}, []);

	const isAnyModalOpen = openModals.size > 0;

	const value: ModalContextType = {
		isAnyModalOpen,
		openModals,
		registerModal,
		unregisterModal,
		setModalOpen,
	};

	return (
		<ModalContext.Provider value={value}>{children}</ModalContext.Provider>
	);
};

// Modal Client Component
interface ModalClientProps {
	children: React.ReactNode;
	modalId: string;
	isOpen: boolean;
}

const ModalClient: React.FC<ModalClientProps> = ({
	children,
	modalId,
	isOpen,
}) => {
	const { setModalOpen, unregisterModal } = useModalContext();

	useEffect(() => {
		setModalOpen(modalId, isOpen);

		// Cleanup when component unmounts
		return () => {
			unregisterModal(modalId);
		};
	}, [modalId, isOpen, setModalOpen, unregisterModal]);

	return <>{children}</>;
};

const Modal = DialogPrimitive.Root;

const ModalTrigger = DialogPrimitive.Trigger;

const ModalPortal = DialogPrimitive.Portal;

const ModalClose = DialogPrimitive.Close;

const ModalOverlay = React.forwardRef<
	React.ElementRef<typeof DialogPrimitive.Overlay>,
	React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
	<DialogPrimitive.Overlay
		ref={ref}
		className={cn(
			"fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
			className
		)}
		{...props}
	/>
));
ModalOverlay.displayName = DialogPrimitive.Overlay.displayName;

const modalVariants = cva(
	"fixed left-[50%] top-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
	{
		variants: {
			size: {
				default: "max-w-lg",
				sm: "max-w-sm",
				md: "max-w-md",
				lg: "max-w-2xl",
				xl: "max-w-4xl",
				full: "max-w-7xl",
				auto: "max-w-fit",
			},
		},
		defaultVariants: {
			size: "default",
		},
	}
);

interface ModalContentProps
	extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
		VariantProps<typeof modalVariants> {}

const ModalContent = React.forwardRef<
	React.ElementRef<typeof DialogPrimitive.Content>,
	ModalContentProps
>(({ className, size, children, ...props }, ref) => (
	<ModalPortal>
		<ModalOverlay />
		<DialogPrimitive.Content
			ref={ref}
			className={cn(modalVariants({ size }), className)}
			{...props}>
			{children}
			<DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
				<X className="h-4 w-4" />
				<span className="sr-only">Close</span>
			</DialogPrimitive.Close>
		</DialogPrimitive.Content>
	</ModalPortal>
));
ModalContent.displayName = DialogPrimitive.Content.displayName;

const ModalHeader = ({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => (
	<div
		className={cn(
			"flex flex-col space-y-1.5 text-center sm:text-left",
			className
		)}
		{...props}
	/>
);
ModalHeader.displayName = "ModalHeader";

const ModalFooter = ({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => (
	<div
		className={cn(
			"flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
			className
		)}
		{...props}
	/>
);
ModalFooter.displayName = "ModalFooter";

const ModalTitle = React.forwardRef<
	React.ElementRef<typeof DialogPrimitive.Title>,
	React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
	<DialogPrimitive.Title
		ref={ref}
		className={cn(
			"text-lg font-semibold leading-none tracking-tight",
			className
		)}
		{...props}
	/>
));
ModalTitle.displayName = DialogPrimitive.Title.displayName;

const ModalDescription = React.forwardRef<
	React.ElementRef<typeof DialogPrimitive.Description>,
	React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
	<DialogPrimitive.Description
		ref={ref}
		className={cn("text-sm text-muted-foreground", className)}
		{...props}
	/>
));
ModalDescription.displayName = DialogPrimitive.Description.displayName;

// Enhanced Modal component that integrates with ModalProvider
interface EnhancedModalProps {
	children: React.ReactNode;
	open: boolean;
	onOpenChange: (open: boolean) => void;
	modalId?: string;
}

const EnhancedModal: React.FC<EnhancedModalProps> = ({
	children,
	open,
	onOpenChange,
	modalId = `modal-${Math.random().toString(36).substr(2, 9)}`,
}) => {
	return (
		<Modal open={open} onOpenChange={onOpenChange}>
			<ModalClient modalId={modalId} isOpen={open}>
				{children}
			</ModalClient>
		</Modal>
	);
};

export {
	Modal,
	EnhancedModal,
	ModalPortal,
	ModalOverlay,
	ModalClose,
	ModalTrigger,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalTitle,
	ModalDescription,
	ModalProvider,
	ModalClient,
	useModalContext,
};
