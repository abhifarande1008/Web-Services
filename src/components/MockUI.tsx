import React from "react";

interface MockUIProps {
  type: "bars" | "toggle" | "chart" | "kanban" | "table" | "metric" | "pwa" | "api";
  className?: string;
}

export function MockUI({ type, className = "" }: MockUIProps) {
  return (
    <div
      className={`p-3 rounded-xl bg-[var(--bg)]/50 border border-[var(--line)]/60 select-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {type === "bars" && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-md bg-[var(--terracotta)]/70 shrink-0" />
            <div className="h-2 w-3/4 rounded bg-[var(--line)]" />
          </div>
          <div className="h-2 w-full rounded bg-[var(--line)]/70" />
          <div className="h-2 w-1/2 rounded bg-[var(--line)]/50" />
        </div>
      )}

      {type === "toggle" && (
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1.5">
            <div className="h-2.5 w-16 rounded bg-[var(--line)]" />
            <div className="h-2 w-10 rounded bg-[var(--line)]/60" />
          </div>
          <div className="w-10 h-5 rounded-full bg-[var(--sage)] p-0.5 flex items-center justify-end">
            <div className="w-4 h-4 rounded-full bg-[var(--surface)] shadow-sm" />
          </div>
        </div>
      )}

      {type === "chart" && (
        <div className="flex items-end justify-between gap-1.5 h-10 pt-1">
          <div className="w-3 rounded-t bg-[var(--line)] h-[35%]" />
          <div className="w-3 rounded-t bg-[var(--sage)] h-[65%]" />
          <div className="w-3 rounded-t bg-[var(--line)] h-[50%]" />
          <div className="w-3 rounded-t bg-[var(--terracotta)] h-[90%]" />
          <div className="w-3 rounded-t bg-[var(--sage)] h-[75%]" />
          <div className="w-3 rounded-t bg-[var(--line)] h-[40%]" />
        </div>
      )}

      {type === "kanban" && (
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col gap-1.5 p-1.5 rounded-lg bg-[var(--surface)]/60 border border-[var(--line)]/40">
            <div className="h-2 w-8 rounded bg-[var(--terracotta)]/60" />
            <div className="h-3 w-full rounded bg-[var(--line)]/60" />
            <div className="h-3 w-3/4 rounded bg-[var(--line)]/40" />
          </div>
          <div className="flex flex-col gap-1.5 p-1.5 rounded-lg bg-[var(--surface)]/60 border border-[var(--line)]/40">
            <div className="h-2 w-8 rounded bg-[var(--sage)]" />
            <div className="h-3 w-full rounded bg-[var(--line)]/60" />
            <div className="h-3 w-2/3 rounded bg-[var(--line)]/40" />
          </div>
        </div>
      )}

      {type === "table" && (
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between pb-1 border-b border-[var(--line)]/60">
            <div className="h-2 w-12 rounded bg-[var(--line)]" />
            <div className="h-2 w-8 rounded bg-[var(--line)]" />
            <div className="h-2 w-6 rounded bg-[var(--line)]" />
          </div>
          <div className="flex items-center justify-between">
            <div className="h-2 w-10 rounded bg-[var(--line)]/60" />
            <div className="h-2 w-7 rounded bg-[var(--line)]/60" />
            <div className="h-2 w-5 rounded bg-[var(--sage)]/80" />
          </div>
          <div className="flex items-center justify-between">
            <div className="h-2 w-14 rounded bg-[var(--line)]/60" />
            <div className="h-2 w-8 rounded bg-[var(--line)]/60" />
            <div className="h-2 w-5 rounded bg-[var(--terracotta)]/80" />
          </div>
        </div>
      )}

      {type === "metric" && (
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <div className="h-2 w-12 rounded bg-[var(--line)]/80" />
            <div className="h-4 w-16 rounded bg-[var(--ink)]/80" />
          </div>
          <div className="px-2 py-1 rounded-md bg-[var(--sage)]/30 border border-[var(--sage)]/50">
            <div className="h-2 w-8 rounded bg-[var(--sage)]" />
          </div>
        </div>
      )}

      {type === "pwa" && (
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between px-1">
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--muted)]/50" />
            <div className="h-1.5 w-8 rounded bg-[var(--line)]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--muted)]/50" />
          </div>
          <div className="flex items-center gap-2 p-1.5 rounded-lg bg-[var(--surface)]">
            <div className="w-5 h-5 rounded-md bg-[var(--terracotta)]/30 shrink-0" />
            <div className="flex flex-col gap-1 flex-1">
              <div className="h-2 w-full rounded bg-[var(--line)]" />
              <div className="h-1.5 w-2/3 rounded bg-[var(--line)]/60" />
            </div>
          </div>
        </div>
      )}

      {type === "api" && (
        <div className="flex flex-col gap-1.5 font-mono text-[0.5625rem]">
          <div className="flex items-center gap-1.5">
            <span className="px-1 py-0.5 rounded bg-[var(--sage)]/40 text-[var(--ink)]">POST</span>
            <div className="h-2 w-16 rounded bg-[var(--line)]" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="px-1 py-0.5 rounded bg-[var(--terracotta)]/20 text-[var(--terracotta)]">200</span>
            <div className="h-2 w-24 rounded bg-[var(--line)]/70" />
          </div>
        </div>
      )}
    </div>
  );
}
