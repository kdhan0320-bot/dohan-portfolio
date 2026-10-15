import { useRef, useState } from 'react';
import { Alert, Button, CircularProgress, IconButton, InputAdornment } from '@mui/material';
import VisibilityOutlined from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlined from '@mui/icons-material/VisibilityOffOutlined';
import { Link, useNavigate } from 'react-router-dom';
import Field from '../components/ui/Field';
import { Brand } from '../components/ui/Brand';
import { useAuth } from '../context/AuthContext';
import { getAuthErrorMessage } from '../utils/authErrors';
import { passwordValidation } from '../utils/authRecovery';
import '../styles/auth.css';

export default function ResetPasswordPage() {
  const { loading, recoveryReady, resetPassword, cancelRecovery } = useAuth();
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [reveal, setReveal] = useState(false);
  const [fields, setFields] = useState({});
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [complete, setComplete] = useState(false);
  const passwordRef = useRef(null);
  const confirmationRef = useRef(null);
  const navigate = useNavigate();

  async function submit(event) {
    event.preventDefault();
    if (busy) return;
    const next = passwordValidation(password, confirmation);
    setFields(next);
    if (Object.keys(next).length) {
      (next.password ? passwordRef : confirmationRef).current?.focus();
      return;
    }
    setBusy(true);
    setError('');
    try {
      await resetPassword(password);
      setPassword('');
      setConfirmation('');
      setComplete(true);
    } catch (caught) {
      setError(getAuthErrorMessage(caught));
    } finally {
      setBusy(false);
    }
  }

  async function cancel() {
    setBusy(true);
    setError('');
    try {
      await cancelRecovery();
      navigate('/login', { replace: true });
    } catch (caught) {
      setError(getAuthErrorMessage(caught));
    } finally {
      setBusy(false);
    }
  }

  return <main className="auth-recovery-shell">
    <section className="auth-recovery-card" aria-labelledby="reset-title">
      <Brand />
      <h1 id="reset-title">새 비밀번호 설정</h1>
      {loading ? <div className="auth-recovery-loading" role="status"><CircularProgress size={24} /><span>이메일 링크 확인 중…</span></div> : complete ? <>
        <Alert severity="success" role="status">비밀번호를 변경했어요. 이 기기에서는 로그인 상태가 유지됩니다.</Alert>
        <Button component={Link} to="/overview" variant="contained" fullWidth>오늘의 지원으로</Button>
      </> : !recoveryReady ? <>
        <Alert severity="info">유효한 비밀번호 변경 링크가 필요합니다. 이메일로 새 링크를 요청해주세요.</Alert>
        <Button component={Link} to="/login?mode=recovery" variant="contained" fullWidth>변경 링크 다시 요청</Button>
        <Button component={Link} to="/login" fullWidth>로그인으로</Button>
      </> : <>
        <p className="auth-help-description">8자 이상의 새 비밀번호를 입력해주세요.</p>
        <p className="auth-shared-account-note">이 이메일로 함께 이용하는 포트폴리오 피드백 서비스에도 새 비밀번호가 적용돼요.</p>
        <form onSubmit={submit} noValidate>
          {error && <Alert severity="error">{error}</Alert>}
          <Field inputRef={passwordRef} id="reset-password" label="새 비밀번호" required type={reveal ? 'text' : 'password'} autoComplete="new-password" value={password} disabled={busy} error={Boolean(fields.password)} helperText={fields.password} onChange={event => {
            setPassword(event.target.value);
            setFields({ ...fields, password: '' });
          }} slotProps={{ input: { endAdornment: <InputAdornment position="end"><IconButton aria-label={reveal ? '비밀번호 숨기기' : '비밀번호 보기'} aria-pressed={reveal} disabled={busy} onMouseDown={event => event.preventDefault()} onClick={() => setReveal(!reveal)} edge="end">{reveal ? <VisibilityOffOutlined /> : <VisibilityOutlined />}</IconButton></InputAdornment> } }} />
          <Field inputRef={confirmationRef} id="reset-confirmation" label="새 비밀번호 확인" required type={reveal ? 'text' : 'password'} autoComplete="new-password" value={confirmation} disabled={busy} error={Boolean(fields.confirmation)} helperText={fields.confirmation} onChange={event => {
            setConfirmation(event.target.value);
            setFields({ ...fields, confirmation: '' });
          }} />
          <Button type="submit" variant="contained" fullWidth disabled={busy}>{busy ? '처리 중…' : '비밀번호 변경'}</Button>
          <Button disabled={busy} onClick={cancel}>취소하고 로그아웃</Button>
        </form>
      </>}
    </section>
  </main>;
}
