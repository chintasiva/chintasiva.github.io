import { useMemo, useRef } from "react";
import { Points, PointMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

function ParticlesBackground() {
  const ref = useRef();

  // Generate random positions once
  const particles = useMemo(() => {
    const positions = new Float32Array(5000 * 3); // 5000 particles
    for (let i = 0; i < positions.length; i++) {
      positions[i] = (Math.random() - 0.5) * 15; // spread wider in space
    }
    return positions;
  }, []);

  // Slowly rotate the particle field
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.05; // slow spin
    }
  });

  return (
    <group ref={ref}>
      <Points positions={particles} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.06}     // bigger size so it's visible
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export default ParticlesBackground;
