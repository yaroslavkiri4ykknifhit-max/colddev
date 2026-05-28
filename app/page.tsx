import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { Cases } from "@/components/cases"
import { Stats } from "@/components/stats"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { GridBackground } from "@/components/grid-background"
import { ColdDevBackground } from "@/components/colddev-bg"

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <GridBackground />
      <ColdDevBackground />
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
