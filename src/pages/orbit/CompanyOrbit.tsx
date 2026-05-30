import { useRef, useState, useMemo, useCallback } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

export interface MenuItem {
  image: string;
  link: string;
  title: string;
  description: string;
}

interface OrbitSceneProps {
  items: MenuItem[];
  onItemSelect: (item: MenuItem) => void;
}

const SPHERE_RADIUS = 2.35;
const ITEM_SIZE = 0.34;
const MIN_VISIBLE_ITEMS = 22;

const AUTO_ROTATION_SPEED = 0.18;
const DRAG_ROTATION_SPEED = 0.006;

/**
 * Higher value = fewer visible items.
 * This prevents front and back items from visually overriding each other.
 */
const FRONT_VISIBLE_THRESHOLD = 0.22;

function fibonacciSphere(count: number): [number, number, number][] {
  const points: [number, number, number][] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < count; i++) {
    const y = 1 - (2 * i + 1) / count;
    const radiusAtY = Math.sqrt(1 - y * y);
    const theta = goldenAngle * i;

    const x = Math.cos(theta) * radiusAtY;
    const z = Math.sin(theta) * radiusAtY;

    points.push([
      x * SPHERE_RADIUS,
      y * SPHERE_RADIUS * 0.82,
      z * SPHERE_RADIUS,
    ]);
  }

  return points;
}

interface GlobeItemProps {
  item: MenuItem;
  position: [number, number, number];
  circleRadius: number;
  sphereGroupRef: React.RefObject<THREE.Group>;
  onSelect: (item: MenuItem) => void;
}

