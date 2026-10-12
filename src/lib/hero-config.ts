export const BG_HEX = "#EAE1D2";

// the animation uses the first 82% of the frames and then holds on the last one, because the final part of the clip is almost static. Set to 1 if the frames are already trimmed.
export const HERO_END_RATIO = 0.82;

// crops 3% off the right and bottom of each frame to hide the Veo watermark; set to 1 for no crop
export const FRAME_CROP = 0.97;

/**
 * Returns frame step based on screen width:
 * 2 on mobile (< 768px) to reduce memory & bandwidth, 1 on desktop.
 */
export function frameStep(isMobile: boolean): number {
  return isMobile ? 2 : 1;
}
