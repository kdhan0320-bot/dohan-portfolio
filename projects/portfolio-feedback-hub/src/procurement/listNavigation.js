// In-memory positions belong to this tab's history, not the saved business data.
const positions = new Map();
export function rememberList(key, value) {
  positions.set(key, value);
  if (positions.size > 80) positions.delete(positions.keys().next().value);
}
export function savedListPosition(key) { return positions.get(key); }
export function listOrigin(value, fallback) {
  const base = fallback.split('?')[0];
  if (!value || typeof value.path !== 'string' || value.path.split('?')[0] !== base) return { path: fallback, y: 0 };
  return { path: value.path, y: Number.isFinite(value.y) ? Math.max(0, value.y) : 0, focusId: typeof value.focusId === 'string' ? value.focusId : '' };
}
