import { Link, useLocation } from 'react-router-dom';
import { Box, Drawer, IconButton } from '@mui/material';
import Close from '@mui/icons-material/Close';
import HomeOutlined from '@mui/icons-material/HomeOutlined';
import CalendarMonthOutlined from '@mui/icons-material/CalendarMonthOutlined';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import WorkOutline from '@mui/icons-material/WorkOutlined';
import CheckBoxOutlined from '@mui/icons-material/CheckBoxOutlined';
import ChatBubbleOutline from '@mui/icons-material/ChatBubbleOutlined';
import EditNote from '@mui/icons-material/EditNote';
import SettingsOutlined from '@mui/icons-material/SettingsOutlined';
import { Brand } from '../ui/Brand';
import { useAuth } from '../../context/AuthContext';
const DRAWER_WIDTH = 200;
const links = [['/overview', '오늘의 지원', HomeOutlined], ['/', '지원 현황', WorkOutline], ['/calendar', '마감 일정', CalendarMonthOutlined], ['/checklist', '준비 체크', CheckBoxOutlined], ['/interview', '면접 연습', ChatBubbleOutline]];
function SidebarContent({
  onNavigate,
  onClose,
  closeButtonRef,
  isMobile = false
}) {
  const {
    pathname
  } = useLocation();
  const {
    user,
    isGuest
  } = useAuth();
  return <div className="sidebar-content">
  <div className="sidebar-brand">
    <Link to="/overview" aria-label="갈피록 오늘의 지원" onClick={() => onNavigate?.(isMobile)}>
      <Brand />
    </Link>
    {isMobile && <IconButton ref={closeButtonRef} onClick={onClose} aria-label="메뉴 닫기">
      <Close />
    </IconButton>}
  </div>

  <div className="sidebar-label">나의 취업 준비</div>
  <nav className="main-nav" aria-label="주 메뉴">
    {links.map(([to, label, Icon]) => {
        const active = to === '/' ? pathname === '/' || pathname.startsWith('/applications') || pathname === '/kanban' : pathname.startsWith(to);
        return <Link className={`nav-item ${active ? 'active' : ''} `} key={to} to={to} aria-current={active ? 'page' : undefined} onClick={() => onNavigate?.(isMobile)}>
      <Icon fontSize="small" />
      <span>
        {label}
      </span>
      {active && <span className="nav-dot" />}
    </Link>;
      })}
  </nav>
  <div className="sidebar-bottom">
    <nav className="secondary-nav" aria-label="보조 메뉴">
      <Link to="/document-helper" onClick={() => onNavigate?.(isMobile)} aria-current={pathname === '/document-helper' ? 'page' : undefined}><EditNote fontSize="small" />문장 도우미</Link>
      <Link to="/welcome" onClick={() => onNavigate?.(isMobile)}><InfoOutlined fontSize="small" />서비스 소개</Link>
      <Link to="/settings" onClick={() => onNavigate?.(isMobile)} aria-current={pathname === '/settings' ? 'page' : undefined}><SettingsOutlined fontSize="small" />설정</Link>
    </nav>
    <div className="profile-mini">
      <span className="profile-dot">
        {isGuest ? '샘' : (user?.email?.[0] ?? '나').toUpperCase()}
      </span>
      <div>
        <strong>
          {isGuest ? '체험 중' : '내 계정'}
        </strong>
        <small>
          {isGuest ? '샘플 데이터' : user?.email}
        </small>
      </div>
    </div>
    <a className="portfolio-link" href="https://kdhan0320-bot.github.io/dohan-portfolio/my-portfolio/">← 포트폴리오</a>
  </div>
</div>;
}
export default function Sidebar({
  mobileOpen,
  onMobileClose,
  onMobileEntered,
  onMobileExited,
  onRouteSelect,
  mobileCloseButtonRef
}) {
  return <Box component="aside">
  <Drawer variant="temporary" open={mobileOpen} onClose={onMobileClose} ModalProps={{
      keepMounted: true,
      disableRestoreFocus: true
    }} slotProps={{
      paper: {
        tabIndex: -1,
        'aria-label': '주 메뉴'
      },
      transition: {
        onEntered: onMobileEntered,
        onExited: onMobileExited
      }
    }} sx={{
      display: {
        xs: 'block',
        md: 'none'
      },
      '& .MuiDrawer-paper': {
        width: DRAWER_WIDTH,
        bgcolor: '#F1EEF3'
      }
    }}>
    <SidebarContent onNavigate={onRouteSelect} onClose={onMobileClose} closeButtonRef={mobileCloseButtonRef} isMobile />
  </Drawer>
  <Drawer variant="permanent" open sx={{
      display: {
        xs: 'none',
        md: 'block'
      },
      '& .MuiDrawer-paper': {
        width: DRAWER_WIDTH,
        bgcolor: '#F1EEF3',
        borderRight: '1px solid #E6E1E5'
      }
    }}>
    <SidebarContent onNavigate={onRouteSelect} />
  </Drawer>
</Box>;
}
export { DRAWER_WIDTH };
