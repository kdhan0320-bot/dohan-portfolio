const isBlockedImageHost = (hostname) => (
  hostname === 'picsum.photos' || hostname.endsWith('.picsum.photos')
);

const INVALID_URL_ERROR = '올바른 HTTPS 이미지 주소를 입력해주세요.';

const DNS_HOSTNAME_PATTERN =
  /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/;

export const validateAndNormalizeImageUrl = (value) => {
  const trimmed = typeof value === 'string' ? value.trim() : '';
  if (!trimmed) return { imageUrl: null, error: '' };

  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol !== 'https:') {
      return { imageUrl: null, error: 'HTTPS 이미지 주소만 사용할 수 있습니다.' };
    }
    if (parsed.username || parsed.password) {
      return { imageUrl: null, error: INVALID_URL_ERROR };
    }
    const canonicalHostname = parsed.hostname.toLowerCase().replace(/[.]+$/, '');
    if (
      !canonicalHostname ||
      canonicalHostname.length > 253 ||
      !DNS_HOSTNAME_PATTERN.test(canonicalHostname)
    ) {
      return { imageUrl: null, error: INVALID_URL_ERROR };
    }
    if (isBlockedImageHost(canonicalHostname)) {
      return { imageUrl: null, error: 'Picsum 이미지는 사용할 수 없습니다. 사용 권한이 있는 작업 이미지 주소를 입력해주세요.' };
    }
    parsed.hostname = canonicalHostname;
    return { imageUrl: parsed.href, error: '' };
  } catch {
    return { imageUrl: null, error: INVALID_URL_ERROR };
  }
};
