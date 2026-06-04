import React, { useEffect, useState, useRef } from 'react';
import Scene from './components/Scene';
import './styles.css'; // Importing the required timeline CSS
import { timelineConfig } from './config/timelineConfig';

interface TimelineGlobeProps {
  /** Height of the scrollable area (e.g. '400vh' for a long scroll) */
  scrollHeight?: string;
  /** Background color or styling for the container */
  className?: string;
}

export default function TimelineGlobe({ 
  className = "relative w-full bg-[#0a0a0a]" 
}: TimelineGlobeProps) {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const elementTop = rect.top;
      const elementHeight = rect.height;
      const windowHeight = window.innerHeight;

      const totalScrollableDistance = elementHeight - windowHeight;
      if (totalScrollableDistance <= 0) {
        setProgress(0);
        return;
      }
      const scrolled = -elementTop;
      let currentProgress = scrolled / totalScrollableDistance;
      currentProgress = Math.min(Math.max(currentProgress, 0), 1);
      setProgress(currentProgress);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div ref={containerRef} className={className}>
      {/* Sticky background layer: contains the shifting Title and Globe */}
      <div className="sticky top-0 z-20 h-screen w-full overflow-hidden pointer-events-none">
        <div 
          className="relative w-full h-full transition-transform duration-75 ease-out"
          style={{ transform: `translateX(${-Math.min(progress / 0.15, 1) * 25}%)` }}
        >
          {/* 3D Globe takes full screen to prevent cropping */}
          <div className="absolute inset-0 pointer-events-none">
            <Scene scrollProgress={progress} />
          </div>

          {/* Title explicitly placed near top */}
          <div className="absolute top-16 md:top-24 z-10 w-full text-center">
            <h2 className="hero-title font-geist text-white text-3xl md:text-5xl lg:text-6xl leading-tight drop-shadow-2xl">
              Shift
            </h2>
          </div>
        </div>
      </div>

      {/* Foreground scrolling content layer */}
      <div className="relative z-10 w-full flex justify-end -mt-[100vh]">
        <div className="w-full md:w-1/2 flex flex-col pt-[120vh] pb-0 px-8 md:px-16 lg:px-24">
          {timelineConfig.milestones.map((milestone, i) => (
            <div key={i} data-index={i} className="milestone-text-block min-h-[80vh] flex flex-col justify-center mb-[20vh] last:mb-0">
              <h3 className="font-geist text-3xl font-medium text-white mb-6">{milestone.title}</h3>
              <div className="relative w-full max-w-sm lg:max-w-md aspect-video rounded-xl overflow-hidden mb-6 border border-white/10 shadow-lg">
                <img src={milestone.image} alt={milestone.title} className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                   <span className="font-mono text-[10px] tracking-widest uppercase text-white">{milestone.category}</span>
                </div>
              </div>
              <span className="font-mono text-sm tracking-widest uppercase text-stone-500 mb-4">{milestone.date}</span>
              <p className="text-stone-400 text-lg leading-relaxed">{milestone.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
