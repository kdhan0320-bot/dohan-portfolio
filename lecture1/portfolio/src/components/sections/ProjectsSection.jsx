import { POSTER_PROJECTS } from '../../data/posterProjects';
import ProjectPoster from '../projects/ProjectPoster';

export default function ProjectsSection() {
  return <section id="projects" className="poster-gallery portfolio-shell" aria-labelledby="poster-title">
    <div className="poster-gallery__heading"><h2 id="poster-title">대표 작업<span>03</span></h2><p><span>표지를 눌러 자세히 보기</span><span>확인된 기여와 AI 협업 범위는 상세에</span></p></div>
    <div className="poster-grid poster-grid--selected">{POSTER_PROJECTS.slice(0,3).map((project,index) => <ProjectPoster project={project} index={index} key={project.id} />)}</div>
    <div className="poster-gallery__heading poster-gallery__heading--additional"><h2 id="additional-work-title">다른 작업<span>04</span></h2><p>웹과 모바일로 확장한 네 가지 주제</p></div>
    <div className="poster-grid poster-grid--additional" aria-labelledby="additional-work-title">{POSTER_PROJECTS.slice(3).map((project,index) => <ProjectPoster project={project} index={index+3} secondary key={project.id} />)}</div>
  </section>;
}
