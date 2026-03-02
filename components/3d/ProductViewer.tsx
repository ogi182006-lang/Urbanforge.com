"use client";

import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Float, PresentationControls } from "@react-three/drei";
import { motion } from "framer-motion";
import { Rotate3D } from "lucide-react";
import * as THREE from "three";

// Abstract 3D product shape (geometric representation)
function ProductShape({ color = "#00f0ff" }: { color?: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    const s = hovered ? 1.05 : 1;
    meshRef.current.scale.lerp(new THREE.Vector3(s, s, s), 0.1);
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        castShadow
      >
        <torusKnotGeometry args={[1, 0.32, 128, 32]} />
        <meshPhysicalMaterial
          color={color}
          metalness={0.8}
          roughness={0.1}
          transmission={0.1}
          thickness={0.5}
          envMapIntensity={1.5}
          emissive={color}
          emissiveIntensity={hovered ? 0.4 : 0.15}
        />
      </mesh>
    </Float>
  );
}

function FallbackBox({ color = "#00f0ff" }: { color?: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.4}>
      <mesh ref={meshRef}>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshPhysicalMaterial
          color={color}
          metalness={0.9}
          roughness={0.05}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
  );
}

interface ProductViewerProps {
  color?: string;
  shape?: "knot" | "box";
}

export default function ProductViewer({ color = "#00f0ff", shape = "knot" }: ProductViewerProps) {
  return (
    <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden glass">
      {/* 3D hint */}
      <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 glass px-2.5 py-1.5 rounded-xl text-xs text-white/40">
        <Rotate3D size={12} />
        Drag to rotate
      </div>

      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        shadows
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={1.5} color="#00f0ff" />
        <pointLight position={[-5, -5, -5]} intensity={0.8} color="#c300ff" />
        <spotLight position={[0, 10, 0]} angle={0.4} penumbra={1} intensity={1} castShadow />

        <PresentationControls
          global
          drag
          speed={2}
          polar={[-Math.PI / 3, Math.PI / 3]}
          azimuth={[-Math.PI / 1.5, Math.PI / 1.5]}
        >
          <Suspense fallback={<FallbackBox color={color} />}>
            {shape === "knot" ? (
              <ProductShape color={color} />
            ) : (
              <FallbackBox color={color} />
            )}
          </Suspense>
        </PresentationControls>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI - Math.PI / 4}
        />

        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
