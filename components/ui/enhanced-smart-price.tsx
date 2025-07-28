"use client";

import React, { useState, useEffect } from "react";
import { useEnhancedCurrencyConversion } from "@/hooks/useEnhancedCurrencyConversion";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import Icon from "@/components/icon/AppIcon";
import { cn } from "@/lib/utils";

interface EnhancedSmartPriceProps {
	/** The base price amount in USD */
	amount: number;
	/** Additional CSS classes */
	className?: string;
	/** Text to display before the price */
	prefix?: string;
	/** Text to display after the price */
	suffix?: string;
	/** Display style variant */
	variant?: "inline" | "block" | "compact" | "large";
	/** Show currency selector dropdown */
	showCurrencySelector?: boolean;
	/** Show settings icon for manual rounding controls */
	showRoundingControls?: boolean;
	/** Show location indicator when auto-detected */
	showLocationIndicator?: boolean;
	/** Enable automatic location detection */
	enableAutoDetection?: boolean;
	/** Prefer browser geolocation over IP detection */
	preferBrowserGeolocation?: boolean;
	/** Allow fallback to IP if browser geolocation fails */
	fallbackToIP?: boolean;
	/** Show geolocation permission prompt */
	showPermissionPrompt?: boolean;
	/** Callback when currency or amount changes */
	onChange?: (currency: string, convertedAmount: number) => void;
	/** Custom loading text */
	loadingText?: string;
}

/**
 * EnhancedSmartPrice - Always uses IP-based auto-detection for location/currency.
 *
 * Features:
 * - IP-based location detection only (no browser geolocation)
 * - Real-time currency conversion
 * - Manual currency override
 * - Customizable rounding options
 * - Multiple display variants
 */
