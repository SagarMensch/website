import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'

gsap.registerPlugin(ScrollTrigger)

const CHARS = ['0', '1', '+', '.']

// Helper to create a texture for a single character
function createCharTexture(char: string) {
  const canvas = document.createElement('canvas')
  canvas.width = 64
  canvas.height = 64
  const ctx = canvas.getContext('2d')
  if (ctx) {
    ctx.fillStyle = 'transparent'
    ctx.fillRect(0, 0, 64, 64)
    ctx.font = 'bold 48px "JetBrains Mono", monospace'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    // White text with a slight green tint for the base color, we tint it via material color
    ctx.fillStyle = '#ffffff'
    ctx.fillText(char, 32, 32)
    
    // Add a slight glow
    ctx.shadowColor = '#22c55e'
    ctx.shadowBlur = 10
    ctx.fillText(char, 32, 32)
  }
  const texture = new THREE.CanvasTexture(canvas)
  return texture
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const heroContentRef = useRef<HTMLDivElement>(null)
  const scrollProgressRef = useRef(0)
  const mouseRef = useRef({ x: 0, y: 0 })
  const targetMouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Scene Setup
    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x0a0a0a, 0.015) // Fog matching background

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(0, 15, 30)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // Generate Geometries for each character
    const gridX = 100
    const gridZ = 100
    const spacing = 1.5

    const charPositions: number[][] = [[], [], [], []]
    const basePositions: { x: number, z: number, charIdx: number }[] = []

    for (let i = 0; i < gridX; i++) {
      for (let j = 0; j < gridZ; j++) {
        const x = (i - gridX / 2) * spacing
        const z = (j - gridZ / 2) * spacing
        const charIdx = Math.floor(Math.random() * CHARS.length)
        charPositions[charIdx].push(x, 0, z)
        basePositions.push({ x, z, charIdx })
      }
    }

    const pointClouds: THREE.Points[] = []
    const geometries: THREE.BufferGeometry[] = []

    CHARS.forEach((char, idx) => {
      const geometry = new THREE.BufferGeometry()
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(charPositions[idx], 3))
      
      const texture = createCharTexture(char)
      const material = new THREE.PointsMaterial({
        size: 1.2,
        map: texture,
        transparent: true,
        opacity: 0.8,
        color: 0x22c55e,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      })

      const points = new THREE.Points(geometry, material)
      scene.add(points)
      pointClouds.push(points)
      geometries.push(geometry)
    })

    // Tunnel Effect Lines
    const tunnelGroup = new THREE.Group()
    const tunnelMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0 })
    for (let i = 0; i < 20; i++) {
      const geometry = new THREE.EdgesGeometry(new THREE.CircleGeometry(5 + i * 2, 32))
      const circle = new THREE.LineSegments(geometry, tunnelMaterial.clone())
      circle.position.z = -i * 5
      tunnelGroup.add(circle)
    }
    scene.add(tunnelGroup)

    // Resize Handler
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', onWindowResize)

    // Mouse Handler
    const onMouseMove = (event: MouseEvent) => {
      targetMouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1
      targetMouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', onMouseMove)

    // Scroll Trigger
    const scrollTrigger = ScrollTrigger.create({
      trigger: '.hero-wrapper',
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        scrollProgressRef.current = self.progress
      }
    })

    // Animation Loop
    let time = 0
    let animationFrameId: number

    const animate = () => {
      time += 0.015
      
      // Smooth mouse interpolation
      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.05
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.05

      const scrollP = scrollProgressRef.current

      // Update Camera & Tunnel based on scroll
      // As user scrolls, camera flies into the matrix and tunnel appears
      camera.position.z = 30 - scrollP * 80
      camera.position.y = 15 - scrollP * 15
      camera.rotation.x = -Math.PI / 6 + scrollP * (Math.PI / 6) // look forward

      // Mouse Parallax
      camera.position.x += (mouseRef.current.x * 5 - camera.position.x) * 0.05

      // Tunnel animation
      tunnelGroup.position.z = camera.position.z - 10
      tunnelGroup.children.forEach((child, i) => {
        const mat = (child as THREE.LineSegments).material as THREE.LineBasicMaterial
        if (scrollP > 0.4) {
          const tP = (scrollP - 0.4) / 0.6
          mat.opacity = Math.min(0.3, tP) * (1 - i / 20)
          child.rotation.z = time * 0.2 + i * 0.1
        } else {
          mat.opacity = 0
        }
      })

      // Update Terrain Vertices
      const collapseFactor = Math.max(0, scrollP * 2) // terrain collapses as you scroll
      
      const posArrays = geometries.map(g => g.attributes.position.array as Float32Array)
      const counters = [0, 0, 0, 0]

      for (let i = 0; i < basePositions.length; i++) {
        const { x, z, charIdx } = basePositions[i]
        
        // Wave math
        const d = Math.sqrt(x*x + z*z)
        let y = Math.sin(x * 0.1 + time) * Math.cos(z * 0.1 + time) * 3
        y += Math.sin(d * 0.05 - time * 2) * 2

        // Collapse effect
        const dx = x * collapseFactor * 2
        const dz = z * collapseFactor * 2

        const idx = counters[charIdx] * 3
        posArrays[charIdx][idx] = x + dx
        posArrays[charIdx][idx + 1] = y - collapseFactor * 10
        posArrays[charIdx][idx + 2] = z + dz

        counters[charIdx]++
      }

      geometries.forEach((g, idx) => {
        g.attributes.position.needsUpdate = true
        // Change color based on depth to match original design (closer = green, further = white)
        const mat = pointClouds[idx].material as THREE.PointsMaterial
        if (scrollP > 0.3) {
           mat.opacity = 0.8 * (1 - (scrollP - 0.3) / 0.7) // Fade out terrain
        } else {
           mat.opacity = 0.8
        }
      })

      renderer.render(scene, camera)
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', onWindowResize)
      window.removeEventListener('mousemove', onMouseMove)
      scrollTrigger.kill()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [])

  // Hero text entrance animation
  useEffect(() => {
    const content = heroContentRef.current
    if (!content) return

    const tl = gsap.timeline({ delay: 0.3 })

    const fadeUps = content.querySelectorAll('.hero-anim')
    fadeUps.forEach((el, i) => {
      gsap.set(el, { opacity: 0, y: 20 })
      tl.to(el, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, i * 0.15)
    })
  }, [])

  return (
    <>
      {/* Three.js Container */}
      <div
        ref={containerRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />

      {/* Hero Content Overlay */}
      <div
        ref={heroContentRef}
        className="hero-content relative z-10 flex flex-col items-center justify-center w-full h-full pointer-events-none"
      >
        <div className="absolute top-24 left-8 w-12 h-12 border-l border-t border-white/5 z-10"></div>
        <div className="absolute top-24 right-8 w-12 h-12 border-r border-t border-white/5 z-10"></div>
        <div className="absolute bottom-8 left-8 w-12 h-12 border-l border-b border-white/5 z-10"></div>
        <div className="absolute bottom-8 right-8 w-12 h-12 border-r border-b border-white/5 z-10"></div>

        <div className="flex items-center justify-center gap-2 mb-6 hero-anim">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
            <span className="font-mono text-[10px] tracking-widest uppercase text-stone-300">SequelString Infrastructure</span>
        </div>

        <div className="text-center px-6 max-w-5xl mx-auto pointer-events-auto flex-1 flex flex-col justify-center">
            <h1 className="hero-title font-geist text-white hero-anim">
                Document as<br/>an Infrastructure
            </h1>
            <p className="mt-6 text-stone-200 font-normal text-base md:text-lg max-w-xl mx-auto leading-relaxed hero-anim">
                The intelligence layer that turns every file into structured data, verified evidence, searchable knowledge, and automated workflows.
            </p>
            <div className="mt-10 flex items-center justify-center gap-1 md:gap-2 hero-anim">
                <div className="flex items-center gap-1 md:gap-2">
                    <span className="font-mono text-[10px] tracking-wider text-stone-400 uppercase">file</span>
                    <div className="w-8 md:w-16 h-px bg-gradient-to-r from-stone-700 to-green-500/50"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500/60"></div>
                    <div className="w-8 md:w-16 h-px bg-gradient-to-r from-green-500/50 to-green-500/80"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500/80"></div>
                    <div className="w-8 md:w-16 h-px bg-green-500/80"></div>
                    <span className="font-mono text-[10px] tracking-wider text-green-400 uppercase">infrastructure</span>
                </div>
            </div>
        </div>
        
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 hero-anim">
            <span className="font-mono text-[9px] tracking-widest uppercase text-stone-400">scroll</span>
            <div className="w-px h-6 bg-gradient-to-b from-stone-500 to-transparent"></div>
        </div>
      </div>
    </>
  )
}
