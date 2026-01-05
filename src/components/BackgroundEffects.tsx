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
      uniform vec4 uSatellites[4]; // x, y, radius, intensity
      varying vec2 vUv;

      float smin(float a, float b, float k) {
          float h = max(k - abs(a - b), 0.0) / k;
          return min(a, b) - h * h * k * (1.0 / 4.0);
      }

      float noise(vec2 p) {
          return sin(p.x * 8.0 + uTime * 0.1) * cos(p.y * 8.0 - uTime * 0.2);
      }

      vec3 getAuraColor(float d, vec2 uv) {
          vec3 colorBlue   = vec3(0.05, 0.35, 1.0);
          vec3 colorGreen  = vec3(0.0, 1.0, 0.6);
          vec3 colorPurple = vec3(0.6, 0.1, 1.0);

          float shift = uTime * 0.02 + length(uv) * 0.5;
          float m1 = sin(shift + d * 2.0) * 0.5 + 0.5;
          float m2 = cos(shift * 0.7) * 0.5 + 0.5;
          
          vec3 col = mix(colorBlue, colorGreen, m1);
          col = mix(col, colorPurple, m2);
          return col;
      }

      void main() {
        vec2 uv = (gl_FragCoord.xy * 2.0 - uResolution.xy) / min(uResolution.y, uResolution.x);
        
        // 1. THE MAIN HOLLOW RING
        float ringRadius = 0.5 + sin(uTime * 0.2) * 0.05;
        float ringThickness = 0.05;
        float field = abs(length(uv) - ringRadius) - ringThickness;

        // 2. EMERGING SATELLITES
        for(int i = 0; i < 4; i++) {
            vec3 pos = uSatellites[i].xyz;
            float d = length(uv - pos.xy) - pos.z;
            
            // This is where the "inverting" merge happens
            // We blend the satellite into the ring using a soft smooth minimum
            field = smin(field, d, 0.25);
        }

        // --- WHISPY AESTHETICS ---
        float n = noise(uv * 1.2) * 0.1;
        
        // Soft gradient field
        float alphaBase = smoothstep(0.4 + n, -0.1, field);
        
        // Create the "whispy" interior texture
        float whisps = sin(field * 15.0 - uTime * 0.4) * 0.5 + 0.5;
        whisps *= smoothstep(0.3, 0.0, field);

        vec3 color = getAuraColor(field, uv);
        
        // Combine everything for a flat, whispy look
        float finalAlpha = (alphaBase * 0.5 + whisps * 0.2);
        
        // Add a highlight glow to the boundary
        float borderGlow = smoothstep(0.05, 0.0, abs(field)) * 0.5;
        
        vec3 finalColor = color + (borderGlow * color);

        gl_FragColor = vec4(finalColor, (finalAlpha + borderGlow) * 0.6);
      }
    `;

    // Satellite state management
    const satellites = [
      { x: 0, y: 0, r: 0, angle: 0, progress: 0, speed: 0.002, id: 0 },
      { x: 0, y: 0, r: 0, angle: 2, progress: 0.25, speed: 0.0015, id: 1 },
      { x: 0, y: 0, r: 0, angle: 4, progress: 0.5, speed: 0.0025, id: 2 },
      { x: 0, y: 0, r: 0, angle: 5.5, progress: 0.75, speed: 0.0018, id: 3 }
    ];

    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uSatellites: { value: satellites.map(s => new THREE.Vector4(s.x, s.y, s.r, 1.0)) }
    };

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      const time = clock.getElapsedTime();
      uniforms.uTime.value = time;
      
      satellites.forEach((s, i) => {
        // Increment progress (0 to 1)
        s.progress += s.speed;
        if (s.progress > 1) {
          s.progress = 0;
          s.angle = Math.random() * Math.PI * 2;
        }

        // Migration Logic:
        // 0.0 -> 0.3: Emergence (from center, growing)
        // 0.3 -> 1.0: Orbiting (staying on the ring edge)
        
        const ringRadius = 0.5;
        if (s.progress < 0.3) {
            // Emerge from center
            const t = s.progress / 0.3;
            const dist = t * ringRadius;
            s.x = Math.cos(s.angle) * dist;
            s.y = Math.sin(s.angle) * dist;
            s.r = 0.15 * Math.sin(t * Math.PI); // Grow then shrink slightly
        } else {
            // Orbit the edge
            const t = (s.progress - 0.3) / 0.7;
            const orbitAngle = s.angle + t * 2.0;
            s.x = Math.cos(orbitAngle) * ringRadius;
            s.y = Math.sin(orbitAngle) * ringRadius;
            s.r = 0.1 + Math.sin(time + i) * 0.05; // Pulse size on the edge
        }
        
        uniforms.uSatellites.value[i].set(s.x, s.y, s.r, 1.0);
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
      
      {/* Heavy blur to create the whispy vapor atmosphere */}
      <div className="absolute inset-0  bg-slate-950/20 z-10" />

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-grid opacity-[0.08] z-20" />
      
      {/* Texture Grain */}
      <div 
        className="absolute inset-0 opacity-[0.015] z-30 mix-blend-overlay" 
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />
    </div>
  );
};

export default BackgroundEffects;
