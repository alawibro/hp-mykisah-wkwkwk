"use client"

import { useRef, type PointerEvent as ReactPointerEvent } from "react"
import { ShinyButton } from "@/components/ui/shiny-button"
import { PROJECTS } from "@/lib/site"
import { Reveal } from "@/components/site/reveal"

function ProjectCard({ title, description, stack, demo }: (typeof PROJECTS)[number]) {
  const ref = useRef<HTMLLIElement | null>(null)

  // Kartu ikut miring 3D mengikuti posisi pointer.
  const onMove = (e: ReactPointerEvent<HTMLLIElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const tx = ((e.clientX - r.left) / r.width) * 2 - 1
    const ty = ((e.clientY - r.top) / r.height) * 2 - 1
    el.style.transform = `perspective(900px) rotateX(${(ty * -7).toFixed(2)}deg) rotateY(${(tx * 7).toFixed(2)}deg)`
  }
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)"
  }

  return (
    <li
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="flex flex-col gap-3 rounded-[18px] border border-cream/15 bg-gradient-to-b from-warm-2 to-[#1a120d] p-6 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] transition-transform duration-300 ease-out [transform-style:preserve-3d]"
    >
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="flex-1 text-[0.95rem] text-soft">{description}</p>
      <ul className="flex flex-wrap gap-2" aria-label="Teknologi">
        {stack.map((tech) => (
          <li key={tech} className="rounded-full border border-sakura/40 px-2.5 py-0.5 text-xs text-sakura">
            {tech}
          </li>
        ))}
      </ul>
      <div className="mt-2">
        <ShinyButton onClick={() => window.open(demo, "_blank", "noopener,noreferrer")} className="!px-7 !py-3 !text-base">
          Demo
        </ShinyButton>
      </div>
    </li>
  )
}

export function Projects() {
  return (
    <Reveal id="project">
      <h2 className="mb-4 text-4xl font-bold sm:text-5xl">Karyaku</h2>
      <div className="mb-8 h-[3px] w-14 bg-gradient-to-r from-sakura to-gold" />
      <p className="max-w-[60ch] text-lg text-soft">
        Yang Di Bawah Ini Adalah Karyaku Yang Lain Jangan Lupa Buka.
      </p>
      <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((p) => (
          <ProjectCard key={p.title} {...p} />
        ))}
      </ul>
    </Reveal>
  )
}
