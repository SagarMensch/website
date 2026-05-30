import React, { useEffect, useState, useRef } from 'react';
import Scene from './components/Scene';
import './styles.css'; // Importing the required timeline CSS

interface TimelineGlobeProps {
  /** Height of the scrollable area (e.g. '400vh' for a long scroll) */
  scrollHeight?: string;
  /** Background color or styling for the container */
  className?: string;
}

export default function TimelineGlobe({ 
  scrollHeight = '400vh',
  className = "relative w-full bg-[#0a0a0a]" 
}: TimelineGlobeProps) {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      // Calculate scroll progress based on the component's position in the window
      const rect = containerRef.current.getBoundingClientRect();
      const elementTop = rect.top;
      const elementHeight = rect.height;
      const windowHeight = window.innerHeight;

      // Start progress when the top of the container hits the top of the viewport
      // End progress when the bottom of the container hits the bottom of the viewport
      const totalScrollableDistance = elementHeight - windowHeight;
      
      if (totalScrollableDistance <= 0) {
        setProgress(0);
        return;
      }

      // scrolled distance is how far the top has moved past the viewport top (negative value)
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
    <div ref={containerRef} className={className} style={{ height: scrollHeight }}>
      {/* 3D Scene Background (Fixed to screen while scrolling through the container) */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Title on the left */}
        <div className="absolute top-1/2 left-8 md:left-20 lg:left-32 -translate-y-1/2 z-10 pointer-events-none">
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white tracking-tight leading-tight">
            Our <br /> Journey
          </h2>
        </div>
        
        <Scene scrollProgress={progress} />
      </div>
    </div>
  );
}
