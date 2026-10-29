"use client"

import { useState } from "react"
import Hero from "@/components/ui/animated-shader-hero"
import { TextColor } from "@/components/ui/text-color"
import { DestinationCard } from "@/components/ui/card"
import { STILLS, asset } from "@/lib/site"

const CARDS = [
  { imageUrl: STILLS.myWallpaper, category: "Mahiru", title: "My Wallpaper" },
  { imageUrl: STILLS.christmas, category: "Mahiru", title: "Christmas Eve" },
  { imageUrl: STILLS.sakura, category: "Mahiru", title: "Sakura Whisper" },
]

export default function DemoPage() {
  const [liked, setLiked] = useState<boolean[]>(CARDS.map(() => false))

  const toggle = (i: number) =>
    setLiked((prev) => prev.map((v, idx) => (idx === i ? !v : v)))

  return (
    <main className="overflow-hidden">
      <Hero
        trustBadge={{ text: "My Kisah · Mahiru Shiina", icons: ["✨"] }}
        headline={{ line1: "Selamat Datang", line2: "di Kuil Mahiru" }}
        subtitle="Selamat datang di kuil kecil Mahiru. Ini My Kisah Gw."
        buttons={{
          primary: {
            text: "Lihat Kartu",
            onClick: () => document.getElementById("kartu")?.scrollIntoView({ behavior: "smooth" }),
          },
          secondary: {
            text: "Kembali ke Beranda",
            onClick: () => (window.location.href = asset("/")),
          },
        }}
      />

      <section className="bg-warm-bg py-16">
        <TextColor />
      </section>

      <section id="kartu" className="bg-warm-bg px-6 pb-24 pt-8">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {CARDS.map((card, i) => (
            <div key={card.title} className="h-[460px] w-full">
              <DestinationCard
                imageUrl={card.imageUrl}
                category={card.category}
                title={card.title}
                isLiked={liked[i]}
                onLike={() => toggle(i)}
                aria-label={`Kartu ${card.title}`}
              />
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
