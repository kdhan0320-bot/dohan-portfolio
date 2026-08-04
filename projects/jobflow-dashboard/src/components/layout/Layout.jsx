import { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar, { DRAWER_WIDTH } from './Sidebar';
import Header from './Header';

const Layout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [closeFocusTarget, setCloseFocusTarget] = useState(null);
  const location = useLocation();
  const menuButtonRef = useRef(null);
  const mainRef = useRef(null);
  const pendingMainFocusRef = useRef(false);
  const mobileNavigationRef = useRef(false);
  const focusRestoreTimerRef = useRef(null);
  const wasMobileOpenRef = useRef(false);

  const focusMain = () => {
    window.requestAnimationFrame(() => mainRef.current?.focus({ preventScroll: true }));
  };

  useEffect(() => {
    if (!pendingMainFocusRef.current || mobileNavigationRef.current) return;
    pendingMainFocusRef.current = false;
    focusMain();
  }, [location.pathname]);

  useEffect(() => () => {
    if (focusRestoreTimerRef.current) window.clearTimeout(focusRestoreTimerRef.current);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      wasMobileOpenRef.current = true;
      const focusTimer = window.setTimeout(() => {
        document.querySelector('.MuiModal-root [role="dialog"] a[href="#/"]')?.focus({ preventScroll: true });
      }, 100);
      return () => window.clearTimeout(focusTimer);
    }

    if (!wasMobileOpenRef.current) return;
    wasMobileOpenRef.current = false;

    if (focusRestoreTimerRef.current) window.clearTimeout(focusRestoreTimerRef.current);
    const focusDelay = closeFocusTarget === 'menu' ? 650 : 300;
    focusRestoreTimerRef.current = window.setTimeout(() => {
      if (closeFocusTarget === 'menu') {
        document.getElementById('mobile-menu-button')?.focus({ preventScroll: true });
      } else if (closeFocusTarget === 'main' && pendingMainFocusRef.current) {
        pendingMainFocusRef.current = false;
        mobileNavigationRef.current = false;
        mainRef.current?.focus({ preventScroll: true });
      }
      setCloseFocusTarget(null);
    }, focusDelay);
  }, [mobileOpen, closeFocusTarget]);

  useEffect(() => {
    if (!mobileOpen) return undefined;

    const handleEscape = (event) => {
      if (event.key !== 'Escape') return;
      event.preventDefault();
      setCloseFocusTarget('menu');
      setMobileOpen(false);
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [mobileOpen]);

  const handleDrawerClose = () => {
    // Drawer onClose는 backdrop을 포함한 MUI close 경로를 담당합니다.
    // 항목 선택은 handleRouteSelect에서 분리해 새 route의 main으로 초점을 보냅니다.
    setCloseFocusTarget('menu');
    mobileNavigationRef.current = false;
    setMobileOpen(false);
  };

  const handleRouteSelect = (path, isMobile) => {
    pendingMainFocusRef.current = true;
    mobileNavigationRef.current = isMobile;

    if (isMobile) {
      setCloseFocusTarget('main');
      setMobileOpen(false);
    } else if (path === location.pathname) {
      pendingMainFocusRef.current = false;
      focusMain();
    }
  };

  const handleSkipLink = (event) => {
    event.preventDefault();
    mainRef.current?.focus({ preventScroll: true });
  };

  const handleMenuOpen = () => {
    setCloseFocusTarget(null);
    setMobileOpen(true);
  };

  return (
    <>
      <a className="skip-link" href="#main-content" onClick={handleSkipLink}>
        본문으로 바로가기
      </a>
      <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Sidebar
        mobileOpen={mobileOpen}
        onMobileClose={handleDrawerClose}
        onRouteSelect={handleRouteSelect}
      />
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', ml: { md: `${DRAWER_WIDTH}px` }, width: { md: `calc(100% - ${DRAWER_WIDTH}px)` }, minWidth: 0 }}>
        <Header
          menuButtonRef={menuButtonRef}
          onMenuClick={handleMenuOpen}
        />
        <Box
          component="main"
          id="main-content"
          ref={mainRef}
          tabIndex={-1}
          sx={{
            flex: 1,
            width: '100%',
            maxWidth: '1440px',
            mx: 'auto',
            boxSizing: 'border-box',
            p: { xs: 2, sm: 3 },
            mt: { xs: '56px', sm: '64px' },
            scrollMarginTop: { xs: '72px', sm: '80px' },
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
    </>
  );
};

export default Layout;
