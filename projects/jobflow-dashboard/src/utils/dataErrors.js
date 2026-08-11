export const DATA_ERROR_CATEGORIES = Object.freeze({
  NETWORK: 'network',
  PERMISSION: 'permission',
  NOT_FOUND: 'not-found',
  TIMEOUT: 'timeout',
  RATE_LIMIT: 'rate-limit',
  GENERIC: 'generic',
});

export const SAFE_DATA_ERROR_MESSAGES = Object.freeze({
  [DATA_ERROR_CATEGORIES.NETWORK]: '네트워크 연결을 확인한 후 다시 시도해 주세요.',
  [DATA_ERROR_CATEGORIES.PERMISSION]: '이 작업을 수행할 권한이 없습니다. 다시 로그인한 후 시도해 주세요.',
  [DATA_ERROR_CATEGORIES.NOT_FOUND]: '요청한 정보를 찾을 수 없습니다.',
  [DATA_ERROR_CATEGORIES.TIMEOUT]: '요청 시간이 초과되었습니다. 잠시 후 다시 시도해 주세요.',
  [DATA_ERROR_CATEGORIES.RATE_LIMIT]: '요청이 많아 처리하지 못했습니다. 잠시 후 다시 시도해 주세요.',
  [DATA_ERROR_CATEGORIES.GENERIC]: '데이터를 처리하는 중 오류가 발생했습니다. 다시 시도해 주세요.',
});

const safeMessages = new Set(Object.values(SAFE_DATA_ERROR_MESSAGES));

const normalizeSignal = (value) => (
  typeof value === 'string' || typeof value === 'number'
    ? String(value).toLowerCase()
    : ''
);

export const getDataErrorCategory = (error) => {
  const code = normalizeSignal(error?.code);
  const status = Number(error?.status ?? error?.statusCode);
  const signal = [error?.name, error?.code, error?.message]
    .map(normalizeSignal)
    .filter(Boolean)
    .join(' ');

  if (
    status === 429
    || code === '429'
    || code === 'over_request_rate_limit'
    || /rate.?limit|too many requests/.test(signal)
  ) {
    return DATA_ERROR_CATEGORIES.RATE_LIMIT;
  }

  if (
    status === 408
    || status === 504
    || ['57014', 'pgrst003', 'etimedout', 'econnaborted'].includes(code)
    || /time.?out|timed out|deadline exceeded/.test(signal)
  ) {
    return DATA_ERROR_CATEGORIES.TIMEOUT;
  }

  if (
    status === 401
    || status === 403
    || ['42501', '28000', '28p01', 'pgrst301', 'pgrst302', 'pgrst303'].includes(code)
    || /permission|unauthori[sz]ed|forbidden|row.level security|\brls\b|invalid jwt/.test(signal)
  ) {
    return DATA_ERROR_CATEGORIES.PERMISSION;
  }

  if (
    status === 404
    || code === 'pgrst116'
    || /not found|no rows|zero rows/.test(signal)
  ) {
    return DATA_ERROR_CATEGORIES.NOT_FOUND;
  }

  if (
    status === 0
    || status === 502
    || status === 503
    || code.startsWith('08')
    || ['pgrst000', 'pgrst001', 'pgrst002', 'network_error', 'fetch_error', 'econnreset', 'econnrefused'].includes(code)
    || /failed to fetch|fetch failed|networkerror|network error|load failed|connection (?:refused|reset)/.test(signal)
  ) {
    return DATA_ERROR_CATEGORIES.NETWORK;
  }

  return DATA_ERROR_CATEGORIES.GENERIC;
};

export const getSafeDataErrorMessage = (error) => (
  safeMessages.has(error?.message)
    ? error.message
    : SAFE_DATA_ERROR_MESSAGES[getDataErrorCategory(error)]
);

export const createSafeDataError = (error) => {
  if (safeMessages.has(error?.message)) return error;
  const safeError = new Error(getSafeDataErrorMessage(error));
  safeError.name = 'SafeDataError';
  return safeError;
};
