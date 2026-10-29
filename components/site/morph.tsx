"use client"

import MorphGallery from "@/components/ui/morph-gallery"
import { MORPH_SLIDES } from "@/lib/site"
import { Reveal } from "@/components/site/reveal"

export function Morph() {
  return (
    <Reveal id="morph">
      <h2 className="mb-4 text-4xl font-bold sm:text-5xl">JJ Foto</h2>
      <div className="mb-8 h-[3px] w-14 bg-gradient-to-r from-sakura to-gold" />
      <p className="mb-8 max-w-[60ch] text-lg text-soft">
        Foto 1 Ngebug anj, Yang Lain Aman NGEBUG 1 KNTL.
      </p>
      <div className="overflow-hidden rounded-[18px] ring-1 ring-cream/15">
        <MorphGallery items={MORPH_SLIDES} autoplay={6000} height="min(70vh, 640px)" className="!bg-transparent" />
      </div>
    </Reveal>
  )
}
