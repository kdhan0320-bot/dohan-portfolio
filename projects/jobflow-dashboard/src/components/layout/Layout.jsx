import { Suspense, useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import Header from './Header';
import SiteFooter from './SiteFooter';

export default function Layout() {
  const { pathname } = useLocation();
  const mainRef = useRef(null);
  const contentRef = useRef(null);
  useEffect(() => {
    window.scrollTo(0, 0);
    contentRef.current?.scrollTo(0, 0);
  }, [pathname]);

  return <div className="workspace-shell workspace-with-topnav">
    <a className="skip-link" href="#main-content" onClick={event => {
      event.preventDefault();
      mainRef.current?.focus({ preventScroll: true });
    }}>본문으로 바로가기</a>
    <Header />
    <div className="workspace-content" ref={contentRef}>
      <main className="workspace-main" id="main-content" ref={mainRef} tabIndex={-1}>
        <Suspense fallback={<div className="route-load-state" role="status"><CircularProgress size={28} /><p>화면을 불러오고 있어요.</p></div>}>
          <div className="route-surface" key={pathname}><Outlet /></div>
        </Suspense>
      </main>
    </div>
    <SiteFooter />
  </div>;
}
