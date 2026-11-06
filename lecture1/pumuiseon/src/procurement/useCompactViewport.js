import { useSyncExternalStore } from 'react';

const compactViewport = '(max-width: 680px)';

function subscribe(notify) {
  const query = window.matchMedia(compactViewport);
  query.addEventListener('change', notify);
  return () => query.removeEventListener('change', notify);
}

function isCompact() {
  return window.matchMedia(compactViewport).matches;
}

export default function useCompactViewport() {
  return useSyncExternalStore(subscribe, isCompact);
}
