import Field from '../components/ui/Field';
import { useEffect, useRef, useState } from 'react';
import { Button, Alert, Tabs, Tab, IconButton, InputAdornment } from '@mui/material';
import VisibilityOutlined from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlined from '@mui/icons-material/VisibilityOffOutlined';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { isAuthConfigured } from '../lib/supabase';
import { getAuthErrorMessage } from '../utils/authErrors';
import { EMAIL_COOLDOWN_KEY, EMAIL_COOLDOWN_MS, emailCooldownSeconds } from '../utils/authRecovery';
import { Brand } from '../components/ui/Brand';
import { workspaceReturn } from '../utils/workspaceReturn';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const readEmailCooldown = () => {
  try { return emailCooldownSeconds(window.sessionStorage.getItem(EMAIL_COOLDOWN_KEY)); } catch { return 0; }
};

export default function LoginPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tab, setTab] = useState(0);
  const requestedMode = searchParams.get('mode');
  const helpMode = ['recovery', 'confirmation'].includes(requestedMode) ? requestedMode : null;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [reveal, setReveal] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [needsConfirmation, setNeedsConfirmation] = useState(false);
  const [fields, setFields] = useState({});
  const [busy, setBusy] = useState(false);
  const [cooldown, setCooldown] = useState(readEmailCooldown);
  const { authError, isGuest, signIn, signUp, requestPasswordReset, resendConfirmation } = useAuth();
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const pendingModeFocus = useRef(false);
  const cooldownEnd = useRef(Date.now() + cooldown * 1000);

  useEffect(() => {
    if (!pendingModeFocus.current) return;
    pendingModeFocus.current = false;
    emailRef.current?.focus();
  }, [helpMode]);

  useEffect(() => {
    if (!cooldown) return;
    const timer = window.setInterval(() => setCooldown(emailCooldownSeconds(cooldownEnd.current)), 1000);
    return () => window.clearInterval(timer);
  }, [cooldown]);

  function startCooldown() {
    cooldownEnd.current = Date.now() + EMAIL_COOLDOWN_MS;
    try { window.sessionStorage.setItem(EMAIL_COOLDOWN_KEY, String(cooldownEnd.current)); } catch { /* Keep the current page timer. */ }
    setCooldown(60);
  }

  function changeMode(mode) {
    pendingModeFocus.current = true;
    const nextParams = new URLSearchParams(searchParams);
    if (mode) nextParams.set('mode', mode);
    else nextParams.delete('mode');
    setSearchParams(nextParams, { replace: true });
    setTab(0);
    setPassword('');
    setReveal(false);
    setFields({});
    setError('');
    setSuccess('');
  }

  async function submit(event) {
    event.preventDefault();
    if (busy || (helpMode && cooldown)) return;
    setError('');
    setSuccess('');
    const next = {};
    if (!EMAIL_PATTERN.test(email.trim())) next.email = email.trim() ? '올바른 이메일 형식으로 입력해주세요.' : '이메일을 입력해주세요.';
    if (!helpMode) {
      if (!password) next.password = '비밀번호를 입력해주세요.';
      else if (tab === 1 && password.length < 8) next.password = '비밀번호는 8자 이상 입력해주세요.';
    }
    setFields(next);
    if (Object.keys(next).length) {
      (next.email ? emailRef : passwordRef).current?.focus();
      return;
    }
    if (!isAuthConfigured) {
      setError('이 미리보기에서는 계정 저장과 이메일 전송을 사용할 수 없어요. 샘플 체험을 이용해주세요.');
      return;
    }
    setBusy(true);
    try {
      if (helpMode) {
        await (helpMode === 'recovery' ? requestPasswordReset(email.trim()) : resendConfirmation(email.trim()));
        startCooldown();
        setSuccess(helpMode === 'recovery'
          ? '가입된 이메일이라면 비밀번호 변경 링크가 도착합니다. 받은 편지함과 스팸함을 확인해주세요.'
          : '인증이 필요한 이메일이라면 인증 링크가 도착합니다. 받은 편지함과 스팸함을 확인해주세요.');
      } else if (tab === 0) {
        await signIn(email.trim(), password);
        navigate('/overview');
      } else {
        const result = await signUp(email.trim(), password, displayName.trim());
        if (result.requiresEmailConfirmation) {
          setNeedsConfirmation(true);
          startCooldown();
          setTab(0);
          setPassword('');
          setSuccess('인증 이메일을 확인해주세요. 이메일 인증을 마치면 로그인할 수 있어요.');
        } else navigate('/overview');
      }
    } catch (caught) {
      if (caught.code === 'email_not_confirmed') setNeedsConfirmation(true);
      if (helpMode && caught.code?.includes('rate_limit')) startCooldown();
      setError(getAuthErrorMessage(caught));
    } finally {
      setBusy(false);
    }
  }

  const heading = helpMode === 'recovery' ? '비밀번호 다시 설정' : helpMode === 'confirmation' ? '인증 이메일 다시 받기' : tab === 0 ? '로그인' : '회원가입';
  return <main className="login-shell login-task-first">
    <section className="login-form-section" aria-labelledby="login-title">
      <div className="login-form-brand"><Link to="/welcome" aria-label="갈피록 서비스 소개"><Brand /></Link></div>
      <Button component={Link} to={isGuest ? workspaceReturn(searchParams.get('returnTo')) : '/welcome'} className="login-back">돌아가기</Button>
      <h1 id="login-title">{heading}</h1>
      {helpMode ? <p className="auth-help-description">가입할 때 사용한 이메일을 입력해주세요.</p> : <Tabs value={tab} onChange={(_, value) => {
        setTab(value);
        setPassword('');
        setReveal(false);
        setFields({});
        setError('');
        setSuccess('');
      }} variant="fullWidth" aria-label="로그인 또는 회원가입">
        <Tab id="auth-tab-0" aria-controls="auth-panel-0" label="로그인" disabled={busy} />
        <Tab id="auth-tab-1" aria-controls="auth-panel-1" label="회원가입" disabled={busy} />
      </Tabs>}
      {(helpMode ? ['help'] : [0, 1]).map(value => <div key={value} id={!helpMode ? `auth-panel-${value}` : undefined} role={!helpMode ? 'tabpanel' : undefined} aria-labelledby={!helpMode ? `auth-tab-${value}` : undefined} hidden={!helpMode && tab !== value}>
      {(helpMode || tab === value) &&
      <form onSubmit={submit} noValidate>
        {!isAuthConfigured && <p className="auth-preview-note">미리보기에서는 샘플 체험만 가능합니다.</p>}
        {(error || (!helpMode && authError)) && <Alert severity="error">{error || authError}</Alert>}
        {success && <Alert severity="success" role="status">{success}</Alert>}
        {!helpMode && tab === 1 && <Field label="이름 (선택)" placeholder="이름을 입력해주세요" autoComplete="name" value={displayName} onChange={event => setDisplayName(event.target.value)} disabled={busy} />}
        <Field inputRef={emailRef} id="auth-email" label="이메일" placeholder="name@example.com" type="email" autoComplete="email" required value={email} onChange={event => {
          setEmail(event.target.value);
          setFields({ ...fields, email: '' });
        }} error={Boolean(fields.email)} helperText={fields.email} disabled={busy} />
        {!helpMode && <Field inputRef={passwordRef} id="auth-password" label="비밀번호" placeholder="비밀번호를 입력해주세요" type={reveal ? 'text' : 'password'} autoComplete={tab === 0 ? 'current-password' : 'new-password'} required value={password} onChange={event => {
          setPassword(event.target.value);
          setFields({ ...fields, password: '' });
        }} error={Boolean(fields.password)} helperText={fields.password || (tab === 1 ? '8자 이상 입력해주세요.' : '')} disabled={busy} slotProps={{ input: { endAdornment: <InputAdornment position="end">
          <IconButton aria-label={reveal ? '비밀번호 숨기기' : '비밀번호 보기'} aria-pressed={reveal} disabled={busy} onMouseDown={event => event.preventDefault()} onClick={() => setReveal(!reveal)} edge="end">
            {reveal ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
          </IconButton>
        </InputAdornment> } }} />}
        <Button type="submit" variant="contained" fullWidth disabled={busy || Boolean(helpMode && cooldown)}>
          {busy ? '처리 중…' : helpMode && cooldown ? `${cooldown}초 후 다시 요청` : helpMode === 'recovery' ? '변경 링크 요청' : helpMode === 'confirmation' ? '인증 이메일 요청' : tab === 0 ? '로그인' : '회원가입'}
        </Button>
      </form>}
      </div>)}
      {helpMode ? <Button className="auth-return" disabled={busy} onClick={() => changeMode(null)}>로그인으로 돌아가기</Button> : tab === 0 && <div className="auth-help-actions">
        <Button disabled={busy} onClick={() => changeMode('recovery')}>비밀번호를 잊었나요?</Button>
        {needsConfirmation && <Button disabled={busy} onClick={() => changeMode('confirmation')}>인증 이메일 다시 받기</Button>}
      </div>}
    </section>

  </main>;
}
