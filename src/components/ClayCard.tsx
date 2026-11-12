import React from "react";

interface ClayCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  highlightTop?: boolean;
}

export function ClayCard({ children, className = "", highlightTop = false, ...rest }: ClayCardProps) {
  return (
    <div
      className={`clay-card relative text-[var(--ink)] ${
        highlightTop ? "border-t-4 border-t-[var(--terracotta)]" : ""
      } ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
