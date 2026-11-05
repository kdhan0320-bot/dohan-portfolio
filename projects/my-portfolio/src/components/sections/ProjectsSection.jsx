import { Link } from 'react-router-dom';
import { FEATURED_CASES } from '../../data/projectsData';
import ProjectCover from '../projects/ProjectCover';
import RevealOnScroll from '../ui/RevealOnScroll';

// The phone layout puts the sensor and all three stock counts in one excerpt.
const ReceiptCover = () => (
  <div className="project-cover selected-receipt">
    <div className="receipt-window">
      <img src={`${import.meta.env.BASE_URL}detail/current/pumuiseon-mobile-20261105.jpg`}
        width="375" height="780" alt="품의선의 포토센서 전표. 누적 발주 5개, 입고 3개, 지급 2개, 현재 보유 1개." />
    </div>
  </div>
);

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
              {project.id === 'feedback-hub'
                ? <ReceiptCover />
                : <ProjectCover project={project} image={image} imageAlt={imageAlt} />}
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
