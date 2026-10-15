const AUTH_ERROR_RULES = [
  {
    match: ['same_password', 'new password should be different'],
    message: '이전에 사용한 비밀번호와 다른 비밀번호를 입력해주세요.',
  },
  {
    match: ['recovery_session_missing', 'otp_expired', 'otp expired'],
    message: '비밀번호 변경 링크가 만료되었거나 유효하지 않습니다. 새 링크를 요청해주세요.',
  },
  {
    match: ['reauthentication_needed', 'reauthentication_not_valid', 'reauthentication'],
    message: '본인 확인이 필요합니다. 새 비밀번호 변경 링크를 요청해주세요.',
  },
  {
    match: ['invalid login credentials', 'invalid credentials'],
    message: '이메일 또는 비밀번호가 올바르지 않습니다.',
  },
  {
    match: ['email not confirmed'],
    message: '이메일 확인이 필요합니다. 받은 편지함의 인증 링크를 확인해주세요.',
  },
  {
    match: ['user already registered', 'already been registered', 'already registered'],
    message: '이미 가입된 이메일입니다. 로그인하거나 다른 이메일을 사용해주세요.',
  },
  {
    match: ['password should be at least', 'password is too short'],
    message: '비밀번호는 8자 이상 입력해주세요.',
  },
  {
    match: ['weak_password', 'weak password'],
    message: '안전한 비밀번호를 사용해주세요. 다른 곳에서 쓰지 않는 긴 비밀번호를 권장합니다.',
  },
  {
    match: ['rate limit', 'rate_limit', 'too many requests'],
    message: '요청이 너무 많습니다. 잠시 후 다시 시도해주세요.',
  },
  {
    match: ['failed to fetch', 'networkerror', 'network request', 'fetch failed'],
    message: '네트워크 연결을 확인한 뒤 다시 시도해주세요.',
  },
  {
    match: ['session', 'refresh token'],
    message: '로그인 상태를 확인하지 못했습니다. 다시 로그인해주세요.',
  },
];

export const getAuthErrorMessage = (
  error,
  fallback = '인증 요청을 처리하지 못했습니다. 잠시 후 다시 시도해주세요.',
) => {
  if (error?.name === 'JobFlowAuthError') return error.message;

  const source = `${error?.code ?? ''} ${error?.message ?? ''}`.toLowerCase();
  const rule = AUTH_ERROR_RULES.find(({ match }) => match.some((keyword) => source.includes(keyword)));
  return rule?.message ?? fallback;
};

export const createAuthError = (error, fallback) => {
  const safeError = new Error(getAuthErrorMessage(error, fallback));
  safeError.name = 'JobFlowAuthError';
  if (typeof error?.code === 'string') safeError.code = error.code;
  return safeError;
};
