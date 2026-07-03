import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function HeroCanvas() {
  const particleCount = 180;
  const maxDistance = 1.8;
  
  const particlesRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const groupRef = useRef<THREE.Group>(null);
  
  // Initialize particle positions and velocities
  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const vel = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      // Spread them in a spherical volume
      const radius = 6 + Math.random() * 8;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(Math.random() * 2 - 1);
      
      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);
      
      vel[i * 3] = (Math.random() - 0.5) * 0.015;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.015;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.015;
    }
    return { positions: pos, velocities: vel };
  }, [particleCount]);

  // Max lines = particleCount * (particleCount - 1) / 2
  const maxLines = (particleCount * (particleCount - 1)) / 2;
  const linePositions = useMemo(() => new Float32Array(maxLines * 6), [maxLines]);
  const lineColors = useMemo(() => new Float32Array(maxLines * 6), [maxLines]);

  useFrame(({ clock, pointer }) => {
    if (!particlesRef.current || !linesRef.current || !groupRef.current) return;
    
    const posAttribute = particlesRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const posArray = posAttribute.array as Float32Array;
    
    // Update particle positions
    for (let i = 0; i < particleCount; i++) {
      posArray[i * 3] += velocities[i * 3];
      posArray[i * 3 + 1] += velocities[i * 3 + 1];
      posArray[i * 3 + 2] += velocities[i * 3 + 2];
      
      // Simple bounding box bounce
      const bounds = 15;
      if (Math.abs(posArray[i * 3]) > bounds) velocities[i * 3] *= -1;
      if (Math.abs(posArray[i * 3 + 1]) > bounds) velocities[i * 3 + 1] *= -1;
      if (Math.abs(posArray[i * 3 + 2]) > bounds) velocities[i * 3 + 2] *= -1;
    }
    posAttribute.needsUpdate = true;
    
    // Update lines based on distance
    let lineIndex = 0;
    
    for (let i = 0; i < particleCount; i++) {
      for (let j = i + 1; j < particleCount; j++) {
        const dx = posArray[i * 3] - posArray[j * 3];
        const dy = posArray[i * 3 + 1] - posArray[j * 3 + 1];
        const dz = posArray[i * 3 + 2] - posArray[j * 3 + 2];
        const distSq = dx * dx + dy * dy + dz * dz;
        
        if (distSq < maxDistance * maxDistance) {
          const dist = Math.sqrt(distSq);
          const alpha = 1.0 - (dist / maxDistance);
          
          linePositions[lineIndex * 6] = posArray[i * 3];
          linePositions[lineIndex * 6 + 1] = posArray[i * 3 + 1];
          linePositions[lineIndex * 6 + 2] = posArray[i * 3 + 2];
          linePositions[lineIndex * 6 + 3] = posArray[j * 3];
          linePositions[lineIndex * 6 + 4] = posArray[j * 3 + 1];
          linePositions[lineIndex * 6 + 5] = posArray[j * 3 + 2];
          
          // Use #4F8CFF (79, 140, 255) for the lines with alpha fading
          const r = 79 / 255;
          const g = 140 / 255;
          const b = 255 / 255;
          
          for (let k = 0; k < 2; k++) {
            lineColors[lineIndex * 6 + k * 3] = r * alpha;
            lineColors[lineIndex * 6 + k * 3 + 1] = g * alpha;
            lineColors[lineIndex * 6 + k * 3 + 2] = b * alpha;
          }
          
          lineIndex++;
        }
      }
    }
    
    const linePosAttr = linesRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const lineColorAttr = linesRef.current.geometry.attributes.color as THREE.BufferAttribute;
    
    linesRef.current.geometry.setDrawRange(0, lineIndex * 2);
    
    linePosAttr.needsUpdate = true;
    lineColorAttr.needsUpdate = true;
    
    // Slow elegant rotation of the entire network
    groupRef.current.rotation.y = clock.elapsedTime * 0.05;
    groupRef.current.rotation.x = clock.elapsedTime * 0.02;
    
    // Subtle parallax with mouse
    const targetX = (pointer.x * Math.PI) / 20;
    const targetY = (pointer.y * Math.PI) / 20;
    
    groupRef.current.rotation.y += targetX;
    groupRef.current.rotation.x -= targetY;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={particleCount} array={positions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial 
          color="#ffffff" 
          size={0.04} 
          transparent 
          opacity={0.8} 
          sizeAttenuation={true} 
          blending={THREE.AdditiveBlending}
        />
      </points>
      
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={maxLines * 2} array={linePositions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={maxLines * 2} array={lineColors} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial 
          vertexColors 
          transparent 
          blending={THREE.AdditiveBlending} 
          depthWrite={false}
          linewidth={1}
        />
      </lineSegments>
    </group>
  );
}
