import fs from "node:fs";
import path from "node:path";

const VALID_IMAGE_EXTENSIONS = new Set([
  ".webp",
  ".jpg",
  ".jpeg",
  ".png",
  ".avif",
]);

/**
 * Extracts the last group of digits in a filename before any trailing non-digits.
 * Example: 'ezgif-frame-001.jpg' -> 1
 * Example: 'frame_10_final.webp' -> 10
 */
function extractLastNumber(filename: string): number | null {
  const match = filename.match(/(\d+)(?=\D*$)/);
  return match ? parseInt(match[1], 10) : null;
}

/**
 * Server-only utility to discover, sort, and validate frames from /public/frames.
 * Returns an array of public URLs in sorted order.
 */
export function getFrames(): string[] {
  const framesDir = path.join(process.cwd(), "public", "frames");

  if (!fs.existsSync(framesDir)) {
    console.warn(`[getFrames] Warning: Directory does not exist: "${framesDir}".`);
    return [];
  }

  let entries: fs.Dirent[] = [];
  try {
    entries = fs.readdirSync(framesDir, { withFileTypes: true });
  } catch (err) {
    console.warn(`[getFrames] Warning: Unable to read directory: "${framesDir}".`, err);
    return [];
  }

  const validFiles: string[] = [];

  for (const entry of entries) {
    if (!entry.isFile()) continue;
    if (entry.name.startsWith(".")) continue;

    const ext = path.extname(entry.name).toLowerCase();
    if (VALID_IMAGE_EXTENSIONS.has(ext)) {
      validFiles.push(entry.name);
    }
  }

  if (validFiles.length === 0) {
    console.warn(`[getFrames] Warning: /public/frames is empty or contains no valid images.`);
    return [];
  }

  // Sort files using the last group of digits, with locale-aware fallback
  validFiles.sort((a, b) => {
    const numA = extractLastNumber(a);
    const numB = extractLastNumber(b);

    if (numA !== null && numB !== null) {
      if (numA !== numB) {
        return numA - numB;
      }
      return a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });
    }
    if (numA !== null) return -1;
    if (numB !== null) return 1;
    return a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });
  });

  // Check for gaps and duplicates
  const seenNumbers = new Map<number, string[]>();
  const duplicateIssues: string[] = [];
  const gapIssues: string[] = [];

  let prevNumber: number | null = null;
  for (const file of validFiles) {
    const num = extractLastNumber(file);
    if (num !== null) {
      if (seenNumbers.has(num)) {
        seenNumbers.get(num)!.push(file);
      } else {
        seenNumbers.set(num, [file]);
      }

      if (prevNumber !== null && num > prevNumber + 1) {
        gapIssues.push(`Missing frame(s) between #${prevNumber} and #${num} (${file})`);
      }
      prevNumber = num;
    }
  }

  for (const [num, names] of seenNumbers.entries()) {
    if (names.length > 1) {
      duplicateIssues.push(`Duplicate frame index #${num}: ${names.join(", ")}`);
    }
  }

  if (duplicateIssues.length > 0 || gapIssues.length > 0) {
    const problems = [
      ...duplicateIssues.slice(0, 5),
      ...gapIssues.slice(0, 5),
    ];
    console.warn(
      `[getFrames] Warning: Sequence issues detected in /public/frames (${validFiles.length} files):\n  - ${problems.join(
        "\n  - "
      )}`
    );
  }

  return validFiles.map((fileName) => "/frames/" + encodeURIComponent(fileName));
}
