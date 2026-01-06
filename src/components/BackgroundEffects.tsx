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
      uniform vec3 uColors[5];     // Primary colors
      varying vec2 vUv;

      float smin(float a, float b, float k) {
          float h = max(k - abs(a - b), 0.0) / k;
          return min(a, b) - h * h * k * (1.0 / 4.0);
      }

      float noise(vec2 p) {
          return sin(p.x * 3.0 + uTime * 0.03) * cos(p.y * 3.0 - uTime * 0.03);
      }

      float noiseStable(vec2 p) {
          return sin(p.x * 2.0) * cos(p.y * 2.0);
      }

      void main() {
        vec2 uv = (gl_FragCoord.xy * 2.0 - uResolution.xy) / min(uResolution.y, uResolution.x);
        
        // Subtle tilt
        uv.y += uv.x * 0.015;

        // 1. STABLE PRIMARY RING
        float ringRadius = 0.55;
        float ringThickness = 0.035;
        float field = abs(length(uv) - ringRadius) - ringThickness;

        vec3 finalColor = vec3(0.0);
        float totalWeight = 0.0;
        float totalGlow = 0.0;
        
        // Dark base anchor
        float ringWeight = smoothstep(0.3, 0.0, field);
        finalColor += vec3(0.01, 0.02, 0.08) * ringWeight;
        totalWeight += ringWeight;

        for(int i = 0; i < 5; i++) {
            vec3 pos = uSatellites[i].xyz;
            float z = uSatellites[i].w; 
            
            // Distance of the blob center from the screen center (0,0)
            float distFromOrigin = length(pos.xy);
            
            // Tangential Flattening
            float distToCenter = length(uv);
            vec2 dir = normalize(uv);
            float radialDiff = abs(distToCenter - ringRadius);
            float stretch = 1.0 + smoothstep(0.3, 0.0, radialDiff) * 4.0;
            
            vec2 satellitePos = pos.xy;
            vec2 delta = uv - satellitePos;
            vec2 tangent = vec2(-dir.y, dir.x);
            float tDist = dot(delta, tangent);
            float nDist = dot(delta, dir);
            
            float currentRadius = pos.z * (1.0 + z * 0.45);
            float localD = length(vec2(tDist / stretch, nDist)) - currentRadius;
            
            // Liquid merge
            field = smin(field, localD, 0.35);
            
            // --- BLOB GRADIENTS ---
            vec3 baseCol = uColors[i];
            vec3 altCol = uColors[(i+1)%5];
            float gVal = dot(normalize(delta + 0.1), vec2(0.707)) * 0.5 + 0.5;
            vec3 dynamicBlobColor = mix(baseCol, altCol, gVal * 0.4 + 0.2);
            
            float weight = smoothstep(0.55, -0.25, localD);
            finalColor += dynamicBlobColor * weight * (1.1 + z * 0.3);
            totalWeight += weight;

            // --- ORGANIC RIM GLOW WITH SPORADIC FADE & CENTER MASK ---
            // Distort the distance field for the glow to make it look vaporous/organic
            float n = noise(uv * 5.0 + float(i));
            float distortedLocalD = localD + n * 0.025;
            
            // Thin shell with variable thickness based on noise
            float shellThickness = 0.001 + (noiseStable(uv * 10.0 + uTime * 0.1) * 0.5 + 0.5) * 0.004;
            float shell = abs(distortedLocalD + 0.005) - shellThickness;
            
            // RIM LOGIC:
            vec2 blobDir = normalize(pos.xy);
            vec2 pixelRelDir = normalize(delta);
            // Distort the rim mask so it isn't a perfect mathematical arc
            float rimMaskNoise = noise(uv * 2.5) * 0.2;
            float rimMask = smoothstep(0.1 + rimMaskNoise, 0.75, dot(pixelRelDir, blobDir));
            
            // FREQUENCY FADE: Only appear sporadically (peak of a sine wave)
            float cycle = sin(uTime * 0.15 + float(i) * 1.5) * 0.5 + 0.5;
            float sporadicFade = smoothstep(0.7, 0.95, cycle); 
            
            // CENTER MASK: Prevents highlights when near center.
            // Highlights only start appearing when blob center is > 0.3 units from origin.
            float centerMask = smoothstep(0.3, 0.5, distFromOrigin);
            
            // Softening pulse
            float pulse = sin(uTime * 0.8 + float(i)) * 0.5 + 0.5;
            
            // Combine all masks for a subtle, organic highlight
            float intensity = rimMask * sporadicFade * centerMask * (0.4 + pulse * 0.6);
            
            // Ghost blob (index 4) has slightly higher visibility
            if (i == 4) intensity *= 1.2;

            float shellGlow = smoothstep(0.03, 0.0, shell) * intensity;
            
            // Cyan/Ice-blue glow accent
            vec3 glowCol = vec3(0.0, 0.6, 1.0);
            finalColor += glowCol * shellGlow * 3.5;
            totalGlow += shellGlow;
        }

        // --- COMPOSITION ---
        float nVal = noise(uv * 1.8) * 0.15;
        float alphaBase = smoothstep(0.7 + nVal, -0.35, field);
        float whisps = sin(field * 12.0 - uTime * 0.1) * 0.5 + 0.5;
        whisps *= smoothstep(0.5, 0.0, field);

        if(totalWeight > 0.0) finalColor /= (totalWeight + 0.05);

        float edgeHighlight = smoothstep(0.08, 0.0, abs(field)) * 0.9;
        
        vec3 col = finalColor + (edgeHighlight * finalColor * 0.5) + (totalGlow * vec3(0.4, 0.8, 1.0));
        float alpha = (alphaBase * 0.2 + edgeHighlight * 0.95 + whisps * 0.06 + totalGlow * 0.8);

        gl_FragColor = vec4(col, alpha * 0.75);
      }
    `;

    const satellites = [
      { progress: 0.0, speed: 0.00035, rx: 0.65, ry: 0.45, rz: 0.5, color: new THREE.Vector3(0.1, 0.5, 1.0), axis: new THREE.Vector3(1, 0.4, 0.3).normalize() },
      { progress: 0.2, speed: 0.00025, rx: 0.45, ry: 0.65, rz: 0.4, color: new THREE.Vector3(0.1, 1.0, 0.6), axis: new THREE.Vector3(0.3, 1, 0.4).normalize() },
      { progress: 0.4, speed: 0.0006, rx: 0.7, ry: 0.35, rz: 0.6, color: new THREE.Vector3(0.7, 0.3, 1.0), axis: new THREE.Vector3(0.4, 0.2, 1).normalize() },
      { progress: 0.6, speed: 0.0003, rx: 0.5, ry: 0.75, rz: 0.3, color: new THREE.Vector3(0.2, 0.9, 0.9), axis: new THREE.Vector3(1, -0.4, 0.6).normalize() },
      { progress: 0.8, speed: 0.00045, rx: 0.58, ry: 0.58, rz: 0.7, color: new THREE.Vector3(0.0, 0.6, 1.0), axis: new THREE.Vector3(-0.6, 0.8, 0.4).normalize() }
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

        let x = Math.sin(t) * s.rx;
        let y = Math.sin(t * 2.0) * s.ry;
        let z = Math.cos(t) * s.rz;

        const rotationSpeed = 0.04;
        const q = new THREE.Quaternion().setFromAxisAngle(s.axis, time * rotationSpeed);
        const v = new THREE.Vector3(x, y, z).applyQuaternion(q);
        
        const baseR = 0.12 + Math.sin(time * 0.15 + i) * 0.015;
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
      
      {/* Heavy vaporous atmosphere blur */}
      <div className="absolute inset-0  bg-slate-950/35 z-10" />

      {/* Grid structure overlay */}
      <div className="absolute inset-0 bg-grid opacity-[0.15] z-20" />
      
      {/* Noise texture for organic depth */}
      <div 
        className="absolute inset-0 opacity-[0.0] z-30 mix-blend-overlay" 
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />
    </div>
  );
};

export default BackgroundEffects;
