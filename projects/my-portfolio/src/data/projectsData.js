/* 포트폴리오 공유 프로젝트 데이터 (ProjectsSection + ProjectsPage 공통)
 * 썸네일 URL은 import.meta.env.BASE_URL 의존성이 있어
 * 이 파일은 Vite 환경에서만 정상 동작합니다.
 * Node 환경 테스트용으로는 projectsFallbackData.js 를 사용하세요.
 */
import { fallbackProjects, FALLBACK_FILTER_TABS } from './projectsFallbackData';

const BASE = import.meta.env.BASE_URL;

const THUMB_MAP = {
  gongjeongbom: `${BASE}detail/current/gijunseon-cover-20261028.webp`,
  jobflow:      `${BASE}detail/current/galpirok-overview-20261028.jpg`,
  seolbiit:     `${BASE}detail/current/seolbigyeol-cover-20261028.webp`,
  gamstagram:   `${BASE}thumbnails/minisns-worklog.svg`,
  'ott-service': `${BASE}detail/current/jansang-v37-home.jpg`,
  'bus-arrival-app': `${BASE}detail/current/onjeongryu-cover-20261028.webp`,
  brewstep: `${BASE}detail/current/soyobit-cover-20261028.webp`,
  'feedback-hub': `${BASE}detail/current/goreunsiseon-20261028.jpg`,
};

const PROJECT_ORDER = ['seolbiit', 'ott-service', 'jobflow', 'feedback-hub', 'gongjeongbom', 'bus-arrival-app', 'brewstep'];
const orderOf = (project) => PROJECT_ORDER.includes(project.id) ? PROJECT_ORDER.indexOf(project.id) : 99;
export const ALL_PROJECTS = [...fallbackProjects]
  .sort((a, b) => orderOf(a) - orderOf(b))
  .map((p) => ({
    ...p,
    thumbnailUrl: THUMB_MAP[p.id] ?? p.thumbnailUrl ?? null,
    thumbnailAlt: `${p.title} 실제 ${p.is_figma_project ? 'Figma 디자인' : '웹'} 화면`,
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
