const isBlockedImageHost = (hostname) => (
  hostname === 'picsum.photos' || hostname.endsWith('.picsum.photos')
);

export const validateAndNormalizeImageUrl = (value) => {
  const trimmed = typeof value === 'string' ? value.trim() : '';
  if (!trimmed) return { imageUrl: null, error: '' };

  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol !== 'https:') {
      return { imageUrl: null, error: 'HTTPS 이미지 주소만 사용할 수 있습니다.' };
    }
    if (isBlockedImageHost(parsed.hostname.toLowerCase())) {
      return { imageUrl: null, error: 'Picsum 이미지는 사용할 수 없습니다. 사용 권한이 있는 작업 이미지 주소를 입력해주세요.' };
    }
    return { imageUrl: trimmed, error: '' };
  } catch {
    return { imageUrl: null, error: '올바른 HTTPS 이미지 주소를 입력해주세요.' };
  }
};
