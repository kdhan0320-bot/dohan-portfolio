import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button, Alert, InputAdornment, IconButton, Divider } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Header from '../components/Header';
import BrandMark from '../components/BrandMark';
import PerspectiveBackdrop from '../components/PerspectiveBackdrop';
import { useAuth } from '../hooks/useAuth';
import { isUsernameFormatValid, normalizeUsername } from '../utils/usernamePolicy';
import { PAGE_TITLES, usePageTitle } from '../utils/pageMeta';
const LoginPage = () => {
  const navigate = useNavigate();
  const {
    signIn
  } = useAuth();
  const [form, setForm] = useState({
    username: '',
    password: ''
  });
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  usePageTitle(PAGE_TITLES.login);
  const handleChange = e => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setError('');
  };
  const handleSubmit = async e => {
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
      await signIn({
        username: normalizedUsername,
        password: form.password
      });
      navigate('/');
    } catch (failure) {
      setError(failure?.code === 'invalid_credentials' ? '아이디 또는 비밀번호가 올바르지 않습니다.' : '로그인하지 못했습니다. 연결 상태를 확인하고 다시 시도해 주세요.');
    } finally {
      setLoading(false);
    }
  };
  const handleGuestMode = () => {
    navigate('/');
  };
  return <div className="app-surface"><Header /><div className="shell login-layout">
    <section className="login-art" aria-label="고른시선 소개"><PerspectiveBackdrop /><div><span className="eyebrow">고른시선</span><h2>다른 시선이<br />만나는 곳.</h2></div></section>
    <section className="login-form"><BrandMark size={42} /><h1>다시, 고른시선.</h1><p>작업은 로그인 없이 둘러볼 수 있어요.</p>
      <Button fullWidth variant="contained" onClick={handleGuestMode}>로그인 없이 둘러보기 ↗</Button>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Divider sx={{
            mb: 3
          }}><Typography variant="caption">관리자 로그인</Typography></Divider>
        {error && <Alert id="login-error" severity="error" sx={{
            mb: 2
          }}>{error}</Alert>}
        <TextField label="아이디" name="username" disabled={loading} value={form.username} onChange={handleChange} fullWidth required autoComplete="username" sx={{
            mb: 2.5
          }} slotProps={{
            htmlInput: {
              'aria-describedby': error ? 'login-error' : 'username-hint',
              'aria-invalid': Boolean(error)
            }
          }} />
        <TextField label="비밀번호" name="password" disabled={loading} type={showPw ? 'text' : 'password'} value={form.password} onChange={handleChange} fullWidth required autoComplete="current-password" sx={{
            mb: 2.5
          }} slotProps={{
            htmlInput: {
              'aria-describedby': error ? 'login-error' : undefined,
              'aria-invalid': Boolean(error)
            },
            input: {
              endAdornment: <InputAdornment position="end"><IconButton onClick={() => setShowPw(p => !p)} edge="end" aria-label={showPw ? '비밀번호 숨기기' : '비밀번호 표시'} aria-pressed={showPw} sx={{
                  width: 44,
                  height: 44
                }}>{showPw ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}</IconButton></InputAdornment>
            }
          }} />
        <Button type="submit" variant="outlined" fullWidth disabled={loading}>{loading ? '로그인 중…' : '로그인'}</Button>
        <p id="username-hint" className="login-hint">영문 소문자·숫자·밑줄 4~20자.<br />비공개 검증 계정 전용 · 공개 가입 미제공</p>
      </Box>
    </section>
  </div></div>;
};
export default LoginPage;
