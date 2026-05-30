import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float } from '@react-three/drei';
import * as THREE from 'three';
import Globe from './Globe';
import TimelinePath from './TimelinePath';
import MilestoneNode from './MilestoneNode';
import MilestoneCard from './MilestoneCard';
import { timelineConfig } from '../config/timelineConfig';

interface SceneProps {
  scrollProgress: number;
}

function InnerScene({ scrollProgress }: SceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      if (timelineConfig.globe.rotates) {
        // Base rotation from scroll for 'segment' mode
        const targetRotationY = scrollProgress * Math.PI * 2.5;
        groupRef.current.rotation.y += (targetRotationY - groupRef.current.rotation.y) * 0.05;
        groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.05 + 0.1;
      } else {
        // Tilted stationary globe mimicking the Framer screenshot
        groupRef.current.rotation.x = timelineConfig.globe.tilt.x; 
        groupRef.current.rotation.y = timelineConfig.globe.tilt.y; 
        groupRef.current.rotation.z = timelineConfig.globe.tilt.z; 
      }
    }
  });

  const { points, milestoneIndices } = useMemo(() => {
    const pts = [];
    const radius = timelineConfig.globe.radius + timelineConfig.path.radiusOffset;
    const turns = timelineConfig.path.turns;
    const totalPoints = timelineConfig.path.totalPoints;
    
    for (let i = 0; i <= totalPoints; i++) {
      const t = i / totalPoints;
      const angle = t * Math.PI * 2 * turns;
      
      // Calculate y position to wrap spirally around the sphere
      // Using verticalSpread to control how steep the angle is
      const yLimit = radius * timelineConfig.path.verticalSpread; 
      const y = yLimit - (t * yLimit * 2); 
      
      if (Math.abs(y) <= radius) {
        const r_xz = Math.sqrt(radius * radius - y * y);
        pts.push(new THREE.Vector3(Math.cos(angle) * r_xz, y, Math.sin(angle) * r_xz));
      }
    }

    // Filter points to strictly those on the front hemisphere (user side)
    const frontIndices = [];
    for (let i = 0; i < pts.length; i++) {
      if (pts[i].z >= 0) {
        frontIndices.push(i);
      }
    }

    // Place milestones based on their manual progressOffset, mapped exclusively to front points
    const milestones = timelineConfig.milestones.map((milestone, i) => {
      // If progressOffset is defined, use it. Otherwise, space them evenly.
      const fraction = milestone.progressOffset ?? ((i + 1) / (timelineConfig.milestones.length + 1));
      
      // We map the fraction (0.0 to 1.0) into the array of front-facing indices
      // This strictly guarantees no node can ever appear on the back of the globe
      const indexIntoFront = Math.floor(fraction * (frontIndices.length - 1));
      return frontIndices[indexIntoFront];
    });
    
    return { points: pts, milestoneIndices: milestones };
  }, []);

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
      <spotLight position={[-10, -10, 10]} intensity={3} color="#0099ff" />
      
      <group ref={groupRef}>
        <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
          <Globe />
          <TimelinePath points={points} progress={scrollProgress} />
          
          {milestoneIndices.map((index, i) => {
            const pointProgress = index / points.length;
            // Determine next milestone's progress to know when to hide this one
            const nextPointProgress = i < milestoneIndices.length - 1 
              ? milestoneIndices[i+1] / points.length 
              : 1.1; // Beyond 1.0 so the last card stays active at the very bottom
              
            const reached = scrollProgress >= pointProgress;
            const active = reached && scrollProgress < nextPointProgress;
            
            return (
              <MilestoneNode key={i} position={points[index]} active={active} reached={reached} index={i}>
                <MilestoneCard data={timelineConfig.milestones[i]} active={active} />
              </MilestoneNode>
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
    <div className="w-full h-full absolute inset-0 z-0 bg-transparent" style={{ pointerEvents: 'auto' }}>
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <InnerScene scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}
