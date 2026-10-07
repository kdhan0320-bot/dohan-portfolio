import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';

export default function Layout() {
  const { pathname } = useLocation();
  const mainRef = useRef(null);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return <div className="workspace-shell workspace-with-topnav">
    <a className="skip-link" href="#main-content" onClick={event => {
      event.preventDefault();
      mainRef.current?.focus({ preventScroll: true });
    }}>본문으로 바로가기</a>
    <Header />
    <div className="workspace-content">
      <main className="workspace-main" id="main-content" ref={mainRef} tabIndex={-1}>
        <Outlet />
      </main>
    </div>
  </div>;
}
