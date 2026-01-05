'use client'


import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

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
      uniform vec4 uSatellites[4]; // x, y, radius, depth/z
      varying vec2 vUv;

      float smin(float a, float b, float k) {
          float h = max(k - abs(a - b), 0.0) / k;
          return min(a, b) - h * h * k * (1.0 / 4.0);
      }

      float noise(vec2 p) {
          return sin(p.x * 6.0 + uTime * 0.1) * cos(p.y * 6.0 - uTime * 0.15);
      }

      vec3 getAuraColor(float d, vec2 uv, float z) {
          // Palette shifts slightly based on depth (z)
          vec3 colorBlue   = vec3(0.05, 0.4, 1.0);
          vec3 colorGreen  = vec3(0.0, 1.0, 0.7);
          vec3 colorPurple = vec3(0.7, 0.2, 1.0);

          float shift = uTime * 0.02 + length(uv) * 0.3 + z * 0.2;
          float m1 = sin(shift) * 0.5 + 0.5;
          float m2 = cos(shift * 1.2) * 0.5 + 0.5;
          
          vec3 col = mix(colorBlue, colorGreen, m1);
          col = mix(col, colorPurple, m2);
          return col;
      }

      void main() {
        vec2 uv = (gl_FragCoord.xy * 2.0 - uResolution.xy) / min(uResolution.y, uResolution.x);
        
        // Tilt the whole coordinate system slightly for 3D perspective feel
        uv.y += uv.x * 0.1;

        // 1. THE MAIN HOLLOW RING (with 3D wobble)
        float ringZ = sin(uTime * 0.5) * 0.1;
        float ringRadius = 0.52 + sin(uTime * 0.3) * 0.02;
        float ringThickness = 0.04;
        float field = abs(length(uv) - ringRadius) - ringThickness;

        // 2. 3D SATELLITES
        float totalZ = 0.0;
        for(int i = 0; i < 4; i++) {
            vec3 pos = uSatellites[i].xyz;
            float z = uSatellites[i].w; // depth value from JS
            
            // Adjust local radius based on depth (z)
            // Foreground (+z) is larger and sharper, Background (-z) is smaller and blurrier
            float localR = pos.z * (1.0 + z * 0.4);
            float d = length(uv - pos.xy) - localR;
            
            // Liquid merge: The blending factor 'k' is modulated by depth
            // This makes front-passing blobs "pinch" the ring more visibly
            float k = 0.2 + (z + 1.0) * 0.1;
            field = smin(field, d, k);
            
            // Accumulate z for color modulation
            totalZ += z * smoothstep(0.4, 0.0, d);
        }

        // --- WHISPY ETHER RENDERING ---
        float n = noise(uv * 1.5) * 0.12;
        
        // Wide falloff for the whispy vapor
        float alphaBase = smoothstep(0.5 + n, -0.2, field);
        
        // Interior fluid "whisps"
        float whisps = sin(field * 12.0 - uTime * 0.3) * 0.5 + 0.5;
        whisps *= smoothstep(0.4, 0.0, field);

        vec3 color = getAuraColor(field, uv, totalZ);
        
        // Apply depth-based darkening
        float depthDim = smoothstep(-1.5, 1.0, totalZ);
        color *= (0.8 + depthDim * 0.2);

        // Alpha calculation
        float borderGlow = smoothstep(0.06, 0.0, abs(field)) * 0.6;
        float finalAlpha = (alphaBase * 0.4 + whisps * 0.15 + borderGlow);

        gl_FragColor = vec4(color + (borderGlow * 0.3), finalAlpha * 0.6);
      }
    `;

    // Satellite state with 3D pathing parameters
    const satellites = [
      { progress: 0.0, speed: 0.003, rx: 0.6, ry: 0.4, rz: 0.5, phase: 0 },
      { progress: 0.25, speed: 0.002, rx: 0.5, ry: 0.6, rz: 0.4, phase: 2 },
      { progress: 0.5, speed: 0.004, rx: 0.7, ry: 0.3, rz: 0.6, phase: 4 },
      { progress: 0.75, speed: 0.0025, rx: 0.4, ry: 0.7, rz: 0.3, phase: 5.5 }
    ];

    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uSatellites: { value: satellites.map(() => new THREE.Vector4(0, 0, 0, 0)) }
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
        s.progress += s.speed;
        
        // 3D Infinity Path (Lemniscate projection with Z depth)
        const t = s.progress * Math.PI * 2 + s.phase;
        
        // Using a modified 3D figure-8 loop
        // Blobs pass through (0,0,0) and swing out to the edges
        const x = Math.sin(t) * s.rx;
        const y = Math.sin(t * 2.0) * s.ry;
        const z = Math.cos(t) * s.rz; 
        
        // Base radius of the satellite
        const baseR = 0.12 + Math.sin(time * 0.5 + i) * 0.03;
        
        // Update the Vector4: [x, y, baseRadius, depthZ]
        uniforms.uSatellites.value[i].set(x, y, baseR, z);
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
      
      {/* Heavy Blur creates the 3D vaporous depth */}
      <div className="absolute inset-0  bg-slate-950/20 z-10" />

      {/* Grid Overlay for technical grounding */}
      <div className="absolute inset-0 bg-grid opacity-[0.06] z-20" />
      
      {/* Noise Grain */}
      <div 
        className="absolute inset-0 opacity-[0.012] z-30 mix-blend-overlay" 
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />
    </div>
  );
};

export default BackgroundEffects;
