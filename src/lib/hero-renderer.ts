import { BG_HEX, FRAME_CROP } from "@/lib/hero-config";

export interface CopyRect {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

/** Sticky viewport size in CSS px, the render scale, and the hero text box. */
export interface HeroLayout {
  width: number;
  height: number;
  dpr: number;
  copy: CopyRect;
}

export interface HeroRendererOptions {
  canvas: HTMLCanvasElement;
  /** URLs of the frames to play, in order. */
  urls: string[];
  reduce: boolean;
  progress: number;
  layout: HeroLayout;
  onLoad: (info: { fetched: number; heroProgress: number; done: boolean }) => void;
  onFirstPaint: () => void;
}

export interface HeroRenderer {
  setProgress(p: number): void;
  setLayout(layout: HeroLayout): void;
  setInView(inView: boolean): void;
  dispose(): void;
}

type Frame = ImageBitmap | HTMLImageElement;

// A decoded full-quality frame is ~8 MB, so only a window around the playhead stays decoded;
// the compressed files (a few KB each) are all kept. Decoding runs on the browser's image
// threads (~5 ms a frame), and painting is a single GPU-scaled draw.
const KEEP_AHEAD = 24;
const KEEP_BEHIND = 8;
const MAX_DECODES = 6;
const MAX_FETCHES = 6;
// During a fast scroll every 3rd frame is decoded first, so motion stays continuous, then the gaps fill in.
const COARSE_STEP = 3;
// The site loader lifts once this many frames are in; the rest stream in while the visitor reads.
const READY_FRAMES = 30;

async function decodeFrame(blob: Blob): Promise<Frame> {
  if (typeof createImageBitmap === "function") {
    try {
      return await createImageBitmap(blob);
    } catch {
      // fall through to <img> decoding
    }
  }
  const img = new Image();
  const url = URL.createObjectURL(blob);
  img.src = url;
  try {
    await img.decode();
  } finally {
    URL.revokeObjectURL(url);
  }
  return img;
}

const frameWidth = (f: Frame) => (f instanceof HTMLImageElement ? f.naturalWidth : f.width);
const frameHeight = (f: Frame) => (f instanceof HTMLImageElement ? f.naturalHeight : f.height);
const releaseFrame = (f: Frame) => {
  if (!(f instanceof HTMLImageElement)) f.close();
};

export function createHeroRenderer(o: HeroRendererOptions): HeroRenderer {
  const { canvas, urls, reduce } = o;
  const ctx = canvas.getContext("2d", { alpha: false });
  const n = urls.length;
  const lastSlot = n - 1;

  const blobs: (Blob | null)[] = new Array(n).fill(null);
  const decoded = new Map<number, Frame>();
  const decoding = new Set<number>();
  const controller = new AbortController();

  const clamp01 = (v: number) => Math.max(0, Math.min(1, v || 0));
  let target = reduce ? lastSlot : clamp01(o.progress) * lastSlot;
  let current = target;
  let drawnSource = -1;
  let dirty = true;
  let inView = true;
  let rafId = 0;
  let revealed = false;
  let disposed = false;
  let fetched = 0;

  let layout = o.layout;
  let glow: { canvas: HTMLCanvasElement; x: number; y: number } | null = null;
  let featherOff: HTMLCanvasElement | null = null;
  let featherMask: HTMLCanvasElement | null = null;

  const makeCanvas = (w: number, h: number) => {
    const c = document.createElement("canvas");
    c.width = w;
    c.height = h;
    return c;
  };

  const getFeatherMask = (fw: number, fh: number) => {
    if (featherMask && featherMask.width === fw && featherMask.height === fh) return featherMask;
    const m = makeCanvas(fw, fh);
    const mc = m.getContext("2d");
    if (mc) {
      const h = mc.createLinearGradient(0, 0, fw, 0);
      h.addColorStop(0, "rgba(0,0,0,0)");
      h.addColorStop(0.12, "rgba(0,0,0,1)");
      h.addColorStop(0.88, "rgba(0,0,0,1)");
      h.addColorStop(1, "rgba(0,0,0,0)");
      mc.fillStyle = h;
      mc.fillRect(0, 0, fw, fh);
      mc.globalCompositeOperation = "destination-in";
      const v = mc.createLinearGradient(0, 0, 0, fh);
      v.addColorStop(0, "rgba(0,0,0,0)");
      v.addColorStop(0.18, "rgba(0,0,0,1)");
      v.addColorStop(0.85, "rgba(0,0,0,1)");
      v.addColorStop(1, "rgba(0,0,0,0)");
      mc.fillStyle = v;
      mc.fillRect(0, 0, fw, fh);
    }
    featherMask = m;
    return m;
  };

  // Soft glow behind the text block so the copy stays readable over busy frames.
  const buildGlow = () => {
    glow = null;
    const { copy, dpr } = layout;
    if (!(copy.right > copy.left && copy.bottom > copy.top)) return;
    const cx = ((copy.left + copy.right) / 2) * dpr;
    const cy = ((copy.top + copy.bottom) / 2) * dpr;
    const rx = ((copy.right - copy.left) / 2 + 160) * dpr;
    const ry = ((copy.bottom - copy.top) / 2 + 110) * dpr;
    const g = makeCanvas(Math.ceil(rx * 2), Math.ceil(ry * 2));
    const gc = g.getContext("2d");
    if (!gc) return;
    gc.translate(rx, ry);
    gc.scale(1, ry / rx);
    const grad = gc.createRadialGradient(0, 0, 0, 0, 0, rx);
    grad.addColorStop(0, `${BG_HEX}E6`);
    grad.addColorStop(0.55, `${BG_HEX}C7`);
    grad.addColorStop(1, `${BG_HEX}00`);
    gc.fillStyle = grad;
    gc.fillRect(-rx, -rx, rx * 2, rx * 2);
    glow = { canvas: g, x: cx - rx, y: cy - ry };
  };

  const applyLayout = () => {
    const w = Math.max(1, Math.round(layout.width * layout.dpr));
    const h = Math.max(1, Math.round(layout.height * layout.dpr));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
    buildGlow();
    dirty = true;
  };

  const paint = (frame: Frame) => {
    if (!ctx) return;
    const cw = canvas.width;
    const ch = canvas.height;
    const sw = frameWidth(frame) * FRAME_CROP;
    const sh = frameHeight(frame) * FRAME_CROP;

    // Full-bleed: cover the whole viewport.
    const scale = Math.max(cw / sw, ch / sh);
    const dw = sw * scale;
    const dh = sh * scale;
    ctx.drawImage(frame, 0, 0, sw, sh, (cw - dw) / 2, (ch - dh) / 2, dw, dh);

    // Portrait screens: covering a 16:9 frame keeps only a narrow centre slice, so the
    // cover version becomes a washed-out backdrop and a wider, sharp view sits below the text.
    if (cw < ch) {
      const { copy, dpr } = layout;
      ctx.fillStyle = `${BG_HEX}B3`;
      ctx.fillRect(0, 0, cw, ch);

      const areaTop = (copy.bottom + 8) * dpr;
      const areaH = Math.max(ch * 0.35, ch - 24 * dpr - areaTop);
      const s = Math.min((cw * 1.45) / sw, areaH / sh);
      const fw = Math.max(1, Math.round(sw * s));
      const fh = Math.max(1, Math.round(sh * s));
      const fx = Math.round((cw - fw) / 2);
      const fy = Math.round(Math.min(areaTop + (areaH - fh) / 2, ch - fh));

      if (!featherOff || featherOff.width !== fw || featherOff.height !== fh) {
        featherOff = makeCanvas(fw, fh);
      }
      const octx = featherOff.getContext("2d");
      if (octx) {
        octx.globalCompositeOperation = "copy";
        octx.drawImage(frame, 0, 0, sw, sh, 0, 0, fw, fh);
        octx.globalCompositeOperation = "destination-in";
        octx.drawImage(getFeatherMask(fw, fh), 0, 0);
        ctx.drawImage(featherOff, fx, fy);
      }
    }

    if (glow) ctx.drawImage(glow.canvas, glow.x, glow.y);
  };

  // Nearest decoded slot, preferring the earlier one so playback never jumps ahead.
  const nearestDecoded = (s: number) => {
    for (let d = 0; d <= lastSlot; d++) {
      if (s - d >= 0 && decoded.has(s - d)) return s - d;
      if (s + d <= lastSlot && decoded.has(s + d)) return s + d;
    }
    return -1;
  };

  const startDecode = (s: number) => {
    const blob = blobs[s];
    if (!blob || decoded.has(s) || decoding.has(s)) return;
    decoding.add(s);
    decodeFrame(blob)
      .then((f) => {
        if (disposed) return releaseFrame(f);
        decoded.set(s, f);
        schedule();
      })
      .catch(() => {})
      .finally(() => {
        decoding.delete(s);
        pumpDecodes();
      });
  };

  const pumpDecodes = () => {
    if (disposed) return;
    const center = Math.max(0, Math.min(lastSlot, Math.round(target)));
    const playhead = Math.max(0, Math.min(lastSlot, Math.round(current)));
    const forward = target >= current;
    const lo = Math.max(0, Math.min(playhead, center) - (forward ? KEEP_BEHIND : KEEP_AHEAD));
    const hi = Math.min(lastSlot, Math.max(playhead, center) + (forward ? KEEP_AHEAD : KEEP_BEHIND));

    for (const [s, f] of decoded) {
      if ((s < lo - 4 || s > hi + 4) && s !== drawnSource) {
        releaseFrame(f);
        decoded.delete(s);
      }
    }

    // Walk from the playhead in the scroll direction: a coarse pass first, then the gaps.
    const from = playhead;
    const dir = forward ? 1 : -1;
    const end = forward ? hi : lo;
    for (let pass = 0; pass < 2 && decoding.size < MAX_DECODES; pass++) {
      for (let s = from; dir > 0 ? s <= end : s >= end; s += dir) {
        if (decoding.size >= MAX_DECODES) break;
        const coarse = Math.abs(s - from) % COARSE_STEP === 0;
        if (pass === 0 ? coarse : !coarse) startDecode(s);
      }
    }
    // Then a little behind the playhead, for small scrolls back.
    const back = forward ? lo : hi;
    for (let s = from - dir; dir > 0 ? s >= back : s <= back; s -= dir) {
      if (decoding.size >= MAX_DECODES) break;
      startDecode(s);
    }
  };

  const tick = () => {
    rafId = 0;
    if (disposed) return;
    const diff = target - current;
    current = Math.abs(diff) < 0.01 ? target : current + diff * 0.2;

    pumpDecodes();
    const source = nearestDecoded(Math.round(current));
    if (source !== -1 && (source !== drawnSource || dirty)) {
      paint(decoded.get(source)!);
      drawnSource = source;
      dirty = false;
      if (!revealed) {
        revealed = true;
        o.onFirstPaint();
        report();
      }
    } else if (source === -1 && dirty && ctx) {
      ctx.fillStyle = BG_HEX;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      dirty = false;
    }

    if (current !== target) schedule();
  };

  // The loop only runs while the hero is on screen and the playhead is still moving.
  function schedule() {
    if (!rafId && inView && !disposed) rafId = requestAnimationFrame(tick);
  }

  // Download in playback order (reduced motion only needs the last frame).
  const order = reduce ? [lastSlot] : urls.map((_, s) => s);
  function report() {
    const share = Math.min(1, fetched / Math.min(order.length, READY_FRAMES));
    o.onLoad({
      fetched: fetched / order.length,
      heroProgress: share * 0.9 + (revealed ? 0.1 : 0),
      done: fetched === order.length,
    });
  }

  let nextFetch = 0;
  const fetchWorker = async () => {
    while (!disposed && nextFetch < order.length) {
      const s = order[nextFetch++];
      try {
        const res = await fetch(urls[s], { signal: controller.signal });
        if (res.ok) blobs[s] = await res.blob();
      } catch {
        if (disposed) return;
      }
      fetched++;
      report();
      pumpDecodes();
    }
  };

  applyLayout();
  schedule();
  for (let i = 0; i < MAX_FETCHES; i++) fetchWorker();

  return {
    setProgress(p) {
      if (reduce) return;
      target = clamp01(p) * lastSlot;
      schedule();
    },
    setLayout(next) {
      layout = next;
      applyLayout();
      schedule();
    },
    setInView(next) {
      inView = next;
      if (inView) schedule();
    },
    dispose() {
      disposed = true;
      controller.abort();
      if (rafId) cancelAnimationFrame(rafId);
      decoded.forEach(releaseFrame);
      decoded.clear();
    },
  };
}
