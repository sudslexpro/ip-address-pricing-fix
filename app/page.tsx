import FloatingCTA from "@/components/cta/FloatingCTA";
import QuickAccessMenu from "@/components/cta/QuickAccessMenu";
import LandingPage from "@/components/pages-ui/landing/LandingPage";

export default function Home() {
	return (
		<main>
			<div className={`min-h-screen bg-background`}>
				{/* Floating Elements */}
				<FloatingCTA />
        <QuickAccessMenu />
				<div>
					<LandingPage />
				</div>
			</div>
		</main>
	);
}
