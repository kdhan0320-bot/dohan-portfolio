import { useNavigate } from 'react-router-dom';
import {
  AppBar, Toolbar, Container, Box, Typography, Chip, Button,
} from '@mui/material';
import { Logout } from '@mui/icons-material';
import { useAuth } from '../hooks/useAuth';

const Header = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
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
          </Box>

          {user ? (
            <Button
              size="small"
              variant="outlined"
              onClick={handleLogout}
              aria-label="로그아웃"
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
              로그아웃
            </Button>
          ) : (
            <Chip
              label="읽기 전용 데모"
              size="small"
              sx={{
                bgcolor: 'rgba(37,99,235,0.12)',
                color: 'primary.main',
                fontSize: '0.68rem',
                fontWeight: 700,
                height: 28,
                flexShrink: 0,
              }}
            />
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
