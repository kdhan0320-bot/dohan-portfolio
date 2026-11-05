import { Link } from 'react-router-dom';
import { ALL_PROJECTS } from '../../data/projectsData';
import ProjectCover from '../projects/ProjectCover';
import RevealOnScroll from '../ui/RevealOnScroll';

const MORE_IDS = ['jobflow', 'gongjeongbom', 'bus-arrival-app', 'brewstep'];

const MoreWorksSection = () => (
  <section className="more-work portfolio-shell" id="more-projects" aria-labelledby="more-title">
    <div className="section-heading"><h2 id="more-title">그 밖의 작업</h2></div>
    <div className="more-grid">
      {MORE_IDS.map((id) => {
        const project = ALL_PROJECTS.find((item) => item.id === id);
        return (
          <RevealOnScroll key={id} sx={{ minWidth: 0 }}>
            <article className="more-project">
              <Link className="more-project-link" to={`/projects/${project.slug || id}`} aria-label={`${project.title} 프로젝트 보기`}>
                <ProjectCover project={project} />
                <div className="more-project-caption">
                  <div><p className="more-project-category">{project.categoryLabel}</p><h3>{project.title}</h3></div>
                </div>
                <p className="more-project-description">{project.cardProblem}</p>
              </Link>
            </article>
          </RevealOnScroll>
        );
      })}
    </div>
  </section>
);

export default MoreWorksSection;
