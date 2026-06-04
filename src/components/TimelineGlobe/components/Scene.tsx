import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float } from '@react-three/drei';
import * as THREE from 'three';
import Globe from './Globe';
import TimelinePath from './TimelinePath';
import MilestoneNode from './MilestoneNode';
import { timelineConfig } from '../config/timelineConfig';

interface SceneProps {
  scrollProgress: number;
}

function InnerScene({ scrollProgress }: SceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      // Spin the globe in the exact same direction as the line draws, 
      // matching the rotation speed exactly with the line's propagation speed
      const targetRotationY = scrollProgress * Math.PI * 2 * timelineConfig.path.turns*0.83;
      
      // Smoothly interpolate to the target rotation
      groupRef.current.rotation.y += (targetRotationY - groupRef.current.rotation.y) * 0.05;
      
      // Keep the static tilt on X and Z, but add slight ambient wobble to X
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.05 + timelineConfig.globe.tilt.x;
      groupRef.current.rotation.z = timelineConfig.globe.tilt.z;
    }
  });

  const { points, milestoneIndices } = useMemo(() => {
    const pts = [];
    const radius = timelineConfig.globe.radius + timelineConfig.path.radiusOffset;
    const turns = timelineConfig.path.turns;
    const totalPoints = timelineConfig.path.totalPoints;
    
    for (let i = 0; i <= totalPoints; i++) {
      const t = i / totalPoints;
      // Draw the spiral normally
      const angle = t * Math.PI * 2 * turns;
      
      // Calculate y position to wrap spirally around the sphere
      const yLimit = radius * timelineConfig.path.verticalSpread; 
      const y = yLimit - (t * yLimit * 2); 
      
      if (Math.abs(y) <= radius) {
        const r_xz = Math.sqrt(radius * radius - y * y);
        pts.push(new THREE.Vector3(Math.cos(angle) * r_xz, y, Math.sin(angle) * r_xz));
      }
    }

    // Since the globe perfectly rotates to face the camera, we can place milestones
    // across the ENTIRE spiral, allowing them to start hidden in the back and spin to the front!
    const milestones = timelineConfig.milestones.map((milestone, i) => {
      const fraction = milestone.progressOffset ?? ((i + 1) / (timelineConfig.milestones.length + 1));
      return Math.floor(fraction * (pts.length - 1));
    });
    
    return { points: pts, milestoneIndices: milestones };
  }, []);

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
      <spotLight position={[-10, -10, 10]} intensity={3} color="#0099ff" />
      
      {/* Shift the entire globe down inside the full-screen canvas to clear the Title */}
      <group ref={groupRef} position={[0, -0.5, 0]}>
        <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
          <Globe />
          <TimelinePath points={points} progress={scrollProgress} />
          
          {milestoneIndices.map((index, i) => {
            const pointProgress = index / points.length;
            const nextPointProgress = i < milestoneIndices.length - 1 
              ? milestoneIndices[i+1] / points.length 
              : 1.1; 
              
            // Now the node exactly glows when the line crosses it, and because 
            // the offset matches the text, the text is perfectly synced too!
            const reached = scrollProgress >= pointProgress;
            const active = reached && scrollProgress < nextPointProgress;
            
            return (
              <MilestoneNode key={i} position={points[index]} active={active} reached={reached} title={timelineConfig.milestones[i].title} />
            );
          })}
        </Float>
      </group>
      
      <Environment preset="city" />
    </>
  );
}

export default function Scene({ scrollProgress }: SceneProps) {
  return (
    <div className="w-full h-full absolute inset-0 z-0 bg-transparent" style={{ pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <InnerScene scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}
