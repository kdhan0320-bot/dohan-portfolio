import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Drawer, IconButton, Menu, MenuItem } from '@mui/material';
import MenuOutlined from '@mui/icons-material/MenuOutlined';
import Close from '@mui/icons-material/Close';
import { Brand } from '../ui/Brand';
import ActionFeedback from '../ui/ActionFeedback';
import { useAuth } from '../../context/AuthContext';
import { getAuthErrorMessage } from '../../utils/authErrors';

const mainLinks = [
  { to: '/overview', label: '오늘' },
  { to: '/', label: '지원 관리' },
  { to: '/checklist', label: '준비' },
  { to: '/interview', label: '면접' }
];
const secondaryLinks = [
  { to: '/document-helper', label: '작성 요청문 도구' }
];
const activePath = (pathname, to) => {
  if (to === '/') return pathname === '/' || pathname.startsWith('/applications') || pathname === '/kanban' || pathname === '/calendar';
  if (to === '/checklist') return pathname === '/checklist';
  return pathname === to;
};

export default function SiteHeader({ publicMode = false }) {
  const { user, isGuest, enterGuestMode, loading } = useAuth();
  const { pathname, search, state } = useLocation();
  const navigate = useNavigate();
  const [accountAnchor, setAccountAnchor] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const menuButtonRef = useRef(null);
  const menuCloseRef = useRef(null);
  const closeFocusRef = useRef('menu');
  const navigationLock = useRef(false);
  const hasWorkspace = Boolean(user || isGuest);
  const homePath = '/welcome';

  useEffect(() => {
    // Wait for the destination header to mount; the previous drawer may have
    // unmounted before its exit callback can run.
    if (!publicMode || !state?.focusWelcome) return;
    const frame = window.requestAnimationFrame(() => document.getElementById('welcome-content')?.focus({ preventScroll: true }));
    return () => window.cancelAnimationFrame(frame);
  }, [publicMode, state]);

  function focusContent() {
    window.requestAnimationFrame(() => {
      const main = document.getElementById('main-content') || document.getElementById('welcome-content');
      main?.focus({ preventScroll: true });
    });
  }
  function closeMenu() {
    closeFocusRef.current = 'menu';
    setMobileOpen(false);
  }
  function finishDrawerClose() {
    if (closeFocusRef.current === 'content') focusContent();
    else menuButtonRef.current?.focus({ preventScroll: true });
    closeFocusRef.current = 'menu';
  }
  async function visit(event, to, fromDrawer = false) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (loading || navigationLock.current) return;
    navigationLock.current = true;
    setBusy(true);
    try {
      if (!hasWorkspace && to !== '/welcome' && to !== '/login') await enterGuestMode();
      if (fromDrawer) {
        closeFocusRef.current = 'content';
        setMobileOpen(false);
      }
      navigate(to, { state: fromDrawer && to === homePath ? { focusWelcome: true } : null });
      if (!fromDrawer || publicMode) focusContent();
    } catch (error) {
      setFeedback({ severity: 'error', message: getAuthErrorMessage(error) });
    } finally {
      navigationLock.current = false;
      setBusy(false);
    }
  }
  function openAccount(fromDrawer = false) {
    if (loading || navigationLock.current) return;
    navigationLock.current = true;
    setBusy(true);
    try {
      // Opening the login screen is navigation, not leaving the sample workspace.
      if (fromDrawer) {
        closeFocusRef.current = 'content';
        setMobileOpen(false);
      }
      navigate(user ? '/settings' : `/login?returnTo=${encodeURIComponent(pathname + search)}`);
      if (!fromDrawer) focusContent();
    } catch (error) {
      setFeedback({ severity: 'error', message: getAuthErrorMessage(error) });
    } finally {
      navigationLock.current = false;
      setBusy(false);
    }
  }
  const menuLink = (item, fromDrawer = false, compact = false) => <Link key={item.to}
    to={item.to}
    className={activePath(pathname, item.to) ? 'is-current' : undefined}
    aria-label={compact ? item.label : undefined}
    aria-current={activePath(pathname, item.to) ? 'page' : undefined}
    aria-disabled={busy || loading || undefined}
    onClick={event => visit(event, item.to, fromDrawer)}>{compact ? (item.mobileLabel || item.label) : item.label}</Link>;

  return <>
    <header className={`site-header ${publicMode ? 'site-header-public' : ''}`}>
      <div className="site-header-inner">
        <Link className="site-brand-link" to={homePath} aria-label="갈피록 홈" onClick={event => visit(event, homePath)}><Brand /></Link>
        <nav className="site-primary-nav" aria-label="주 메뉴" aria-busy={busy}>{mainLinks.map(item => menuLink(item))}</nav>
        <div className="site-account-actions">
          <IconButton className="site-settings-button" aria-label="도구 메뉴" aria-haspopup="menu" aria-expanded={Boolean(accountAnchor)} onClick={event => setAccountAnchor(event.currentTarget)}><MenuOutlined /></IconButton>
          {!user && <Button className="site-account-button" variant="outlined" onClick={() => openAccount()} disabled={busy || loading}>로그인</Button>}
          <IconButton className="site-menu-toggle" ref={menuButtonRef} aria-label="메뉴 열기" aria-expanded={mobileOpen} aria-controls={mobileOpen ? 'site-mobile-menu' : undefined} onClick={() => setMobileOpen(true)}><MenuOutlined /></IconButton>
        </div>
      </div>
    </header>
    {!publicMode && <nav className="site-mobile-tabbar" aria-label="주 메뉴" aria-busy={busy}>
      {mainLinks.map(item => menuLink(item, false, true))}
    </nav>}
    <Menu anchorEl={accountAnchor} open={Boolean(accountAnchor)} onClose={() => setAccountAnchor(null)}>
      {[{ to: '/settings', label: '설정' }, ...secondaryLinks].map(item => <MenuItem key={item.to} component={Link} to={item.to} onClick={event => { setAccountAnchor(null); visit(event, item.to); }}>{item.label}</MenuItem>)}
    </Menu>
    <Drawer anchor="top" open={mobileOpen} onClose={closeMenu} ModalProps={{ disableRestoreFocus: true }} slotProps={{
      paper: { className: 'site-mobile-drawer', id: 'site-mobile-menu', role: 'dialog', 'aria-modal': true, 'aria-label': publicMode ? '전체 메뉴' : '보조 메뉴' },
      transition: { onEntered: () => menuCloseRef.current?.focus(), onExited: finishDrawerClose }
    }}>
      <div className="site-mobile-heading"><span>{publicMode ? '메뉴' : '더 보기'}</span><IconButton ref={menuCloseRef} onClick={closeMenu} aria-label="메뉴 닫기"><Close /></IconButton></div>
      {publicMode && <nav className="site-mobile-nav" aria-label="모바일 주 메뉴" aria-busy={busy}>{mainLinks.map(item => menuLink(item, true))}</nav>}
      <nav className="site-mobile-secondary" aria-label="모바일 보조 메뉴">{[{ to: '/settings', label: '설정' }, ...secondaryLinks].map(item => menuLink(item, true))}</nav>
    </Drawer>
    <ActionFeedback feedback={feedback} onClose={() => setFeedback(null)} />
  </>;
}
