"use client";
import React, { useState, useEffect } from "react";
import Icon from "@/components/icon/AppIcon";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface FirmSize {
	label: string;
	quotes: number;
	avgValue: number;
}

interface Calculations {
	monthlyRevenue: number;
	annualRevenue: number;
	timeSaved: number;
	monthlyCost: number;
	netMonthlyProfit: number;
	netAnnualProfit: number;
	roi: number;
}

type FirmSizeKey = "small" | "medium" | "large";

const CommissionCalculator = () => {
	const [firmSize, setFirmSize] = useState<FirmSizeKey>("small");
	const [monthlyQuotes, setMonthlyQuotes] = useState(25);
	const [commissionRate, setCommissionRate] = useState(40);
	const [averageQuoteValue, setAverageQuoteValue] = useState(450);
	const [calculations, setCalculations] = useState<Calculations>({
		monthlyRevenue: 0,
		annualRevenue: 0,
		timeSaved: 0,
		monthlyCost: 0,
		netMonthlyProfit: 0,
		netAnnualProfit: 0,
		roi: 0,
	});

	const firmSizes: Record<FirmSizeKey, FirmSize> = {
		small: { label: "Small Firm (1-3 attorneys)", quotes: 25, avgValue: 450 },
		medium: {
			label: "Medium Firm (4-10 attorneys)",
			quotes: 75,
			avgValue: 520,
		},
		large: { label: "Large Firm (10+ attorneys)", quotes: 150, avgValue: 680 },
	};

	useEffect(() => {
		const monthlyRevenue =
			monthlyQuotes * averageQuoteValue * (commissionRate / 100);
		const annualRevenue = monthlyRevenue * 12;
		const timeSaved = monthlyQuotes * 1.8; // 1.8 hours saved per quote
		const monthlyCost = monthlyQuotes * 12; // $12 per quote platform fee
		const netMonthlyProfit = monthlyRevenue - monthlyCost;
		const netAnnualProfit = netMonthlyProfit * 12;
		const roi = (netAnnualProfit / (monthlyCost * 12)) * 100;

		setCalculations({
			monthlyRevenue,
			annualRevenue,
			timeSaved,
			monthlyCost,
			netMonthlyProfit,
			netAnnualProfit,
			roi,
		});
	}, [monthlyQuotes, commissionRate, averageQuoteValue]);

	const handleFirmSizeChange = (size: FirmSizeKey) => {
		setFirmSize(size);
		setMonthlyQuotes(firmSizes[size].quotes);
		setAverageQuoteValue(firmSizes[size].avgValue);
	};

	return (
		<section
			id="commission-calculator"
			className="py-20 bg-background"
			data-calculator>
			<div className="max-w-7xl mx-auto px-6 lg:px-8">
				{/* Section Header */}
				<div className="text-center mb-16">
					<div className="inline-flex items-center space-x-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-6">
						<Icon name="Calculator" size={16} />
						<span>Commission Calculator</span>
					</div>
					<h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-6">
						Calculate Your{" "}
						<span className="text-accent">Revenue Potential</span>
					</h2>
					<p className="text-xl text-text-secondary max-w-3xl mx-auto">
						See how much additional revenue your firm can generate with faster
						quote turnaround and higher client satisfaction.
					</p>
				</div>

				<div className="grid lg:grid-cols-2 gap-12">
					{/* Calculator Controls */}
					<div className="bg-white dark:bg-white/10 rounded-2xl shadow-cta border border-border p-8">
						<h3 className="text-xl font-semibold text-text-primary mb-6">
							Customize Your Parameters
						</h3>

						{/* Firm Size Selection */}
						<div className="mb-8">
							<label className="block text-sm font-medium text-text-primary mb-3">
								Firm Size
							</label>
							<div className="space-y-2">
								{(Object.entries(firmSizes) as [FirmSizeKey, FirmSize][]).map(
									([key, size]) => (
										<button
											key={key}
											onClick={() => handleFirmSizeChange(key)}
											className={`w-full flex items-center justify-between p-4 rounded-lg border transition-all duration-200 ${
												firmSize === key
													? "border-primary bg-primary/10 text-primary dark:border-blue-400 dark:bg-blue-600/10 dark:text-blue-600"
													: "border-border hover:border-primary/50 hover:bg-surface"
											}`}>
											<span className="font-medium">{size.label}</span>
											<div className="text-sm text-text-secondary">
												~{size.quotes} quotes/month
											</div>
										</button>
									)
								)}
							</div>
						</div>

						{/* Monthly Quotes Slider */}
						<div className="mb-8">
							<label className="block text-sm font-medium text-text-primary mb-3">
								Monthly Quotes:{" "}
								<span className="text-primary dark:text-blue-600 font-semibold">
									{monthlyQuotes}
								</span>
							</label>
							<div className="relative">
								<input
									type="range"
									min="10"
									max="200"
									value={monthlyQuotes}
									onChange={(e) => setMonthlyQuotes(parseInt(e.target.value))}
									className="w-full slider"
								/>
								<div className="flex justify-between text-xs text-text-muted mt-2">
									<span>10</span>
									<span>200</span>
								</div>
							</div>
						</div>

						{/* Commission Rate Slider */}
						<div className="mb-8">
							<label className="block text-sm font-medium text-text-primary mb-3">
								Commission Rate:{" "}
								<span className="text-accent font-semibold">
									{commissionRate}%
								</span>
							</label>
							<div className="relative">
								<input
									type="range"
									min="20"
									max="80"
									value={commissionRate}
									onChange={(e) => setCommissionRate(parseInt(e.target.value))}
									className="w-full slider"
								/>
								<div className="flex justify-between text-xs text-text-muted mt-2">
									<span>20%</span>
									<span>80%</span>
								</div>
							</div>
						</div>

						{/* Average Quote Value */}
						<div className="mb-8">
							<label className="block text-sm font-medium text-text-primary mb-3">
								Average Quote Value:{" "}
								<span className="text-primary dark:text-blue-600 font-semibold">
									${averageQuoteValue}
								</span>
							</label>
							<div className="relative">
								<input
									type="range"
									min="200"
									max="1000"
									step="50"
									value={averageQuoteValue}
									onChange={(e) =>
										setAverageQuoteValue(parseInt(e.target.value))
									}
									className="w-full slider"
								/>
								<div className="flex justify-between text-xs text-text-muted mt-2">
									<span>$200</span>
									<span>$1000</span>
								</div>
							</div>
						</div>

						{/* Platform Cost Info */}
						<div className="bg-surface rounded-lg p-4">
							<div className="flex items-center space-x-2 mb-2">
								<Icon name="Info" size={16} className="text-primary dark:text-blue-600" />
								<span className="text-sm font-medium text-text-primary">
									Platform Cost
								</span>
							</div>
							<p className="text-sm text-text-secondary">
								$12 per quote generated • No setup fees • Cancel anytime
							</p>
						</div>
					</div>

					{/* Results Dashboard */}
					<div className="space-y-6">
						{/* Revenue Metrics */}
						<div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl p-8 border border-accent/20">
							<div className="flex items-center space-x-3 mb-6">
								<div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
									<Icon name="TrendingUp" size={24} className="text-accent" />
								</div>
								<div>
									<h3 className="text-xl font-semibold text-text-primary">
										Revenue Projection
									</h3>
									<p className="text-sm text-text-secondary">
										Based on your parameters
									</p>
								</div>
							</div>

							<div className="grid grid-cols-2 gap-6">
								<div className="text-center">
									<div className="text-3xl font-bold text-accent mb-1">
										${calculations.monthlyRevenue?.toLocaleString() || "0"}
									</div>
									<div className="text-sm text-text-secondary">
										Monthly Revenue
									</div>
								</div>
								<div className="text-center">
									<div className="text-3xl font-bold text-accent mb-1">
										${calculations.annualRevenue?.toLocaleString() || "0"}
									</div>
									<div className="text-sm text-text-secondary">
										Annual Revenue
									</div>
								</div>
							</div>
						</div>

						{/* Profit Analysis */}
						<div className="bg-gradient-to-br from-success/10 to-success/5 rounded-2xl p-8 border border-success/20">
							<div className="flex items-center space-x-3 mb-6">
								<div className="w-12 h-12 bg-success/20 rounded-lg flex items-center justify-center">
									<Icon name="DollarSign" size={24} className="text-success" />
								</div>
								<div>
									<h3 className="text-xl font-semibold text-text-primary">
										Net Profit
									</h3>
									<p className="text-sm text-text-secondary">
										After platform costs
									</p>
								</div>
							</div>

							<div className="space-y-4">
								<div className="flex items-center justify-between">
									<span className="text-text-secondary">Monthly Profit:</span>
									<span className="text-xl font-bold text-success">
										${calculations.netMonthlyProfit?.toLocaleString() || "0"}
									</span>
								</div>
								<div className="flex items-center justify-between">
									<span className="text-text-secondary">Annual Profit:</span>
									<span className="text-xl font-bold text-success">
										${calculations.netAnnualProfit?.toLocaleString() || "0"}
									</span>
								</div>
								<div className="flex items-center justify-between pt-4 border-t border-success/20">
									<span className="text-text-secondary">ROI:</span>
									<span className="text-xl font-bold text-success">
										{calculations.roi?.toFixed(0) || "0"}%
									</span>
								</div>
							</div>
						</div>

						{/* Time Savings */}
						<div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 border border-primary/20 dark:bg-primary/10 dark:border-blue-400 dark:to-blue-600/5">
							<div className="flex items-center space-x-3 mb-6">
								<div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center dark:bg-blue-600/10">
									<Icon name="Clock" size={24} className="text-primary dark:text-blue-600" />
								</div>
								<div>
									<h3 className="text-xl font-semibold text-text-primary">
										Time Savings
									</h3>
									<p className="text-sm text-text-secondary">
										Focus on high-value work
									</p>
								</div>
							</div>

							<div className="text-center">
								<div className="text-3xl font-bold text-primary dark:text-blue-600 mb-1">
									{calculations.timeSaved?.toFixed(0) || "0"} hours
								</div>
								<div className="text-sm text-text-secondary">
									Saved per month
								</div>
								<div className="text-xs text-text-muted mt-2">
									Equivalent to {((calculations.timeSaved || 0) / 8).toFixed(1)}{" "}
									work days
								</div>
							</div>
						</div>

						{/* CTA */}
						<div className="flex flex-col items-center justify-center pt-6">
							<Link href="https://partner.lexprotector.com/signup">
								<Button
									variant="default"
									size="lg"
									className="bg-primary hover:bg-blue-900 text-white font-semibold px-8 py-4 flex items-center gap-2"
									onClick={() => {
										// Navigate to dashboard instead of scrolling to get-started section
										window.location.href =
											"https://partner.lexprotector.com/signup";
									}}>
									Start Earning More Today
									<Icon name="ArrowRight" size={16} />
								</Button>
							</Link>
							<p className="text-sm text-text-secondary mt-3">
								14-day free trial • No credit card required
							</p>
						</div>
					</div>
				</div>
			</div>

			<style jsx>{`
				.slider {
					-webkit-appearance: none;
					appearance: none;
					width: 100%;
					height: 8px;
					border-radius: 4px;
					background: #e2e8f0;
					outline: none;
					cursor: pointer;
					position: relative;
				}

				.slider::-webkit-slider-track {
					-webkit-appearance: none;
					appearance: none;
					width: 100%;
					height: 8px;
					border-radius: 4px;
					background: #e2e8f0;
					border: none;
					outline: none;
				}

				.slider::-webkit-slider-thumb {
					-webkit-appearance: none;
					appearance: none;
					height: 20px;
					width: 20px;
					border-radius: 50%;
					background: #3b82f6;
					cursor: pointer;
					box-shadow: 0 2px 8px rgba(59, 130, 246, 0.4);
					border: 2px solid white;
					transition: all 0.2s ease;
					position: relative;
					z-index: 2;
				}

				.slider::-webkit-slider-thumb:hover {
					transform: scale(1.1);
					box-shadow: 0 4px 12px rgba(59, 130, 246, 0.6);
				}

				.slider::-webkit-slider-thumb:active {
					transform: scale(0.95);
				}

				.slider::-moz-range-track {
					width: 100%;
					height: 8px;
					border-radius: 4px;
					background: #e2e8f0;
					border: none;
					outline: none;
				}

				.slider::-moz-range-progress {
					height: 8px;
					border-radius: 4px;
					background: #3b82f6;
				}

				.slider::-moz-range-thumb {
					height: 16px;
					width: 16px;
					border-radius: 50%;
					background: #3b82f6;
					cursor: pointer;
					border: 2px solid white;
					box-shadow: 0 2px 8px rgba(59, 130, 246, 0.4);
					transition: all 0.2s ease;
					-moz-appearance: none;
					appearance: none;
				}

				.slider::-moz-range-thumb:hover {
					transform: scale(1.1);
					box-shadow: 0 4px 12px rgba(59, 130, 246, 0.6);
				}

				.slider::-moz-range-thumb:active {
					transform: scale(0.95);
				}

				.slider:focus {
					outline: none;
				}

				.slider:focus::-webkit-slider-thumb {
					box-shadow: 0 2px 8px rgba(59, 130, 246, 0.4),
						0 0 0 3px rgba(59, 130, 246, 0.2);
				}

				.slider:focus::-moz-range-thumb {
					box-shadow: 0 2px 8px rgba(59, 130, 246, 0.4),
						0 0 0 3px rgba(59, 130, 246, 0.2);
				}

				/* For Edge/IE */
				.slider::-ms-track {
					width: 100%;
					height: 8px;
					background: transparent;
					border-color: transparent;
					color: transparent;
				}

				.slider::-ms-fill-lower {
					background: #3b82f6;
					border-radius: 4px;
				}

				.slider::-ms-fill-upper {
					background: #e2e8f0;
					border-radius: 4px;
				}

				.slider::-ms-thumb {
					height: 20px;
					width: 20px;
					border-radius: 50%;
					background: #3b82f6;
					cursor: pointer;
					border: 2px solid white;
					box-shadow: 0 2px 8px rgba(59, 130, 246, 0.4);
				}
			`}</style>
		</section>
	);
};

export default CommissionCalculator;
