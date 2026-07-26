import { useNavigate } from 'react-router-dom';
import {
  AppBar, Toolbar, Container, Box, Typography, Chip, Button,
} from '@mui/material';
import { Logout } from '@mui/icons-material';
import { useAuth } from '../hooks/useAuth';

const Header = () => {
  const navigate = useNavigate();
  const { user, isGuest, signOut, exitGuestMode } = useAuth();

  const handleLogout = async () => {
    if (isGuest) {
      exitGuestMode();
    } else {
      await signOut();
    }
    navigate('/login');
  };

  return (
    <AppBar position="sticky">
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ gap: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexGrow: 1, minWidth: 0 }}>
            <Box sx={{
              width: 32, height: 32, borderRadius: '8px', flexShrink: 0,
              bgcolor: 'primary.main', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Box component="svg" aria-hidden="true" viewBox="0 0 32 32" sx={{ width: 24, height: 24 }}>
                <Box component="path" d="M5.5 6.5h21v14.5h-14l-5 4v-4h-2z" fill="none" stroke="#fff" strokeWidth="2" strokeLinejoin="round" />
                <Box component="path" d="M10 11h12M10 15h8" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
              </Box>
            </Box>
            <Typography
              variant="h6"
              sx={{ fontWeight: 800, letterSpacing: '-0.3px', whiteSpace: 'nowrap', flexShrink: 0 }}
            >
              <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>Portfolio Feedback Hub</Box>
              <Box component="span" sx={{ display: { xs: 'inline', sm: 'none' } }}>Feedback Hub</Box>
            </Typography>
            {isGuest && (
              <Chip
                label="게스트 모드"
                size="small"
                sx={{ bgcolor: 'rgba(37,99,235,0.12)', color: 'primary.main', fontSize: '0.68rem', height: 22, flexShrink: 0, display: { xs: 'none', sm: 'inline-flex' } }}
              />
            )}
          </Box>

          {(user || isGuest) ? (
            <Button
              size="small"
              variant="outlined"
              onClick={handleLogout}
              aria-label={isGuest ? '게스트 모드 나가기' : '로그아웃'}
              startIcon={<Logout fontSize="small" />}
              sx={{
                minWidth: 0,
                minHeight: 44,
                px: { xs: 1.25, sm: 1.5 },
                flexShrink: 0,
                whiteSpace: 'nowrap',
                '& .MuiButton-startIcon': { mr: 0.75 },
              }}
            >
              {isGuest ? (
                <>
                  <Box component="span" sx={{ display: { xs: 'inline', sm: 'none' } }}>나가기</Box>
                  <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>게스트 나가기</Box>
                </>
              ) : '로그아웃'}
            </Button>
          ) : (
            <Button size="small" variant="outlined" onClick={() => navigate('/login')} sx={{ fontSize: '0.78rem', minHeight: 44, flexShrink: 0 }}>
              로그인
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
