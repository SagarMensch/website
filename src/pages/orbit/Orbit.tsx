import { useState, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { motion, AnimatePresence } from "framer-motion";
import OrbitScene from "./CompanyOrbit";
import type { MenuItem } from "./CompanyOrbit";
import Navigation from "@/sections/Navigation";
import Footer from "@/sections/Footer";

const items: MenuItem[] = [
  {
    image: "https://picsum.photos/seed/neural/400/400?grayscale",
    link: "https://example.com/neural",
    title: "Neural Interface",
    description:
      "Advanced brain-computer interface enabling seamless human-AI collaboration through real-time neural signal processing and adaptive response algorithms.",
  },
  {
    image: "https://picsum.photos/seed/quantum/400/400?grayscale",
    link: "https://example.com/quantum",
    title: "Quantum Core",
    description:
      "Next-generation quantum computing architecture leveraging entanglement for exponential processing power in complex simulation environments.",
  },
  {
    image: "https://picsum.photos/seed/cipher/400/400?grayscale",
    link: "https://example.com/cipher",
    title: "Cipher Protocol",
    description:
      "Military-grade encryption framework utilizing post-quantum cryptographic algorithms for ultra-secure data transmission across distributed networks.",
  },
  {
    image: "https://picsum.photos/seed/synapse/400/400?grayscale",
    link: "https://example.com/synapse",
    title: "Synapse Engine",
    description:
      "High-performance neural rendering pipeline generating photorealistic environments in real-time using advanced ray-tracing techniques.",
  },
  {
    image: "https://picsum.photos/seed/nexus/400/400?grayscale",
    link: "https://example.com/nexus",
    title: "Nexus Grid",
    description:
      "Distributed computing mesh connecting edge devices into a unified processing network for collaborative AI inference at planetary scale.",
  },
  {
    image: "https://picsum.photos/seed/prism/400/400?grayscale",
    link: "https://example.com/prism",
    title: "Prism Analytics",
    description:
      "Real-time data visualization platform transforming raw telemetry into actionable insights through immersive 3D spatial dashboards.",
  },
  {
    image: "https://picsum.photos/seed/echo/400/400?grayscale",
    link: "https://example.com/echo",
    title: "Echo Chamber",
    description:
      "Adaptive acoustics modeling system simulating complex sound environments for spatial audio engineering and immersive experience design.",
  },
  {
    image: "https://picsum.photos/seed/forge/400/400?grayscale",
    link: "https://example.com/forge",
    title: "Forge System",
    description:
      "Automated build and deployment orchestration platform streamlining development workflows from code commit to production release.",
  },
  {
    image: "https://picsum.photos/seed/horizon/400/400?grayscale",
    link: "https://example.com/horizon",
    title: "Horizon AI",
    description:
      "Predictive intelligence platform forecasting market trends and user behavior patterns using multi-modal transformer architectures.",
  },
  {
    image: "https://picsum.photos/seed/vertex/400/400?grayscale",
    link: "https://example.com/vertex",
    title: "Vertex Shader",
    description:
      "GPU-accelerated geometry processing engine dynamically generating and tessellating complex 3D meshes for real-time visualization.",
  },
  {
    image: "https://picsum.photos/seed/atlas/400/400?grayscale",
    link: "https://example.com/atlas",
    title: "Atlas Protocol",
    description:
      "Unified API gateway providing seamless interoperability between disparate microservices through standardized protocol translation.",
  },
  {
    image: "https://picsum.photos/seed/catalyst/400/400?grayscale",
    link: "https://example.com/catalyst",
    title: "Catalyst Engine",
    description:
      "High-throughput event processing system handling millions of concurrent data streams with sub-millisecond latency guarantees.",
  },
  {
    image: "https://picsum.photos/seed/phantom/400/400?grayscale",
    link: "https://example.com/phantom",
    title: "Phantom Layer",
    description:
      "Zero-knowledge computation framework enabling secure multi-party computation without revealing underlying data to any participant.",
  },
  {
    image: "https://picsum.photos/seed/terra/400/400?grayscale",
    link: "https://example.com/terra",
    title: "Terra Forma",
    description:
      "Procedural terrain generation system creating photorealistic landscapes using fractal noise algorithms and satellite data integration.",
  },
  {
    image: "https://picsum.photos/seed/vector/400/400?grayscale",
    link: "https://example.com/vector",
    title: "Vector Space",
    description:
      "High-dimensional embedding platform mapping semantic relationships into navigable vector spaces for advanced similarity search.",
  },
  {
    image: "https://picsum.photos/seed/signal/400/400?grayscale",
    link: "https://example.com/signal",
    title: "Signal Flow",
    description:
      "Real-time data pipeline orchestration engine managing complex event-driven architectures with automatic failover and load balancing.",
  },
];

export default function CompanyOrbitFunction() {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const handleItemSelect = useCallback((item: MenuItem) => {
    setSelectedItem(item);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedItem(null);
  }, []);

  const handleVisitSite = useCallback(() => {
    if (!selectedItem?.link) return;
    window.open(selectedItem.link, "_blank");
  }, [selectedItem]);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navigation />

      <div className="relative h-screen overflow-hidden">
        <motion.div
          className="absolute inset-0"
          animate={{
            x: selectedItem ? "-30%" : "0%",
            scale: selectedItem ? 0.88 : 1,
          }}
          transition={{ type: "spring", stiffness: 70, damping: 18 }}
        >
          <Canvas
            orthographic
            camera={{
              position: [0, 0, 8],
              zoom: 145,
              near: 0.1,
              far: 100,
            }}
            gl={{
              alpha: true,
              antialias: true,
            }}
          >
            <OrbitScene items={items} onItemSelect={handleItemSelect} />
          </Canvas>
        </motion.div>

        <AnimatePresence>
          {selectedItem && (
            <motion.div
              className="absolute top-0 right-0 h-full z-10"
              style={{ width: "42%" }}
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 70, damping: 18 }}
            >
              <div className="h-full backdrop-blur-2xl bg-white/[0.03] border-l border-white/[0.08] flex flex-col relative px-14 py-24">
                <button
                  onClick={handleClose}
                  className="absolute top-6 right-6 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200 text-white text-lg cursor-pointer"
                  aria-label="Close"
                >
                  &#x2715;
                </button>

                <div className="flex-1 flex flex-col justify-center gap-8">
                  <div className="w-full flex justify-center">
                    <motion.img
                      src={selectedItem.image}
                      alt={selectedItem.title}
                      className="rounded-2xl max-h-[32vh] w-auto object-contain shadow-2xl"
                      initial={{ scale: 0.85, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.12, duration: 0.45 }}
                    />
                  </div>

                  <div className="flex flex-col gap-4">
                    <motion.h2
                      className="text-white font-black text-[2.8rem] leading-none tracking-tight"
                      initial={{ y: 24, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.18, duration: 0.4 }}
                    >
                      {selectedItem.title}
                    </motion.h2>

                    <motion.p
                      className="text-stone-400 text-base leading-relaxed max-w-sm"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.28, duration: 0.4 }}
                    >
                      {selectedItem.description}
                    </motion.p>

                    <motion.div
                      className="flex gap-3 mt-4"
                      initial={{ y: 16, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.38, duration: 0.4 }}
                    >
                      <button
                        onClick={handleVisitSite}
                        className="px-7 py-3 bg-[#00ffff] text-black font-semibold rounded-full hover:bg-white transition-colors duration-200 text-sm tracking-wide cursor-pointer"
                      >
                        Visit Site &#x2197;
                      </button>

                      <button
                        onClick={handleClose}
                        className="px-7 py-3 bg-white/10 text-white font-medium rounded-full hover:bg-white/20 transition-colors duration-200 text-sm tracking-wide cursor-pointer"
                      >
                        Close
                      </button>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Footer />
    </div>
  );
}
