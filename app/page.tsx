import LandingPage from "@/components/pages-ui/landing/LandingPage";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <div className={`min-h-screen bg-background`}><LandingPage /></div>
    </main>
  );
}
