import { Link } from 'react-router-dom';
import { ALL_PROJECTS } from '../../data/projectsData';
import ProjectCover from '../projects/ProjectCover';
const MORE_IDS=['feedback-hub','gongjeongbom','bus-arrival-app','brewstep'];
const MoreWorksSection=()=>(
  <section className="more-work portfolio-shell" id="more-projects" aria-labelledby="more-title">
    <div className="section-heading"><div><p className="eyebrow">03 / MORE EXPLORATIONS</p><h2 id="more-title">다른 시선으로 만든 화면들.</h2></div><p className="section-description">비교하며 배우고,<br />일상의 작은 선택을 살펴봅니다.</p></div>
    <div className="more-grid">{MORE_IDS.map((id,index)=>{
      const project=ALL_PROJECTS.find(p=>p.id===id);
      return <article className="more-project" key={id}><Link className="more-project-link" to={`/projects/${project.slug||id}`}>
        <ProjectCover project={project}/>
        <div className="more-project-caption"><div><p className="more-project-category">0{index+4} / {project.categoryLabel}</p><h3>{project.title}</h3></div><span className="more-project-arrow" aria-hidden="true">↗</span></div>
        <p className="more-project-description">{project.cardProblem}</p>
      </Link></article>;
    })}</div>
  </section>
);
export default MoreWorksSection;
