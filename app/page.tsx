import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { Cases } from "@/components/cases"
import { Stats } from "@/components/stats"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import LiquidChrome from "@/components/liquid-chrome"

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none z-0 opacity-55">
        <LiquidChrome
          baseColor={[0.12, 0.11, 0.12]}
          speed={0.4}
          amplitude={0.3}
          interactive={true}
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
