import React, { createContext, useContext, useState, ReactNode } from "react";

interface CalendlyModalContextType {
	isModalOpen: boolean;
	openModal: () => void;
	closeModal: () => void;
}

const CalendlyModalContext = createContext<
	CalendlyModalContextType | undefined
>(undefined);

export const useCalendlyModal = () => {
	const context = useContext(CalendlyModalContext);
	if (context === undefined) {
		throw new Error(
			"useCalendlyModal must be used within a CalendlyModalProvider"
		);
	}
	return context;
};

interface CalendlyModalProviderProps {
	children: ReactNode;
}

export const CalendlyModalProvider: React.FC<CalendlyModalProviderProps> = ({
	children,
}) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	return (
		<CalendlyModalContext.Provider
			value={{ isModalOpen, openModal, closeModal }}>
			{children}
		</CalendlyModalContext.Provider>
	);
};
