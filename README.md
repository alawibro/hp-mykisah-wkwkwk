# Mahiru Shiina · My Kisah

Situs personal dibangun dengan Next.js (App Router, TypeScript, Tailwind CSS) dan komponen shadcn-style.

- Hero 3D: tiga video H.264 di-seek mengikuti scroll.
- Galeri: MorphGallery (WebGL) yang berpindah antar foto dengan efek noise.
- Tombol: ShinyButton.

## Jalankan lokal

```bash
npm install
npm run dev
```

Buka http://localhost:3000. Jangan membuka file HTML secara langsung dari folder (file://), karena WebGL Galeri butuh server.

## Deploy ke GitHub Pages

1. Buat repo baru di GitHub, misalnya `mahiru-web` (Public agar Pages gratis).
2. Push folder ini ke branch `main`.
3. Buka Settings → Pages, lalu pilih Source: **GitHub Actions**.
4. Setiap push ke `main` akan otomatis build dan deploy lewat `.github/workflows/deploy.yml`.

Situs akan tersedia di `https://USERNAME.github.io/NAMA-REPO/`.

Catatan: jika nama repo adalah `USERNAME.github.io`, hapus baris `NEXT_PUBLIC_BASE_PATH` di `deploy.yml`.

## Struktur

- `app/` — layout, halaman, font, dan CSS global
- `components/ui/` — `shiny-button.tsx`, `morph-gallery.tsx`
- `components/site/` — section situs (hero, galeri, project, kontak)
- `lib/site.ts` — data situs (galeri, project, kontak) dan helper path aset
- `public/videos/` — tiga video hero (H.264 1920×1080)
- `public/stills/` — still untuk galeri dan kartu demo
- `public/assets/` — foto profil

## Halaman demo komponen

Buka `/demo` (lokal: http://localhost:3000/demo) untuk melihat:
- `AnimatedShaderHero` — hero full-screen dengan shader WebGL2.
- `TextColor` — judul bergradien "Develop. Preview. Ship."
- `DestinationCard` — kartu dengan tombol suka (dipakai di halaman demo dengan foto Mahiru).

Komponen ada di `components/ui/`: `animated-shader-hero.tsx`, `text-color.tsx`, `card.tsx`.
Dependensi tambahan: `lucide-react`, `class-variance-authority`.
