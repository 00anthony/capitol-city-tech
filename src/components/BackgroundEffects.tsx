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

      // High-precision smooth min for sharper liquid blending
      float smin(float a, float b, float k) {
          float h = max(k - abs(a - b), 0.0) / k;
          return min(a, b) - h * h * k * (1.0 / 4.0);
      }

      vec3 getIridescence(float d, vec2 n) {
          float shift = d * 1.5 + uTime * 0.15 + n.x * 0.3;
          // Vivid Aura-inspired palette
          vec3 col = 0.5 + 0.5 * cos(6.28318 * (shift + vec3(0.0, 0.33, 0.67)));
          return col;
      }

      void main() {
        vec2 uv = (gl_FragCoord.xy * 2.0 - uResolution.xy) / min(uResolution.y, uResolution.x);
        
        // Calculate unified field
        float field = 1e10;
        for(int i = 0; i < 4; i++) {
            float d = length(uv - uBlobs[i].xy) - uBlobs[i].z;
            field = smin(field, d, 0.4); // Tightening the k-factor for sharper blending
        }

        // Razor sharp thresholding
        float threshold = 0.0;
        // The smaller the smoothstep range (0.002), the sharper the edge
        float dist = smoothstep(0.002, -0.002, field - threshold);
        
        // Higher fidelity normal generation
        vec2 eps = vec2(0.002, 0.0);
        float f1 = 1e10; for(int i=0; i<4; i++) f1 = smin(f1, length((uv + eps.xy) - uBlobs[i].xy) - uBlobs[i].z, 0.4);
        float f2 = 1e10; for(int i=0; i<4; i++) f2 = smin(f2, length((uv - eps.xy) - uBlobs[i].xy) - uBlobs[i].z, 0.4);
        float f3 = 1e10; for(int i=0; i<4; i++) f3 = smin(f3, length((uv + eps.yx) - uBlobs[i].xy) - uBlobs[i].z, 0.4);
        float f4 = 1e10; for(int i=0; i<4; i++) f4 = smin(f4, length((uv - eps.yx) - uBlobs[i].xy) - uBlobs[i].z, 0.4);
        
        vec2 normal = normalize(vec2(f1 - f2, f3 - f4));
        
        vec3 irid = getIridescence(field, normal);
        vec3 finalColor = irid * dist;
        
        // Add metallic refractive sheen
        float sheen = pow(1.0 - max(0.0, dot(normal, vec2(0.0, 1.0))), 3.0);
        finalColor += sheen * 0.4 * dist;
        
        // Inner contrast
        finalColor *= 1.2;

        gl_FragColor = vec4(finalColor, dist * 0.95);
      }
    `;

    const blobs = [
      { x: 0, y: 0, r: 0.35, offset: 0 },
      { x: 0.1, y: 0, r: 0.3, offset: Math.PI * 0.5 },
      { x: -0.1, y: 0, r: 0.25, offset: Math.PI },
      { x: 0, y: 0.1, r: 0.28, offset: Math.PI * 1.5 }
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
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Animation: Unified stretching and rotating
    const mainTimeline = gsap.timeline({ repeat: -1 });
    
    // Animate the whole system rotation and individual wobble
    blobs.forEach((blob, i) => {
      gsap.to(blob, {
        r: blob.r * (0.8 + Math.random() * 0.4),
        duration: 2 + i,
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
        // Shared orbital motion keeps them from separating
        const slowTime = time * 0.4;
        const orbitRadius = 0.15;
        blob.x = Math.cos(slowTime + blob.offset) * orbitRadius + Math.sin(time * 0.2) * 0.1;
        blob.y = Math.sin(slowTime + blob.offset) * orbitRadius + Math.cos(time * 0.3) * 0.05;
        
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
      {/* Three.js Layer */}
      <div ref={containerRef} className="absolute inset-0 z-0" />
      
      {/* Refraction & Glass (Tightened blur for sharpness) */}
      <div className="absolute inset-0 backdrop-blur-2xl bg-slate-950/20 z-10" />

      {/* Technical Grid Overlay */}
      <div className="absolute inset-0 bg-grid opacity-20 z-20" />
      
      {/* Analog Grain */}
      <div 
        className="absolute inset-0 opacity-[0.02] z-30 mix-blend-overlay" 
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />
    </div>
  );
};

export default BackgroundEffects;
