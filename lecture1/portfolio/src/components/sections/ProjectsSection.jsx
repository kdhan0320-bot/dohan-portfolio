import { POSTER_PROJECTS } from '../../data/posterProjects';
import ProjectPoster from '../projects/ProjectPoster';

export default function ProjectsSection() {
  return <section id="projects" className="poster-gallery portfolio-shell" aria-labelledby="poster-title">
    <div className="poster-gallery__heading"><h2 id="poster-title">작업<span>{String(POSTER_PROJECTS.length).padStart(2, '0')}</span></h2><p><span>표지를 눌러 자세히 보기</span><span>AI 협업 범위는 작품 상세에</span></p></div>
    <div className="poster-grid">{POSTER_PROJECTS.map((project, index) => <ProjectPoster project={project} index={index} key={project.id} />)}</div>
  </section>;
}
