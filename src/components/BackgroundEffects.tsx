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
      uniform vec4 uSatellites[5]; // x, y, baseRadius, depthZ
      uniform vec3 uColors[5];     // Blob primary colors
      varying vec2 vUv;

      float smin(float a, float b, float k) {
          float h = max(k - abs(a - b), 0.0) / k;
          return min(a, b) - h * h * k * (1.0 / 4.0);
      }

      float noise(vec2 p) {
          return sin(p.x * 4.0 + uTime * 0.05) * cos(p.y * 4.0 - uTime * 0.05);
      }

      void main() {
        vec2 uv = (gl_FragCoord.xy * 2.0 - uResolution.xy) / min(uResolution.y, uResolution.x);
        
        // Perspective tilt
        uv.y += uv.x * 0.03;

        // 1. STABLE PRIMARY RING
        float ringRadius = 0.55;
        float ringThickness = 0.03;
        float field = abs(length(uv) - ringRadius) - ringThickness;

        vec3 finalColor = vec3(0.0);
        float totalWeight = 0.0;
        float totalGlow = 0.0;
        
        // Deep base color for the ring
        float ringWeight = smoothstep(0.25, 0.0, field);
        finalColor += vec3(0.02, 0.05, 0.15) * ringWeight;
        totalWeight += ringWeight;

        for(int i = 0; i < 5; i++) {
            vec3 pos = uSatellites[i].xyz;
            float z = uSatellites[i].w; 
            
            // Tangential Flattening
            float distToCenter = length(uv);
            vec2 dir = normalize(uv);
            float radialDiff = abs(distToCenter - ringRadius);
            float stretch = 1.0 + smoothstep(0.25, 0.0, radialDiff) * 3.5;
            
            vec2 satellitePos = pos.xy;
            vec2 delta = uv - satellitePos;
            vec2 tangent = vec2(-dir.y, dir.x);
            float tDist = dot(delta, tangent);
            float nDist = dot(delta, dir);
            
            // Adjusted local radius with depth scaling
            float currentRadius = pos.z * (1.0 + z * 0.35);
            float localD = length(vec2(tDist / stretch, nDist)) - currentRadius;
            
            // Liquid merge logic
            float k = 0.28 + (z + 1.0) * 0.12;
            field = smin(field, localD, k);
            
            // --- DYNAMIC GRADIENT COLORING ---
            // Calculate a local gradient for the blob based on its position
            float colorGradient = dot(normalize(delta + 0.1), vec2(0.707, 0.707)) * 0.5 + 0.5;
            vec3 blobColor = mix(uColors[i], uColors[(i+1)%5], colorGradient * 0.6);
            
            float weight = smoothstep(0.45, -0.15, localD);
            finalColor += blobColor * weight * (1.1 + z * 0.3);
            totalWeight += weight;

            // --- RIBBON GLOW / ACCENT LOGIC ---
            // Create a very thin shell around the blob's perimeter
            float shell = abs(localD + 0.01) - 0.004;
            float glowPulse = sin(uTime * 0.8 + float(i) * 1.5) * 0.5 + 0.5;
            // Only trigger glow occasionally or for the 'ghost' blob (index 4)
            float intensity = (i == 4) ? 0.8 : (glowPulse * 0.4 * smoothstep(0.7, 1.0, glowPulse));
            float shellGlow = smoothstep(0.02, 0.0, shell) * intensity;
            
            // Cyan-blue accent for the ribbon
            vec3 ribbonColor = vec3(0.0, 0.7, 1.0);
            finalColor += ribbonColor * shellGlow * 2.0;
            totalGlow += shellGlow;
        }

        // --- FINAL COMPOSITION ---
        float n = noise(uv * 1.4) * 0.18;
        float alphaBase = smoothstep(0.65 + n, -0.25, field);
        float interiorWhisps = sin(field * 11.0 - uTime * 0.25) * 0.5 + 0.5;
        interiorWhisps *= smoothstep(0.4, 0.0, field);

        if(totalWeight > 0.0) finalColor /= (totalWeight + 0.1);

        float borderHighlight = smoothstep(0.09, 0.0, abs(field)) * 0.8;
        
        vec3 col = finalColor + (borderHighlight * finalColor * 0.6) + (totalGlow * vec3(0.4, 0.8, 1.0));
        float alpha = (alphaBase * 0.25 + borderHighlight * 0.8 + interiorWhisps * 0.12 + totalGlow * 0.5);

        gl_FragColor = vec4(col, alpha * 0.7);
      }
    `;

    // Satellite state with slower speeds and individual 3D axes
    const satellites = [
      { progress: 0.0, speed: 0.0008, rx: 0.6, ry: 0.4, rz: 0.5, color: new THREE.Vector3(0.1, 0.4, 1.0), axis: new THREE.Vector3(1, 0.5, 0.2).normalize() },
      { progress: 0.2, speed: 0.0006, rx: 0.4, ry: 0.6, rz: 0.4, color: new THREE.Vector3(0.0, 1.0, 0.6), axis: new THREE.Vector3(0.2, 1, 0.5).normalize() },
      { progress: 0.4, speed: 0.0011, rx: 0.7, ry: 0.3, rz: 0.6, color: new THREE.Vector3(0.6, 0.2, 0.9), axis: new THREE.Vector3(0.5, 0.2, 1).normalize() },
      { progress: 0.6, speed: 0.0007, rx: 0.5, ry: 0.7, rz: 0.3, color: new THREE.Vector3(0.1, 0.8, 0.8), axis: new THREE.Vector3(1, -0.5, 1).normalize() },
      // Index 4 is our "Ghost Ribbon" blob
      { progress: 0.8, speed: 0.0009, rx: 0.55, ry: 0.55, rz: 0.7, color: new THREE.Vector3(0.0, 0.5, 1.0), axis: new THREE.Vector3(-1, 1, 0.5).normalize() }
    ];

    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uSatellites: { value: satellites.map(() => new THREE.Vector4(0, 0, 0, 0)) },
      uColors: { value: satellites.map(s => s.color) }
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
        const t = s.progress * Math.PI * 2;

        // Figure-8 logic in 3D
        let x = Math.sin(t) * s.rx;
        let y = Math.sin(t * 2.0) * s.ry;
        let z = Math.cos(t) * s.rz;

        // Triple-axis tumbling
        const rotationSpeed = 0.08;
        const q = new THREE.Quaternion().setFromAxisAngle(s.axis, time * rotationSpeed);
        const v = new THREE.Vector3(x, y, z).applyQuaternion(q);
        
        // Base radius fluctuates slightly
        const baseR = 0.12 + Math.sin(time * 0.3 + i) * 0.02;
        uniforms.uSatellites.value[i].set(v.x, v.y, baseR, v.z);
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
      
      {/* Diffuse blurring for the vapor look */}
      <div className="absolute inset-0  bg-slate-950/25 z-10" />

      {/* Grounding Grid */}
      <div className="absolute inset-0 bg-grid opacity-[0.04] z-20" />
      
      {/* Noise Grain Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.012] z-30 mix-blend-overlay" 
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />
    </div>
  );
};

export default BackgroundEffects;
