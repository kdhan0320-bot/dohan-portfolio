import { Link } from 'react-router-dom';
import { FEATURED_CASES } from '../../data/projectsData';
import ProjectCover from '../projects/ProjectCover';
import RevealOnScroll from '../ui/RevealOnScroll';

const ProjectsSection = () => (
  <section className="home-work portfolio-shell" id="projects" aria-labelledby="selected-title">
    <div className="section-heading">
      <h2 id="selected-title">대표 작업</h2>
      <Link className="text-link" to="/projects">전체 작업 보기</Link>
    </div>
    <div className="selected-grid">
      {FEATURED_CASES.map(({ project, question, choice, image, imageAlt, scope }) => (
        <RevealOnScroll key={project.id} sx={{ minWidth: 0 }}>
          <article className="selected-case">
            <Link className="selected-case-link" aria-label={`${project.title} 설계 과정 보기`} to={`/projects/${project.slug || project.id}`}>
              <ProjectCover project={project} image={image} imageAlt={imageAlt} />
              <div className="selected-meta"><h3>{project.title}</h3><span>{project.categoryLabel}</span></div>
              <p className="selected-question">{question}</p>
              <p className="selected-choice">{choice}</p>
              <span className="selected-action">설계 과정 보기<span className="visually-hidden"> · {project.title}</span></span>
            </Link>
            <p className="selected-scope">{scope}</p>
          </article>
        </RevealOnScroll>
      ))}
    </div>
  </section>
);

export default ProjectsSection;
