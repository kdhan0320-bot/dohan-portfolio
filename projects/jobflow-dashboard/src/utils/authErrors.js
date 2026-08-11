const AUTH_ERROR_RULES = [
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
    match: ['password should be at least', 'password is too short', 'weak password'],
    message: '비밀번호는 8자 이상 입력해주세요.',
  },
  {
    match: ['rate limit', 'too many requests', 'over_email_send_rate_limit'],
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
  return safeError;
};
