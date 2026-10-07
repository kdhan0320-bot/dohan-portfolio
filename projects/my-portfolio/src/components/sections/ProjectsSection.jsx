import { Link } from 'react-router-dom';
import { ALL_PROJECTS } from '../../data/projectsData';

const FEATURED_IDS = ['jobflow', 'seolbiit', 'ott-service'];
const projectType = (project) => project.is_figma_project ? 'Figma 디자인' : '웹사이트';

const ProjectsSection = () => {
  const projects = FEATURED_IDS.map((id) => ALL_PROJECTS.find((project) => project.id === id)).filter(Boolean);
  return (
    <section className="home-work portfolio-shell" id="projects" aria-labelledby="selected-title">
      <div className="section-heading">
        <h2 id="selected-title">선택한 작업<span className="section-count">03</span></h2>
        <span className="section-caption">UX/UI · WEB DESIGN</span>
      </div>
      <div className="featured-grid">
        {projects.map((project, index) => (
          <article key={project.id} className={`home-project${index === 0 ? ' home-project-lead' : ''}`}>
            <Link className="home-project-link" to={`/projects/${project.slug || project.id}`} aria-label={`${project.title} 프로젝트 보기`}>
              <div className={`home-project-media media-${project.id}`}>
                <img src={project.thumbnailUrl} alt={`${project.title} 대표 화면`} loading={index === 0 ? 'eager' : 'lazy'} fetchPriority={index === 0 ? 'high' : 'auto'} decoding="async" />
                <span className="project-open" aria-hidden="true">↗</span>
              </div>
              <div className="home-project-caption">
                <div>
                  <p className="project-type"><span className="project-number">{String(index + 1).padStart(2, '0')}</span>{projectType(project)}</p>
                  <h3>{project.title}</h3>
                </div>
                <p className="project-summary">{project.cardProblem || project.description}</p>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
};
export default ProjectsSection;
