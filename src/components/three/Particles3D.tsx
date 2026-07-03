import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Premium Cinematic Colors
const COLORS = [
  new THREE.Color('#ffffff'), // White
  new THREE.Color('#f8fafc'), // Soft white
  new THREE.Color('#4F8CFF'), // Royal blue
  new THREE.Color('#e0f2fe'), // Very light cyan
  new THREE.Color('#8b5cf6'), // Tiny amount of purple
];

export default function Particles3D() {
  const { size, viewport } = useThree();
  
  // 50% reduced density for minimal, premium feel
  const isMobile = size.width < 768;
  const isTablet = size.width >= 768 && size.width < 1024;
  const PARTICLE_COUNT = isMobile ? 500 : isTablet ? 1000 : 2000;
  
  // Very few constellations
  const CONNECT_COUNT = isMobile ? 15 : 40; 
  const SHOOTING_STARS_COUNT = 3;

  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  // Procedural soft circle texture for particles (No square blocks)
  const circleTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const context = canvas.getContext('2d');
    if (context) {
      const gradient = context.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, 'rgba(255,255,255,1)');
      gradient.addColorStop(1, 'rgba(255,255,255,0)');
      context.fillStyle = gradient;
      context.fillRect(0, 0, 32, 32);
    }
    return new THREE.CanvasTexture(canvas);
  }, []);

  const { positions, originalPositions, colors, sizes, velocities } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const origPos = new Float32Array(PARTICLE_COUNT * 3);
    const col = new Float32Array(PARTICLE_COUNT * 3);
    const siz = new Float32Array(PARTICLE_COUNT);
    const vel = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const isShootingStar = i >= PARTICLE_COUNT - SHOOTING_STARS_COUNT;

      // Organic suggested spiral / flowing streams
      const radius = 2 + Math.pow(Math.random(), 1.5) * 22; // Sweep from center to far edges
      const angle = Math.random() * Math.PI * 2;
      const spiralOffset = radius * 0.3; 
      
      const x = Math.cos(angle + spiralOffset) * radius;
      const z = Math.sin(angle + spiralOffset) * radius;
      
      // Multiple depth layers (Foreground, Middle, Background)
      const depthSpread = (Math.random() - 0.5) * 12;
      const y = depthSpread * (Math.random() > 0.6 ? 1 : 0.3); // Some scatter, most concentrated in band

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      origPos[i * 3] = x;
      origPos[i * 3 + 1] = y;
      origPos[i * 3 + 2] = z;

      // Colors
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;

      // 1px-2px particles (very small sizes in WebGL space)
      siz[i] = isShootingStar ? 0.08 : (Math.random() * 0.02 + 0.01);

      // Velocities
      if (isShootingStar) {
        vel[i * 3] = (Math.random() - 0.5) * 0.8;
        vel[i * 3 + 1] = (Math.random() - 0.5) * 0.5;
        vel[i * 3 + 2] = (Math.random() - 0.5) * 0.8;
      } else {
        // Slow cinematic orbital drift
        const speed = 0.001 / (radius * 0.1 + 1);
        vel[i * 3] = -z * speed;
        vel[i * 3 + 1] = (Math.random() - 0.5) * 0.001;
        vel[i * 3 + 2] = x * speed;
      }
    }
    return { positions: pos, originalPositions: origPos, colors: col, sizes: siz, velocities: vel };
  }, [PARTICLE_COUNT]);

  // Constellation lines + 3 shooting star trails
  const maxLines = (CONNECT_COUNT * 2) + SHOOTING_STARS_COUNT; 
  const linePositions = useMemo(() => new Float32Array(maxLines * 6), [maxLines]);
  const lineColors = useMemo(() => new Float32Array(maxLines * 6), [maxLines]);
  const connectionCounts = useMemo(() => new Int32Array(CONNECT_COUNT), [CONNECT_COUNT]);

  useFrame(({ clock, pointer }) => {
    if (!pointsRef.current || !linesRef.current) return;

    const time = clock.getElapsedTime();
    const posArray = pointsRef.current.geometry.attributes.position.array as Float32Array;
    
    const mouseX = (pointer.x * viewport.width) / 2;
    const mouseY = (pointer.y * viewport.height) / 2;

    let lineIndex = 0;
    connectionCounts.fill(0);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      const isShootingStar = i >= PARTICLE_COUNT - SHOOTING_STARS_COUNT;

      if (isShootingStar) {
        posArray[i3] += velocities[i3];
        posArray[i3 + 1] += velocities[i3 + 1];
        posArray[i3 + 2] += velocities[i3 + 2];

        // Shooting star bounds reset
        if (Math.abs(posArray[i3]) > 25 || Math.abs(posArray[i3 + 1]) > 15 || Math.abs(posArray[i3 + 2]) > 25) {
          posArray[i3] = (Math.random() - 0.5) * 30;
          posArray[i3 + 1] = (Math.random() - 0.5) * 20;
          posArray[i3 + 2] = (Math.random() - 0.5) * 10 - 10;
        }

        // Draw trail for shooting star
        linePositions[lineIndex * 6] = posArray[i3];
        linePositions[lineIndex * 6 + 1] = posArray[i3 + 1];
        linePositions[lineIndex * 6 + 2] = posArray[i3 + 2];
        linePositions[lineIndex * 6 + 3] = posArray[i3] - velocities[i3] * 4;
        linePositions[lineIndex * 6 + 4] = posArray[i3 + 1] - velocities[i3 + 1] * 4;
        linePositions[lineIndex * 6 + 5] = posArray[i3 + 2] - velocities[i3 + 2] * 4;

        lineColors[lineIndex * 6] = 1; lineColors[lineIndex * 6 + 1] = 1; lineColors[lineIndex * 6 + 2] = 1;
        lineColors[lineIndex * 6 + 3] = 0; lineColors[lineIndex * 6 + 4] = 0; lineColors[lineIndex * 6 + 5] = 0; // fade out trail
        lineIndex++;
        continue; // skip rest of loop for shooting stars
      }
      
      const ox = originalPositions[i3];
      const oy = originalPositions[i3 + 1];
      const oz = originalPositions[i3 + 2];
      
      // Extremely slow flowing stream
      const angle = time * 0.02; 
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);
      
      const targetX = ox * cosA - oz * sinA;
      const targetZ = ox * sinA + oz * cosA;
      
      posArray[i3] += (targetX - posArray[i3]) * 0.01;
      posArray[i3 + 1] += (oy - posArray[i3 + 1]) * 0.01;
      posArray[i3 + 2] += (targetZ - posArray[i3 + 2]) * 0.01;

      // Soft Mouse Parallax Repulsion
      const dx = mouseX - posArray[i3];
      const dy = mouseY - posArray[i3 + 1];
      const distSq = dx * dx + dy * dy;

      if (distSq < 15) {
        const force = (15 - Math.sqrt(distSq)) * 0.0005;
        posArray[i3] += dx * force;
        posArray[i3 + 1] += dy * force;
      }

      // Constellation logic (Occasional thin glowing connections)
      if (i < CONNECT_COUNT && connectionCounts[i] < 2) {
        for (let j = i + 1; j < CONNECT_COUNT; j++) {
          if (connectionCounts[j] >= 2) continue;

          const j3 = j * 3;
          const lx = posArray[i3] - posArray[j3];
          const ly = posArray[i3 + 1] - posArray[j3 + 1];
          const lz = posArray[i3 + 2] - posArray[j3 + 2];
          const lDistSq = lx * lx + ly * ly + lz * lz;

          if (lDistSq < 5) {
            const alpha = 1.0 - (Math.sqrt(lDistSq) / 2.23); 
            
            if (alpha > 0) {
              linePositions[lineIndex * 6] = posArray[i3];
              linePositions[lineIndex * 6 + 1] = posArray[i3 + 1];
              linePositions[lineIndex * 6 + 2] = posArray[i3 + 2];
              linePositions[lineIndex * 6 + 3] = posArray[j3];
              linePositions[lineIndex * 6 + 4] = posArray[j3 + 1];
              linePositions[lineIndex * 6 + 5] = posArray[j3 + 2];

              const fadedAlpha = alpha * 0.1; // Extremely low opacity

              lineColors[lineIndex * 6] = fadedAlpha;
              lineColors[lineIndex * 6 + 1] = fadedAlpha;
              lineColors[lineIndex * 6 + 2] = fadedAlpha;
              lineColors[lineIndex * 6 + 3] = fadedAlpha;
              lineColors[lineIndex * 6 + 4] = fadedAlpha;
              lineColors[lineIndex * 6 + 5] = fadedAlpha;
              
              connectionCounts[i]++;
              connectionCounts[j]++;
              lineIndex++;
              
              if (connectionCounts[i] >= 2) break;
            }
          }
        }
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    
    const linePosAttr = linesRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const lineColorAttr = linesRef.current.geometry.attributes.color as THREE.BufferAttribute;
    
    linesRef.current.geometry.setDrawRange(0, lineIndex * 2);
    linePosAttr.needsUpdate = true;
    lineColorAttr.needsUpdate = true;

    // Cinematic Parallax
    const targetRotX = (pointer.y * 0.05); 
    const targetRotY = (pointer.x * 0.05);
    
    pointsRef.current.rotation.x += (targetRotX - pointsRef.current.rotation.x) * 0.02;
    pointsRef.current.rotation.y += (targetRotY - pointsRef.current.rotation.y) * 0.02;
    
    linesRef.current.rotation.x = pointsRef.current.rotation.x;
    linesRef.current.rotation.y = pointsRef.current.rotation.y;
  });

  return (
    <group position={[0, 0, -8]}>
      {/* Soft energy core center */}
      <mesh>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial 
          color="#bfdbfe" 
          transparent 
          opacity={0.015} 
          blending={THREE.AdditiveBlending} 
          depthWrite={false} 
        />
      </mesh>
      
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={PARTICLE_COUNT} array={positions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={PARTICLE_COUNT} array={colors} itemSize={3} />
          <bufferAttribute attach="attributes-size" count={PARTICLE_COUNT} array={sizes} itemSize={1} />
        </bufferGeometry>
        <pointsMaterial 
          map={circleTexture}
          vertexColors 
          transparent 
          opacity={0.35} 
          sizeAttenuation={true} 
          blending={THREE.AdditiveBlending}
          depthWrite={false}
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
