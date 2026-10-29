"use client"

import { GALLERY_VIDEOS } from "@/lib/site"
import { Reveal } from "@/components/site/reveal"
import { VideoCard } from "@/components/site/video-card"

export function Gallery() {
  return (
    <Reveal id="galeri">
      <h2 className="mb-4 text-4xl font-bold sm:text-5xl">Galeri</h2>
      <div className="mb-8 h-[3px] w-14 bg-gradient-to-r from-sakura to-gold" />
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {GALLERY_VIDEOS.map((v) => (
          <li key={v.src + v.caption}>
            <VideoCard src={v.src} poster={v.poster} caption={v.caption} portrait={v.portrait} />
          </li>
        ))}
      </ul>
    </Reveal>
  )
}
