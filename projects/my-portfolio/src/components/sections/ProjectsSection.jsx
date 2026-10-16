import { Link } from 'react-router-dom';
import { ALL_PROJECTS } from '../../data/projectsData';
import ProjectCover from '../projects/ProjectCover';

const FEATURED = [
  { id: 'seolbiit', category: '업무·관리', title: '요청 확인에서 담당자 배정까지.', summary: '생산·구매 경험과 맞닿은 설비 점검을 주제로 삼았습니다. 요청을 읽는 영역과 담당자·기한을 확인하고 배정하는 영역을 구분한 개인 UI 디자인입니다.', point: '상세에서 보기 · 배정 화면의 이전·현재 비교', image: 'detail/current/seolbigyeol-requests.png', imageAlt: '설비결 정비 요청 — 접수 목록과 요청 상세, 담당자 배정 영역' },
  { id: 'jobflow', category: '업무·관리', title: '오늘 확인할 마감과 준비를 먼저.', summary: '지원할 회사를 직접 등록하고 현황·마감·준비할 일을 관리합니다. 갈피·폴더의 특징을 남기면서 장식보다 실제 기록과 조작이 먼저 보이도록 다듬었습니다.', point: '상세에서 보기 · 실제 기여와 화면 개선 사례', image: 'detail/current/galpirok-overview.jpg', imageAlt: '갈피록 오늘의 지원 — 가까운 마감과 남은 준비' },
  { id: 'ott-service', category: '콘텐츠', title: '분위기로 발견하고, 선택한 이유를 남기다.', summary: '분위기와 시간으로 가상 단편영화를 찾고 찜과 관심 메모로 모으는 반응형 웹입니다.', point: '상세에서 보기 · 모바일 탐색과 저장 흐름' },
];
const ProjectsSection = () => (
  <section className="home-work portfolio-shell" id="projects" aria-labelledby="selected-title">
    <div className="section-heading"><div><p className="eyebrow">SELECTED PROJECTS</p><h2 id="selected-title">대표 작업<span className="section-count">03</span></h2></div><Link className="text-link" to="/projects">전체 프로젝트 보기</Link></div>
    <div className="featured-grid">
      {FEATURED.map((item, index) => {
        const project = ALL_PROJECTS.find((entry) => entry.id === item.id);
        if (!project) return null;
        return <article key={item.id} className={`home-project${index === 0 ? ' home-project-lead' : ''}`}>
          <Link className="home-project-cover" to={`/projects/${project.slug || project.id}`} aria-label={`${project.title} 프로젝트 보기`}><ProjectCover project={project} image={item.image} imageAlt={item.imageAlt} /></Link>
          <div className="home-project-caption">
            <div className="project-meta"><span className="project-number">0{index + 1}</span><span>{item.category}</span><span className="project-status">{project.is_figma_project ? '디자인 시안' : '웹 구현'}</span></div>
            <h3 className="project-name">{project.title}</h3>
            <p className="project-brief">{item.title}</p>
            <p className="project-summary">{item.summary}</p>
            <p className="project-focus">{item.point}</p>
            <Link className="portfolio-button portfolio-button--secondary" to={`/projects/${project.slug || project.id}`} aria-label={`${project.title} 작업 과정 보기`}>작업 과정 보기</Link>
          </div>
        </article>;
      })}
    </div>
  </section>
);
export default ProjectsSection;
