import { Link } from 'react-router-dom';
import { ALL_PROJECTS } from '../../data/projectsData';
import ProjectCover from '../projects/ProjectCover';
import RevealOnScroll from '../ui/RevealOnScroll';
const MORE_IDS = ['seolbiit', 'gongjeongbom', 'bus-arrival-app', 'brewstep'];
const MoreWorksSection = () => <section className="more-work portfolio-shell" id="more-projects" aria-labelledby="more-title">
  <RevealOnScroll><div className="section-heading section-heading--compact"><div><p className="eyebrow">02 / MORE EXPLORATIONS</p><h2 id="more-title">다른 쓰임도, 살펴봅니다.</h2></div><Link className="text-link" to="/projects">전체 작업 모아보기</Link></div></RevealOnScroll>
  <div className="more-grid">{MORE_IDS.map((id, index) => {
    const project = ALL_PROJECTS.find(p => p.id === id);
    return <RevealOnScroll key={id} delay={index % 2 * 0.07} sx={{ minWidth: 0 }}><article className="more-project"><Link className="more-project-link" to={`/projects/${project.slug || id}`}>
      <ProjectCover project={project} />
      <div className="more-project-caption"><div><p className="more-project-category">0{index + 4} / {project.categoryLabel}</p><h3>{project.title}</h3></div><span className="more-project-label">보기</span></div>
      <p className="more-project-description">{project.cardProblem}</p>
    </Link></article></RevealOnScroll>;
  })}</div>
</section>;
export default MoreWorksSection;
