import type Lenis from "lenis";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/** Height of the fixed navbar plus a little breathing room (5.5rem, which grows on wide screens). */
export function navOffset() {
  return 5.5 * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (window.__lenis) {
    window.__lenis.scrollTo(el, { offset: -navOffset() });
  } else {
    el.scrollIntoView({ behavior: "smooth" });
  }
}
