import { Link } from 'react-router-dom';
import { ALL_PROJECTS } from '../../data/projectsData';
import ProjectCover from '../projects/ProjectCover';

const FEATURED = [
  { id: 'feedback-hub', label: '실제 업무 경험 / 구매·자재 관리', title: '주문한 수량과\n지금 쓸 수 있는 수량.', summary: '엑셀·메일로 품의를 정리하고 센서를 지급했던 경험에서 출발했습니다. 품의부터 입고·지급까지 이어지는 업무를 한 흐름으로 구성했습니다.', decision: '발주 · 입고 · 지급을 나누고, 현재 재고의 계산 근거를 같은 화면에 배치했습니다.', scope: '브라우저 저장 시연 · 실제 결재·메일 전송 없음' },
  { id: 'ott-service', label: '시각 표현 / 콘텐츠 탐색', title: '분위기로 만나고,\n취향으로 남기는 영화.', summary: '오후와 새벽, 두 장면으로 시작하는 작은 영화 전시관입니다. 작품의 분위기와 남는 시간으로 고르고, 마음에 남은 이유를 기록합니다.', decision: '표지의 장면, 작품 목록, 테마 기획전의 이미지 크기를 달리해 탐색의 리듬을 만들었습니다.', scope: '가상 영화·AI 이미지 · 실제 영상 재생 없음' },
  { id: 'jobflow', label: '정보 구조 / 입사지원 관리', title: '회사별 기록에서\n다음 준비가 보이도록.', summary: '지원 상태와 마감, 준비할 일을 회사별로 연결했습니다. 다이어리의 색인과 갈피를 정보의 위치를 알려주는 시각 요소로 사용했습니다.', decision: '회사명·지원 단계·날짜·남은 준비를 한 기록 안에서 읽도록 모았습니다.', scope: '가상 회사 샘플 · 체험 편집은 새로고침 시 초기화' },
];
const ProjectsSection = () => <section className="home-work portfolio-shell" id="projects" aria-labelledby="selected-title">
  <div className="section-heading"><div><p className="eyebrow">01 / SELECTED WORK</p><h2 id="selected-title">세 가지 시선,<br />서로 다른 화면.</h2></div><p className="section-description">경험을 담은 업무 화면, 분위기를 전하는 콘텐츠,<br className="desktop-break" /> 기록을 이어주는 서비스입니다.</p></div>
  <div className="featured-grid">{FEATURED.map((item,index) => {
    const project=ALL_PROJECTS.find(p=>p.id===item.id);
    return <article className={`home-project home-project--${item.id}`} key={item.id}>
      <div className="home-project-index"><span>0{index+1}</span><span>{item.label}</span><span>AI 협업 웹 제작</span></div>
      <div className="home-project-body">
        <Link className="home-project-cover" to={`/projects/${project.slug||project.id}`} aria-label={`${project.title} 프로젝트 보기`}><ProjectCover project={project} /></Link>
        <div className="home-project-caption"><p className="project-name">{project.title}</p><h3 className="project-brief">{item.title}</h3><p className="project-summary">{item.summary}</p><div className="project-decision"><span>화면에 반영한 선택</span><p>{item.decision}</p></div><div className="project-caption-foot"><Link className="portfolio-button portfolio-button--secondary" to={`/projects/${project.slug||project.id}`}>작업 자세히 보기</Link><a className="text-link" href={project.liveUrl} target="_blank" rel="noopener noreferrer">웹사이트<span className="visually-hidden"> (새 탭)</span></a></div><p className="project-scope">{item.scope}</p></div>
      </div>
    </article>;
  })}</div>
</section>;
export default ProjectsSection;
