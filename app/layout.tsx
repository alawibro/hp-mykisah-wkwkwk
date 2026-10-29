import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"

const rodin = localFont({
  src: [
    { path: "./fonts/rodin-pro-db.otf", weight: "400", style: "normal" },
    { path: "./fonts/rodin-pro-ub.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-rodin",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Mahiru Shiina, My Kisah",
  description: "My Kisah, hub personal Mahiru Shiina.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={rodin.variable}>
      <body className="min-h-screen bg-warm-bg text-cream antialiased">{children}</body>
    </html>
  )
}
