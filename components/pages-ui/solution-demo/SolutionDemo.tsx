"use client";
import React, { useState } from "react";
import Icon from "@/components/icon/AppIcon";

const SolutionDemo = () => {
	const [isVideoPlaying, setIsVideoPlaying] = useState(false);

	// YouTube video ID from the provided link
	const youtubeVideoId = "4b9hrNad8eo";

	const handleVideoPlay = () => {
		setIsVideoPlaying(true);
	};

	return (
		<section id="solution-demo" className="pb-24 bg-surface">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Section Header */}
				<div className="text-center mb-12 sm:mb-16">
					<div className="inline-flex items-center space-x-2 bg-primary/10 dark:bg-blue-600/30 text-primary dark:text-blue-600 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
						<Icon name="Play" size={14} className="sm:w-4 sm:h-4" />
						<span>Live Demo</span>
					</div>
					{/* Video Player UI */}
					<div className="relative max-w-4xl mx-auto mb-6 sm:mb-8">
						<div className="bg-black rounded-lg sm:rounded-xl lg:rounded-2xl overflow-hidden shadow-xl sm:shadow-2xl border border-border/20">
							{/* Video Player Header - Only show when video is not playing */}
							{!isVideoPlaying && (
								<div className="bg-gradient-to-r from-gray-800 to-gray-900 px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between">
									<div className="flex items-center space-x-2 sm:space-x-3">
										<div className="flex space-x-1 sm:space-x-2">
											<div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
											<div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"></div>
											<div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
										</div>
										<span className="text-white text-xs sm:text-sm font-medium">
											Live Demo
										</span>
									</div>
								</div>
							)}

							{/* Video Content Area */}
							<div className="relative aspect-video bg-gradient-to-br from-gray-900 via-black to-gray-800">
								{!isVideoPlaying ? (
									// Custom preview/thumbnail view
									<div className="flex items-center justify-center h-full">
										{/* Gradient overlay */}
										<div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20"></div>

										{/* Play button and content */}
										<div className="relative z-10 text-center px-4 sm:px-6">
											<button
												onClick={handleVideoPlay}
												className="group mb-4 sm:mb-6 transform hover:scale-105 transition-all duration-300"
												aria-label="Play video demo">
												<div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-white/90 dark:bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl group-hover:bg-white transition-colors">
													<Icon
														name="Play"
														size={20}
														className="text-primary dark:text-white ml-0.5 sm:ml-1 sm:w-6 sm:h-6 lg:w-8 lg:h-8"
													/>
												</div>
											</button>
											<div className="text-white">
												<h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2">
													See Quote Generation in Action
												</h3>
												<p className="text-white/80 text-sm sm:text-base lg:text-lg px-2 sm:px-4 lg:px-0">
													Watch how we transform hours of work into minutes
												</p>
											</div>
										</div>

										{/* Video timeline simulation */}
										<div className="absolute bottom-2 sm:bottom-3 lg:bottom-4 left-2 sm:left-3 lg:left-4 right-2 sm:right-3 lg:right-4">
											<div className="flex items-center space-x-1.5 sm:space-x-2 lg:space-x-3">
												<button className="text-white/60 hover:text-white transition-colors p-1">
													<Icon
														name="Play"
														size={12}
														className="sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4"
													/>
												</button>
												<div className="flex-1 bg-white/20 rounded-full h-0.5 sm:h-1">
													<div
														className="bg-primary h-full rounded-full"
														style={{ width: "54%" }}></div>
												</div>
												<button className="text-white/60 hover:text-white transition-colors p-1 hidden md:block">
													<Icon
														name="Volume2"
														size={12}
														className="sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4"
													/>
												</button>
												<button className="text-white/60 hover:text-white transition-colors p-1 hidden md:block">
													<Icon
														name="Settings"
														size={12}
														className="sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4"
													/>
												</button>
												<button className="text-white/60 hover:text-white transition-colors p-1">
													<Icon
														name="Maximize"
														size={12}
														className="sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4"
													/>
												</button>
											</div>
										</div>
									</div>
								) : (
									// YouTube video embed - no custom UI overlay
									<iframe
										className="w-full h-full"
										src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&mute=1&rel=0&modestbranding=1&controls=1`}
										title="Quote Generation Demo"
										frameBorder="0"
										allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
										allowFullScreen></iframe>
								)}
							</div>
						</div>
					</div>

					<h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary mb-4 sm:mb-6 px-4 sm:px-0">
						Interactive Demo:{" "}
						<span className="text-primary dark:text-blue-600">Try It Yourself</span>
					</h2>
					<p className="text-lg sm:text-xl text-text-secondary max-w-3xl mx-auto px-4 sm:px-0">
						Experience how our platform transforms complex trademark research
						into professional quotes in under 2 minutes.
					</p>
				</div>

				{/* Benefits Section */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
					<div className="bg-white dark:bg-white/10 rounded-lg p-8 border border-border aspect-square flex flex-col justify-center text-center">
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

					<div className="bg-white dark:bg-white/10 rounded-lg p-8 border border-border aspect-square flex flex-col justify-center text-center">
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

					<div className="bg-white dark:bg-white/10 rounded-lg p-8 border border-border aspect-square flex flex-col justify-center text-center">
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
