"use client"

import { useRef, type PointerEvent as ReactPointerEvent, type ReactNode } from "react"

/** Kartu yang ikut miring 3D mengikuti posisi kursor. */
export function TiltCard({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement | null>(null)

  const onMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const tx = ((e.clientX - r.left) / r.width) * 2 - 1
    const ty = ((e.clientY - r.top) / r.height) * 2 - 1
    el.style.transform = `perspective(900px) rotateX(${(ty * -8).toFixed(2)}deg) rotateY(${(tx * 8).toFixed(2)}deg)`
  }
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)"
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`transition-transform duration-300 ease-out [transform-style:preserve-3d] ${className}`}
    >
      {children}
    </div>
  )
}
