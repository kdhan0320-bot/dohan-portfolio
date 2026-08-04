import { useRef, useState } from 'react';
import {
  Box, Container, Paper, Typography, TextField, Button,
  Alert, Tab, Tabs,
} from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getAuthErrorMessage } from '../utils/authErrors';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LoginPage = () => {
  const [tab, setTab] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { authError, signIn, signUp, enterGuestMode } = useAuth();
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const validate = () => {
    const nextErrors = {};
    const normalizedEmail = email.trim();

    if (!normalizedEmail) nextErrors.email = '이메일을 입력해주세요.';
    else if (!EMAIL_PATTERN.test(normalizedEmail)) nextErrors.email = '올바른 이메일 형식으로 입력해주세요.';

    if (!password) nextErrors.password = '비밀번호를 입력해주세요.';
    else if (password.length < 6) nextErrors.password = '비밀번호는 6자 이상 입력해주세요.';

    setFieldErrors(nextErrors);

    if (nextErrors.email) emailRef.current?.focus();
    else if (nextErrors.password) passwordRef.current?.focus();

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!validate()) return;
    setLoading(true);
    try {
      if (tab === 0) {
        await signIn(email.trim(), password);
        navigate('/');
      } else {
        const result = await signUp(email.trim(), password, displayName.trim());
        if (result.requiresEmailConfirmation) {
          setTab(0);
          setPassword('');
          setSuccess('회원가입이 완료되었습니다. 이메일 인증 후 로그인해주세요.');
          return;
        }
        if (result.profileError) {
          navigate('/settings', {
            state: {
              profileWarning:
                '회원가입은 완료되었지만 기본 프로필 저장에 실패했습니다. 이름과 목표 직무를 확인한 뒤 저장해주세요.',
            },
          });
          return;
        }
        navigate('/');
      }
    } catch (err) {
      setError(getAuthErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleGuest = async () => {
    if (loading) return;
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      await enterGuestMode();
      navigate('/');
    } catch (guestError) {
      setError(getAuthErrorMessage(guestError, '게스트 모드로 전환하지 못했습니다. 다시 시도해주세요.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
      }}
    >
      <Container maxWidth="xs">
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Box
            sx={{
              width: 56, height: 56, borderRadius: 2,
              bgcolor: 'primary.main', display: 'inline-flex',
              alignItems: 'center', justifyContent: 'center', mb: 2,
            }}
          >
            <WorkIcon sx={{ color: 'white', fontSize: 28 }} />
          </Box>
          <Typography variant="h5" component="h1" fontWeight={700} color="text.primary">
            JobFlow Dashboard
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            취업 준비 관리 대시보드
          </Typography>
        </Box>

        {/* 데모 버튼 - 최상단 CTA */}
        <Button
          fullWidth
          variant="contained"
          onClick={handleGuest}
          disabled={loading}
          size="large"
          sx={{ py: 1.75, mb: 2, fontSize: '1rem', fontWeight: 700, borderRadius: 2 }}
          aria-label="로그인 없이 데모 대시보드 체험하기"
        >
          {loading ? '전환 중...' : '데모로 둘러보기 (로그인 불필요)'}
        </Button>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center', mb: 3 }}>
          샘플 데이터를 바로 체험할 수 있으며, 저장/수정은 회원가입 후 가능합니다
        </Typography>

        <Paper elevation={0} sx={{ p: 3, border: '1px solid', borderColor: 'divider', borderRadius: 3 }}>
          <Tabs value={tab} onChange={(_, v) => { setTab(v); setError(''); setSuccess(''); setFieldErrors({}); }} sx={{ mb: 3 }}>
            <Tab label="로그인" sx={{ flex: 1, fontWeight: 600 }} />
            <Tab label="회원가입" sx={{ flex: 1, fontWeight: 600 }} />
          </Tabs>

          {(error || authError) && <Alert severity="error" sx={{ mb: 2 }}>{error || authError}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

          <Box component="form" onSubmit={handleSubmit} noValidate>
            {tab === 1 && (
              <TextField
                id="auth-display-name"
                label="이름"
                fullWidth
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                sx={{ mb: 2 }}
                placeholder="홍길동"
                helperText="선택 입력"
              />
            )}
            <TextField
              id="auth-email"
              inputRef={emailRef}
              label="이메일"
              type="email"
              fullWidth
              required
              value={email}
              onChange={(e) => { setEmail(e.target.value); setFieldErrors((current) => ({ ...current, email: '' })); }}
              sx={{ mb: 2 }}
              placeholder="example@email.com"
              error={Boolean(fieldErrors.email)}
              helperText={fieldErrors.email || 'example@email.com 형식'}
              slotProps={{
                htmlInput: {
                  'aria-label': '이메일',
                  'aria-invalid': Boolean(fieldErrors.email),
                  'aria-describedby': 'auth-email-helper-text',
                },
                formHelperText: { id: 'auth-email-helper-text' },
              }}
            />
            <TextField
              id="auth-password"
              inputRef={passwordRef}
              label="비밀번호"
              type="password"
              fullWidth
              required
              value={password}
              onChange={(e) => { setPassword(e.target.value); setFieldErrors((current) => ({ ...current, password: '' })); }}
              sx={{ mb: 3 }}
              placeholder="6자 이상"
              error={Boolean(fieldErrors.password)}
              helperText={fieldErrors.password || '6자 이상 입력하세요.'}
              slotProps={{
                htmlInput: {
                  'aria-label': '비밀번호',
                  'aria-invalid': Boolean(fieldErrors.password),
                  'aria-describedby': 'auth-password-helper-text',
                },
                formHelperText: { id: 'auth-password-helper-text' },
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              disabled={loading}
              sx={{ mb: 2, py: 1.5 }}
            >
              {loading ? '처리 중...' : tab === 0 ? '로그인' : '회원가입'}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginPage;
