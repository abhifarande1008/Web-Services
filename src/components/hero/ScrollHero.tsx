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

  // Scroll tracking across the 500vh wrapper
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

  // 1. Reset scroll position on mount so load / refresh starts at the top
  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      if (!window.location.hash) {
        window.scrollTo(0, 0);
      }
    }
  }, []);

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

      const isLandscape = cw >= ch;

      if (isLandscape) {
        // Landscape screens: scale image to cover
        const scale = Math.max(cw / sw, ch / sh);
        const dw = sw * scale;
        const dh = sh * scale;
        const dx = (cw - dw) / 2;
        const dy = (ch - dh) / 2;
        ctx.drawImage(imageToDraw, 0, 0, sw, sh, dx, dy, dw, dh);
      } else {
        // Portrait screens: scale to fit width and centre vertically so panels are never cropped
        const scale = cw / sw;
        const dw = cw;
        const dh = sh * scale;
        const dx = 0;
        const dy = (ch - dh) / 2;
        ctx.drawImage(imageToDraw, 0, 0, sw, sh, dx, dy, dw, dh);
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

    // Initialize targetFrame to 0 if at top of page
    const initialProgress =
      typeof window !== "undefined" && !window.location.hash
        ? 0
        : (scrollYProgress.get() || 0);
    targetFrameRef.current = initialProgress * lastIndex;
    currentFrameRef.current = initialProgress * lastIndex;

    // Subscribe to scroll progress
    const unsubscribeScroll = scrollYProgress.on("change", (progress) => {
      // Map progress 0..1 to 0..lastIndex
      const clamped = Math.max(0, Math.min(1, progress));
      targetFrameRef.current = clamped * lastIndex;
    });

    // Lerp loop with factor 0.12
    let isRunning = true;
    const animate = () => {
      if (!isRunning) return;

      const diff = targetFrameRef.current - currentFrameRef.current;
      currentFrameRef.current += diff * 0.12;

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
      className="relative w-full h-[500vh] bg-[#EAE1D2]"
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
        className="sticky top-0 h-screen w-full overflow-hidden bg-[#EAE1D2] flex items-center justify-center"
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
