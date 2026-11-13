import type Lenis from "lenis";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/** Height of the fixed navbar plus a little breathing room. */
export const NAV_OFFSET = 88;

export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (window.__lenis) {
    window.__lenis.scrollTo(el, { offset: -NAV_OFFSET });
  } else {
    el.scrollIntoView({ behavior: "smooth" });
  }
}
