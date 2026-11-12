import { Link } from 'react-router-dom';
import { ALL_PROJECTS } from '../../data/projectsData';
import ProjectCover from '../projects/ProjectCover';
import RevealOnScroll from '../ui/RevealOnScroll';
import './selectedWorks.css';

const selected = [
  { id:'feedback-hub', category:'WORKFLOW UI', title:'발주에서 현장 지급까지,', subtitle:'숫자의 흐름을 읽는 화면.', role:'발주·입고·지급 요구사항 정리', scope:'AI 협업 웹 제작 · 브라우저 저장 시연' },
  { id:'seolbiit', category:'OPERATION UI', title:'지금 처리할 요청과', subtitle:'다음 담당자가 보이도록.', role:'설비 점검 요구사항 · 상태 우선순위 검토', scope:'Figma 디자인 · 가상 설비 예시' },
  { id:'ott-service', category:'CONTENT EXPERIENCE', title:'분위기로 고르고,', subtitle:'메모로 기억하는 영화.', role:'편집 방향 · 단독 표지 · 메모 흐름 선택', scope:'AI 협업 반응형 웹 · 가상 영화 콘텐츠' },
];
export default function ProjectsSection() {
  return <section className="selected-works portfolio-shell" id="projects" aria-labelledby="selected-title">
    <div className="editorial-heading"><div><p className="edition-label">01 / SELECTED WORKS</p><h2 id="selected-title">대표 작업<span>03</span></h2></div><Link className="text-link" to="/projects">전체 작업 보기</Link></div>
    <div className="selected-rows">{selected.map((item,index)=>{
      const project=ALL_PROJECTS.find(p=>p.id===item.id);
      return <RevealOnScroll component="article" className="selected-row" key={item.id} y={20} duration={.65}>
        <Link className="selected-row-link" to={`/projects/${project.slug||project.id}`} aria-label={`${project.title} · 프로젝트 보기`}>
          <span className="selected-number">{String(index+1).padStart(2,'0')}</span>
          <div className="selected-art"><ProjectCover project={project}/></div>
          <div className="selected-copy"><p className="selected-category">{item.category}</p><h3>{project.title}</h3><p className="selected-description">{item.title}<br/>{' '}{item.subtitle}</p><p className="selected-role"><span>김도한의 기여</span>{item.role}</p><p className="selected-scope">{item.scope}</p></div>
          <span className="selected-open">프로젝트 보기</span>
        </Link>
      </RevealOnScroll>;
    })}</div>
  </section>;
}
