import { Link } from 'react-router-dom';
import { ALL_PROJECTS } from '../../data/projectsData';
import ProjectCover from '../projects/ProjectCover';

const FEATURED = [
  { id: 'seolbiit', category: '업무·관리', title: '점검과 요청을 한 흐름으로.', summary: '생산·구매 경험과 맞닿은 주제를 다뤘습니다. 요청과 담당자 배정, 보고 확인을 한 흐름으로 구성한 개인 UI 디자인입니다.', point: '업무 흐름 · 정보 우선순위' },
  { id: 'jobflow', category: '업무·관리', title: '지원 기록과 다음 할 일을 한곳에.', summary: '지원 회사, 마감과 준비할 일을 연결한 취업 준비 기록장입니다.', point: '정보 구조 · 웹 구현' },
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
          <Link className="home-project-cover" to={`/projects/${project.slug || project.id}`} aria-label={`${project.title} 프로젝트 보기`}><ProjectCover project={project} /></Link>
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
