import { useMemo, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { Line } from '@react-three/drei';
import { timelineConfig } from '../config/timelineConfig';

interface TimelinePathProps {
  points: THREE.Vector3[];
  progress: number;
}

export default function TimelinePath({ points, progress }: TimelinePathProps) {
  const coreRef = useRef<any>(null);
  const glowRef = useRef<any>(null);

  useEffect(() => {
    // Force lines to render first, safely avoiding TypeScript prop errors on the Line component
    if (coreRef.current) coreRef.current.renderOrder = -10;
    if (glowRef.current) glowRef.current.renderOrder = -10;
  }, []);

  const visiblePoints = useMemo(() => {
    const count = Math.max(2, Math.floor(points.length * progress));
    return points.slice(0, count);
  }, [points, progress]);

  if (visiblePoints.length < 2) return null;

  const { coreLine, glowLine } = timelineConfig.path;

  return (
    <group>
      {/* Core bright line */}
      <Line
        ref={coreRef}
        points={visiblePoints}
        color={coreLine.color}
        lineWidth={coreLine.thickness}
        transparent
        opacity={coreLine.opacity}
        depthTest={true}
      />
      {/* Outer glow line */}
      <Line
        ref={glowRef}
        points={visiblePoints}
        color={glowLine.color}
        lineWidth={glowLine.thickness}
        transparent
        opacity={glowLine.opacity}
        depthTest={true}
      />
    </group>
  );
}
