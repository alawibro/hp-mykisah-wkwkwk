import { NAV } from "@/lib/site"

export function Topbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between gap-4 bg-gradient-to-b from-warm-bg/85 to-transparent px-4 py-3.5 backdrop-blur-sm sm:px-10">
      <a href="#beranda" className="font-bold tracking-wide">
        Bini Alawi <span className="ml-1.5 font-normal text-sakura max-sm:hidden">My Kisah</span>
      </a>
      <nav aria-label="Menu utama">
        <ul className="flex flex-wrap gap-x-5 gap-y-1">
          {NAV.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} className="border-b border-transparent py-1 text-[0.95rem] text-soft transition-colors hover:border-sakura hover:text-cream">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
