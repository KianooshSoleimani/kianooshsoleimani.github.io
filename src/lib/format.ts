const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2018-04" → "Apr 2018"; with approx → "≈ Apr 2018". */
export function formatMonth(date: string, approx = false): string {
  const [y, m] = date.split("-");
  const label = `${MONTHS[Number(m) - 1]} ${y}`;
  return approx ? `≈ ${label}` : label;
}

/** Short git-style id from a commit id, e.g. "nb-ai-layer" → "nb-ai-l". */
export function shortSha(id: string): string {
  let h = 0;
  for (const ch of id) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return h.toString(16).padStart(7, "0").slice(0, 7);
}
