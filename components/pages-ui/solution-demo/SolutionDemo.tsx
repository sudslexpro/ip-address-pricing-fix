"use client";
import React from "react";
import Icon from "@/components/icon/AppIcon";

const SolutionDemo = () => {
	return (
		<section id="solution-demo" className="pb-24 bg-surface">
			<div className="max-w-7xl mx-auto px-6 lg:px-8">
				{/* Section Header */}
				<div className="text-center mb-16">
					<div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
						<Icon name="Play" size={16} />
						<span>Live Demo</span>
					</div>
					{/* Video Player UI */}
					<div className="hidden lg:block relative max-w-4xl mx-auto mb-8">
						<div className="bg-black rounded-2xl overflow-hidden shadow-2xl border border-border/20">
							{/* Video Player Header */}
							<div className="bg-gradient-to-r from-gray-800 to-gray-900 px-4 py-3 flex items-center justify-between">
								<div className="flex items-center space-x-3">
									<div className="flex space-x-2">
										<div className="w-3 h-3 bg-red-500 rounded-full"></div>
										<div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
										<div className="w-3 h-3 bg-green-500 rounded-full"></div>
									</div>
									<span className="text-white text-sm font-medium">
										Live Demo
									</span>
								</div>
								<div className="text-gray-400 text-xs">2:04 / 3:45</div>
							</div>

							{/* Video Content Area */}
							<div className="relative aspect-video bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center">
								{/* Gradient overlay */}
								<div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20"></div>

								{/* Play button and content */}
								<div className="relative z-10 text-center">
									<button className="group mb-6 transform hover:scale-105 transition-all duration-300">
										<div className="w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl group-hover:bg-white transition-colors">
											<Icon
												name="Play"
												size={32}
												className="text-primary ml-1"
											/>
										</div>
									</button>
									<div className="text-white">
										<h3 className="text-2xl font-bold mb-2">
											See Quote Generation in Action
										</h3>
										<p className="text-white/80 text-lg">
											Watch how we transform hours of work into minutes
										</p>
									</div>
								</div>

								{/* Video timeline simulation */}
								<div className="absolute bottom-4 left-4 right-4">
									<div className="flex items-center space-x-3">
										<button className="text-white/60 hover:text-white transition-colors">
											<Icon name="Play" size={16} />
										</button>
										<div className="flex-1 bg-white/20 rounded-full h-1">
											<div
												className="bg-primary h-full rounded-full"
												style={{ width: "54%" }}></div>
										</div>
										<button className="text-white/60 hover:text-white transition-colors">
											<Icon name="Volume2" size={16} />
										</button>
										<button className="text-white/60 hover:text-white transition-colors">
											<Icon name="Settings" size={16} />
										</button>
										<button className="text-white/60 hover:text-white transition-colors">
											<Icon name="Maximize" size={16} />
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>

					<h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-6">
						Interactive Demo:{" "}
						<span className="text-primary">Try It Yourself</span>
					</h2>
					<p className="text-xl text-text-secondary max-w-3xl mx-auto">
						Experience how our platform transforms complex trademark research
						into professional quotes in under 2 minutes.
					</p>
				</div>

				{/* Benefits Section */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
					<div className="bg-white rounded-lg p-8 border border-border aspect-square flex flex-col justify-center text-center">
						<div className="w-16 h-16 bg-success/20 rounded-lg flex items-center justify-center mx-auto mb-6">
							<Icon name="Clock" size={32} className="text-success" />
						</div>
						<h3 className="font-bold text-text-primary text-xl mb-2">
							Time Savings
						</h3>
						<p className="text-sm text-text-secondary mb-4 font-medium">
							From 2+ hours to 2 minutes
						</p>
						<p className="text-sm text-text-secondary leading-relaxed">
							Eliminate manual research and calculations. Our automated system
							handles complex fee structures across all countries.
						</p>
					</div>

					<div className="bg-white rounded-lg p-8 border border-border aspect-square flex flex-col justify-center text-center">
						<div className="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-6">
							<Icon name="Target" size={32} className="text-primary" />
						</div>
						<h3 className="font-bold text-text-primary text-xl mb-2">
							99% Accuracy
						</h3>
						<p className="text-sm text-text-secondary mb-4 font-medium">
							Real-time fee updates
						</p>
						<p className="text-sm text-text-secondary leading-relaxed">
							Our database is updated daily with the latest government fees and
							requirements from official trademark offices.
						</p>
					</div>

					<div className="bg-white rounded-lg p-8 border border-border aspect-square flex flex-col justify-center text-center">
						<div className="w-16 h-16 bg-accent/20 rounded-lg flex items-center justify-center mx-auto mb-6">
							<Icon name="Palette" size={32} className="text-accent" />
						</div>
						<h3 className="font-bold text-text-primary text-xl mb-2">
							White-Label Ready
						</h3>
						<p className="text-sm text-text-secondary mb-4 font-medium">
							Your brand, your rates
						</p>
						<p className="text-sm text-text-secondary leading-relaxed">
							Customize quotes with your firm's branding, commission rates, and
							professional styling.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default SolutionDemo;
