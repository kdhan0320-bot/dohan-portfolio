import { useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Drawer, IconButton } from '@mui/material';
import MenuOutlined from '@mui/icons-material/MenuOutlined';
import Close from '@mui/icons-material/Close';
import { Brand } from '../ui/Brand';
import ActionFeedback from '../ui/ActionFeedback';
import { useAuth } from '../../context/AuthContext';
import { getAuthErrorMessage } from '../../utils/authErrors';

const mainLinks = [
  { to: '/', label: '지원 현황' },
  { to: '/calendar', label: '마감 일정' },
  { to: '/checklist', label: '준비 체크' },
  { to: '/interview', label: '면접 연습' },
  { to: '/guide', label: '이용 안내' }
];
const secondaryLinks = [
  { to: '/document-helper', label: '작성 요청문' },
  { to: '/settings', label: '설정' },
  { to: '/welcome', label: '서비스 소개' }
];
const activePath = (pathname, to) => to === '/'
  ? pathname === '/' || pathname.startsWith('/applications') || pathname === '/kanban'
  : pathname === to;

export default function SiteHeader({ publicMode = false }) {
  const { user, isGuest, enterGuestMode, signOut, loading } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const menuButtonRef = useRef(null);
  const menuCloseRef = useRef(null);
  const closeFocusRef = useRef('menu');
  const navigationLock = useRef(false);
  const hasWorkspace = Boolean(user || isGuest);
  const homePath = hasWorkspace ? '/overview' : '/welcome';

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
      navigate(to);
      if (!fromDrawer || publicMode) focusContent();
    } catch (error) {
      setFeedback({ severity: 'error', message: getAuthErrorMessage(error) });
    } finally {
      navigationLock.current = false;
      setBusy(false);
    }
  }
  async function openAccount(fromDrawer = false) {
    if (loading || navigationLock.current) return;
    navigationLock.current = true;
    setBusy(true);
    try {
      if (isGuest) await signOut();
      if (fromDrawer) {
        closeFocusRef.current = 'content';
        setMobileOpen(false);
      }
      navigate(user ? '/settings' : '/login');
      if (!fromDrawer) focusContent();
    } catch (error) {
      setFeedback({ severity: 'error', message: getAuthErrorMessage(error) });
    } finally {
      navigationLock.current = false;
      setBusy(false);
    }
  }
  const menuLink = (item, fromDrawer = false) => <Link key={item.to}
    to={item.to}
    className={activePath(pathname, item.to) ? 'is-current' : undefined}
    aria-current={activePath(pathname, item.to) ? 'page' : undefined}
    aria-disabled={busy || loading || undefined}
    onClick={event => visit(event, item.to, fromDrawer)}>{item.label}</Link>;

  return <>
    <header className={`site-header ${publicMode ? 'site-header-public' : ''}`}>
      <div className="site-header-inner">
        <Link className="site-brand-link" to={homePath} aria-label={hasWorkspace ? '갈피록 오늘의 지원' : '갈피록 서비스 소개'} onClick={event => visit(event, homePath)}><Brand /></Link>
        <nav className="site-primary-nav" aria-label="주 메뉴" aria-busy={busy}>{mainLinks.map(item => menuLink(item))}</nav>
        <div className="site-account-actions">
          <Button className="site-account-button" variant="outlined" onClick={() => openAccount()} disabled={busy || loading}>{user ? '내 계정' : '로그인'}</Button>
          <IconButton className="site-menu-toggle" ref={menuButtonRef} aria-label="메뉴 열기" aria-expanded={mobileOpen} aria-controls={mobileOpen ? 'site-mobile-menu' : undefined} onClick={() => setMobileOpen(true)}><MenuOutlined /></IconButton>
        </div>
      </div>
      <div className="site-header-meta">
        <div className="site-header-meta-inner">
          <p>{isGuest ? <><span className="site-sample-badge">샘플 체험</span><span>가상 데이터 · 새로고침하면 초기화</span></> : !user ? '메뉴를 선택하면 가상 데이터로 체험해요.' : '나의 지원 기록을 한곳에서 관리해요.'}</p>
          {hasWorkspace && <nav className="site-secondary-nav" aria-label="보조 메뉴">{secondaryLinks.map(item => menuLink(item))}</nav>}
        </div>
      </div>
    </header>
    <Drawer anchor="right" open={mobileOpen} onClose={closeMenu} ModalProps={{ disableRestoreFocus: true }} slotProps={{
      paper: { className: 'site-mobile-drawer', id: 'site-mobile-menu', role: 'dialog', 'aria-modal': true, 'aria-label': '전체 메뉴' },
      transition: { onEntered: () => menuCloseRef.current?.focus(), onExited: finishDrawerClose }
    }}>
      <div className="site-mobile-heading"><span>메뉴</span><IconButton ref={menuCloseRef} onClick={closeMenu} aria-label="메뉴 닫기"><Close /></IconButton></div>
      <nav className="site-mobile-nav" aria-label="모바일 주 메뉴" aria-busy={busy}>{mainLinks.map(item => menuLink(item, true))}</nav>
      {hasWorkspace && <nav className="site-mobile-secondary" aria-label="모바일 보조 메뉴">{secondaryLinks.map(item => menuLink(item, true))}</nav>}
      <div className="site-mobile-account">
        <p>{isGuest ? '샘플 변경은 새로고침하면 초기화돼요.' : !user ? '메뉴를 선택하면 가상 데이터로 체험해요.' : '내 계정에서 기록장 설정을 관리해요.'}</p>
        <Button variant="outlined" onClick={() => openAccount(true)} disabled={busy || loading}>{user ? '내 계정' : '로그인 / 가입'}</Button>
      </div>
    </Drawer>
    <ActionFeedback feedback={feedback} onClose={() => setFeedback(null)} />
  </>;
}
