"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface ClayCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  enableTilt?: boolean;
  highlightTop?: boolean;
  style?: React.CSSProperties;
}

export function ClayCard({
  children,
  className = "",
  enableTilt = true,
  highlightTop = false,
  style,
  ...rest
}: ClayCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [canTilt, setCanTilt] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // Only enable tilt on fine pointer devices (mouse) and if reduced motion is false
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    setCanTilt(mediaQuery.matches && !shouldReduceMotion && enableTilt);

    const listener = (e: MediaQueryListEvent) => {
      setCanTilt(e.matches && !shouldReduceMotion && enableTilt);
    };
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, [shouldReduceMotion, enableTilt]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canTilt || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Maximum 4 degrees tilt
    const deltaX = ((x - centerX) / centerX) * 4;
    const deltaY = ((y - centerY) / centerY) * 4;

    setRotateX(-deltaY);
    setRotateY(deltaX);
  };

  const handleMouseEnter = () => {
    if (canTilt) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: isHovered && canTilt ? rotateX : 0,
        rotateY: isHovered && canTilt ? rotateY : 0,
        y: isHovered && canTilt ? -4 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 25,
        mass: 0.5,
      }}
      style={{
        transformStyle: "preserve-3d",
        perspective: 1000,
        ...style,
      }}
      className={`relative rounded-2xl bg-[var(--surface)] border border-[var(--line)] text-[var(--ink)] transition-shadow duration-300 ${
        highlightTop ? "border-t-4 border-t-[var(--terracotta)]" : ""
      } ${
        isHovered
          ? "shadow-[inset_0_1px_0_0_rgba(255,255,255,1),inset_0_-2px_0_0_rgba(31,31,28,0.06),0_4px_8px_0_rgba(31,31,28,0.05),0_20px_32px_-4px_rgba(31,31,28,0.1)]"
          : "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.95),inset_0_-2px_0_0_rgba(31,31,28,0.05),0_2px_4px_0_rgba(31,31,28,0.04),0_12px_24px_-4px_rgba(31,31,28,0.07)]"
      } ${className}`}
      {...(rest as any)}
    >
      {children}
    </motion.div>
  );
}
