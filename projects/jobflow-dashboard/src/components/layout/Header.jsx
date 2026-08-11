import { useState } from 'react';
import { Alert, AppBar, Toolbar, IconButton, Typography, Box, Chip, Snackbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { DRAWER_WIDTH } from './Sidebar';
import { getRouteTitle } from '../../constants';
import { getAuthErrorMessage } from '../../utils/authErrors';

const Header = ({ onMenuClick, menuButtonRef }) => {
  const { signOut, isGuest } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const title = getRouteTitle(location.pathname);
  const [logoutError, setLogoutError] = useState('');

  const handleMenuClick = (event) => {
    event.currentTarget.focus();
    onMenuClick();
  };

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      setLogoutError(getAuthErrorMessage(error, '로그아웃하지 못했습니다. 다시 시도해주세요.'));
    }
  };

  return (
    <>
      <AppBar
      position="fixed"
      elevation={0}
      sx={{
        width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
        ml: { md: `${DRAWER_WIDTH}px` },
        bgcolor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
        color: 'text.primary',
      }}
      >
      <Toolbar
        sx={{
          minHeight: { xs: 56, sm: 64 },
          width: '100%',
          maxWidth: '1440px',
          mx: 'auto',
          boxSizing: 'border-box',
        }}
      >
        <IconButton
          id="mobile-menu-button"
          ref={menuButtonRef}
          edge="start"
          onClick={handleMenuClick}
          sx={{ mr: 2, display: { md: 'none' } }}
          aria-label="메뉴 열기"
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" component="div" sx={{ flex: 1, fontWeight: 600 }}>
          {title}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {isGuest && (
            <Chip label="게스트 모드" size="small" color="warning" variant="outlined" />
          )}
          <IconButton
            onClick={handleLogout}
            aria-label={isGuest ? '게스트 종료' : '로그아웃'}
            size="small"
            sx={{ color: 'text.secondary' }}
          >
            <LogoutIcon fontSize="small" />
          </IconButton>
        </Box>
      </Toolbar>
      </AppBar>
      <Snackbar
        open={Boolean(logoutError)}
        autoHideDuration={4000}
        onClose={() => setLogoutError('')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="error" variant="filled" onClose={() => setLogoutError('')}>
          {logoutError}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Header;
