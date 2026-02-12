'use client';

import { useEffect, useRef } from 'react';
import type CanvasParticlesType from 'canvasparticles-js';

export default function CanvasParticlesSection({
  id,
  particleColor = 'rgba(255,255,255,0.12)',
  background = 'transparent',
}: {
  id: string;
  particleColor?: string;
  background?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let instance: InstanceType<typeof CanvasParticlesType> | null = null;

    const init = async () => {
      const CanvasParticles = (await import('canvasparticles-js')).default;
      if (!containerRef.current) return;

      const canvas = document.createElement('canvas');
      canvas.id = id;
      canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block;';
      containerRef.current.appendChild(canvas);

      instance = new CanvasParticles(`#${id}`, {
        background,
        particles: {
          color: particleColor,
          ppm: 800,
          connectDistance: 120,
          relSpeed: 0.2,
          rotationSpeed: 0.5,
        },
        mouse: {
          interactionType: 0, // Off - less distraction for background
        },
      });
      instance.start();
    };

    init();

    return () => {
      if (instance && typeof (instance as { destroy?: () => void }).destroy === 'function') {
        (instance as { destroy: () => void }).destroy();
      }
    };
  }, [id, particleColor, background]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
      aria-hidden
    />
  );
}
