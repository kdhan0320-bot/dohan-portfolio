// In-memory positions belong to this tab's history, not the saved business data.
const positions = new Map();
export function rememberList(key, value) {
  positions.set(key, value);
  if (positions.size > 80) positions.delete(positions.keys().next().value);
}
export function savedListPosition(key) { return positions.get(key); }
export function plainClick(event) {
  return event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;
}
export function listOrigin(value, fallback) {
  const base = fallback.split('?')[0];
  if (!value || typeof value.path !== 'string' || value.path.split('?')[0] !== base) return { path: fallback, y: 0 };
  return { path: value.path, y: Number.isFinite(value.y) ? Math.max(0, value.y) : 0, focusId: typeof value.focusId === 'string' ? value.focusId : '' };
}

// Only pop history when this exact screen was opened by the home link.
// After an intermediate screen, use the recorded home position instead.
export function homeReturn(location, navigate) {
  const source = location.state?.listOrigin;
  if (source?.path !== '/') return null;

  const origin = listOrigin(source, '/');
  const state = { restoreList: origin };
  const direct = Boolean(source.key && source.target === location.pathname + location.search);
  function go() {
    if (direct) {
      rememberList(source.key, origin);
      navigate(-1);
    } else {
      navigate('/', { replace: true, state });
    }
  }
  function onClick(event) {
    if (!plainClick(event)) return;
    event.preventDefault();
    go();
  }
  return { direct, go, linkProps: { to: '/', replace: true, state, onClick } };
}
