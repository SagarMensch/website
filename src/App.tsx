import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navigation from "./sections/Navigation";
import Hero from "./sections/Hero";
import Shift from "./sections/Shift";
import DocumentIsMore from "./sections/DocumentIsMore";
import Ontology from "./sections/Ontology";
import IntelligenceLayer from "./sections/IntelligenceLayer";
import Capabilities from "./sections/Capabilities";
import CTA from "./sections/CTA";
import Footer from "./sections/Footer";
import CompanyOrbitFunction from "./pages/orbit/Orbit";
import TimelineGlobe from "@/components/TimelineGlobe/index";
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "iconify-icon": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & { icon?: string; width?: string; height?: string };
    }
  }
}

gsap.registerPlugin(ScrollTrigger);

function Home() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero exit animation
    const heroContent = document.querySelector(".hero-content") as HTMLElement;
    if (heroContent) {
      ScrollTrigger.create({
        trigger: ".hero-wrapper",
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          if (progress > 0.5) {
            const fadeProgress = (progress - 0.5) / 0.5;
            heroContent.style.opacity = String(1 - fadeProgress);
          } else {
            heroContent.style.opacity = "1";
          }
        },
      });
    }

    // Intersection Observer for scroll animations (fade-up)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );

    const fadeUps = document.querySelectorAll(".fade-up");
    fadeUps.forEach((el) => observer.observe(el));

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={mainRef} className="antialiased">
      <Navigation />
      <div
        className="hero-wrapper"
        style={{ position: "relative", height: "150vh" }}
      >
        <Hero />
      </div>
      <main style={{ position: "relative", zIndex: 5, background: "#0a0a0a" }}>
        <TimelineGlobe />
        <DocumentIsMore />
        <Ontology />
        <IntelligenceLayer />
        <Capabilities />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/orbit" element={<CompanyOrbitFunction />} />
      </Routes>
    </Router>
  );
}
export default App;
