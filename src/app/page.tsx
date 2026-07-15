import Header from "@/components/Header";
import Hero from "@/components/Hero";
import LogoMarquee from "@/components/LogoMarquee";
import BenefitsBento from "@/components/BenefitsBento";
import Projects from "@/components/Projects";
import Results from "@/components/Results";
import WorkProcess from "@/components/WorkProcess";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import GridBackground from "@/components/GridBackground";

export default function Home() {
  return (
    <>
      {/* Background Graphic elements */}
      <GridBackground />
      
      {/* Noise texture overlay */}
      <div className="noise-overlay" />

      {/* Main Layout Container */}
      <div className="relative min-h-screen flex flex-col overflow-x-hidden selection:bg-white selection:text-black">
        {/* Floating Header */}
        <Header />

        {/* Sections */}
        <main className="flex-1 w-full max-w-[1200px] mx-auto px-4 relative z-10">
          <Hero />
          <LogoMarquee />
          <BenefitsBento />
          <Projects />
          <Results />
          <WorkProcess />
          <Pricing />
          <Testimonials />
          <FAQ />
          <FinalCTA />
        </main>

        {/* Global Footer */}
        <Footer />
      </div>
    </>
  );
}
