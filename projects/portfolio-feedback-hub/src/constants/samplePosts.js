// Fictional review exercises, not real users or research outcomes.
const cases = [{
  id: 'sample-1',
  kind: 'gallery',
  title: '시선의 모양',
  category: '화면 디자인',
  subtitle: '전시 웹사이트 · 정보의 우선순위',
  question: '전시 제목과 관람 버튼이 충분히 눈에 들어오나요?',
  notes: [{
    title: '제목의 크기와 대비',
    text: '전시 제목이 먼저 읽히도록 크기와 대비를 높여 주세요.',
    change: '제목 확대 · 진한 글자색',
    x: 7,
    y: 39
  }, {
    title: '관람 버튼의 존재감',
    text: '관람 버튼이 배경에 묻히지 않게 구분해 주세요.',
    change: '버튼 면적 확대 · 진한 배경색',
    x: 7,
    y: 68
  }]
}, {
  id: 'sample-4',
  kind: 'sound',
  title: '느린 파장',
  category: '사용 흐름',
  subtitle: '사운드 플레이어 · 조작의 중심',
  question: '첫 화면에서 재생 버튼을 쉽게 찾을 수 있나요?',
  notes: [{
    title: '재생 버튼의 크기',
    text: '재생 버튼을 앞뒤 이동보다 쉽게 찾을 수 있게 해 주세요.',
    change: '재생 버튼 확대',
    x: 55,
    y: 87
  }]
}, {
  id: 'sample-8',
  kind: 'portfolio',
  title: '서로 다른 장면',
  category: '포트폴리오',
  subtitle: '개인 포트폴리오 · 첫인상의 밀도',
  question: '첫 문장이 작업자의 방향을 선명하게 보여주나요?',
  notes: [{
    title: '첫 문장의 무게',
    text: '소개 문장이 작업 이미지보다 먼저 읽히면 좋겠어요.',
    change: '첫 문장 확대',
    x: 7,
    y: 32
  }]
}, {
  id: 'sample-7',
  kind: 'flower',
  title: '계절의 형태',
  category: '화면 디자인',
  subtitle: '플라워 스튜디오 · 글과 이미지의 균형',
  question: '꽃 이미지 옆에서도 브랜드 문장이 잘 읽히나요?',
  notes: [{
    title: '제목과 이미지의 균형',
    text: '꽃 이미지 옆에서도 제목의 존재감을 살려 주세요.',
    change: '제목 확대',
    x: 8,
    y: 40
  }]
}, {
  id: 'sample-12',
  kind: 'walk',
  title: '가벼운 산책',
  category: '사용 흐름',
  subtitle: '산책 경로 · 길 찾기의 명확함',
  question: '안내 경로가 주변 도로와 쉽게 구분되나요?',
  notes: [{
    title: '이어지는 경로',
    text: '추천 경로와 주변 도로를 더 명확히 구분해 주세요.',
    change: '점선 경로 → 연속된 실선 경로',
    x: 39,
    y: 63
  }]
}, {
  id: 'sample-11',
  kind: 'signup',
  title: '작은 시작',
  category: '사용 흐름',
  subtitle: '가입 화면 · 명확한 입력 안내',
  question: '제목과 입력 안내가 한눈에 읽히나요?',
  notes: [{
    title: '입력 안내의 대비',
    text: '제목과 흐릿한 입력 안내를 더 분명하게 해 주세요.',
    change: '제목 확대 · 입력 안내 대비 강화',
    x: 16,
    y: 49
  }]
}];
export const SAMPLE_POSTS = cases.map((item, index) => ({
  ...item,
  content: item.question,
  hashtags: [item.category, item.kind],
  profiles: {
    username: '고른시선 샘플'
  },
  user_id: 'sample',
  image_url: null,
  created_at: new Date(Date.UTC(2026, 8, 20 - index)).toISOString(),
  like_count: 0,
  comment_count: item.notes.length
}));
export const SAMPLE_COMMENTS = Object.fromEntries(SAMPLE_POSTS.map(post => [post.id, post.notes.map((note, index) => ({
  id: `${post.id}-note-${index}`,
  content: note.text,
  profiles: {
    username: '리뷰 예시'
  },
  created_at: post.created_at,
  comment_likes: [],
  replies: [],
  user_id: 'sample'
}))]));
export const CATEGORIES = ['전체', '화면 디자인', '사용 흐름', '포트폴리오'];
const legacyCategories = ['포트폴리오 피드백', 'Figma', 'UX/UI', '취업 준비', 'AI Coding', '자유게시판'];
export const getCategoryLabel = post => post.category || post.hashtags?.find(tag => [...CATEGORIES, ...legacyCategories].includes(tag)) || '작업 공유';
export const getStatusBadge = post => (post.comment_count ?? 0) > 0 ? {
  label: '의견 있음',
  color: '#405F54'
} : {
  label: '의견 기다리는 중',
  color: '#795524'
};
