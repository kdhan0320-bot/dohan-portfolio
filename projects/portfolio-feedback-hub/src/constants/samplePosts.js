// Fictional review exercises, not real users or research outcomes.
const cases = [{
  id: 'sample-1',
  kind: 'gallery',
  title: '시선의 모양',
  category: '정보 위계',
  legacyCategory: '화면 디자인',
  subtitle: '전시 웹사이트 · 정보의 우선순위',
  question: '전시 제목과 관람 버튼이 충분히 눈에 들어오나요?',
  rationale: {
    title: '작품의 분위기는 유지하고, 읽는 순서를 정리',
    goal: '전시의 주제를 먼저 읽고, 다음 행동을 찾을 수 있게 구성했습니다.',
    decisions: [{
      label: '유지',
      text: '2열 배치와 작품 이미지 크기를 유지해 전시의 분위기를 남겼습니다.'
    }, {
      label: '선택',
      text: '제목과 관람 버튼만 강조했습니다. 설명과 상단 메뉴의 크기는 그대로 두었습니다.'
    }, {
      label: '대안',
      text: '이미지를 줄이는 방법도 있지만, 작품의 존재감이 약해질 수 있어 선택하지 않았습니다.'
    }, {
      label: '확인할 점',
      text: '제목과 버튼이 먼저 보이는지, 커진 제목이 작은 화면에서도 무리 없이 읽히는지 확인이 필요합니다.'
    }]
  },
  notes: [{
    title: '제목의 크기와 대비',
    text: '제목이 작고 옅어 이미지보다 늦게 눈에 들어와요.',
    change: '제목 확대 · 진한 글자색',
    check: '전시 제목이 설명보다 먼저 읽히는지 살펴보세요.',
    x: 7,
    y: 39
  }, {
    title: '관람 버튼의 존재감',
    text: '관람 버튼이 배경에 묻히지 않게 구분해 주세요.',
    change: '버튼 면적 확대 · 진한 배경색',
    check: '관람 버튼이 다음 행동으로 바로 보이는지 살펴보세요.',
    x: 7,
    y: 68
  }]
}, {
  id: 'sample-4',
  kind: 'sound',
  title: '느린 파장',
  category: '주요 행동',
  legacyCategory: '사용 흐름',
  subtitle: '사운드 플레이어 · 조작의 중심',
  question: '첫 화면에서 재생 버튼을 쉽게 찾을 수 있나요?',
  notes: [{
    title: '재생 버튼의 크기',
    text: '재생 버튼을 앞뒤 이동보다 쉽게 찾을 수 있게 해 주세요.',
    change: '재생 버튼 확대',
    check: '재생 버튼이 앞뒤 이동보다 먼저 보이는지 살펴보세요.',
    x: 55,
    y: 87
  }]
}, {
  id: 'sample-8',
  kind: 'portfolio',
  title: '서로 다른 장면',
  category: '정보 위계',
  legacyCategory: '포트폴리오',
  subtitle: '개인 포트폴리오 · 첫인상의 밀도',
  question: '첫 문장이 작업자의 방향을 선명하게 보여주나요?',
  notes: [{
    title: '첫 문장의 무게',
    text: '소개 문장이 작업 이미지보다 먼저 읽히면 좋겠어요.',
    change: '첫 문장 확대',
    check: '작업 이미지보다 소개 문장이 먼저 읽히는지 살펴보세요.',
    x: 7,
    y: 32
  }]
}, {
  id: 'sample-7',
  kind: 'flower',
  title: '계절의 형태',
  category: '정보 위계',
  legacyCategory: '화면 디자인',
  subtitle: '플라워 스튜디오 · 글과 이미지의 균형',
  question: '꽃 이미지 옆에서도 브랜드 문장이 잘 읽히나요?',
  notes: [{
    title: '제목과 이미지의 균형',
    text: '꽃 이미지 옆에서도 제목의 존재감을 살려 주세요.',
    change: '제목 확대',
    check: '꽃 이미지 옆에서도 제목이 분명하게 읽히는지 살펴보세요.',
    x: 8,
    y: 40
  }]
}, {
  id: 'sample-12',
  kind: 'walk',
  title: '가벼운 산책',
  category: '입력·안내',
  legacyCategory: '사용 흐름',
  subtitle: '산책 경로 · 길 찾기의 명확함',
  question: '안내 경로가 주변 도로와 쉽게 구분되나요?',
  notes: [{
    title: '이어지는 경로',
    text: '추천 경로와 주변 도로를 더 명확히 구분해 주세요.',
    change: '점선 경로 → 연속된 실선 경로',
    check: '주변 도로와 구분해 경로를 끝까지 따라갈 수 있는지 살펴보세요.',
    x: 39,
    y: 63
  }]
}, {
  id: 'sample-11',
  kind: 'signup',
  title: '작은 시작',
  category: '입력·안내',
  legacyCategory: '사용 흐름',
  subtitle: '가입 화면 · 명확한 입력 안내',
  question: '제목과 입력 안내가 한눈에 읽히나요?',
  notes: [{
    title: '입력 안내의 대비',
    text: '제목과 흐릿한 입력 안내를 더 분명하게 해 주세요.',
    change: '제목 확대 · 입력 안내 대비 강화',
    check: '입력 전에 이메일 예시와 비밀번호 조건이 읽히는지 살펴보세요.',
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
export const CATEGORIES = ['전체', '정보 위계', '주요 행동', '입력·안내'];
export const LEGACY_SAMPLE_CATEGORIES = ['화면 디자인', '사용 흐름', '포트폴리오'];
const legacyCategories = [...LEGACY_SAMPLE_CATEGORIES, '포트폴리오 피드백', 'Figma', 'UX/UI', '취업 준비', 'AI Coding', '자유게시판'];
export const getCategoryLabel = post => post.category || post.hashtags?.find(tag => [...CATEGORIES, ...legacyCategories].includes(tag)) || '작업 공유';
export const getStatusBadge = post => (post.comment_count ?? 0) > 0 ? {
  label: '의견 있음',
  color: '#405F54'
} : {
  label: '의견 기다리는 중',
  color: '#795524'
};
