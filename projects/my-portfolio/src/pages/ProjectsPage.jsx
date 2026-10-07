import { useState } from 'react';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { ALL_PROJECTS } from '../data/projectsData';
import { CONTACT_EMAIL } from '../constants/site';
import './portfolioEditorial.css';

const PUBLIC_PROJECTS = ALL_PROJECTS.filter((project) => project.is_featured || project.moreWorksPublished);
const projectSlug = (project) => project.slug || (project.id === 'bus-arrival-app' ? 'bus-arrival' : project.id);
const FILTERS = [
  { id: 'all', label: '전체 작업', matches: () => true },
  { id: 'web', label: '웹사이트', matches: (project) => !project.is_figma_project },
  { id: 'figma', label: 'Figma 디자인', matches: (project) => project.is_figma_project },
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
          <p>일상의 서비스부터 현장의 업무까지.<br />목적에 맞는 화면과 흐름을 만들었습니다.</p>
        </header>

        <div className="works-filter" role="group" aria-label="작업 종류">
          {FILTERS.map((item) => <button
            key={item.id} type="button" aria-pressed={filter === item.id}
            onClick={() => setFilter(item.id)}
          >{item.label}<span>{PUBLIC_PROJECTS.filter(item.matches).length}</span></button>)}
        </div>
        <p className="works-announcement" aria-live="polite" aria-atomic="true">{activeFilter.label} {projects.length}개</p>

        <section className="works-grid" aria-label={`${activeFilter.label} 목록`}>
          {projects.map((project, index) => <article className="works-card" key={project.id}>
            <Link className="works-card__link" to={`/projects/${projectSlug(project)}`}>
              <div className={`works-card__media${['bus-arrival-app', 'brewstep'].includes(project.id) ? ' works-card__media--mobile' : ''}`}>
                <img src={project.thumbnailUrl} alt={`${project.title} 대표 화면`} loading={index < 2 ? 'eager' : 'lazy'} decoding="async" />
                <span className="works-card__open" aria-hidden="true"><ArrowForwardIcon /></span>
              </div>
              <div className="works-card__meta"><span>{project.categoryLabel || project.category}</span><span>{project.is_figma_project ? 'Figma 디자인' : '웹사이트'}</span></div>
              <div className="works-card__heading"><h2>{project.title}</h2><ArrowForwardIcon aria-hidden="true" /></div>
              <p className="works-card__description">{project.description}</p>
            </Link>
            <div className="works-card__foot">
              <span>{(project.tools || []).slice(0, 3).join(' · ')}</span>
              {project.liveUrl ? <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} 웹사이트 새 탭에서 보기`}>
                웹사이트 보기<ArrowOutwardIcon aria-hidden="true" />
              </a> : (project.figmaDesignUrl || project.figmaPrototypeUrl) && <a href={project.figmaDesignUrl || project.figmaPrototypeUrl} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} Figma 새 탭에서 보기`}>
                Figma 보기<ArrowOutwardIcon aria-hidden="true" />
              </a>}
            </div>
          </article>)}
        </section>

        <footer className="works-footer">
          <div><p className="case-eyebrow">CONTACT</p><h2>작업에 관해 이야기해요.</h2></div>
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}<ArrowOutwardIcon aria-hidden="true" /></a>
        </footer>
      </div>
    </div>
  );
};

export default ProjectsPage;
