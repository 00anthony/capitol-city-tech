'use client'
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

const BackgroundEffects: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance" 
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float uTime;
      uniform vec2 uResolution;
      uniform vec3 uBlobs[4];
      varying vec2 vUv;

      float smin(float a, float b, float k) {
          float h = max(k - abs(a - b), 0.0) / k;
          return min(a, b) - h * h * k * (1.0 / 4.0);
      }

      vec3 getAuraColor(float d, vec2 n, vec2 uv) {
          vec3 colorBlue   = vec3(0.05, 0.4, 1.0);
          vec3 colorGreen  = vec3(0.0, 1.0, 0.6);
          vec3 colorPurple = vec3(0.7, 0.2, 1.0);

          // We use the coordinates and the field distance to vary the color
          float shift = d * 2.0 + uTime * 0.04 + length(uv) * 0.5;
          
          float m1 = sin(shift) * 0.5 + 0.5;
          float m2 = cos(shift * 0.7 + n.x) * 0.5 + 0.5;
          
          vec3 col = mix(colorBlue, colorGreen, m1);
          col = mix(col, colorPurple, m2);
          
          return col;
      }

      void main() {
        vec2 uv = (gl_FragCoord.xy * 2.0 - uResolution.xy) / min(uResolution.y, uResolution.x);
        
        // Calculate the combined field
        float field = 1e10;
        for(int i = 0; i < 4; i++) {
            float d = length(uv - uBlobs[i].xy) - uBlobs[i].z;
            field = smin(field, d, 0.6); // Slightly softer blending for longer "string" connections
        }

        // --- STRING LOGIC ---
        // Instead of a solid mass, we render a thin shell/outline
        // threshold 0.0 is the boundary. We create a "wire" around it.
        float thickness = 0.015; 
        float stringEffect = smoothstep(thickness, 0.0, abs(field));
        
        // Add a secondary wider glow for volume
        float glowEffect = smoothstep(0.4, 0.0, abs(field + 0.05)) * 0.3;

        // Normal generation for shimmer
        vec2 eps = vec2(0.005, 0.0);
        float f1 = 1e10; for(int i=0; i<4; i++) f1 = smin(f1, length((uv + eps.xy) - uBlobs[i].xy) - uBlobs[i].z, 0.6);
        float f2 = 1e10; for(int i=0; i<4; i++) f2 = smin(f2, length((uv - eps.xy) - uBlobs[i].xy) - uBlobs[i].z, 0.6);
        float f3 = 1e10; for(int i=0; i<4; i++) f3 = smin(f3, length((uv + eps.yx) - uBlobs[i].xy) - uBlobs[i].z, 0.6);
        float f4 = 1e10; for(int i=0; i<4; i++) f4 = smin(f4, length((uv - eps.yx) - uBlobs[i].xy) - uBlobs[i].z, 0.6);
        vec2 normal = normalize(vec2(f1 - f2, f3 - f4));
        
        vec3 color = getAuraColor(field, normal, uv);
        
        // Final Alpha: Combination of the sharp string and the soft glow
        float alpha = (stringEffect + glowEffect);
        
        // Add metallic refractive highlights
        float shine = pow(max(0.0, dot(normal, vec2(0.5, 0.8))), 10.0) * stringEffect;
        vec3 finalColor = color + (shine * 0.5);

        gl_FragColor = vec4(finalColor, alpha * 0.7);
      }
    `;

    // Increased initial spread
    const blobs = [
      { x: 0, y: 0, r: 0.2, freqX: 0.3, freqY: 0.2, phase: 0 },
      { x: 0, y: 0, r: 0.18, freqX: 0.25, freqY: 0.35, phase: Math.PI * 0.5 },
      { x: 0, y: 0, r: 0.15, freqX: 0.4, freqY: 0.15, phase: Math.PI },
      { x: 0, y: 0, r: 0.12, freqX: 0.15, freqY: 0.45, phase: Math.PI * 1.5 }
    ];

    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uBlobs: { value: blobs.map(b => new THREE.Vector3(b.x, b.y, b.r)) }
    };

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending, // Makes overlapping strings much brighter
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Subtle Size Pulsation (Slower)
    blobs.forEach((blob, i) => {
      gsap.to(blob, {
        r: blob.r * 1.3,
        duration: 8 + i,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });

    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      const time = clock.getElapsedTime();
      uniforms.uTime.value = time;
      
      blobs.forEach((blob, i) => {
        // --- FLARE & PATH LOGIC ---
        // slowDown: Lower = Slower (0.3 is very chilled)
        const slowDown = 0.3;
        const t = time * slowDown + blob.phase;
        
        // orbitRadius: How far they "flare" out (0.65 goes to edges)
        const orbitRadius = 0.65; 
        
        // Lissajous curve math creates figure-8s and wide sweeps through center
        blob.x = Math.sin(t * blob.freqX * 10.0) * orbitRadius;
        blob.y = Math.cos(t * blob.freqY * 10.0) * orbitRadius;
        
        uniforms.uBlobs.value[i].set(blob.x, blob.y, blob.r);
      });

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (containerRef.current && renderer.domElement.parentNode) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 bg-[#020617] overflow-hidden">
      <div ref={containerRef} className="absolute inset-0 z-0" />
      
      {/* Heavy blur removed to keep the "string" lines sharp and defined */}
      <div className="absolute inset-0  bg-slate-950/40 z-10" />

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-grid opacity-10 z-20" />
      
      {/* Subtle Grain */}
      <div 
        className="absolute inset-0 opacity-[0.01] z-30 mix-blend-overlay" 
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />
    </div>
  );
};

export default BackgroundEffects;
