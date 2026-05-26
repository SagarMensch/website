import { useState, useEffect } from 'react'

const NAV_LINKS = [
  { label: 'Shift', href: '#shift' },
  { label: 'Graph', href: '#graph' },
  { label: 'Layer', href: '#layer' },
  { label: 'Grid', href: '#grid' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-white/5 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(10,10,10,0.95)' : 'rgba(10,10,10,0.85)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5">
          <div className="w-2 h-2 rounded-full bg-green-500 node-glow"></div>
          <span className="font-geist text-sm font-medium tracking-tight text-white">SequelString AI</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs font-medium tracking-wide uppercase text-stone-500 hover:text-white transition-colors duration-150"
            >
              {link.label}
            </a>
          ))}
        </div>
        <a
          href="#contact"
          className="text-xs font-medium tracking-wide uppercase bg-white text-black px-5 py-2 rounded-full hover:bg-stone-200 transition-colors duration-150"
        >
          Get Started
        </a>
      </div>
    </nav>
  )
}
