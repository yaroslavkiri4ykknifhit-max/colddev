import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { Cases } from "@/components/cases"
import { Stats } from "@/components/stats"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import Strands from "@/components/ui/strands"
import GradualBlur from "@/components/ui/gradual-blur"

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none z-0 opacity-55">
        <Strands
          colors={["#7EBDC2", "#BB4430", "#BCBBB8"]}
          count={3}
          speed={0.4}
          amplitude={1.1}
          waviness={1.0}
          thickness={0.8}
          glow={2.0}
          taper={3.0}
          spread={1.2}
          intensity={0.5}
          saturation={1.2}
          opacity={1.0}
          scale={1.4}
          glass={false}
        />
      </div>
      
      <GradualBlur preset="page-header" />
      <GradualBlur preset="page-footer" />
      
      <div className="relative z-10">
        <Header />
        <Hero />
        <Services />
        <Stats />
        <Cases />
        <Contact />
        <Footer />
      </div>
    </main>
  )
}
