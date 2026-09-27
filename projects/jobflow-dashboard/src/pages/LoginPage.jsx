import Field from '../components/ui/Field';
import { useRef, useState } from 'react';
import { Button, Alert, Tabs, Tab, IconButton, InputAdornment } from '@mui/material';
import VisibilityOutlined from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlined from '@mui/icons-material/VisibilityOffOutlined';
import ArrowForward from '@mui/icons-material/ArrowForward';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { isAuthConfigured } from '../lib/supabase';
import { getAuthErrorMessage } from '../utils/authErrors';
import { Brand } from '../components/ui/Brand';
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export default function LoginPage() {
  const [tab, setTab] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [reveal, setReveal] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [fields, setFields] = useState({});
  const [busy, setBusy] = useState(false);
  const {
    authError,
    signIn,
    signUp,
    enterGuestMode
  } = useAuth();
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  async function submit(e) {
    e.preventDefault();
    if (busy) return;
    setError('');
    setSuccess('');
    const next = {};
    if (!EMAIL_PATTERN.test(email.trim())) next.email = email.trim() ? '올바른 이메일 형식으로 입력해주세요.' : '이메일을 입력해주세요.';
    if (!password) next.password = '비밀번호를 입력해주세요.';else if (tab === 1 && password.length < 8) next.password = '비밀번호는 8자 이상 입력해주세요.';
    setFields(next);
    if (Object.keys(next).length) {
      (next.email ? emailRef : passwordRef).current?.focus();
      return;
    }
    if (!isAuthConfigured) {
      setError('이 미리보기에서는 계정 저장을 사용할 수 없어요. 가입 없이 둘러보기를 이용해주세요.');
      return;
    }
    setBusy(true);
    try {
      if (tab === 0) {
        await signIn(email.trim(), password);
        navigate('/overview');
      } else {
        const result = await signUp(email.trim(), password, displayName.trim());
        if (result.requiresEmailConfirmation) {
          setTab(0);
          setPassword('');
          setSuccess('인증 이메일을 확인해주세요. 이메일 인증을 마치면 로그인할 수 있어요.');
        } else navigate('/overview');
      }
    } catch (e) {
      setError(getAuthErrorMessage(e));
    } finally {
      setBusy(false);
    }
  }
  async function demo() {
    if (busy) return;
    setBusy(true);
    setError('');
    try {
      await enterGuestMode();
      navigate('/overview');
    } catch (e) {
      setError(getAuthErrorMessage(e));
    } finally {
      setBusy(false);
    }
  }
  return <main className="login-shell">
  <section className="login-story">
    <div className="login-brand-row"><Link to="/welcome" aria-label="갈피록 서비스 소개"><Brand /></Link><Button className="login-jump" onClick={() => emailRef.current?.focus()}>로그인 / 가입</Button></div>
    <div className="login-story-center">
      <h1>어디에 지원했는지,<br />한눈에.</h1>
      <div className="login-brand-art" aria-hidden="true" />
      <div className="login-demo">
        <Button variant="contained" endIcon={<ArrowForward />} onClick={demo} disabled={busy}>가입 없이 둘러보기</Button>
        <small>가상 회사로 체험 · 새로고침하면 초기화</small>
      </div>
    </div>
    <a className="login-foot" href="https://kdhan0320-bot.github.io/dohan-portfolio/my-portfolio/">← 포트폴리오로 돌아가기</a>
  </section>
  <section className="login-form-section">
    <Button component={Link} to="/welcome" className="login-back">← 서비스 소개</Button>

    <h2>
      {tab === 0 ? '다시 만나 반가워요' : '내 지원 현황 만들기'}
    </h2>
    <Tabs value={tab} onChange={(_, v) => {
        setTab(v);
        setFields({});
        setError('');
        setSuccess('');
      }} variant="fullWidth" aria-label="로그인 또는 회원가입">
      <Tab label="로그인" disabled={busy} />
      <Tab label="회원가입" disabled={busy} />
    </Tabs>
    <form onSubmit={submit} noValidate>
      {!isAuthConfigured && <p className="auth-preview-note">미리보기에서는 샘플 체험만 가능합니다.</p>}
      {(error || authError) && <Alert severity="error">
        {error || authError}
      </Alert>}
      {success && <Alert severity="success">
        {success}
      </Alert>}
      {tab === 1 && <Field label="이름 (선택)" placeholder="이름을 입력해주세요" autoComplete="name" value={displayName} onChange={e => setDisplayName(e.target.value)} disabled={busy} />}
      <Field inputRef={emailRef} id="auth-email" label="이메일" placeholder="name@example.com" type="email" autoComplete="email" required value={email} onChange={e => {
          setEmail(e.target.value);
          setFields({
            ...fields,
            email: ''
          });
        }} error={Boolean(fields.email)} helperText={fields.email} disabled={busy} />
      <Field inputRef={passwordRef} id="auth-password" label="비밀번호" placeholder="비밀번호를 입력해주세요" type={reveal ? 'text' : 'password'} autoComplete={tab === 0 ? 'current-password' : 'new-password'} required value={password} onChange={e => {
          setPassword(e.target.value);
          setFields({
            ...fields,
            password: ''
          });
        }} error={Boolean(fields.password)} helperText={fields.password || (tab === 1 ? '8자 이상 입력해주세요.' : '')} disabled={busy} slotProps={{
          input: {
            endAdornment: <InputAdornment position="end">
        <IconButton aria-label={reveal ? '비밀번호 숨기기' : '비밀번호 보기'} aria-pressed={reveal} disabled={busy} onMouseDown={e => e.preventDefault()} onClick={() => setReveal(!reveal)} edge="end">
          {reveal ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
        </IconButton>
      </InputAdornment>
          }
        }} />
      <Button type="submit" variant="contained" fullWidth disabled={busy}>
        {busy ? '처리 중…' : tab === 0 ? '로그인' : '회원가입'}
      </Button>
    </form>
  </section>
</main>;
}
