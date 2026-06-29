import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { Cases } from "@/components/cases"
import { Stats } from "@/components/stats"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { GridBackground } from "@/components/grid-background"
import { ColdDevBackground } from "@/components/colddev-bg"
import SoftAurora from "@/components/soft-aurora"

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <GridBackground />
      <ColdDevBackground />
      <div className="fixed inset-0 pointer-events-none z-0 opacity-45">
        <SoftAurora
          speed={0.4}
          scale={1.2}
          brightness={0.8}
          color1="#7EBDC2"
          color2="#BB4430"
          enableMouseInteraction={true}
          mouseInfluence={0.2}
        />
      </div>
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
