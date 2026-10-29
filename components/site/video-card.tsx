"use client"

import { useEffect, useRef } from "react"
import { TiltCard } from "@/components/site/tilt-card"

/** Kartu video bergerak: diputar saat terlihat, klik untuk putar/jeda, dan ikut miring 3D. */
export function VideoCard({
  src,
  poster,
  caption,
  portrait,
}: {
  src: string
  poster: string
  caption: string
  portrait: boolean
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!("IntersectionObserver" in window) || reduceMotion) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {})
        else video.pause()
      },
      { threshold: 0.4 },
    )
    io.observe(video)
    return () => io.disconnect()
  }, [])

  const toggle = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) video.play().catch(() => {})
    else video.pause()
  }

  return (
    <TiltCard className="group relative overflow-hidden rounded-[18px] bg-warm-2 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] ring-1 ring-cream/15">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        tabIndex={0}
        role="button"
        aria-label={`${caption}: putar atau jeda`}
        onClick={toggle}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            toggle()
          }
        }}
        className={
          portrait
            ? "aspect-[3/4] w-full cursor-pointer object-contain bg-warm-2"
            : "aspect-video w-full cursor-pointer object-cover transition-transform duration-500 group-hover:scale-105"
        }
      />
      <p className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-warm-bg/75 px-3 py-1 text-sm text-cream backdrop-blur-sm">
        {caption}
      </p>
    </TiltCard>
  )
}
