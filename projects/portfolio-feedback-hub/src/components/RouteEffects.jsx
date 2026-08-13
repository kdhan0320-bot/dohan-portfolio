import { useEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

const scrollMemory = new Map();
const focusMemory = new Map();
const MAX_RESTORE_FRAMES = 300;
const MAX_FOCUS_FRAMES = 24;

const getEntryKey = (location) => location.key || `${location.pathname}${location.search}`;

const findFocusTarget = (focusId) => {
  if (!focusId) return null;
  return Array.from(document.querySelectorAll('[data-route-focus-id]'))
    .find(node => node.getAttribute('data-route-focus-id') === focusId) ?? null;
};

const RouteEffects = () => {
  const location = useLocation();
  const navigationType = useNavigationType();
  const transitionRef = useRef({ rafId: null, cancelled: false });
  const previousLocationRef = useRef({
    pathname: location.pathname,
    entryKey: getEntryKey(location),
  });
  const hasHandledInitialLocationRef = useRef(false);
  const entryKey = getEntryKey(location);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    const saveScrollPosition = () => {
      const hashPath = window.location.hash.slice(1).split('?')[0] || '/';
      if (hashPath !== location.pathname) return;
      scrollMemory.set(entryKey, window.scrollY);
    };

    window.addEventListener('scroll', saveScrollPosition, { passive: true });
    return () => {
      saveScrollPosition();
      window.removeEventListener('scroll', saveScrollPosition);
    };
  }, [entryKey, location.pathname]);

  useEffect(() => {
    transitionRef.current.cancelled = true;
    if (transitionRef.current.rafId != null) {
      cancelAnimationFrame(transitionRef.current.rafId);
    }

    const state = { rafId: null, cancelled: false };
    transitionRef.current = state;

    const previousLocation = previousLocationRef.current;
    const isSamePath = previousLocation.pathname === location.pathname;
    const isInitialLocation = !hasHandledInitialLocationRef.current;
    hasHandledInitialLocationRef.current = true;
    previousLocationRef.current = { pathname: location.pathname, entryKey };

    if (navigationType === 'REPLACE' && isSamePath && previousLocation.entryKey !== entryKey) {
      const previousScrollPosition = scrollMemory.get(previousLocation.entryKey);
      scrollMemory.set(entryKey, previousScrollPosition ?? window.scrollY);
      if (focusMemory.has(previousLocation.entryKey)) {
        focusMemory.set(entryKey, focusMemory.get(previousLocation.entryKey));
      }
      scrollMemory.delete(previousLocation.entryKey);
      focusMemory.delete(previousLocation.entryKey);
    }

    if (navigationType === 'POP') {
      const savedPosition = scrollMemory.get(entryKey);
      const focusId = focusMemory.get(entryKey);
      if (savedPosition != null || focusId) {
        let attempts = 0;
        const restoreScrollPosition = () => {
          if (state.cancelled) return;
          const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
          const focusTarget = findFocusTarget(focusId);
          const scrollReady = savedPosition == null || maxScroll >= savedPosition - 4;
          const focusReady = !focusId || Boolean(focusTarget);

          if ((scrollReady && focusReady) || attempts >= MAX_RESTORE_FRAMES) {
            if (savedPosition != null) {
              window.scrollTo({ top: savedPosition, behavior: 'instant' });
            }
            if (focusTarget) {
              state.rafId = requestAnimationFrame(() => {
                if (state.cancelled) return;
                focusTarget.focus({ preventScroll: true });
              });
            }
            return;
          }

          attempts += 1;
          state.rafId = requestAnimationFrame(restoreScrollPosition);
        };
        state.rafId = requestAnimationFrame(restoreScrollPosition);
      } else if (isInitialLocation) {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
      return () => { state.cancelled = true; };
    }

    if ((navigationType === 'PUSH' || navigationType === 'REPLACE') && !isSamePath) {
      const routeReturn = location.state?.routeReturn;
      if (
        routeReturn &&
        typeof routeReturn.entryKey === 'string' &&
        typeof routeReturn.focusId === 'string' &&
        Number.isFinite(routeReturn.scrollY)
      ) {
        scrollMemory.set(routeReturn.entryKey, routeReturn.scrollY);
        focusMemory.set(routeReturn.entryKey, routeReturn.focusId);
      }
      window.scrollTo({ top: 0, behavior: 'instant' });

      let attempts = 0;
      const focusRouteStart = () => {
        if (state.cancelled) return;
        const main = document.querySelector('main#main-content');
        const routeReady = Boolean(main?.querySelector('h1'));

        if (main && (routeReady || attempts >= MAX_FOCUS_FRAMES)) {
          main.focus({ preventScroll: true });
          return;
        }

        attempts += 1;
        state.rafId = requestAnimationFrame(focusRouteStart);
      };

      state.rafId = requestAnimationFrame(focusRouteStart);
      return () => { state.cancelled = true; };
    }

    return undefined;
  }, [entryKey, location.pathname, location.state, navigationType]);

  return null;
};

export default RouteEffects;
