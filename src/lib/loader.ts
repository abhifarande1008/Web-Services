export const HERO_PROGRESS_EVENT = "hero:progress";

declare global {
  interface Window {
    __heroProgress?: number;
  }
}

/** Lets the site loader follow the hero's frame preloading (0..1). */
export function reportHeroProgress(progress: number) {
  window.__heroProgress = progress;
  window.dispatchEvent(new CustomEvent<number>(HERO_PROGRESS_EVENT, { detail: progress }));
}
