"use client"

import { useEffect, useRef, useState } from "react"
import { ShinyButton } from "@/components/ui/shiny-button"
import { HERO_VIDEOS } from "@/lib/site"

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))

/**
 * Hero 3D gaya Iron Man: tiga video di-seek mengikuti posisi scroll di dalam
 * bagian yang ditempel (sticky). Video aktif ditampilkan, yang lain dijeda.
 * Perspektif, zoom, dan parallax mouse diatur lewat CSS variable.
 */
export function HeroVideo() {
  const heroRef = useRef<HTMLElement | null>(null)
  const sceneRef = useRef<HTMLDivElement | null>(null)
  const textRef = useRef<HTMLDivElement | null>(null)
  const hintRef = useRef<HTMLParagraphElement | null>(null)
  const fillRef = useRef<HTMLSpanElement | null>(null)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const [loadPct, setLoadPct] = useState(0)

  useEffect(() => {
    const hero = heroRef.current
    const scene = sceneRef.current
    const text = textRef.current
    const hint = hintRef.current
    const fill = fillRef.current
    const videos = videoRefs.current.filter(Boolean) as HTMLVideoElement[]
    if (!hero || !scene || !text || !hint || !fill || videos.length !== HERO_VIDEOS.length) return

    let disposed = false
    let ticking = false
    let pointerX = 0
    let pointerY = 0
    let activeIndex = -1
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    // Rentang progres scroll untuk tiap video.
    let cursor = 0
    const ranges = HERO_VIDEOS.map((v) => {
      const range = { start: cursor, end: cursor + v.share }
      cursor += v.share
      return range
    })

    // Seek hanya saat video tidak sedang seek; nilai terakhir disimpan.
    const pending: (number | null)[] = videos.map(() => null)
    const seekTo = (i: number, time: number) => {
      const v = videos[i]
      if (v.seeking) {
        pending[i] = time
        return
      }
      if (Math.abs(v.currentTime - time) > 0.02) v.currentTime = time
    }

    const ready = new Set<number>()
    const markReady = (i: number) => {
      ready.add(i)
      if (!disposed) setLoadPct(Math.round((ready.size / videos.length) * 100))
    }

    videos.forEach((v, i) => {
      v.muted = true // React tidak selalu menerapkan atribut muted ke elemen video
      v.addEventListener("loadeddata", () => markReady(i))
      v.addEventListener("error", () => markReady(i)) // satu video rusak tidak menahan halaman
      v.addEventListener("seeked", () => {
        const t = pending[i]
        if (t !== null) {
          pending[i] = null
          seekTo(i, t)
        }
      })
    })

    const update = () => {
      ticking = false
      const rect = hero.getBoundingClientRect()
      const scrollable = hero.offsetHeight - window.innerHeight
      const progress = scrollable <= 0 ? 0 : clamp(-rect.top / scrollable, 0, 1)

      let idx = ranges.findIndex((r) => progress < r.end)
      if (idx < 0) idx = videos.length - 1
      const r = ranges[idx]
      const local = clamp((progress - r.start) / (r.end - r.start), 0, 1)

      if (idx !== activeIndex) {
        activeIndex = idx
        videos.forEach((v, i) => {
          v.style.opacity = i === idx ? "1" : "0"
          if (i !== idx) v.pause()
        })
      }
      const active = videos[idx]
      if (Number.isFinite(active.duration) && active.duration > 0) {
        seekTo(idx, local * active.duration)
      }

      const zoom = 1.12 - 0.12 * progress
      scene.style.setProperty("--zoom", zoom.toFixed(4))
      scene.style.setProperty("--rx", `${reduceMotion ? 0 : (pointerY * -3).toFixed(2)}deg`)
      scene.style.setProperty("--ry", `${reduceMotion ? 0 : (pointerX * 4).toFixed(2)}deg`)

      const fade = clamp(1 - progress / 0.12, 0, 1)
      text.style.opacity = fade.toFixed(3)
      text.style.transform = `translate(-50%, ${((1 - fade) * -24).toFixed(1)}px)`
      hint.style.opacity = progress > 0.02 ? "0" : ""
      fill.style.transform = `scaleX(${progress.toFixed(4)})`
    }

    const requestUpdate = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(update)
    }

    const onPointerMove = (e: PointerEvent) => {
      pointerX = (e.clientX / window.innerWidth) * 2 - 1
      pointerY = (e.clientY / window.innerHeight) * 2 - 1
      requestUpdate()
    }
    const onPointerLeave = () => {
      pointerX = 0
      pointerY = 0
      requestUpdate()
    }

    videos.forEach((v) => v.load())
    requestUpdate()
    window.addEventListener("scroll", requestUpdate, { passive: true })
    window.addEventListener("resize", requestUpdate)
    hero.addEventListener("pointermove", onPointerMove)
    hero.addEventListener("pointerleave", onPointerLeave)

    return () => {
      disposed = true
      window.removeEventListener("scroll", requestUpdate)
      window.removeEventListener("resize", requestUpdate)
      hero.removeEventListener("pointermove", onPointerMove)
      hero.removeEventListener("pointerleave", onPointerLeave)
    }
  }, [])

  const goToGallery = () => {
    document.getElementById("galeri")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section ref={heroRef} id="beranda" className="relative h-[320vh] max-md:h-[280vh]" aria-labelledby="hero-title">
      <div className="sticky top-0 h-screen overflow-hidden bg-black">
        <div
          ref={sceneRef}
          className="absolute inset-0 will-change-transform"
          style={{
            transformStyle: "preserve-3d",
            transform:
              "perspective(1400px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) scale(var(--zoom, 1.12))",
          }}
        >
          {HERO_VIDEOS.map((v, i) => (
            <video
              key={v.src}
              ref={(el) => {
                videoRefs.current[i] = el
              }}
              src={v.src}
              muted
              playsInline
              preload="auto"
              disablePictureInPicture
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300"
              style={{ opacity: i === 0 ? 1 : 0 }}
            />
          ))}
        </div>

        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 80% at 50% 10%, transparent 30%, rgba(30,21,16,0.5) 70%, rgba(30,21,16,0.92) 100%)",
          }}
          aria-hidden="true"
        />

        <div
          ref={textRef}
          className="absolute bottom-[16vh] left-1/2 w-[min(92vw,760px)] text-center [text-shadow:0_2px_24px_rgba(0,0,0,0.55)]"
          style={{ transform: "translate(-50%, 0)" }}
        >
          <p className="mb-2 text-xs tracking-[0.32em] text-sakura uppercase">Bini GW</p>
          <h1 id="hero-title" className="text-[clamp(2.6rem,8vw,6rem)] leading-none font-bold">
            Bini Alawi
          </h1>
          <p className="mx-auto mt-4 max-w-[46ch] text-lg text-soft">
            Selamat datang di Web My kisah. Ini My Kisah Gw.
          </p>
          <div className="mt-8 flex justify-center">
            <ShinyButton onClick={goToGallery}>Lihat Galeri</ShinyButton>
          </div>
        </div>

        <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm tracking-wider text-soft">
          {loadPct < 100 ? `Memuat ${loadPct}%` : ""}
        </p>
        <p
          ref={hintRef}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm tracking-wider text-soft transition-opacity duration-300"
        >
          <span className="block animate-pulse motion-reduce:animate-none">Scroll untuk melanjutkan</span>
        </p>
        <div className="absolute inset-x-0 bottom-0 h-[3px] bg-white/10">
          <span ref={fillRef} className="block h-full w-full origin-left bg-gradient-to-r from-sakura to-gold" style={{ transform: "scaleX(0)" }} />
        </div>
      </div>
    </section>
  )
}
