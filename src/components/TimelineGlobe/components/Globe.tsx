import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { timelineConfig } from '../config/timelineConfig';

export default function Globe() {
  const globeRef = useRef<THREE.Group>(null);
  const { globe } = timelineConfig;

  useFrame(() => {
    if (globeRef.current && globe.rotates) {
      // Continuous slow rotation for 'segment' mode
      globeRef.current.rotation.y += 0.0005;
    }
  });

  // Generate perfect 1px lines for Latitude and Longitude using useMemo
  const { latitudes, longitudes } = useMemo(() => {
    const lats = [];
    const latCount = globe.gridLines?.lat || 12;
    for (let i = 1; i < latCount; i++) {
      const phi = (Math.PI * i) / latCount;
      const y = Math.cos(phi) * globe.radius;
      const r = Math.sin(phi) * globe.radius;
      const pts = [];
      for (let j = 0; j <= 64; j++) {
        const theta = (j / 64) * Math.PI * 2;
        pts.push(new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r));
      }
      lats.push(new THREE.BufferGeometry().setFromPoints(pts));
    }

    const longs = [];
    const longCount = globe.gridLines?.long || 24;
    for (let i = 0; i < longCount; i++) {
      const theta = (Math.PI * i) / longCount; // Only need half since ring spans both sides
      const pts = [];
      for (let j = 0; j <= 64; j++) {
        const phi = (j / 64) * Math.PI * 2; // Full circle
        const y = Math.cos(phi) * globe.radius;
        const r = Math.sin(phi) * globe.radius;
        pts.push(new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r));
      }
      longs.push(new THREE.BufferGeometry().setFromPoints(pts));
    }
    
    return { latitudes: lats, longitudes: longs };
  }, [globe.radius, globe.gridLines]);

  return (
    <group ref={globeRef}>
      {/* Solid dark base sphere */}
      <Sphere args={[globe.radius, 64, 64]}>
        <meshStandardMaterial 
          color={globe.color}
          roughness={0.6}
          metalness={0.3}
        />
      </Sphere>
      
      {/* Custom Grid without diagonals using actual 1px lines */}
      <group>
        {/* Latitude Lines */}
        {latitudes.map((geom, i) => (
          <line key={`lat-${i}`} geometry={geom}>
            <lineBasicMaterial color={globe.gridColor} transparent opacity={globe.gridOpacity} />
          </line>
        ))}
        {/* Longitude Lines */}
        {longitudes.map((geom, i) => (
          <line key={`long-${i}`} geometry={geom}>
            <lineBasicMaterial color={globe.gridColor} transparent opacity={globe.gridOpacity} />
          </line>
        ))}
      </group>
    </group>
  );
}