function GlobeItem({
  item,
  position,
  circleRadius,
  sphereGroupRef,
  onSelect,
}: GlobeItemProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);

  const [hovered, setHovered] = useState(false);

  const currentOpacity = useRef(0);
  const currentScale = useRef(1);

  const { camera } = useThree();
  const texture = useTexture(item.image);

  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = true;

  const quaternion = useMemo(() => {
    const normal = new THREE.Vector3(
      position[0],
      position[1],
      position[2],
    ).normalize();

    const q = new THREE.Quaternion();
    q.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);

    return q;
  }, [position]);

  const handlePointerOver = useCallback(() => {
    if (!materialRef.current) return;
    if (materialRef.current.opacity < 0.65) return;

    setHovered(true);
    document.body.style.cursor = "pointer";
  }, []);

  const handlePointerOut = useCallback(() => {
    setHovered(false);
    document.body.style.cursor = "auto";
  }, []);

  const handleClick = useCallback(
    (event: { stopPropagation: () => void }) => {
      event.stopPropagation();

      if (!materialRef.current) return;
      if (materialRef.current.opacity < 0.65) return;

      onSelect(item);
    },
    [item, onSelect],
  );

  useFrame(() => {
    if (!meshRef.current || !materialRef.current || !sphereGroupRef.current) {
      return;
    }

    const cameraWorldPosition = new THREE.Vector3();
    camera.getWorldPosition(cameraWorldPosition);

    const itemWorldPosition = new THREE.Vector3();
    meshRef.current.getWorldPosition(itemWorldPosition);

    const sphereWorldPosition = new THREE.Vector3();
    sphereGroupRef.current.getWorldPosition(sphereWorldPosition);

    const outwardNormal = itemWorldPosition
      .clone()
      .sub(sphereWorldPosition)
      .normalize();

    const directionToCamera = cameraWorldPosition
      .clone()
      .sub(itemWorldPosition)
      .normalize();

    const dot = directionToCamera.dot(outwardNormal);

    /**
     * Only front-facing items are visible.
     * Backside and side-angle items are completely hidden.
     */
    let targetOpacity = 0;

    if (dot > FRONT_VISIBLE_THRESHOLD) {
      targetOpacity = THREE.MathUtils.smoothstep(
        dot,
        FRONT_VISIBLE_THRESHOLD,
        FRONT_VISIBLE_THRESHOLD + 0.18,
      );
    }

    currentOpacity.current = THREE.MathUtils.lerp(
      currentOpacity.current,
      targetOpacity,
      0.16,
    );

    materialRef.current.opacity = currentOpacity.current;

    /**
     * Important:
     * Fully disables hidden items so they do not override or receive clicks.
     */
    meshRef.current.visible = currentOpacity.current > 0.02;

    const frontAmount = THREE.MathUtils.clamp(dot, 0, 1);
    const perspectiveScale = 0.94 + frontAmount * 0.08;
    const hoverScale = hovered ? 1.06 : 1;

    const targetScale = perspectiveScale * hoverScale;

    currentScale.current = THREE.MathUtils.lerp(
      currentScale.current,
      targetScale,
      0.1,
    );

    meshRef.current.scale.setScalar(currentScale.current);

    if (currentOpacity.current <= 0.02 && hovered) {
      setHovered(false);
      document.body.style.cursor = "auto";
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      quaternion={quaternion}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <circleGeometry args={[circleRadius, 80]} />

      <meshBasicMaterial
        ref={materialRef}
        map={texture}
        transparent
        opacity={0}
        alphaTest={0.03}
        side={THREE.FrontSide}
        depthWrite={false}
        depthTest
        toneMapped={false}
      />
    </mesh>
  );
}

export default function OrbitScene({ items, onItemSelect }: OrbitSceneProps) {
  const sphereGroupRef = useRef<THREE.Group>(null);

  const isDragging = useRef(false);
  const lastPointer = useRef({ x: 0, y: 0 });
  const dragVelocity = useRef({ x: 0, y: 0 });

  const visibleItems = useMemo(() => {
    if (!items.length) return [];

    const total = Math.max(items.length, MIN_VISIBLE_ITEMS);

    return Array.from({ length: total }, (_, index) => {
      return items[index % items.length];
    });
  }, [items]);

  const positions = useMemo(() => {
    return fibonacciSphere(visibleItems.length);
  }, [visibleItems.length]);

  const onItemSelectRef = useRef(onItemSelect);
  onItemSelectRef.current = onItemSelect;

  const handlePointerDown = useCallback((event: any) => {
    event.stopPropagation();

    isDragging.current = true;
    lastPointer.current = {
      x: event.clientX,
      y: event.clientY,
    };

    dragVelocity.current = { x: 0, y: 0 };

    event.target.setPointerCapture?.(event.pointerId);
    document.body.style.cursor = "grabbing";
  }, []);

  const handlePointerMove = useCallback((event: any) => {
    if (!isDragging.current || !sphereGroupRef.current) return;

    event.stopPropagation();

    const deltaX = event.clientX - lastPointer.current.x;
    const deltaY = event.clientY - lastPointer.current.y;

    lastPointer.current = {
      x: event.clientX,
      y: event.clientY,
    };

    /**
     * Manual drag rotation.
     * Horizontal drag rotates Y.
     * Vertical drag rotates X.
     */
    sphereGroupRef.current.rotation.y += deltaX * DRAG_ROTATION_SPEED;
    sphereGroupRef.current.rotation.x += deltaY * DRAG_ROTATION_SPEED;

    /**
     * Clamp X rotation so the sphere does not flip awkwardly.
     */
    sphereGroupRef.current.rotation.x = THREE.MathUtils.clamp(
      sphereGroupRef.current.rotation.x,
      -0.65,
      0.65,
    );

    /**
     * Small inertia after release.
     */
    dragVelocity.current = {
      x: deltaX * DRAG_ROTATION_SPEED,
      y: deltaY * DRAG_ROTATION_SPEED,
    };
  }, []);

  const handlePointerUp = useCallback((event: any) => {
    event.stopPropagation();

    isDragging.current = false;
    event.target.releasePointerCapture?.(event.pointerId);

    document.body.style.cursor = "grab";
  }, []);

  const handlePointerLeave = useCallback(() => {
    isDragging.current = false;
    document.body.style.cursor = "auto";
  }, []);

  useFrame((_, delta) => {
    if (!sphereGroupRef.current) return;

    /**
     * Auto rotation continues like before.
     * It pauses only while actively dragging.
     */
    if (!isDragging.current) {
      sphereGroupRef.current.rotation.y += delta * AUTO_ROTATION_SPEED;

      /**
       * Smooth inertial movement after user releases cursor.
       */
      sphereGroupRef.current.rotation.y += dragVelocity.current.x;
      sphereGroupRef.current.rotation.x += dragVelocity.current.y;

      dragVelocity.current.x *= 0.92;
      dragVelocity.current.y *= 0.92;

      if (Math.abs(dragVelocity.current.x) < 0.0001) {
        dragVelocity.current.x = 0;
      }

      if (Math.abs(dragVelocity.current.y) < 0.0001) {
        dragVelocity.current.y = 0;
      }

      sphereGroupRef.current.rotation.x = THREE.MathUtils.clamp(
        sphereGroupRef.current.rotation.x,
        -0.65,
        0.65,
      );
    }
  });

  return (
    <group ref={sphereGroupRef}>
      {/*
        Invisible drag surface.
        This lets the user drag anywhere on the orbit area,
        not only directly on an image.
      */}
      <mesh
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerLeave={handlePointerLeave}
      >
        <sphereGeometry args={[SPHERE_RADIUS + 0.8, 48, 48]} />
        <meshBasicMaterial
          transparent
          opacity={0}
          depthWrite={false}
          depthTest={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      {visibleItems.map((item, index) => (
        <GlobeItem
          key={`${item.image}-${index}`}
          item={item}
          position={positions[index]}
          circleRadius={ITEM_SIZE}
          sphereGroupRef={sphereGroupRef}
          onSelect={onItemSelectRef.current}
        />
      ))}
    </group>
  );
}
