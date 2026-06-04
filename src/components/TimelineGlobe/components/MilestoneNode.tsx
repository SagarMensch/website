import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Billboard } from '@react-three/drei';
import * as THREE from 'three';
import { timelineConfig } from '../config/timelineConfig';

interface MilestoneNodeProps {
  position: THREE.Vector3;
  active: boolean;
  reached: boolean;
  title: string;
}

export default function MilestoneNode({ position, active, reached, title }: MilestoneNodeProps) {
  const pulseRef = useRef<THREE.Mesh>(null);
  const { nodes } = timelineConfig;

  // Create a soft fuzzy dot texture for the "cloud" inactive state
  const cloudTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 64; 
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.8)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);
    }
    return new THREE.CanvasTexture(canvas);
  }, []);

  useFrame((state) => {
    if (active && pulseRef.current) {
      // Smooth continuous sine wave pulse between 0.8 and 1.0
      const s = 0.9 + Math.sin(state.clock.elapsedTime * 2.5) * 0.1;
      pulseRef.current.scale.set(s, s, 1);
      
      // Keep opacity steady so the pulse is clearly visible
      const mat = pulseRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.8;
    }
  });

  return (
    <group position={position}>
      {/* 2D Flat Marker (Billboard keeps it facing the camera perfectly) */}
      <Billboard>
        <group position={[0, 0, 0.1]}>
          {/* Animated Pulse Field - ONLY SHOWS WHEN ACTIVELY FOCUSED */}
          {active && (
            <mesh ref={pulseRef}>
              {/* 360 degree flat ring */}
              <ringGeometry args={[nodes.pulseRingSize * 0.8, nodes.pulseRingSize, 32]} />
              <meshBasicMaterial 
                color={nodes.emissiveColor} 
                transparent 
                opacity={0.6} 
                depthWrite={false}
                depthTest={true}
              />
            </mesh>
          )}

          {/* --- REACHED STATE --- */}
          {reached && (
            <>
              {/* Outer Static Halo for the glowing marker effect */}
              <mesh>
                <circleGeometry args={[nodes.activeSize * 2.0, 32]} />
                <meshBasicMaterial 
                  color={nodes.emissiveColor} 
                  transparent 
                  opacity={0.2} 
                  depthWrite={false}
                  depthTest={true}
                />
              </mesh>

              {/* Inner Solid Marker */}
              <mesh>
                <circleGeometry args={[nodes.activeSize, 32]} />
                <meshBasicMaterial 
                  color={nodes.activeColor} 
                  transparent={false}
                  depthWrite={true}
                  depthTest={true}
                />
              </mesh>
            </>
          )}

          {/* --- NOT REACHED STATE (CLOUD) --- */}
          {!reached && (
            <mesh>
              <planeGeometry args={[nodes.inactiveSize * 2.5, nodes.inactiveSize * 2.5]} />
              <meshBasicMaterial 
                map={cloudTexture}
                color={nodes.inactiveColor} 
                transparent
                opacity={0.3} // Soft transparent cloud
                depthWrite={false}
                depthTest={true}
              />
            </mesh>
          )}
        </group>
      </Billboard>
      
      {/* Floating Index Label - SHOWS FOR ALL REACHED NODES */}
      {reached && (
        <Html distanceFactor={5} zIndexRange={[50, 0]} position={[0, nodes.activeSize + 0.15, 0]} center transform={false}>
          <div 
            style={{
              backgroundColor: nodes.labelBg,
              color: active ? nodes.labelActiveColor : nodes.labelInactiveColor,
              fontSize: '4px', 
              padding: '2px 6px',   
              borderRadius: '999px',
              fontWeight: 'bold',
              transition: 'all 0.3s ease',
              whiteSpace: 'nowrap',
              border: active ? `0.5px solid ${nodes.emissiveColor}` : '0.5px solid transparent',
              boxShadow: active ? `0 0 5px ${nodes.emissiveColor}40` : 'none'
            }}
          >
            {title}
          </div>
        </Html>
      )}
    </group>
  );
}
