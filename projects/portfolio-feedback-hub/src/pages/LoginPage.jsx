import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Container, Typography, TextField, Button,
  Alert, InputAdornment, IconButton, Divider,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import { useAuth } from '../hooks/useAuth';
import { isUsernameFormatValid, normalizeUsername } from '../utils/usernamePolicy';
import { PAGE_TITLES, usePageTitle } from '../utils/pageMeta';

const LoginPage = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [form, setForm] = useState({ username: '', password: '' });
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  usePageTitle(PAGE_TITLES.login);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const normalizedUsername = normalizeUsername(form.username);
    setError('');

    if (!normalizedUsername || !form.password) {
      setError('아이디와 비밀번호를 모두 입력해주세요.');
      return;
    }
    if (!isUsernameFormatValid(normalizedUsername)) {
      setError('아이디는 영문 소문자, 숫자, 밑줄(_) 4~20자로 입력해주세요.');
      return;
    }

    setLoading(true);
    try {
      await signIn({ username: normalizedUsername, password: form.password });
      navigate('/');
    } catch {
      setError('아이디 또는 비밀번호가 올바르지 않습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleGuestMode = () => {
    navigate('/');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
      }}
    >
      <Container maxWidth="xs">

        {/* 로고 */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.2, mb: 1.5 }}>
            <Box
              sx={{
                width: 40, height: 40,
                borderRadius: '12px',
                bgcolor: 'primary.main',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <ForumOutlinedIcon aria-hidden="true" sx={{ color: '#fff', fontSize: '1.3rem' }} />
            </Box>
            <Typography component="h1" sx={{ fontWeight: 800, fontSize: '1.2rem', color: 'text.primary', letterSpacing: '-0.3px' }}>
              Portfolio Feedback Hub
              <Box
                component="span"
                sx={{
                  position: 'absolute', width: '1px', height: '1px', p: 0, m: -1,
                  overflow: 'hidden', clip: 'rect(0 0 0 0)', whiteSpace: 'nowrap', border: 0,
                }}
              >
                {' '}로그인
              </Box>
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            포트폴리오 피드백과 취업 준비 정보를 공유하고 피드백을 주고받는 커뮤니티 게시판 데모입니다.
          </Typography>
        </Box>

        <Alert severity="info" sx={{ mb: 2, borderRadius: 2 }}>
          <Typography variant="body2" sx={{ fontWeight: 700 }}>
            공개 데모는 읽기 전용으로 운영합니다.
          </Typography>
          <Typography variant="body2">
            로그인은 비공개 기능 검증 계정에 한해 사용합니다.
          </Typography>
        </Alert>

        {/* 게스트 버튼 — 최상단 Primary CTA */}
        <Button
          variant="contained"
          fullWidth
          size="large"
          onClick={handleGuestMode}
          aria-label="로그인 없이 게스트로 게시판 둘러보기"
          sx={{ mb: 1, py: 1.6, borderRadius: 2.5, fontWeight: 700, fontSize: '1rem', minHeight: 48 }}
        >
          게스트로 둘러보기
        </Button>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center', mb: 1.5 }}>
          별도 회원가입 없이 목록과 상세 화면을 읽기 전용으로 둘러볼 수 있습니다.
        </Typography>

        {/* 로그인 폼 */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            bgcolor: 'background.paper',
            borderRadius: 3,
            p: { xs: 3, sm: 4 },
            border: '1px solid',
            borderColor: 'divider',
            boxShadow: '0 2px 12px rgba(15,23,42,0.06)',
          }}
        >
          <Divider sx={{ mb: 2.5 }}>
            <Typography variant="caption" color="text.secondary">계정으로 로그인</Typography>
          </Divider>

          {error && <Alert id="login-error" severity="error" sx={{ mb: 2, borderRadius: 2 }}>{error}</Alert>}

          <TextField
            label="아이디"
            name="username"
            value={form.username}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
            autoComplete="username"
            slotProps={{
              htmlInput: {
                'aria-label': '아이디',
                'aria-describedby': error ? 'login-error' : undefined,
                'aria-invalid': Boolean(error),
              },
            }}
          />
          <TextField
            label="비밀번호"
            name="password"
            type={showPw ? 'text' : 'password'}
            value={form.password}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2.5 }}
            autoComplete="current-password"
            slotProps={{
              htmlInput: {
                'aria-label': '비밀번호',
                'aria-describedby': error ? 'login-error' : undefined,
                'aria-invalid': Boolean(error),
              },
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPw(p => !p)}
                      edge="end"
                      size="small"
                      aria-label={showPw ? '비밀번호 숨기기' : '비밀번호 표시'}
                      sx={{ width: 44, height: 44 }}
                    >
                      {showPw ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />

          <Button
            type="submit"
            variant="outlined"
            color="primary"
            fullWidth
            size="large"
            disabled={loading}
            sx={{ mb: 1.5, py: 1.3, borderRadius: 2.5, fontWeight: 700, minHeight: 44 }}
          >
            {loading ? '로그인 중...' : '로그인'}
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default LoginPage;
