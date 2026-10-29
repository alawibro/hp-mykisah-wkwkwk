"use client"

import { ShinyButton } from "@/components/ui/shiny-button"
import { CONTACT } from "@/lib/site"
import { Reveal } from "@/components/site/reveal"

export function Contact() {
  return (
    <Reveal id="kontak">
      <h2 className="mb-4 text-4xl font-bold sm:text-5xl">Kontak</h2>
      <div className="mb-8 h-[3px] w-14 bg-gradient-to-r from-sakura to-gold" />
      <p className="text-lg text-soft">Hubungi saya lewat Mesos di bawah ini.</p>
      <div className="mt-10 flex flex-wrap gap-6">
        <ShinyButton onClick={() => (window.location.href = `mailto:${CONTACT.email}`)}>
          Email: {CONTACT.email}
        </ShinyButton>
        <ShinyButton onClick={() => window.open(CONTACT.instagram, "_blank", "noopener,noreferrer")}>
          Instagram: {CONTACT.instagramHandle}
        </ShinyButton>
      </div>
    </Reveal>
  )
}
