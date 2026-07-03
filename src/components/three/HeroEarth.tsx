import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sparkles, Float, Sphere, Box, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

function Earth() {
  const earthRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (earthRef.current) {
      earthRef.current.rotation.y = state.clock.elapsedTime * 0.04;
    }
  });

  return (
    <Sphere ref={earthRef} args={[1.5, 64, 64]}>
      <MeshTransmissionMaterial 
        backside
        backsideThickness={4}
        thickness={1.5}
        chromaticAberration={0.03}
        anisotropy={0.8}
        distortion={0.08}
        distortionScale={0.3}
        temporalDistortion={0.05}
        clearcoat={1}
        clearcoatRoughness={0.1}
        transmission={0.95}
        opacity={0.85}
        transparent
        color="#1a3a8a"
        attenuationColor="#4F8CFF"
        attenuationDistance={8}
      />
    </Sphere>
  );
}

function SatellitesAndRing() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = Math.PI / 5;
      groupRef.current.rotation.z = -Math.PI / 14;
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.12;
    }
  });

  const orbitRadius = 2.8;

  return (
    <group ref={groupRef}>
      {/* Primary ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[orbitRadius, 0.008, 16, 120]} />
        <meshBasicMaterial color="#4F8CFF" transparent opacity={0.4} side={THREE.DoubleSide} />
      </mesh>
      
      {/* Secondary faint ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[orbitRadius + 0.06, 0.003, 16, 120]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.15} side={THREE.DoubleSide} />
      </mesh>

      {/* Satellite 1 */}
      <group position={[orbitRadius, 0, 0]}>
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.3}>
          <Box args={[0.4, 0.08, 0.18]} castShadow>
            <meshStandardMaterial color="#e8edf5" metalness={0.9} roughness={0.1} />
          </Box>
          <Box args={[0.12, 0.18, 0.22]} castShadow>
            <meshStandardMaterial color="#4F8CFF" emissive="#1F3A93" emissiveIntensity={0.6} />
          </Box>
        </Float>
      </group>
      
      {/* Satellite 2 */}
      <group position={[-orbitRadius * 0.7, 0, orbitRadius * 0.7]}>
        <Float speed={2} rotationIntensity={0.4} floatIntensity={0.3}>
          <Box args={[0.3, 0.06, 0.15]} castShadow>
            <meshStandardMaterial color="#e8edf5" metalness={0.85} roughness={0.15} />
          </Box>
          <Box args={[0.1, 0.14, 0.18]} castShadow>
            <meshStandardMaterial color="#e8edf5" emissive="#ffffff" emissiveIntensity={0.3} />
          </Box>
        </Float>
      </group>

      {/* Satellite 3 — tiny */}
      <group position={[0, 0, -orbitRadius]}>
        <Float speed={2.5} rotationIntensity={0.2} floatIntensity={0.2}>
          <Box args={[0.2, 0.05, 0.1]} castShadow>
            <meshStandardMaterial color="#d0d8e8" metalness={0.9} roughness={0.1} />
          </Box>
        </Float>
      </group>
    </group>
  );
}

export default function HeroEarth() {
  const mouseGroup = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (mouseGroup.current) {
      const targetX = (state.pointer.x * Math.PI) / 14;
      const targetY = (state.pointer.y * Math.PI) / 14;
      
      mouseGroup.current.rotation.y = THREE.MathUtils.lerp(mouseGroup.current.rotation.y, targetX, 0.03);
      mouseGroup.current.rotation.x = THREE.MathUtils.lerp(mouseGroup.current.rotation.x, -targetY, 0.03);
    }
  });

  return (
    <group ref={mouseGroup}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[8, 8, 5]} intensity={1.8} color="#ffffff" />
      <directionalLight position={[-6, -4, -5]} intensity={0.6} color="#4F8CFF" />
      <pointLight position={[0, 0, 3]} intensity={0.4} color="#4F8CFF" />
      
      <Earth />
      <SatellitesAndRing />
      
      <Sparkles count={60} scale={8} size={0.8} speed={0.2} opacity={0.2} color="#4F8CFF" />
      <Sparkles count={30} scale={10} size={0.5} speed={0.1} opacity={0.1} color="#ffffff" />
    </group>
  );
}
