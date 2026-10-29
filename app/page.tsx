import { Topbar } from "@/components/site/topbar"
import { HeroVideo } from "@/components/site/hero-video"
import { Gallery } from "@/components/site/gallery"
import { Morph } from "@/components/site/morph"
import { Projects } from "@/components/site/projects"
import { Contact } from "@/components/site/contact"
import { ShaderBackground } from "@/components/ui/animated-shader-hero"

export default function Home() {
  return (
    <>
      <ShaderBackground />
      {/* Lapisan gelap tipis agar teks tetap terbaca di atas shader. */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-warm-bg/55" aria-hidden="true" />
      <Topbar />
      <main>
        <HeroVideo />
        <div className="mx-auto max-w-[1100px]">
          <Gallery />
          <Morph />
          <Projects />
          <Contact />
        </div>
      </main>
      <footer className="border-t border-cream/15 px-4 py-10 text-center text-sm text-soft">
        Mahiru Shiina · My Kisah
      </footer>
    </>
  )
}
