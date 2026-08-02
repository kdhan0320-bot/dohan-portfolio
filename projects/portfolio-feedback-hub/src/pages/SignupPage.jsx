import { useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Box, Container, Typography, TextField, Button, Alert,
  InputAdornment, IconButton, LinearProgress, Chip,
} from '@mui/material';
import { Visibility, VisibilityOff, CheckCircle, Cancel } from '@mui/icons-material';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import { useAuth } from '../hooks/useAuth';
import {
  USERNAME_MIN_LENGTH,
  USERNAME_PATTERN_SOURCE,
  validateUsername,
} from '../utils/usernamePolicy';

const PASSWORD_RULES = [
  { label: '8자 이상', test: (pw) => pw.length >= 8 },
  { label: '영문 포함', test: (pw) => /[a-zA-Z]/.test(pw) },
  { label: '숫자 포함', test: (pw) => /\d/.test(pw) },
  { label: '특수문자 포함', test: (pw) => /[!@#$%^&*]/.test(pw) },
];

const SignupPage = () => {
  const navigate = useNavigate();
  const { signUp, checkUsernameAvailable } = useAuth();
  const [form, setForm] = useState({ username: '', password: '' });
  const [showPw, setShowPw] = useState(false);
  const [usernameStatus, setUsernameStatus] = useState(null);
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [usernameTouched, setUsernameTouched] = useState(false);
  const usernameCheckRequestRef = useRef(0);
  const usernameCheckInFlightRef = useRef(false);
  const submitInFlightRef = useRef(false);
  const usernameValidation = validateUsername(form.username);
  const showUsernameValidation = usernameTouched && !usernameValidation.isValid;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setError('');
    if (name === 'username') {
      setUsernameTouched(true);
      usernameCheckRequestRef.current += 1;
      usernameCheckInFlightRef.current = false;
      setCheckingUsername(false);
      setUsernameStatus(null);
    }
  };

  const handleCheckUsername = async () => {
    setUsernameTouched(true);
    if (loading || usernameCheckInFlightRef.current) return;

    setError('');
    setUsernameStatus(null);
    if (!usernameValidation.isValid) return;

    const requestId = ++usernameCheckRequestRef.current;
    usernameCheckInFlightRef.current = true;
    setCheckingUsername(true);
    try {
      const available = await checkUsernameAvailable(usernameValidation.normalizedUsername);
      if (requestId === usernameCheckRequestRef.current) {
        setUsernameStatus(available ? 'available' : 'taken');
      }
    } catch (err) {
      if (requestId === usernameCheckRequestRef.current) {
        setUsernameStatus(null);
        setError(err instanceof Error ? err.message : '아이디 중복확인을 완료하지 못했습니다. 잠시 후 다시 시도해주세요.');
      }
    } finally {
      if (requestId === usernameCheckRequestRef.current) {
        usernameCheckInFlightRef.current = false;
        setCheckingUsername(false);
      }
    }
  };

  const passedRules = PASSWORD_RULES.filter(r => r.test(form.password));
  const pwStrength = (passedRules.length / PASSWORD_RULES.length) * 100;
  const allPwRulesPassed = passedRules.length === PASSWORD_RULES.length;
  const formErrorId = error ? 'signup-form-error' : undefined;
  const usernameStatusId = (usernameStatus || showUsernameValidation) ? 'signup-username-status' : undefined;
  const usernameDescription = [usernameStatusId, formErrorId].filter(Boolean).join(' ') || undefined;
  const passwordDescription = [form.password ? 'signup-password-rules' : undefined, formErrorId].filter(Boolean).join(' ') || undefined;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitInFlightRef.current) return;

    setUsernameTouched(true);
    setError('');
    if (!usernameValidation.isValid) {
      setError(usernameValidation.message);
      return;
    }
    if (usernameStatus !== 'available') {
      setError('아이디 중복확인을 완료해주세요.');
      return;
    }
    if (!allPwRulesPassed) {
      setError('비밀번호 규칙을 모두 충족해주세요.');
      return;
    }

    submitInFlightRef.current = true;
    setLoading(true);
    try {
      await signUp({ username: usernameValidation.normalizedUsername, password: form.password });
      navigate('/');
    } catch (err) {
      setUsernameStatus(null);
      setError(err instanceof Error ? err.message : '회원가입 중 오류가 발생했습니다. 아이디를 확인하고 다시 시도해주세요.');
    } finally {
      submitInFlightRef.current = false;
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
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
            <Typography sx={{ fontWeight: 800, fontSize: '1.2rem', color: 'text.primary', letterSpacing: '-0.3px' }}>
              Portfolio Feedback Hub
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            수강생과 취업준비생을 위한 피드백 공간
          </Typography>
        </Box>

        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            bgcolor: 'background.paper',
            borderRadius: 3,
            p: 4,
            border: '1px solid',
            borderColor: 'divider',
            boxShadow: '0 2px 16px rgba(26,26,46,0.06)',
          }}
        >
          <Typography component="h1" variant="h2" sx={{ mb: 3, textAlign: 'center', fontWeight: 700, fontSize: '1.25rem' }}>
            회원가입
          </Typography>

          {error && <Alert id="signup-form-error" severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          {/* 아이디 + 중복확인 */}
          <Box sx={{ display: 'flex', gap: 1, mb: 0.5 }}>
            <TextField
              label="아이디"
              name="username"
              value={form.username}
              onChange={handleChange}
              fullWidth
              required
              disabled={loading}
              autoComplete="username"
              error={usernameStatus === 'taken' || showUsernameValidation}
              slotProps={{
                htmlInput: {
                  minLength: USERNAME_MIN_LENGTH,
                  pattern: USERNAME_PATTERN_SOURCE,
                  'aria-describedby': usernameDescription,
                  'aria-invalid': usernameStatus === 'taken' || showUsernameValidation,
                },
              }}
            />
            <Button
              variant="outlined"
              onClick={handleCheckUsername}
              disabled={checkingUsername || loading || !usernameValidation.isValid}
              sx={{ whiteSpace: 'nowrap', minWidth: 90, minHeight: 44 }}
            >
              {checkingUsername ? '확인 중...' : '중복확인'}
            </Button>
          </Box>
          {showUsernameValidation && (
            <Typography id="signup-username-status" role="alert" variant="caption" color="error.main" sx={{ mb: 1.5, display: 'block' }}>
              {usernameValidation.message}
            </Typography>
          )}
          {usernameStatus === 'available' && (
            <Typography id="signup-username-status" role="status" variant="caption" color="success.main" sx={{ mb: 1.5, display: 'block' }}>
              ✓ 사용 가능한 아이디입니다
            </Typography>
          )}
          {usernameStatus === 'taken' && (
            <Typography id="signup-username-status" role="status" variant="caption" color="error.main" sx={{ mb: 1.5, display: 'block' }}>
              ✗ 이미 사용 중인 아이디입니다
            </Typography>
          )}
          {!usernameStatus && !showUsernameValidation && <Box sx={{ mb: 1.5 }} />}

          {/* 비밀번호 */}
          <TextField
            label="비밀번호"
            name="password"
            type={showPw ? 'text' : 'password'}
            value={form.password}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 1 }}
            autoComplete="new-password"
            disabled={loading || usernameStatus !== 'available'}
            slotProps={{
              htmlInput: {
                'aria-describedby': passwordDescription,
                'aria-invalid': Boolean(form.password) && !allPwRulesPassed,
              },
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPw(p => !p)}
                      edge="end"
                      disabled={loading || usernameStatus !== 'available'}
                      aria-label={showPw ? '비밀번호 숨기기' : '비밀번호 표시'}
                      sx={{ width: 44, height: 44 }}
                    >
                      {showPw ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />

          {/* 비밀번호 강도 */}
          {form.password && (
            <Box id="signup-password-rules" sx={{ mb: 2 }}>
              <LinearProgress
                variant="determinate"
                value={pwStrength}
                aria-label="비밀번호 규칙 충족도"
                aria-valuetext={`${passedRules.length}/${PASSWORD_RULES.length}개 규칙 충족`}
                sx={{
                  mb: 1, height: 6, borderRadius: 3,
                  '& .MuiLinearProgress-bar': {
                    bgcolor: pwStrength <= 25 ? 'error.main' : pwStrength <= 50 ? 'warning.main' : pwStrength <= 75 ? 'primary.main' : 'success.main',
                  },
                }}
              />
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {PASSWORD_RULES.map((rule) => {
                  const ok = rule.test(form.password);
                  return (
                    <Chip
                      key={rule.label}
                      label={rule.label}
                      size="small"
                      icon={ok ? <CheckCircle sx={{ fontSize: 14 }} /> : <Cancel sx={{ fontSize: 14 }} />}
                      color={ok ? 'success' : 'default'}
                      variant="outlined"
                      sx={{ fontSize: '0.7rem' }}
                    />
                  );
                })}
              </Box>
            </Box>
          )}
          {!form.password && <Box sx={{ mb: 2 }} />}

          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2, textAlign: 'center' }}>
            포트폴리오 데모 프로젝트입니다. 실제 개인정보를 입력하지 마세요.
          </Typography>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            disabled={loading || checkingUsername}
            sx={{ mb: 2, py: 1.5, borderRadius: 2.5, fontWeight: 700, minHeight: 44 }}
          >
            {loading ? '가입 중...' : '회원가입'}
          </Button>

          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              이미 계정이 있으신가요?{' '}
              <Typography
                component={Link}
                to="/login"
                variant="body2"
                sx={{ color: 'primary.main', textDecoration: 'none', fontWeight: 600 }}
              >
                로그인
              </Typography>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default SignupPage;
