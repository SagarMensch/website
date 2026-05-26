import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CASES = [
  {
    number: '01',
    company: 'National Bank',
    industry: 'Banking',
    description: 'Implemented end-to-end document intelligence across loan processing, KYC verification, and compliance auditing.',
    metric: '73%',
    metricLabel: 'processing time reduction',
  },
  {
    number: '02',
    company: 'Global Manufacturer',
    industry: 'Manufacturing',
    description: 'Automated supplier document validation and compliance monitoring across 12 countries and 4,000+ vendors.',
    metric: '12',
    metricLabel: 'countries automated',
  },
  {
    number: '03',
    company: 'Healthcare Network',
    industry: 'Healthcare',
    description: 'Extracted structured clinical data from 2 million+ patient records for research and operational analytics.',
    metric: '2M+',
    metricLabel: 'records processed',
  },
  {
    number: '04',
    company: 'Insurance Giant',
    industry: 'Insurance',
    description: 'Transformed claims processing from manual review to AI-assisted decisioning with full audit trails.',
    metric: 'Hours',
    metricLabel: 'instead of days',
  },
]

export default function CaseStudies() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const section = sectionRef.current
    const wrapper = wrapperRef.current
    if (!section || !wrapper) return

    // Horizontal scroll
    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: () => '+=' + (wrapper.scrollWidth - window.innerWidth),
      pin: true,
      scrub: 1,
      anticipatePin: 1,
      onUpdate: (self) => {
        const translateX = -self.progress * (wrapper.scrollWidth - window.innerWidth)
        wrapper.style.transform = `translateX(${translateX}px)`
      }
    })

    // Card entrance stagger
    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[]
    gsap.fromTo(cards,
      { x: 100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none',
        }
      }
    )

    return () => {
      st.kill()
    }
  }, [])

  return (
    <section
      id="case-studies"
      ref={sectionRef}
      className="fade-up-section"
      style={{
        position: 'relative',
        height: '100vh',
        overflow: 'hidden',
        background: '#f5f5f5',
        cursor: 'grab',
      }}
    >
      {/* Section Header */}
      <div
        style={{
          position: 'absolute',
          top: '60px',
          left: '5vw',
          zIndex: 2,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontWeight: 500,
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: '#8a8a8a',
            display: 'block',
            marginBottom: '16px',
          }}
        >
          Scroll to explore
        </span>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 500,
            fontSize: 'clamp(2rem, 3.5vw, 4.5rem)',
            letterSpacing: '-0.02em',
            lineHeight: 1.05,
            color: '#0a0a0a',
            margin: 0,
          }}
        >
          Trusted by Industry Leaders
        </h2>
      </div>

      {/* Horizontal Cards Wrapper */}
      <div
        ref={wrapperRef}
        style={{
          display: 'flex',
          alignItems: 'center',
          height: '100%',
          paddingTop: '160px',
          paddingLeft: '5vw',
          gap: '40px',
          willChange: 'transform',
        }}
      >
        {CASES.map((item, i) => (
          <div
            key={item.number}
            ref={el => { cardsRef.current[i] = el }}
            style={{
              width: '500px',
              height: '520px',
              flexShrink: 0,
              background: '#ffffff',
              borderRadius: '4px',
              padding: '48px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              border: '1px solid #e0e0e0',
              position: 'relative',
              overflow: 'hidden',
              transition: 'transform 300ms ease, box-shadow 300ms ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)'
              e.currentTarget.style.boxShadow = '0 30px 80px rgba(0,0,0,0.1)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            {/* Background watermark number */}
            <span
              style={{
                position: 'absolute',
                top: '-20px',
                right: '20px',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '10rem',
                color: '#555555',
                opacity: 0.08,
                lineHeight: 1,
                userSelect: 'none',
              }}
            >
              {item.number}
            </span>

            {/* Top content */}
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 500,
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: '#ff0000',
                  display: 'block',
                  marginBottom: '16px',
                }}
              >
                {item.industry}
              </span>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 500,
                  fontSize: '2rem',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1,
                  color: '#0a0a0a',
                  margin: '0 0 20px 0',
                }}
              >
                {item.company}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 400,
                  fontSize: '1rem',
                  lineHeight: 1.6,
                  color: '#8a8a8a',
                  margin: 0,
                }}
              >
                {item.description}
              </p>
            </div>

            {/* Bottom metric */}
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '3rem',
                  letterSpacing: '-0.04em',
                  lineHeight: 0.85,
                  color: '#2ecc71',
                  marginBottom: '8px',
                }}
              >
                {item.metric}
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
                {item.metricLabel}
              </span>

              <a
                href="#"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginTop: '24px',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 500,
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: '#0a0a0a',
                  textDecoration: 'none',
                  position: 'relative',
                  width: 'fit-content',
                }}
                onMouseEnter={(e) => {
                  const underline = e.currentTarget.querySelector('.cs-underline') as HTMLElement
                  if (underline) underline.style.transform = 'scaleX(1)'
                  e.currentTarget.style.color = '#ff0000'
                }}
                onMouseLeave={(e) => {
                  const underline = e.currentTarget.querySelector('.cs-underline') as HTMLElement
                  if (underline) underline.style.transform = 'scaleX(0)'
                  e.currentTarget.style.color = '#0a0a0a'
                }}
              >
                Read Case Study
                <span
                  className="cs-underline"
                  style={{
                    position: 'absolute',
                    bottom: '-2px',
                    left: 0,
                    width: '100%',
                    height: '1px',
                    background: '#ff0000',
                    transform: 'scaleX(0)',
                    transformOrigin: 'left',
                    transition: 'transform 300ms ease-out',
                  }}
                />
                <span style={{ fontSize: '14px' }}>&rarr;</span>
              </a>
            </div>
          </div>
        ))}

        {/* End spacer */}
        <div style={{ width: '5vw', flexShrink: 0 }} />
      </div>
    </section>
  )
}
