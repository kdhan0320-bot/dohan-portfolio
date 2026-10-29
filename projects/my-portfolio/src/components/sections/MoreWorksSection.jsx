import { Link } from 'react-router-dom';
import { ALL_PROJECTS } from '../../data/projectsData';
import ProjectCover from '../projects/ProjectCover';
const MORE_IDS=['feedback-hub','gongjeongbom','bus-arrival-app','brewstep'];
const MoreWorksSection=()=>(
  <section className="more-work portfolio-shell" id="more-projects" aria-labelledby="more-title">
    <div className="section-heading"><div><p className="eyebrow">02 / MORE WORK</p><h2 id="more-title">조금 다른 결의 작업들.</h2></div><p className="section-description">업무와 일상 사이,<br />관심을 넓혀 만든 네 가지 화면입니다.</p></div>
    <div className="more-grid">{MORE_IDS.map((id,index)=>{
      const project=ALL_PROJECTS.find(p=>p.id===id);
      return <article className="more-project" key={id}><Link className="more-project-link" to={`/projects/${project.slug||id}`}>
        <ProjectCover project={project}/>
        <div className="more-project-caption"><div><p className="more-project-category">0{index+4} / {project.categoryLabel}</p><h3>{project.title}</h3></div><span className="more-project-label">자세히 보기</span></div>
        <p className="more-project-description">{project.cardProblem}</p>
      </Link></article>;
    })}</div>
  </section>
);
export default MoreWorksSection;
