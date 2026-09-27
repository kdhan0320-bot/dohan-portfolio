import { useState } from 'react';
import { AppBar, Toolbar, IconButton, Button } from '@mui/material';
import Menu from '@mui/icons-material/Menu';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { DRAWER_WIDTH } from './Sidebar';
import ActionFeedback from '../ui/ActionFeedback';
export default function Header({
  onMenuClick,
  menuButtonRef
}) {
  const {
    signOut,
    isGuest
  } = useAuth();
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState(null);
  async function leave() {
    try {
      await signOut();
      navigate('/login');
    } catch {
      setFeedback({
        severity: 'error',
        message: '로그아웃하지 못했습니다. 다시 시도해주세요.'
      });
    }
  }
  return <>
  <AppBar position="fixed" elevation={0} sx={{
      width: {
        md: `calc(100% - ${DRAWER_WIDTH}px)`
      },
      ml: {
        md: `${DRAWER_WIDTH}px`
      },
      bgcolor: '#F7F5F1',
      color: 'text.primary',
      borderBottom: '1px solid',
      borderColor: 'divider'
    }}>
    <Toolbar sx={{
        minHeight: {
          xs: 56,
          sm: 64
        },
        gap: 1
      }}>
      <IconButton ref={menuButtonRef} onClick={onMenuClick} aria-label="메뉴 열기" sx={{
          display: {
            md: 'none'
          }
        }}>
        <Menu />
      </IconButton>
      <span className="mobile-brand">갈피록</span>
      <div className="header-session">
        {isGuest && <span className="demo-label">샘플 <span>· 새로고침하면 초기화</span></span>}
        <Button onClick={leave} size="small">
          {isGuest ? '로그인' : '로그아웃'}
        </Button>
      </div>
    </Toolbar>
  </AppBar>
  <ActionFeedback feedback={feedback} onClose={() => setFeedback(null)} />
</>;
}
