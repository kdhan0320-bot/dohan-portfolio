import { useState } from 'react';

import { POSTER_PROJECTS } from '../data/posterProjects';
import { CONTACT_EMAIL } from '../constants/site';
import ProjectPoster from '../components/projects/ProjectPoster';
import './portfolioEditorial.css';

const PUBLIC_PROJECTS = POSTER_PROJECTS;
const PROJECT_TOPICS = {
  jobflow: 'work',
  seolbiit: 'work',
  gijunseon: 'work',
  'feedback-hub': 'work',
  'bus-arrival-app': 'life',
  brewstep: 'life',
  'ott-service': 'content',
};
const FILTERS = [
  { id: 'all', label: '전체 작업', matches: () => true },
  { id: 'work', label: '업무·관리', matches: (project) => PROJECT_TOPICS[project.id] === 'work' },
  { id: 'life', label: '생활 서비스', matches: (project) => PROJECT_TOPICS[project.id] === 'life' },
  { id: 'content', label: '콘텐츠 탐색', matches: (project) => PROJECT_TOPICS[project.id] === 'content' },
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
          <p>업무 관리부터 영화 탐색까지, 주제별로 살펴보세요.<br />확인된 기여와 AI 협업 범위는 작품 상세에 정리했습니다.</p>
        </header>

        <div className="works-filter" role="group" aria-label="프로젝트 주제로 필터">
          {FILTERS.map((item) => <button
            key={item.id} type="button" aria-pressed={filter === item.id}
            onClick={() => setFilter(item.id)}
          >{item.label}<span>{PUBLIC_PROJECTS.filter(item.matches).length}</span></button>)}
        </div>
        <p className="works-announcement" aria-live="polite" aria-atomic="true">{activeFilter.label} {projects.length}개</p>

        <section className="poster-grid" aria-label={`${activeFilter.label} 목록`}>
          {projects.map(project => <ProjectPoster key={project.id} project={project} index={PUBLIC_PROJECTS.indexOf(project)} heading="h2" />)}
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
