import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Particle {
  x: number
  y: number
  z: number
  zDir: number
  size: number
  speedX: number
  speedY: number
  angleX: number
  angleY: number
  oscillationOffset: number
  rgb: [number, number, number]
}

const STATISTICS = [
  { value: 10, suffix: 'M+', label: 'Documents Processed' },
  { value: 99.7, suffix: '%', label: 'Extraction Accuracy' },
  { value: 3, suffix: 'x', label: 'Faster Workflows' },
  { value: 50, suffix: '+', label: 'Enterprise Clients' },
]

export default function Statistics() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<(HTMLDivElement | null)[]>([])
  const particlesRef = useRef<Particle[]>([])
  const rafRef = useRef<number>(0)
  const isVisibleRef = useRef(false)

  const getBackgroundGradient = useCallback((time: number) => {
    const t = (time * 0.0001) % 1
    const stops = [
      { pos: 0.0, r: 21, g: 0, b: 80 },
      { pos: 0.25, r: 75, g: 0, b: 130 },
      { pos: 0.5, r: 20, g: 30, b: 130 },
      { pos: 0.75, r: 0, g: 60, b: 130 },
      { pos: 1.0, r: 21, g: 0, b: 80 },
    ]
    const idx = Math.floor(t * 4)
    const frac = t * 4 - idx
    const c1 = stops[idx]
    const c2 = stops[(idx + 1) % stops.length]
    const lerp = (a: number, b: number, f: number) => a + (b - a) * f
    return {
      r: Math.round(lerp(c1.r, c2.r, frac)),
      g: Math.round(lerp(c1.g, c2.g, frac)),
      b: Math.round(lerp(c1.b, c2.b, frac)),
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Initialize particles
    const particles: Particle[] = []
    const colors: [number, number, number][] = [
      [21, 0, 80], [75, 0, 130], [130, 0, 0], [0, 130, 60],
    ]
    for (let i = 0; i < 200; i++) {
      particles.push({
        x: (Math.random() - 0.5) * canvas.width * 2.4,
        y: (Math.random() - 0.5) * canvas.height * 2.4,
        z: Math.random() * 2 - 1,
        zDir: Math.random() > 0.5 ? 1 : -1,
        size: 3 + Math.random() * 27,
        speedX: 0.1 + Math.random() * 0.5,
        speedY: 0.1 + Math.random() * 0.5,
        angleX: Math.random() * Math.PI * 2,
        angleY: Math.random() * Math.PI * 2,
        oscillationOffset: Math.random() * Math.PI * 2,
        rgb: colors[Math.floor(Math.random() * colors.length)],
      })
    }
    particlesRef.current = particles

    const fov = 400

    const updateParticle = (p: Particle, time: number, w: number, h: number) => {
      const angleX = p.angleX + time * 0.0002
      const angleY = p.angleY + time * 0.0003
      p.x += Math.cos(angleX) * p.speedX
      p.y += Math.sin(angleY) * p.speedY

      const minX = -w * 1.2
      const maxX = w * 1.2
      const minY = -h * 1.2
      const maxY = h * 1.2

      if (p.x > maxX) p.x = ((p.x - minX) % (maxX - minX)) + minX
      else if (p.x < minX) p.x = ((p.x + maxX) % (maxX - minX)) - maxX

      if (p.y > maxY) p.y = ((p.y - minY) % (maxY - minY)) + minY
      else if (p.y < minY) p.y = ((p.y + maxY) % (maxY - minY)) - maxY

      if (p.z > 1 || p.z < -1) p.zDir *= -1
      p.z += 0.01 * p.zDir
    }

    const drawParticle = (ctx: CanvasRenderingContext2D, p: Particle, time: number, w: number, h: number) => {
      const scale = fov / (fov - p.z * 200)
      const sx = w * 0.5 + p.x * scale
      const sy = h * 0.5 + p.y * scale
      let size = p.size * scale

      const oscillation = 1 + Math.sin(time * 0.001 + p.oscillationOffset) * 0.2
      size *= oscillation

      if (sx < -size || sx > w + size || sy < -size || sy > h + size) return

      const gradient = ctx.createRadialGradient(sx, sy, 0, sx, sy, size)
      const [r, g, b] = p.rgb
      gradient.addColorStop(0, `rgba(${r},${g},${b},1)`)
      gradient.addColorStop(0.3, `rgba(${r},${g},${b},0.8)`)
      gradient.addColorStop(1, `rgba(${r},${g},${b},0)`)

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(sx, sy, size, 0, Math.PI * 2)
      ctx.fill()

      // Specular highlight
      const specSize = size * 0.15
      const specAngle = time * 0.001 + p.oscillationOffset
      const specX = sx + Math.cos(specAngle) * size * 0.4
      const specY = sy + Math.sin(specAngle) * size * 0.4

      ctx.fillStyle = 'rgba(255,255,255,0.8)'
      ctx.beginPath()
      ctx.arc(specX, specY, specSize, 0, Math.PI * 2)
      ctx.fill()
    }

    let time = 0
    const animate = () => {
      rafRef.current = requestAnimationFrame(animate)
      if (!isVisibleRef.current) return

      time += 16
      const w = canvas.width
      const h = canvas.height

      // Background gradient
      const bg = getBackgroundGradient(time)
      ctx.fillStyle = `rgb(${bg.r},${bg.g},${bg.b})`
      ctx.fillRect(0, 0, w, h)

      // Color disc overlay
      const cx = w / 2 + Math.sin(time * 0.0001) * 200
      const cy = h / 2 + Math.cos(time * 0.0002) * 200
      const discGradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(w, h) * 0.8)
      const hue = (time * 0.01) % 360
      discGradient.addColorStop(0, `hsla(${hue}, 70%, 50%, 0.3)`)
      discGradient.addColorStop(1, `hsla(${(hue + 180) % 360}, 70%, 50%, 0)`)
      ctx.fillStyle = discGradient
      ctx.fillRect(0, 0, w, h)

      // Draw particles
      const particles = particlesRef.current
      for (const p of particles) {
        updateParticle(p, time, w, h)
        drawParticle(ctx, p, time, w, h)
      }
    }

    animate()

    // IntersectionObserver for visibility
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
      observer.disconnect()
    }
  }, [getBackgroundGradient])

  // Counter animation
  useEffect(() => {
    const statEls = statsRef.current.filter(Boolean) as HTMLDivElement[]

    statEls.forEach((el) => {
      const numEl = el.querySelector('.stat-number') as HTMLElement
      const valueStr = el.dataset.value
      if (!numEl || !valueStr) return

      const targetValue = parseFloat(valueStr)
      const isDecimal = targetValue % 1 !== 0

      const obj = { val: 0 }
      gsap.to(obj, {
        val: targetValue,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        onUpdate: () => {
          if (isDecimal) {
            numEl.textContent = obj.val.toFixed(1)
          } else {
            numEl.textContent = Math.round(obj.val).toString()
          }
        }
      })
    })
  }, [])

  return (
    <section
      ref={sectionRef}
      className="fade-up-section"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Bokeh Particle Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
        }}
      />

      {/* Content Overlay */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          padding: '120px 5vw',
          width: '100%',
          maxWidth: '1440px',
          margin: '0 auto',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontWeight: 500,
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: '#ff0000',
            display: 'block',
            marginBottom: '48px',
          }}
        >
          Platform Impact
        </span>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '48px',
            marginBottom: '64px',
          }}
        >
          {STATISTICS.map((stat, i) => (
            <div
              key={stat.label}
              ref={el => { statsRef.current[i] = el }}
              data-value={stat.value}
              style={{
                borderLeft: '2px solid rgba(255,255,255,0.2)',
                paddingLeft: '24px',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: 'clamp(2rem, 5vw, 6rem)',
                  letterSpacing: '-0.04em',
                  lineHeight: 0.85,
                  color: '#ffffff',
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '4px',
                }}
              >
                <span className="stat-number">0</span>
                <span style={{ fontSize: '0.5em', opacity: 0.7 }}>{stat.suffix}</span>
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 500,
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: '#8a8a8a',
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px', flexWrap: 'wrap' }}>
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 400,
              fontSize: '1.25rem',
              color: '#ffffff',
            }}
          >
            See the platform in action
          </span>
          <a
            href="#contact"
            style={{
              display: 'inline-block',
              padding: '14px 36px',
              background: '#ff0000',
              color: '#ffffff',
              fontFamily: 'var(--font-display)',
              fontWeight: 500,
              fontSize: '1rem',
              textDecoration: 'none',
              borderRadius: '2px',
              transition: 'background 200ms ease',
            }}
            onMouseEnter={(e) => { (e.target as HTMLElement).style.background = '#c0392b' }}
            onMouseLeave={(e) => { (e.target as HTMLElement).style.background = '#ff0000' }}
          >
            Request Demo
          </a>
        </div>
      </div>
    </section>
  )
}
