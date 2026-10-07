import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ALL_PROJECTS } from '../data/projectsData';
import { CONTACT_EMAIL } from '../constants/site';
import ProjectCover from '../components/projects/ProjectCover';
import './portfolioEditorial.css';

const PUBLIC_PROJECTS = ALL_PROJECTS.filter((project) => project.is_featured || project.moreWorksPublished);
const projectSlug = (project) => project.slug || (project.id === 'bus-arrival-app' ? 'bus-arrival' : project.id);
const PROJECT_TOPICS = {
  jobflow: 'work',
  seolbiit: 'work',
  gongjeongbom: 'work',
  'feedback-hub': 'work',
  'bus-arrival-app': 'life',
  brewstep: 'life',
  'ott-service': 'content',
};
const FILTERS = [
  { id: 'all', label: '전체 작업', matches: () => true },
  { id: 'work', label: '업무·관리', matches: (project) => PROJECT_TOPICS[project.id] === 'work' },
  { id: 'life', label: '생활 서비스', matches: (project) => PROJECT_TOPICS[project.id] === 'life' },
  { id: 'content', label: '콘텐츠', matches: (project) => PROJECT_TOPICS[project.id] === 'content' },
];

const ProjectsPage = () => {
  const [filter, setFilter] = useState('all');
  const activeFilter = FILTERS.find((item) => item.id === filter);
  const projects = PUBLIC_PROJECTS.filter(activeFilter.matches);

  return (
    <div className="works-page" data-page-id="projects">
      <div className="portfolio-shell">
        <header className="works-intro">
          <div><p className="case-eyebrow">PROJECTS</p><h1>작업 모음<span>{String(PUBLIC_PROJECTS.length).padStart(2, '0')}</span></h1></div>
          <p>업무와 일상 속 정보를 어떻게 정리했는지,<br />각 프로젝트의 화면과 선택을 살펴보세요.</p>
        </header>

        <div className="works-filter" role="group" aria-label="프로젝트 주제로 필터">
          {FILTERS.map((item) => <button
            key={item.id} type="button" aria-pressed={filter === item.id}
            onClick={() => setFilter(item.id)}
          >{item.label}<span>{PUBLIC_PROJECTS.filter(item.matches).length}</span></button>)}
        </div>
        <p className="works-announcement" aria-live="polite" aria-atomic="true">{activeFilter.label} {projects.length}개</p>

        <section className="works-grid" aria-label={`${activeFilter.label} 목록`}>
          {projects.map((project, index) => <article className="works-card" key={project.id}>
            <Link className="works-card__link" to={`/projects/${projectSlug(project)}`}>
              <ProjectCover project={project} eager={index < 2} />
              <div className="works-card__meta"><span>{project.categoryLabel || project.category}</span><span className="works-card__status">{project.is_figma_project ? '디자인 시안' : '웹 구현'}</span></div>
              <div className="works-card__heading"><h2>{project.title}</h2><span className="works-card__detail-label">프로젝트 보기</span></div>
              <p className="works-card__description">{project.description}</p>
            </Link>
            <div className="works-card__foot">
              <span>{(project.tools || []).slice(0, 3).join(' · ')}</span>
              {project.liveUrl ? <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} 웹사이트 새 탭에서 보기`}>
                웹사이트 보기
              </a> : (project.figmaDesignUrl || project.figmaPrototypeUrl) && <a href={project.figmaDesignUrl || project.figmaPrototypeUrl} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} Figma 새 탭에서 보기`}>
                Figma 보기
              </a>}
            </div>
          </article>)}
        </section>

        <footer className="works-footer">
          <div><p className="case-eyebrow">CONTACT</p><h2>작업에 관해 이야기해요.</h2></div>
          <div className="works-footer__contact"><p>{CONTACT_EMAIL}</p><a href={`mailto:${CONTACT_EMAIL}`}>이메일 보내기</a></div>
        </footer>
      </div>
    </div>
  );
};

export default ProjectsPage;
