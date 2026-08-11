import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText,
  Typography, Divider, Avatar, Link as MuiLink, IconButton,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import WorkIcon from '@mui/icons-material/Work';
import ViewKanbanIcon from '@mui/icons-material/ViewKanban';
import ChecklistIcon from '@mui/icons-material/Checklist';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SettingsIcon from '@mui/icons-material/Settings';
import CloseIcon from '@mui/icons-material/Close';
import { useAuth } from '../../context/AuthContext';
import { isNavItemActive, NAV_ITEMS } from '../../constants';

const DRAWER_WIDTH = 240;

const NAV_ICONS = {
  dashboard: <DashboardIcon />,
  applications: <WorkIcon />,
  kanban: <ViewKanbanIcon />,
  checklist: <ChecklistIcon />,
  interview: <QuestionAnswerIcon />,
  'document-helper': <AutoAwesomeIcon />,
  settings: <SettingsIcon />,
};

const SidebarContent = ({ onNavigate, onClose, closeButtonRef, isMobile = false }) => {
  const location = useLocation();
  const { user, isGuest } = useAuth();

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 2.5, pb: 2, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 1 }}>
        <Box sx={{ minWidth: 0 }}>
          <Typography component="div" variant="h6" color="primary" fontWeight={700} letterSpacing={-0.5}>
            JobFlow
          </Typography>
          <Typography component="div" variant="caption" color="text.secondary">
            개인 구직 관리 대시보드
          </Typography>
        </Box>
        {isMobile && (
          <IconButton ref={closeButtonRef} onClick={onClose} aria-label="메뉴 닫기" edge="end" sx={{ mt: -1, mr: -1 }}>
            <CloseIcon />
          </IconButton>
        )}
      </Box>

      <Divider />

      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main', fontSize: 14 }}>
            {isGuest ? 'G' : (user?.email?.[0] ?? '?').toUpperCase()}
          </Avatar>
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="body2" fontWeight={600} noWrap>
              {isGuest ? '게스트 모드' : (user?.email?.split('@')[0] ?? '사용자')}
            </Typography>
            <Typography variant="caption" color="text.secondary" noWrap>
              {isGuest ? '읽기 전용' : user?.email}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Divider />

      <List sx={{ flex: 1, px: 1, py: 1 }}>
        {NAV_ITEMS.map((item) => {
          const active = isNavItemActive(item, location.pathname);
          return (
            <ListItemButton
              key={item.path}
              component={RouterLink}
              to={item.path}
              onClick={() => onNavigate?.(isMobile)}
              selected={active}
              aria-current={active ? 'page' : undefined}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                '&.Mui-selected': {
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                  '& .MuiListItemIcon-root': { color: 'primary.contrastText' },
                  '&:hover': { bgcolor: 'primary.dark' },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 36, color: active ? 'inherit' : 'text.secondary' }}>
                {NAV_ICONS[item.icon]}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                slotProps={{ primary: { fontSize: '0.875rem', fontWeight: active ? 600 : 400 } }}
              />
            </ListItemButton>
          );
        })}
      </List>

      <Divider />
      <Box sx={{ p: 2 }}>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontWeight: 600, mb: 0.5 }}>
          취업 준비를 한곳에서
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', lineHeight: 1.5, mb: 1 }}>
          지원 현황, 준비할 일, 면접 메모를 한 흐름으로 정리하고 다음 행동을 확인하세요.
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          <MuiLink
            href="https://github.com/kdhan0320-bot/dohan-portfolio"
            target="_blank"
            rel="noopener noreferrer"
            variant="caption"
            underline="hover"
            sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
          >
            GitHub
          </MuiLink>
          <MuiLink
            href="https://kdhan0320-bot.github.io/dohan-portfolio/my-portfolio/"
            target="_blank"
            rel="noopener noreferrer"
            variant="caption"
            underline="hover"
            sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
          >
            포트폴리오로 돌아가기
          </MuiLink>
        </Box>
      </Box>
    </Box>
  );
};

const Sidebar = ({ mobileOpen, onMobileClose, onMobileEntered, onMobileExited, onRouteSelect, mobileCloseButtonRef }) => (
  <>
    <Drawer
      variant="temporary"
      open={mobileOpen}
      onClose={onMobileClose}
      ModalProps={{ keepMounted: true, disableEscapeKeyDown: false, disableRestoreFocus: true }}
      slotProps={{
        paper: { tabIndex: -1, 'aria-label': '주 메뉴' },
        transition: { onEntered: onMobileEntered, onExited: onMobileExited },
      }}
      sx={{
        display: { xs: 'block', md: 'none' },
        '& .MuiDrawer-paper': { width: DRAWER_WIDTH, boxSizing: 'border-box' },
      }}
    >
      <SidebarContent onNavigate={onRouteSelect} onClose={onMobileClose} closeButtonRef={mobileCloseButtonRef} isMobile />
    </Drawer>
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', md: 'block' },
        '& .MuiDrawer-paper': { width: DRAWER_WIDTH, boxSizing: 'border-box', borderRight: '1px solid', borderColor: 'divider' },
      }}
      open
    >
      <SidebarContent onNavigate={onRouteSelect} />
    </Drawer>
  </>
);

export { DRAWER_WIDTH };
export default Sidebar;
