import './projectCovers.css';

const BASE = import.meta.env.BASE_URL;
const COVERS = {
  seolbiit: { theme: 'equipment', label: '설비결', line: '점검의 흐름을 잇다.', note: '점검 · 요청 · 보고 확인', secondary: 'detail/current/seolbigyeol-requests.png' },
  jobflow: { theme: 'record', label: '갈피록', line: '다음 지원을, 차분하게.', note: '지원 현황 · 마감 · 준비 기록', secondary: 'detail/galpirok-checklist-pc.jpg' },
  'ott-service': { theme: 'cinema', label: '잔상관', line: '발견하고, 오래 기억하다.', note: '영화 탐색 · 찜 · 개인 노트' },
  gongjeongbom: { theme: 'industry', label: '기준선', line: '기술을 이해하는 첫 화면.', note: '비전 검사 서비스 · 웹 디자인' },
  'feedback-hub': { theme: 'feedback', label: '고른시선', line: '의견이 모여, 더 나은 화면.', note: '위치별 피드백 · 수정 전후 비교' },
  'bus-arrival-app': { theme: 'transit', label: '온정류', line: '매일의 이동을 가볍게.', note: '버스 방향 · 도착정보', secondary: 'detail/current/onjeongryu-station.png', mobile: true },
  brewstep: { theme: 'cafe', label: '소요빛', line: '취향으로 고르는 한 잔.', note: '음료 탐색 · 모바일 UI', secondary: 'detail/current/soyobit-menu.png', mobile: true },
};

const ProjectCover = ({ project, eager = false }) => {
  const cover = COVERS[project.id];
  if (!cover) return <div className="project-cover"><img src={project.thumbnailUrl} alt={project.thumbnailAlt} loading={eager ? 'eager' : 'lazy'} /></div>;
  return (
    <div className={`project-cover project-cover--${cover.theme}${cover.mobile ? ' project-cover--mobile' : ''}`}>
      <div className="project-cover__copy" aria-hidden="true">
        <span className="project-cover__name">{cover.label}</span>
        <span className="project-cover__line">{cover.line}</span>
      </div>
      <div className="project-cover__screens">
        <img className="project-cover__main" src={project.thumbnailUrl} alt={`${project.title} 실제 ${project.is_figma_project ? '디자인' : '웹'} 화면`} loading={eager ? 'eager' : 'lazy'} decoding="async" />
        {cover.secondary && <img className="project-cover__secondary" src={`${BASE}${cover.secondary}`} alt={cover.mobile ? `${project.title} 상세 화면` : `${project.title} 관련 화면`} loading="lazy" decoding="async" />}
      </div>
      <span className="project-cover__note" aria-hidden="true">{cover.note}</span>
    </div>
  );

};

export default ProjectCover;
