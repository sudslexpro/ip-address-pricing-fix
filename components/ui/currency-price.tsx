"use client";

import React, { useState, useEffect } from "react";
import {
	useCurrencyConversion,
	CurrencyConversionOptions,
} from "@/hooks/useCurrencyConversion";
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

interface CurrencyPriceProps {
	amount: number;
	className?: string;
	showCurrencySelector?: boolean;
	showConversionSettings?: boolean;
	enableTooltip?: boolean;
	variant?: "inline" | "block" | "compact";
	prefix?: string;
	suffix?: string;
	conversionOptions?: CurrencyConversionOptions;
	onCurrencyChange?: (currency: string, convertedAmount: number) => void;
}

const CurrencyPrice: React.FC<CurrencyPriceProps> = ({
	amount,
	className,
	showCurrencySelector = true,
	showConversionSettings = false,
	enableTooltip = true,
	variant = "inline",
	prefix,
	suffix,
	conversionOptions = {},
	onCurrencyChange,
}) => {
	const [localRoundingValue, setLocalRoundingValue] = useState<number>(5);
	const [localRoundingMode, setLocalRoundingMode] = useState<
		"up" | "down" | "nearest"
	>("nearest");
	const [enableLocalRounding, setEnableLocalRounding] = useState(false);

	const {
		userLocation,
		exchangeRate,
		currentCurrency,
		isLoading,
		error,
		convertAmount,
		formatCurrency,
		getCurrencyInfo,
		changeCurrency,
		availableCurrencies,
		baseCurrency,
	} = useCurrencyConversion({
		...conversionOptions,
		customRoundingValue: enableLocalRounding ? localRoundingValue : undefined,
		roundingMode: localRoundingMode,
	});

	const convertedAmount = convertAmount(amount);
	const currencyInfo = getCurrencyInfo();

	// Notify parent component of currency changes
	useEffect(() => {
		if (onCurrencyChange && exchangeRate) {
			onCurrencyChange(currentCurrency, convertedAmount);
		}
	}, [currentCurrency, convertedAmount, exchangeRate, onCurrencyChange]);

	const renderPrice = () => {
		if (isLoading) {
			return (
				<span className="inline-flex items-center gap-1">
					<Icon name="Loader2" size={12} className="animate-spin" />
					{formatCurrency(amount, baseCurrency)}
				</span>
			);
		}

		if (error && !exchangeRate) {
			return formatCurrency(amount, baseCurrency);
		}

		const formattedPrice = formatCurrency(convertedAmount);

		if (variant === "compact") {
			return <span className="font-medium">{formattedPrice}</span>;
		}

		return (
			<span className="inline-flex items-center gap-1">
				{currentCurrency !== baseCurrency && enableTooltip && (
					<span className="text-xs text-muted-foreground">
						({formatCurrency(amount, baseCurrency)})
					</span>
				)}
				<span className="font-medium">{formattedPrice}</span>
				{userLocation && currentCurrency !== baseCurrency && (
					<span title={`Auto-detected: ${userLocation.countryName}`}>
						<Icon name="MapPin" size={12} className="text-muted-foreground" />
					</span>
				)}
			</span>
		);
	};

	const renderCurrencySelector = () => {
		if (!showCurrencySelector) return null;

		return (
			<Select value={currentCurrency} onValueChange={changeCurrency}>
				<SelectTrigger className="w-20">
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

	const renderConversionSettings = () => {
		if (!showConversionSettings) return null;

		return (
			<Popover>
				<PopoverTrigger asChild>
					<Button variant="outline" size="sm">
						<Icon name="Settings2" size={14} />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-80">
					<div className="space-y-4">
						<h4 className="font-medium">Conversion Settings</h4>

						<div className="space-y-3">
							<div className="flex items-center justify-between">
								<Label htmlFor="enable-rounding">Custom Rounding</Label>
								<Switch
									id="enable-rounding"
									checked={enableLocalRounding}
									onCheckedChange={setEnableLocalRounding}
								/>
							</div>

							{enableLocalRounding && (
								<>
									<div className="space-y-2">
										<Label htmlFor="rounding-value">Round to nearest</Label>
										<Input
											id="rounding-value"
											type="number"
											value={localRoundingValue}
											onChange={(e) =>
												setLocalRoundingValue(Number(e.target.value))
											}
											min="1"
											step="1"
										/>
									</div>

									<div className="space-y-2">
										<Label htmlFor="rounding-mode">Rounding Mode</Label>
										<Select
											value={localRoundingMode}
											onValueChange={(value: "up" | "down" | "nearest") =>
												setLocalRoundingMode(value)
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
								<p>Detected: {userLocation.countryName}</p>
								<p>Local Currency: {userLocation.currency}</p>
								{exchangeRate && (
									<p>
										Rate: 1 {baseCurrency} = {exchangeRate.toFixed(4)}{" "}
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

	if (variant === "block") {
		return (
			<div className={cn("space-y-2", className)}>
				<div className="flex items-center justify-between">
					<div>
						{prefix && <span className="text-muted-foreground">{prefix}</span>}
						{renderPrice()}
						{suffix && <span className="text-muted-foreground">{suffix}</span>}
					</div>
					<div className="flex items-center gap-2">
						{renderCurrencySelector()}
						{renderConversionSettings()}
					</div>
				</div>
			</div>
		);
	}

	if (variant === "compact") {
		return (
			<span className={cn("inline-flex items-center gap-1", className)}>
				{prefix && (
					<span className="text-muted-foreground text-sm">{prefix}</span>
				)}
				{renderPrice()}
				{suffix && (
					<span className="text-muted-foreground text-sm">{suffix}</span>
				)}
			</span>
		);
	}

	// Default inline variant
	return (
		<span className={cn("inline-flex items-center gap-2", className)}>
			{prefix && <span className="text-muted-foreground">{prefix}</span>}
			{renderPrice()}
			{suffix && <span className="text-muted-foreground">{suffix}</span>}
			{showCurrencySelector && (
				<div className="inline-flex items-center gap-1">
					{renderCurrencySelector()}
					{renderConversionSettings()}
				</div>
			)}
		</span>
	);
};

export default CurrencyPrice;
