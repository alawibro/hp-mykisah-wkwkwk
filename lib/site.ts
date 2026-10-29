// Path aset ikut basePath saat deploy ke GitHub Pages (lihat next.config.ts).
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? ""
export const asset = (path: string) => `${BASE_PATH}${path}`

export const NAV = [
  { id: "Galeri", label: "Galeri" },
  { id: "JJ Foto", label: "JJ Foto" },
  { id: "Karyaku", label: "Karyaku" },
  { id: "kontak", label: "Kontak" },
] as const

// Tiga video hero, di-seek mengikuti scroll (gaya Iron Man).
// `share` = porsi scroll untuk tiap video, jumlahnya 1.
export const HERO_VIDEOS = [
  { src: asset("/videos/hero-a.mp4"), share: 142 / 616 }, // My Wallpaper
  { src: asset("/videos/hero-c.mp4"), share: 289 / 616 }, // Christmas Eve
  { src: asset("/videos/hero-d.mp4"), share: 185 / 616 }, // Sakura Whisper
] as const

// Semua foto di galeri bergerak. `portrait` = kartu 3:4 agar potret tidak terpotong.
export const GALLERY_VIDEOS = [
  { src: asset("/videos/portrait-profile.mp4"), poster: asset("/assets/profile-mahiru.jpg"), caption: "Portrait", portrait: true },
  { src: asset("/videos/portrait-wide.mp4"), poster: asset("/stills/portrait-wide.webp"), caption: "Portrait Lengkap", portrait: false },
  { src: asset("/videos/hero-a.mp4"), poster: asset("/stills/h1.webp"), caption: "My Wallpaper", portrait: false },
  { src: asset("/videos/hero-c.mp4"), poster: asset("/stills/h3.webp"), caption: "Christmas Eve", portrait: false },
  { src: asset("/videos/hero-d.mp4"), poster: asset("/stills/h5.webp"), caption: "Sakura Whisper", portrait: false },
]

// Slide morph: setiap slide adalah video yang terus bergerak.
export const MORPH_SLIDES = [
  { video: asset("/videos/portrait-wide.mp4"), src: asset("/stills/portrait-wide.webp"), alt: "Portrait Lengkap" },
  { video: asset("/videos/hero-a.mp4"), src: asset("/stills/h1.webp"), alt: "My Wallpaper" },
  { video: asset("/videos/hero-c.mp4"), src: asset("/stills/h3.webp"), alt: "Christmas Eve" },
  { video: asset("/videos/hero-d.mp4"), src: asset("/stills/h5.webp"), alt: "Sakura Whisper" },
]

export const STILLS = {
  myWallpaper: asset("/stills/h1.webp"),
  christmas: asset("/stills/h3.webp"),
  sakura: asset("/stills/h5.webp"),
}

export const PROJECTS = [
  {
    title: "Portofolio Title Screen",
    description: "Portofolio personal M. Baihaqi Alawi dalam pengalaman title screen interaktif.",
    stack: ["HTML", "CSS", "JavaScript"],
    demo: "https://alawibro.github.io/khusus-web-pc-laptop/",
  },
  {
    title: "Portofolio TKJ",
    description: "Portofolio pribadi M. Baihaqi Alawi dengan bagian tentang latar belakang TKJ.",
    stack: ["HTML", "CSS"],
    demo: "https://alawibro.github.io/khusus-pc-web/index.html",
  },
  {
    title: "Biodata Digital",
    description: "Halaman biodata pribadi M. Baihaqi Alawi dalam format web.",
    stack: ["HTML", "CSS"],
    demo: "https://alawibro.github.io/coba-hp-web/",
  },
  {
    title: "Persona 3 Reload Pause Menu",
    description: "Rekreasi piksel-sempurna dari menu jeda Persona 3 Reload, dibuat dengan HTML, CSS, dan JavaScript murni.",
    stack: ["HTML", "CSS", "JavaScript"],
    demo: "https://alawibro.github.io/hp-web-coba/",
  },
]

export const CONTACT = {
  email: "em.be.alawi@gmail.com",
  instagram: "https://instagram.com/alawi123",
  instagramHandle: "Alawi123",
}
