import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';

/**
 * LiquidWaterRippleCanvas
 * Realistic concentric water wave ripple simulation when water droplets fall.
 * Features:
 * - Natural ambient water drops falling periodically onto a calm liquid surface
 * - User click & cursor interactive water drop ripples with fluid wave propagation
 * - Multi-ring concentric wavefronts with realistic amplitude damping and specular caustics
 * - Dynamic theme color harmonization
 */
const WaterRippleCanvas = forwardRef(({ 
  accentColor = '#00f0ff', 
  secondaryColor = '#a855f7',
  className = "absolute inset-0 w-full h-full pointer-events-none" 
}, ref) => {
  const canvasRef = useRef(null);
  const dropsRef = useRef([]);
  const animFrameRef = useRef(null);
  const isVisibleRef = useRef(true);

  // Helper to add a water drop impact
  const createDrop = (x, y, intensity = 1.0, maxRadius = 320) => {
    dropsRef.current.push({
      x,
      y,
      radius: 0,
      maxRadius,
      rings: [0, 16, 34, 54, 76], // concentric wave crest offsets
      opacity: Math.min(1.0, 0.85 * intensity),
      speed: 2.4 * (0.85 + Math.random() * 0.3),
      life: 0,
      maxLife: 150,
      accent: accentColor,
      secondary: secondaryColor,
      splashRadius: 3,
      splashAlpha: 1.0
    });

    // Cap active drops to preserve high performance
    if (dropsRef.current.length > 20) {
      dropsRef.current.shift();
    }
  };

  // Expose imperative drop trigger to parent
  useImperativeHandle(ref, () => ({
    addDrop: (x, y, intensity = 1.0) => {
      createDrop(x, y, intensity);
    }
  }));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = window.devicePixelRatio || 1;

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = window.devicePixelRatio || 1;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.scale(dpr, dpr);
    };

    handleResize();

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(canvas);

    // Initial gentle drop right in the center
    const initialTimer = setTimeout(() => {
      if (width > 0 && height > 0) {
        createDrop(width / 2, height * 0.45, 1.2, Math.min(width * 0.45, 380));
      }
    }, 400);

    // Ambient periodic droplets (simulating rain / calm pond surface)
    let lastAmbientDrop = Date.now();
    let ambientInterval = 2800; // ms between ambient drops

    // Check visibility via IntersectionObserver to save resources when scrolled away
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isVisibleRef.current = entry.isIntersecting;
    }, { threshold: 0.1 });
    visibilityObserver.observe(canvas);

    const render = () => {
      if (!isVisibleRef.current) {
        animFrameRef.current = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      const now = Date.now();
      if (now - lastAmbientDrop > ambientInterval) {
        lastAmbientDrop = now;
        ambientInterval = 2200 + Math.random() * 1600; // vary cadence
        
        // Random location around the center-hero area
        const randX = width * (0.25 + Math.random() * 0.5);
        const randY = height * (0.25 + Math.random() * 0.5);
        createDrop(randX, randY, 0.9 + Math.random() * 0.4, 260 + Math.random() * 140);
      }

      // Update and draw each droplet ripple wave
      const drops = dropsRef.current;
      for (let d = drops.length - 1; d >= 0; d--) {
        const drop = drops[d];
        drop.radius += drop.speed;
        drop.life++;

        // Decay opacity gradually
        const lifeRatio = drop.life / drop.maxLife;
        drop.opacity = Math.max(0, (1 - lifeRatio) * 0.85);

        if (drop.life >= drop.maxLife || drop.opacity <= 0.005) {
          drops.splice(d, 1);
          continue;
        }

        // Draw initial water droplet splash impact sparkle (first 18 frames)
        if (drop.life < 18) {
          const splashProgress = drop.life / 18;
          const currentSplashRadius = drop.splashRadius + splashProgress * 12;
          const currentSplashAlpha = (1 - splashProgress) * drop.opacity;

          ctx.save();
          ctx.beginPath();
          ctx.arc(drop.x, drop.y, currentSplashRadius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${currentSplashAlpha * 0.9})`;
          ctx.shadowColor = accentColor;
          ctx.shadowBlur = 12;
          ctx.fill();

          // Tiny droplet impact crown ring
          ctx.beginPath();
          ctx.arc(drop.x, drop.y, currentSplashRadius * 1.6, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(0, 240, 255, ${currentSplashAlpha * 0.75})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
          ctx.restore();
        }

        // Soft fluid caustic radial wash propagating outwards
        if (drop.radius > 10 && drop.radius < drop.maxRadius) {
          const causticAlpha = drop.opacity * 0.06;
          const radialGlow = ctx.createRadialGradient(
            drop.x, drop.y, Math.max(0, drop.radius * 0.6),
            drop.x, drop.y, drop.radius
          );
          radialGlow.addColorStop(0, 'rgba(0, 240, 255, 0)');
          radialGlow.addColorStop(0.8, `rgba(0, 240, 255, ${causticAlpha})`);
          radialGlow.addColorStop(1, 'rgba(168, 85, 247, 0)');

          ctx.save();
          ctx.beginPath();
          ctx.arc(drop.x, drop.y, drop.radius, 0, Math.PI * 2);
          ctx.fillStyle = radialGlow;
          ctx.fill();
          ctx.restore();
        }

        // Draw multiple concentric expanding water wave crests
        for (let i = 0; i < drop.rings.length; i++) {
          const ringRadius = drop.radius - drop.rings[i];
          if (ringRadius <= 0) continue;

          const ringRatio = ringRadius / drop.maxRadius;
          if (ringRatio >= 1.0) continue;

          // Wave envelope: smooth bell curve that rises quickly and fades as wave spreads
          const envelope = Math.sin(ringRatio * Math.PI);
          const ringAlpha = drop.opacity * envelope * (1 - i * 0.16);
          if (ringAlpha <= 0.005) continue;

          ctx.save();
          ctx.beginPath();
          ctx.arc(drop.x, drop.y, ringRadius, 0, Math.PI * 2);

          // Crest line thickness naturally thins as the ripple expands
          const strokeWidth = Math.max(0.75, (2.6 - ringRatio * 1.5) * (1 - i * 0.12));
          ctx.lineWidth = strokeWidth;

          // Liquid chromatic dispersion gradient along the wave rim
          const grad = ctx.createLinearGradient(
            drop.x - ringRadius, drop.y - ringRadius,
            drop.x + ringRadius, drop.y + ringRadius
          );
          
          grad.addColorStop(0, `rgba(0, 240, 255, ${ringAlpha * 0.95})`);
          grad.addColorStop(0.35, `rgba(255, 255, 255, ${ringAlpha * 0.85})`); // Specular highlight
          grad.addColorStop(0.7, `rgba(59, 130, 246, ${ringAlpha * 0.9})`);
          grad.addColorStop(1, `rgba(168, 85, 247, ${ringAlpha * 0.95})`);

          ctx.strokeStyle = grad;
          ctx.shadowColor = accentColor;
          ctx.shadowBlur = 6 * (1 - ringRatio);
          ctx.stroke();

          // Subtle secondary inner refractive wave shadow
          if (ringRadius > 6) {
            ctx.beginPath();
            ctx.arc(drop.x, drop.y, ringRadius - 1.5, 0, Math.PI * 2);
            ctx.lineWidth = 0.75;
            ctx.strokeStyle = `rgba(5, 14, 29, ${ringAlpha * 0.5})`;
            ctx.shadowBlur = 0;
            ctx.stroke();
          }

          ctx.restore();
        }
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      clearTimeout(initialTimer);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
    };
  }, [accentColor, secondaryColor]);

  return (
    <canvas 
      ref={canvasRef} 
      className={className}
      style={{
        filter: 'drop-shadow(0 0 12px rgba(0, 240, 255, 0.25))',
      }}
    />
  );
});

WaterRippleCanvas.displayName = 'WaterRippleCanvas';

export default WaterRippleCanvas;
