import { Link } from 'react-router-dom';
import { ALL_PROJECTS } from '../../data/projectsData';
const MORE_IDS = ['gongjeongbom', 'feedback-hub', 'bus-arrival-app', 'brewstep'];
const MoreWorksSection = () => (
  <section className="more-work portfolio-shell" aria-labelledby="more-title">
    <div className="section-heading">
      <h2 id="more-title">더 많은 작업<span className="section-count">04</span></h2>
      <Link className="text-link" to="/projects">전체 작업 <span aria-hidden="true">↗</span></Link>
    </div>
    <div className="more-grid">
      {MORE_IDS.map((id) => ALL_PROJECTS.find((project) => project.id === id)).filter(Boolean).map((project) => (
        <article className="more-project" key={project.id}>
          <Link to={`/projects/${project.slug || project.id}`} className="home-project-link" aria-label={`${project.title} 프로젝트 보기`}>
            <div className={`more-project-media${['bus-arrival-app', 'brewstep'].includes(project.id) ? ' media-mobile' : ''}`}>
              <img src={project.thumbnailUrl} alt={`${project.title} 대표 화면`} loading="lazy" decoding="async" />
              <span className="project-open" aria-hidden="true">↗</span>
            </div>
            <div className="more-project-caption">
              <div><h3>{project.title}</h3><p>{project.description}</p></div>
              <span className="project-type">{project.is_figma_project ? 'Figma 디자인' : '웹사이트'}</span>
            </div>
          </Link>
        </article>
      ))}
    </div>
  </section>
);
export default MoreWorksSection;
