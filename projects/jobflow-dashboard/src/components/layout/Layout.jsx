import { useRef, useState } from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Sidebar, { DRAWER_WIDTH } from './Sidebar';
import Header from './Header';

const Layout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const menuCloseButtonRef = useRef(null);
  const mainRef = useRef(null);
  const closeFocusTargetRef = useRef('menu');

  const focusMain = () => {
    window.requestAnimationFrame(() => mainRef.current?.focus({ preventScroll: true }));
  };

  const handleDrawerClose = () => {
    closeFocusTargetRef.current = 'menu';
    setMobileOpen(false);
  };

  const handleRouteSelect = (isMobile) => {
    if (isMobile) {
      closeFocusTargetRef.current = 'main';
      setMobileOpen(false);
    } else {
      focusMain();
    }
  };

  const handleDrawerExited = () => {
    if (closeFocusTargetRef.current === 'main') {
      focusMain();
    } else {
      window.requestAnimationFrame(() => menuButtonRef.current?.focus({ preventScroll: true }));
    }
    closeFocusTargetRef.current = 'menu';
  };

  const handleDrawerEntered = () => {
    menuCloseButtonRef.current?.focus({ preventScroll: true });
  };

  const handleSkipLink = (event) => {
    event.preventDefault();
    mainRef.current?.focus({ preventScroll: true });
  };

  const handleMenuOpen = () => {
    closeFocusTargetRef.current = 'menu';
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
        onMobileEntered={handleDrawerEntered}
        onMobileExited={handleDrawerExited}
        onRouteSelect={handleRouteSelect}
        mobileCloseButtonRef={menuCloseButtonRef}
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
