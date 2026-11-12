"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { useScroll, useReducedMotion } from "framer-motion";
import { BG_HEX, HERO_END_RATIO, frameStep, FRAME_CROP } from "@/lib/hero-config";
import { HeroTextOverlays } from "./HeroTextOverlays";

interface ScrollHeroProps {
  frames: string[];
}

export function ScrollHero({ frames }: ScrollHeroProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  const lastIndex = Math.max(0, Math.floor((frames.length - 1) * HERO_END_RATIO));

  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isPreloadComplete, setIsPreloadComplete] = useState(false);

  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const loadedRef = useRef<boolean[]>([]);
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const lastDrawnFrameRef = useRef<number>(0);
  const drawnSourceRef = useRef<number>(-1);
  const isMobileRef = useRef(false);
  const rafIdRef = useRef<number | null>(null);
  // Box around the hero text, in CSS px relative to the sticky viewport.
  const copyRectRef = useRef({ top: 0, bottom: 0, left: 0, right: 0 });
  const featherCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Initialize storage for images
  useEffect(() => {
    imagesRef.current = new Array(frames.length).fill(null);
    loadedRef.current = new Array(frames.length).fill(false);
  }, [frames.length]);

  // Determine mobile status
  const updateMobile = useCallback(() => {
    if (typeof window !== "undefined") {
      isMobileRef.current = window.innerWidth < 768;
    }
  }, []);

  // Draw a specific frame to canvas
  const drawFrame = useCallback(
    (index: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const step = frameStep(isMobileRef.current);
      // Align index to mobile step if applicable
      const alignedIndex = step > 1 ? Math.floor(index / step) * step : index;
      const clampedIndex = Math.max(0, Math.min(lastIndex, alignedIndex));

      // Find best available loaded image (nearest earlier, or nearest later)
      let imageToDraw: HTMLImageElement | null = null;
      let sourceIndex = -1;
      if (loadedRef.current[clampedIndex] && imagesRef.current[clampedIndex]) {
        imageToDraw = imagesRef.current[clampedIndex];
        sourceIndex = clampedIndex;
      } else {
        // Look backward
        for (let i = clampedIndex; i >= 0; i--) {
          if (loadedRef.current[i] && imagesRef.current[i]) {
            imageToDraw = imagesRef.current[i];
            sourceIndex = i;
            break;
          }
        }
        // If not found, look forward
        if (!imageToDraw) {
          for (let i = clampedIndex; i <= lastIndex; i++) {
            if (loadedRef.current[i] && imagesRef.current[i]) {
              imageToDraw = imagesRef.current[i];
              sourceIndex = i;
              break;
            }
          }
        }
      }

      // Always clear / fill canvas with BG_HEX first
      ctx.fillStyle = BG_HEX;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (!imageToDraw || !imageToDraw.naturalWidth || !imageToDraw.naturalHeight) {
        return;
      }

      drawnSourceRef.current = sourceIndex;
      lastDrawnFrameRef.current = clampedIndex;

      const cw = canvas.width;
      const ch = canvas.height;
      const nw = imageToDraw.naturalWidth;
      const nh = imageToDraw.naturalHeight;
      const sw = nw * FRAME_CROP;
      const sh = nh * FRAME_CROP;

      const dpr = cw / Math.max(1, canvas.clientWidth);
      const copy = copyRectRef.current;

      // Full-bleed: cover the whole viewport.
      const scale = Math.max(cw / sw, ch / sh);
      const dw = sw * scale;
      const dh = sh * scale;
      ctx.drawImage(imageToDraw, 0, 0, sw, sh, (cw - dw) / 2, (ch - dh) / 2, dw, dh);

      // Portrait screens: covering a 16:9 frame keeps only a narrow centre slice, so the
      // cover version becomes a washed-out backdrop and a wider, sharp view sits below the text.
      if (cw < ch) {
        ctx.fillStyle = `${BG_HEX}B3`;
        ctx.fillRect(0, 0, cw, ch);

        const areaTop = (copy.bottom + 8) * dpr;
        const areaH = Math.max(ch * 0.35, ch - 24 * dpr - areaTop);
        const s = Math.min((cw * 1.45) / sw, areaH / sh);
        const fw = Math.round(sw * s);
        const fh = Math.round(sh * s);
        const fx = Math.round((cw - fw) / 2);
        const fy = Math.round(Math.min(areaTop + (areaH - fh) / 2, ch - fh));

        let off = featherCanvasRef.current;
        if (!off) {
          off = document.createElement("canvas");
          featherCanvasRef.current = off;
        }
        if (off.width !== fw || off.height !== fh) {
          off.width = fw;
          off.height = fh;
        }
        const octx = off.getContext("2d");
        if (octx) {
          octx.globalCompositeOperation = "source-over";
          octx.clearRect(0, 0, fw, fh);
          octx.drawImage(imageToDraw, 0, 0, sw, sh, 0, 0, fw, fh);
          // Fade all four edges so the sharp view melts into the backdrop.
          octx.globalCompositeOperation = "destination-in";
          const h = octx.createLinearGradient(0, 0, fw, 0);
          h.addColorStop(0, "rgba(0,0,0,0)");
          h.addColorStop(0.12, "rgba(0,0,0,1)");
          h.addColorStop(0.88, "rgba(0,0,0,1)");
          h.addColorStop(1, "rgba(0,0,0,0)");
          octx.fillStyle = h;
          octx.fillRect(0, 0, fw, fh);
          const v = octx.createLinearGradient(0, 0, 0, fh);
          v.addColorStop(0, "rgba(0,0,0,0)");
          v.addColorStop(0.18, "rgba(0,0,0,1)");
          v.addColorStop(0.85, "rgba(0,0,0,1)");
          v.addColorStop(1, "rgba(0,0,0,0)");
          octx.fillStyle = v;
          octx.fillRect(0, 0, fw, fh);
          octx.globalCompositeOperation = "source-over";
          ctx.drawImage(off, fx, fy);
        }
      }

      // Soft glow behind the text block only, so the copy stays readable over busy frames
      // while the rest of the animation is untouched.
      if (copy.right > copy.left && copy.bottom > copy.top) {
        const cx = ((copy.left + copy.right) / 2) * dpr;
        const cy = ((copy.top + copy.bottom) / 2) * dpr;
        const rx = ((copy.right - copy.left) / 2 + 160) * dpr;
        const ry = ((copy.bottom - copy.top) / 2 + 110) * dpr;
        ctx.save();
        ctx.translate(cx, cy);
        ctx.scale(1, ry / rx);
        const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, rx);
        glow.addColorStop(0, `${BG_HEX}E6`);
        glow.addColorStop(0.55, `${BG_HEX}C7`);
        glow.addColorStop(1, `${BG_HEX}00`);
        ctx.fillStyle = glow;
        ctx.fillRect(-rx, -rx, rx * 2, rx * 2);
        ctx.restore();
      }
    },
    [lastIndex]
  );

  // Resize canvas according to devicePixelRatio (capped at 2)
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = stickyRef.current;
    if (!canvas || !container) return;

    updateMobile();

    const rect = container.getBoundingClientRect();

    const copyEl = container.querySelector<HTMLElement>("[data-hero-copy]");
    if (copyEl) {
      const c = copyEl.getBoundingClientRect();
      copyRectRef.current = {
        top: c.top - rect.top,
        bottom: c.bottom - rect.top,
        left: c.left - rect.left,
        right: c.right - rect.left,
      };
    }
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const targetW = Math.max(1, Math.round(rect.width * dpr));
    const targetH = Math.max(1, Math.round(rect.height * dpr));

    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }

    // Redraw current frame
    const frameToDraw =
      lastDrawnFrameRef.current >= 0 ? lastDrawnFrameRef.current : 0;
    drawFrame(frameToDraw);
  }, [drawFrame, updateMobile]);

  // Handle window resize
  useEffect(() => {
    updateMobile();
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas, { passive: true });
    // Web fonts change the text height after first paint; re-measure once they're in.
    document.fonts?.ready.then(resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [resizeCanvas, updateMobile]);

  // Preloading & Progressive Image Loading
  useEffect(() => {
    if (frames.length === 0) return;

    let isMounted = true;
    updateMobile();
    const step = frameStep(isMobileRef.current);

    // Identify needed frame indices up to lastIndex respecting mobile step
    const neededIndices: number[] = [];
    for (let i = 0; i <= lastIndex; i += step) {
      neededIndices.push(i);
    }

    if (neededIndices.length === 0) return;

    // First 20 needed frames for initial reveal
    const initialBatch = neededIndices.slice(0, 20);
    const remainingBatch = neededIndices.slice(20);

    let loadedCount = 0;
    const totalNeeded = neededIndices.length;

    const loadSingleFrame = (index: number): Promise<void> => {
      return new Promise((resolve) => {
        if (!isMounted) return resolve();
        if (loadedRef.current[index] && imagesRef.current[index]) {
          return resolve();
        }

        const img = new Image();
        img.src = frames[index];

        img.onload = () => {
          if (!isMounted) return resolve();
          imagesRef.current[index] = img;
          loadedRef.current[index] = true;
          loadedCount++;
          setLoadingProgress(Math.min(100, Math.round((loadedCount / totalNeeded) * 100)));

          // Redraw when index is greater than drawnSource and <= lastDrawnFrame, or on initial draw
          const currentTarget =
            lastDrawnFrameRef.current >= 0 ? lastDrawnFrameRef.current : 0;
          if (
            drawnSourceRef.current === -1 ||
            (index > drawnSourceRef.current && index <= currentTarget)
          ) {
            drawFrame(currentTarget);
            setIsPreloadComplete(true);
          }
          resolve();
        };

        img.onerror = () => {
          if (!isMounted) return resolve();
          // Mark handled so it does not stall
          loadedCount++;
          setLoadingProgress(Math.min(100, Math.round((loadedCount / totalNeeded) * 100)));
          resolve();
        };
      });
    };

    // Load initial 20 frames in parallel
    Promise.all(initialBatch.map((idx) => loadSingleFrame(idx))).then(() => {
      if (!isMounted) return;
      setIsPreloadComplete(true);

      // Redraw frame 0 or lastIndex for reduced motion
      const initialFrame = shouldReduceMotion
        ? lastIndex
        : (lastDrawnFrameRef.current >= 0 ? lastDrawnFrameRef.current : 0);
      drawFrame(initialFrame);

      // Load remaining frames in small batches of 6
      const loadRemainingInBatches = async () => {
        const batchSize = 6;
        for (let i = 0; i < remainingBatch.length; i += batchSize) {
          if (!isMounted) break;
          const chunk = remainingBatch.slice(i, i + batchSize);
          await Promise.all(chunk.map((idx) => loadSingleFrame(idx)));
        }
      };

      loadRemainingInBatches();
    });

    return () => {
      isMounted = false;
    };
  }, [frames, lastIndex, drawFrame, shouldReduceMotion, updateMobile]);

  // Scroll listener & lerp animation loop
  useEffect(() => {
    if (shouldReduceMotion) {
      // Reduced motion: show only lastIndex, no scrubbing
      targetFrameRef.current = lastIndex;
      currentFrameRef.current = lastIndex;
      drawFrame(lastIndex);
      lastDrawnFrameRef.current = lastIndex;
      return;
    }

    const initialProgress = Math.max(0, Math.min(1, scrollYProgress.get() || 0));
    targetFrameRef.current = initialProgress * lastIndex;
    currentFrameRef.current = initialProgress * lastIndex;

    // Subscribe to scroll progress
    const unsubscribeScroll = scrollYProgress.on("change", (progress) => {
      // Map progress 0..1 to 0..lastIndex
      const clamped = Math.max(0, Math.min(1, progress));
      targetFrameRef.current = clamped * lastIndex;
    });

    let isRunning = true;
    const animate = () => {
      if (!isRunning) return;

      const diff = targetFrameRef.current - currentFrameRef.current;
      currentFrameRef.current += diff * 0.2;

      const rounded = Math.round(currentFrameRef.current);
      const step = frameStep(isMobileRef.current);
      const aligned = step > 1 ? Math.floor(rounded / step) * step : rounded;
      const targetIndex = Math.max(0, Math.min(lastIndex, aligned));

      if (targetIndex !== lastDrawnFrameRef.current) {
        drawFrame(targetIndex);
        lastDrawnFrameRef.current = targetIndex;
      }

      rafIdRef.current = requestAnimationFrame(animate);
    };

    rafIdRef.current = requestAnimationFrame(animate);

    return () => {
      isRunning = false;
      unsubscribeScroll();
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [scrollYProgress, lastIndex, drawFrame, shouldReduceMotion]);

  return (
    <section
      ref={wrapperRef}
      id="hero-scroll"
      className="relative w-full h-[200vh] md:h-[250vh] bg-[#EAE1D2]"
    >
      {/* 2px Terracotta Loading Progress Bar */}
      {loadingProgress < 100 && (
        <div
          className="fixed top-0 left-0 h-[2px] bg-[var(--terracotta)] z-50 transition-all duration-150 pointer-events-none"
          style={{ width: `${loadingProgress}%` }}
          aria-hidden="true"
        />
      )}

      {/* Sticky viewport container */}
      <div
        ref={stickyRef}
        className="sticky top-0 h-[100svh] w-full overflow-hidden bg-[#EAE1D2] flex items-center justify-center"
      >
        {/* Canvas for sequence scrub animation with 300ms fade-in */}
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 w-full h-full block transition-opacity duration-300 ${
            isPreloadComplete ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundColor: BG_HEX }}
        />

        {/* Text Overlays driven by scroll progress (always visible) */}
        <HeroTextOverlays progress={scrollYProgress} />

        {/* 120px Bottom Gradient for seamless section blend */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[120px] pointer-events-none z-15"
          style={{
            background: `linear-gradient(to bottom, rgba(234, 225, 210, 0) 0%, ${BG_HEX} 100%)`,
          }}
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
