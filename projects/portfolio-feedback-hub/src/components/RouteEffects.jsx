import { useEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
import { getRouteEntryKey } from '../utils/routeHistory';

const scrollMemory = new Map();
const focusMemory = new Map();
const MAX_RESTORE_FRAMES = 300;
const MAX_FOCUS_FRAMES = 24;
const sectionTargets = {
  '/': { tips: 'tip-list-title' },
  '/case-study': { type: 'case-type-title', spacing: 'case-spacing-title', action: 'case-action-title', mobile: 'case-mobile-title' },
  '/checklist': Object.fromEntries(['type', 'spacing', 'action', 'contrast', 'labels', 'input', 'mobile', 'keyboard'].map(id => [id, `check-${id}-title`])),
};

const findFocusTarget = (focusId) => {
  if (!focusId) return null;
  return Array.from(document.querySelectorAll('[data-route-focus-id]'))
    .find(node => node.getAttribute('data-route-focus-id') === focusId) ?? null;
};

const RouteEffects = () => {
  const location = useLocation();
  const navigationType = useNavigationType();
  const transitionRef = useRef({ rafId: null, cancelled: false });
  const hasNavigatedRef = useRef(false);
  const previousLocationRef = useRef({
    pathname: location.pathname,
    entryKey: getRouteEntryKey(location),
  });
  const entryKey = getRouteEntryKey(location);

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
    if (!isSamePath || previousLocation.entryKey !== entryKey) hasNavigatedRef.current = true;
    const section = new URLSearchParams(location.search).get('section');
    const sectionTarget = sectionTargets[location.pathname]?.[section];
    const focusSection = () => {
      let attempts = 0;
      const findSection = () => {
        if (state.cancelled) return;
        const heading = document.getElementById(sectionTarget);
        if (heading) {
          heading.scrollIntoView({ block: 'start', behavior: 'instant' });
          heading.focus({ preventScroll: true });
          return;
        }
        if (attempts++ < MAX_RESTORE_FRAMES) state.rafId = requestAnimationFrame(findSection);
      };
      state.rafId = requestAnimationFrame(findSection);
    };
    previousLocationRef.current = { pathname: location.pathname, entryKey };

    // The current history entry retains its origin across a reload. Rehydrate
    // that one return position without adding persistent browsing storage.
    const routeReturn = location.state?.routeReturn;
    if (
      (navigationType !== 'POP' || !hasNavigatedRef.current) &&
      routeReturn &&
      typeof routeReturn.entryKey === 'string' &&
      typeof routeReturn.focusId === 'string' &&
      Number.isFinite(routeReturn.scrollY)
    ) {
      scrollMemory.set(routeReturn.entryKey, routeReturn.scrollY);
      focusMemory.set(routeReturn.entryKey, routeReturn.focusId);
    }

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
      // Initial effects can run twice in development, recording a zero scroll
      // position during cleanup. A shared section URL still takes precedence.
      if (sectionTarget && !hasNavigatedRef.current) {
        focusSection();
        return () => { state.cancelled = true; };
      }
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
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' });
        if (sectionTarget) focusSection();
      }
      return () => { state.cancelled = true; };
    }

    if ((navigationType === 'PUSH' || navigationType === 'REPLACE') && (!isSamePath || sectionTarget)) {
      window.scrollTo({ top: 0, behavior: 'instant' });

      let attempts = 0;
      const focusRouteStart = () => {
        if (state.cancelled) return;
        const main = document.querySelector('main#main-content');
        const routeReady = Boolean(main?.querySelector('h1'));

        if (main && (routeReady || attempts >= MAX_FOCUS_FRAMES)) {
          if (sectionTarget) focusSection();
          else main.focus({ preventScroll: true });
          return;
        }

        attempts += 1;
        state.rafId = requestAnimationFrame(focusRouteStart);
      };

      state.rafId = requestAnimationFrame(focusRouteStart);
      return () => { state.cancelled = true; };
    }

    return undefined;
  }, [entryKey, location.pathname, location.search, location.state, navigationType]);

  return null;
};

export default RouteEffects;
