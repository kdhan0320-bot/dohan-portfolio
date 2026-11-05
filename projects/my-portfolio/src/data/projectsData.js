/* 포트폴리오 공유 프로젝트 데이터 (ProjectsSection + ProjectsPage 공통)
 * 썸네일 URL은 import.meta.env.BASE_URL 의존성이 있어
 * 이 파일은 Vite 환경에서만 정상 동작합니다.
 * Node 환경 테스트용으로는 projectsFallbackData.js 를 사용하세요.
 */
import { fallbackProjects, FALLBACK_FILTER_TABS } from './projectsFallbackData';

const BASE = import.meta.env.BASE_URL;

const THUMB_MAP = {
  gongjeongbom: `${BASE}detail/current/gijunseon-home-20261105.jpg`,
  jobflow:      `${BASE}detail/current/galpirok-home-20261105.jpg`,
  seolbiit:     `${BASE}detail/current/seolbigyeol-20261105.png`,
  gamstagram:   `${BASE}thumbnails/minisns-worklog.svg`,
  'ott-service': `${BASE}detail/current/jansang-frame-home.jpg`,
  'bus-arrival-app': `${BASE}detail/current/onjeongryu-20261105.png`,
  brewstep: `${BASE}detail/current/soyobit-20261105.png`,
  'feedback-hub': `${BASE}detail/current/pumuiseon-home-20261105.jpg`,
};

const PROJECT_ORDER = ['feedback-hub', 'seolbiit', 'ott-service', 'jobflow', 'gongjeongbom', 'bus-arrival-app', 'brewstep'];
const orderOf = (project) => PROJECT_ORDER.includes(project.id) ? PROJECT_ORDER.indexOf(project.id) : 99;
export const ALL_PROJECTS = [...fallbackProjects]
  .sort((a, b) => orderOf(a) - orderOf(b))
  .map((p) => ({
    ...p,
    thumbnailUrl: THUMB_MAP[p.id] ?? p.thumbnailUrl ?? null,
    thumbnailAlt: p.thumbnailAlt || `${p.title} 실제 ${p.is_figma_project ? 'Figma 디자인' : '웹'} 화면`,
    previewDevice: ['bus-arrival-app', 'brewstep'].includes(p.id) ? 'mobile' : 'desktop',
    detail: {
      overview:       p.overview,
      problem:        p.problem,
      goal:           p.goal,
      targetUser:     p.targetUser     ?? null,
      designPoint:    p.designPoint,
      process:        p.process        ?? null,
      result:         p.result         ?? null,
      lesson:         p.lesson         ?? null,
      aiContribution: p.aiContribution ?? null,
      limitation:     p.limitation     ?? null,
      nextStep:       p.nextStep,
    },
  }));

export const FILTER_TABS = FALLBACK_FILTER_TABS;

// The same question introduces the work on the homepage and its case study.
const CASE_NOTES = {
  'feedback-hub': {
    question: '이 재고는 어떤 기록에서 나왔을까?',
    choice: '자재 하나를 고르면 입고·지급 이력과 관련 구매 품의를 함께 볼 수 있게 했습니다.',
    image: 'detail/current/pumuiseon-history-20261105.jpg',
    imageAlt: '품의선의 포토센서 상세 화면. 자재 수량과 연결된 입출고 이력.',
    scope: 'AI 협업 웹 제작 · 브라우저 저장 시연',
  },
  seolbiit: {
    question: '지금 누구에게 어떤 정비를 맡겨야 할까?',
    choice: '배정 대기 요청에 사진·증상·기한을 모으고, 담당자를 배정하는 동작을 같은 자리에 뒀습니다.',
    scope: 'Figma 디자인 · 가상 설비 데이터',
  },
  'ott-service': {
    question: '제목을 몰라도 보고 싶은 영화를 고를 수 있을까?',
    choice: '두 편의 영화 장면에 분위기와 상영 시간을 붙여, 이미지에서 작품 선택으로 이어지게 했습니다.',
    scope: 'AI 협업 웹 제작 · 가상 단편영화',
  },
};

export const FEATURED_CASES = ALL_PROJECTS
  .filter((project) => CASE_NOTES[project.id])
  .map((project) => ({ project, ...CASE_NOTES[project.id] }));
