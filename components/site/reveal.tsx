"use client"

import { useEffect, useRef } from "react"

/** Membuat section masuk dengan efek 3D saat pertama kali terlihat. */
export function Reveal({
  id,
  className = "",
  children,
}: {
  id?: string
  className?: string
  children: React.ReactNode
}) {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!("IntersectionObserver" in window)) {
      el.classList.add("is-in")
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in")
            io.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.15 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section
      id={id}
      ref={ref}
      className={`reveal border-t border-cream/15 px-6 py-24 sm:px-10 md:py-32 ${className}`}
    >
      {children}
    </section>
  )
}
