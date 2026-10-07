import { Link } from 'react-router-dom';
import { ALL_PROJECTS } from '../../data/projectsData';
import ProjectCover from '../projects/ProjectCover';

const FEATURED = [
  { id: 'seolbiit', category: '업무·관리', title: '요청 확인에서 담당자 배정까지.', summary: '생산·구매 경험과 맞닿은 설비 점검을 주제로 삼았습니다. 요청을 읽는 영역과 담당자·기한을 확인하고 배정하는 영역을 구분한 개인 UI 디자인입니다.', point: '상세에서 보기 · 배정 화면의 이전·현재 비교', image: 'detail/current/seolbigyeol-requests.png', imageAlt: '설비결 정비 요청 — 접수 목록과 요청 상세, 담당자 배정 영역' },
  { id: 'jobflow', category: '업무·관리', title: '오늘 확인할 마감과 준비를 먼저.', summary: '가까운 마감과 남은 준비를 모아 보여줍니다. 지원 현황은 네 단계로 묶고, 회사별 세부 상태는 카드에서 확인하도록 구성했습니다.', point: '상세에서 보기 · 지원 단계의 이전·현재 비교', image: 'detail/galpirok-overview-pc.jpg', imageAlt: '갈피록 오늘의 지원 — 가까운 마감과 남은 준비' },
  { id: 'ott-service', category: '콘텐츠', title: '작품을 발견하고, 인상을 기록하다.', summary: '가상 영화를 발견하고 찜과 개인 노트로 기록하는 반응형 웹입니다.', point: '시각 표현 · 반응형 웹' },
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
