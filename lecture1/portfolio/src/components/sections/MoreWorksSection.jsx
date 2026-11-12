import { Link } from 'react-router-dom';
import { ALL_PROJECTS } from '../../data/projectsData';
import ProjectCover from '../projects/ProjectCover';
import RevealOnScroll from '../ui/RevealOnScroll';
import './moreWorks.css';
const order=['gijunseon','jobflow','bus-arrival-app','brewstep'];
export default function MoreWorksSection(){
 return <section className="other-works portfolio-shell" id="more-projects" aria-labelledby="more-title">
  <div className="editorial-heading"><div><p className="edition-label">02 / EXPLORATIONS</p><h2 id="more-title">그 밖의 작업<span>04</span></h2></div><p className="other-intro">산업·기록·이동·취향.<br/>{' '}서로 다른 맥락에서 찾은 화면의 답.</p></div>
  <div className="other-grid">{order.map(id=>{const project=ALL_PROJECTS.find(p=>p.id===id);return <RevealOnScroll component="article" key={id} duration={.6}>
    <Link to={`/projects/${project.slug||project.id}`} className="other-link"><ProjectCover project={project}/><div className="other-caption"><h3>{project.title}</h3><span>{project.categoryLabel}</span></div><p>{project.description}</p><span className="other-open">프로젝트 보기</span></Link>
  </RevealOnScroll>})}</div>
 </section>;
}
