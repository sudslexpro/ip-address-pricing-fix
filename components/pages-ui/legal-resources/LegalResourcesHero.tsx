import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const LegalResourcesHero: React.FC = () => {
	return (
		<section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 via-background to-accent/5">
			<div className="max-w-7xl mx-auto">
				<div className="text-center">
					<h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
						Legal Resources
						<span className="block text-primary">Knowledge Hub</span>
					</h1>
					<p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
						Access comprehensive legal resources, templates, and tools to
						enhance your practice. Stay updated with the latest legal
						developments and best practices.
					</p>

					{/* Search Bar */}
					<div className="max-w-2xl mx-auto mb-12">
						<div className="relative">
							<Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
							<Input
								placeholder="Search legal resources, templates, guides..."
								className="pl-12 pr-4 py-3 text-lg h-14 rounded-xl border-2 border-border focus:border-primary"
							/>
							<Button className="absolute right-2 top-2 h-10 px-6 rounded-lg">
								Search
							</Button>
						</div>
					</div>

					{/* Quick Stats */}
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
						<div className="bg-card/50 backdrop-blur rounded-xl p-4 border border-border/50">
							<div className="text-2xl font-bold text-primary">284</div>
							<div className="text-sm text-muted-foreground">
								Total Resources
							</div>
						</div>
						<div className="bg-card/50 backdrop-blur rounded-xl p-4 border border-border/50">
							<div className="text-2xl font-bold text-primary">15K+</div>
							<div className="text-sm text-muted-foreground">Downloads</div>
						</div>
						<div className="bg-card/50 backdrop-blur rounded-xl p-4 border border-border/50">
							<div className="text-2xl font-bold text-primary">98%</div>
							<div className="text-sm text-muted-foreground">
								User Satisfaction
							</div>
						</div>
						<div className="bg-card/50 backdrop-blur rounded-xl p-4 border border-border/50">
							<div className="text-2xl font-bold text-primary">Weekly</div>
							<div className="text-sm text-muted-foreground">Updates</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default LegalResourcesHero;
