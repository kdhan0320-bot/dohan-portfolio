import { Link } from 'react-router-dom';
import { ALL_PROJECTS } from '../../data/projectsData';
import ProjectCover from '../projects/ProjectCover';
const MORE_IDS = ['gongjeongbom', 'feedback-hub', 'bus-arrival-app', 'brewstep'];
const MoreWorksSection = () => (
  <section className="more-work portfolio-shell" id="more-projects" aria-labelledby="more-title">
    <div className="section-heading"><div><p className="eyebrow">MORE PROJECTS</p><h2 id="more-title">다른 주제, 같은 관심<span className="section-count">04</span></h2></div><Link className="text-link" to="/projects">전체 프로젝트 보기</Link></div>
    <div className="more-grid">
      {MORE_IDS.map((id) => ALL_PROJECTS.find((project) => project.id === id)).filter(Boolean).map((project) => (
        <article className="more-project" key={project.id}>
          <Link to={`/projects/${project.slug || project.id}`} className="home-project-link" aria-label={`${project.title} 프로젝트 보기`}>
            <ProjectCover project={project} />
            <div className="more-project-caption"><div><h3>{project.title}</h3><p>{project.description}</p></div><span className="project-status">{project.is_figma_project ? '디자인 시안' : '웹 구현'}</span></div>
            <span className="more-project-link">프로젝트 보기</span>
          </Link>
        </article>
      ))}
    </div>
  </section>
);
export default MoreWorksSection;