const EnhancedSmartPrice: React.FC<EnhancedSmartPriceProps> = ({
	amount,
	className,
	prefix,
	suffix,
	variant = "inline",
	showCurrencySelector = true,
	showRoundingControls = false,
	showLocationIndicator = true,
	// Always use auto-detect (IP-based), never browser geolocation
	enableAutoDetection = true,
	preferBrowserGeolocation = false,
	fallbackToIP = true,
	// Never show permission prompt
	showPermissionPrompt = false,
	onChange,
	loadingText = "Converting...",
}) => {
	// Local state for manual rounding controls
	const [enableManualRounding, setEnableManualRounding] = useState(false);
	const [roundingValue, setRoundingValue] = useState<number>(5);
	const [roundingMode, setRoundingMode] = useState<"up" | "down" | "nearest">(
		"nearest"
	);

	// Use the enhanced currency conversion hook
	const {
		userLocation,
		exchangeRate,
		currentCurrency,
		isLoading,
		error,
		geolocationPermission,
		convertAmount,
		formatCurrency,
		getCurrencyInfo,
		changeCurrency,
		availableCurrencies,
		baseCurrency,
		requestGeolocationPermission,
	} = useEnhancedCurrencyConversion({
		enableAutoDetection,
		enableRounding: enableManualRounding,
		roundingMode,
		customRoundingValue: enableManualRounding ? roundingValue : undefined,
		preferBrowserGeolocation,
		fallbackToIP,
	});

	// Convert the amount
	const convertedAmount = convertAmount(amount);
	const currencyInfo = getCurrencyInfo();

	// Notify parent of changes
	useEffect(() => {
		if (onChange && exchangeRate) {
			onChange(currentCurrency, convertedAmount);
		}
	}, [currentCurrency, convertedAmount, exchangeRate, onChange]);

	// Remove geolocation permission prompt entirely (always use IP-based detection)
	const renderPermissionPrompt = () => null;

	// Render the formatted price
	const renderPrice = () => {
		if (isLoading) {
			return (
				<span className="inline-flex items-center gap-1">
					<Icon name="Loader2" size={12} className="animate-spin" />
					<span className="text-muted-foreground text-sm">{loadingText}</span>
				</span>
			);
		}

		if (error && !exchangeRate) {
			return (
				<span className="inline-flex items-center gap-1">
					<span className="font-medium">
						{formatCurrency(amount, baseCurrency)}
					</span>
					<Icon name="AlertCircle" size={12} className="text-amber-500" />
				</span>
			);
		}

		const formattedPrice = formatCurrency(convertedAmount);
		const isConverted = currentCurrency !== baseCurrency;

		return (
			<span className="inline-flex items-center gap-1">
				{isConverted && variant !== "compact" && (
					<span className="text-xs text-muted-foreground">
						({formatCurrency(amount, baseCurrency)})
					</span>
				)}
				<span
					className={cn(
						"font-medium",
						variant === "large" && "text-xl",
						variant === "compact" && "text-sm"
					)}>
					{formattedPrice}
				</span>
				{showLocationIndicator && userLocation && isConverted && (
					<span
						title={`${
							userLocation.method === "browser" ? "GPS" : "IP"
						} location: ${userLocation.countryName}`}
						className="inline-flex items-center">
						<Icon
							name={userLocation.method === "browser" ? "Navigation" : "MapPin"}
							size={10}
							className={cn(
								"text-muted-foreground",
								userLocation.method === "browser" && "text-green-600",
								userLocation.accuracy === "high" && "text-green-600",
								userLocation.accuracy === "medium" && "text-blue-600",
								userLocation.accuracy === "low" && "text-amber-600"
							)}
						/>
					</span>
				)}
			</span>
		);
	};

	// Render currency selector
	const renderCurrencySelector = () => {
		if (!showCurrencySelector) return null;

		return (
			<Select value={currentCurrency} onValueChange={changeCurrency}>
				<SelectTrigger
					className={cn(
						"w-fit min-w-[70px]",
						variant === "compact" && "h-7 text-xs",
						variant === "large" && "h-10"
					)}>
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					{availableCurrencies.map((currency) => {
						const info = getCurrencyInfo(currency);
						return (
							<SelectItem key={currency} value={currency}>
								<div className="flex items-center gap-2">
									<span>{info.symbol}</span>
									<span>{currency}</span>
								</div>
							</SelectItem>
						);
					})}
				</SelectContent>
			</Select>
		);
	};

	// Render rounding controls (location settings always show IP-based only)
	const renderRoundingControls = () => {
		if (!showRoundingControls) return null;

		return (
			<Popover>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						size={variant === "compact" ? "sm" : "default"}
						className="h-fit p-1">
						<Icon name="Settings2" size={14} />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-80">
					<div className="space-y-4">
						<h4 className="font-medium">Currency & Location Settings</h4>

						{/* Rounding Settings */}
						<div className="space-y-3">
							<div className="flex items-center justify-between">
								<Label htmlFor="enable-rounding">Enable Manual Rounding</Label>
								<Switch
									id="enable-rounding"
									checked={enableManualRounding}
									onCheckedChange={setEnableManualRounding}
								/>
							</div>

							{enableManualRounding && (
								<>
									<div className="space-y-2">
										<Label htmlFor="rounding-value">Round to nearest</Label>
										<Input
											id="rounding-value"
											type="number"
											value={roundingValue}
											onChange={(e) => setRoundingValue(Number(e.target.value))}
											min="1"
											step="1"
											placeholder="e.g., 5, 10, 25"
										/>
									</div>

									<div className="space-y-2">
										<Label htmlFor="rounding-mode">Rounding Mode</Label>
										<Select
											value={roundingMode}
											onValueChange={(value: "up" | "down" | "nearest") =>
												setRoundingMode(value)
											}>
											<SelectTrigger>
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="up">Round Up</SelectItem>
												<SelectItem value="down">Round Down</SelectItem>
												<SelectItem value="nearest">
													Round to Nearest
												</SelectItem>
											</SelectContent>
										</Select>
									</div>
								</>
							)}
						</div>

						{userLocation && (
							<div className="pt-3 border-t text-xs text-muted-foreground">
								<div className="flex items-center gap-1 mb-1">
									<Icon name="MapPin" size={10} />
									<span className="font-medium">IP Location</span>
									<span
										className={cn(
											"px-1 py-0.5 rounded text-xs",
											userLocation.accuracy === "high" &&
												"bg-green-100 text-green-700",
											userLocation.accuracy === "medium" &&
												"bg-blue-100 text-blue-700",
											userLocation.accuracy === "low" &&
												"bg-amber-100 text-amber-700"
										)}>
										{userLocation.accuracy}
									</span>
								</div>
								<p>📍 {userLocation.countryName}</p>
								<p>💱 {userLocation.currency}</p>
								{exchangeRate && (
									<p>
										📊 1 {baseCurrency} = {exchangeRate.toFixed(4)}{" "}
										{currentCurrency}
									</p>
								)}
							</div>
						)}
					</div>
				</PopoverContent>
			</Popover>
		);
	};

	// Render based on variant
	if (variant === "block") {
		return (
			<div className={cn("space-y-2", className)}>
				{renderPermissionPrompt()}
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						{prefix && <span className="text-muted-foreground">{prefix}</span>}
						{renderPrice()}
						{suffix && <span className="text-muted-foreground">{suffix}</span>}
					</div>
					<div className="flex items-center gap-2">
						{renderCurrencySelector()}
						{renderRoundingControls()}
					</div>
				</div>
			</div>
		);
	}

	if (variant === "compact") {
		return (
			<span className={cn("inline-flex items-center gap-1", className)}>
				{prefix && (
					<span className="text-muted-foreground text-xs">{prefix}</span>
				)}
				{renderPrice()}
				{suffix && (
					<span className="text-muted-foreground text-xs">{suffix}</span>
				)}
			</span>
		);
	}

	if (variant === "large") {
		return (
			<div className={cn("space-y-2", className)}>
				{renderPermissionPrompt()}
				<div className="flex items-center gap-3">
					<div className="flex items-center gap-2">
						{prefix && (
							<span className="text-lg text-muted-foreground">{prefix}</span>
						)}
						{renderPrice()}
						{suffix && (
							<span className="text-lg text-muted-foreground">{suffix}</span>
						)}
					</div>
					<div className="flex items-center gap-2">
						{renderCurrencySelector()}
						{renderRoundingControls()}
					</div>
				</div>
			</div>
		);
	}

	// Default inline variant
	return (
		<span className={cn("inline-flex items-center gap-2", className)}>
			{prefix && <span className="text-muted-foreground">{prefix}</span>}
			{renderPrice()}
			{suffix && <span className="text-muted-foreground">{suffix}</span>}
			{(showCurrencySelector || showRoundingControls) && (
				<div className="inline-flex items-center gap-1">
					{renderCurrencySelector()}
					{renderRoundingControls()}
				</div>
			)}
		</span>
	);
};

export default EnhancedSmartPrice;
