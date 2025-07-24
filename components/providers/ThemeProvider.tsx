"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";

type ThemeProviderProps = ComponentProps<typeof NextThemesProvider>;

const ThemeProvider: React.FC<ThemeProviderProps> = ({
	children,
	...props
}) => {
	return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
};

export { ThemeProvider };
