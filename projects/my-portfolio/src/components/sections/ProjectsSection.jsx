import { Link } from 'react-router-dom';
import { ALL_PROJECTS } from '../../data/projectsData';
import ProjectCover from '../projects/ProjectCover';
import RevealOnScroll from '../ui/RevealOnScroll';

const FEATURED = [
  { id: 'feedback-hub', label: '업무 경험을 화면으로', title: '발주한 5개가,\n재고 5개는 아니니까.', summary: '구매·자재 업무에서 마주한 수량의 차이. 발주부터 입고·지급까지, 같은 자재의 기록을 연결했습니다.', decision: '발주 · 입고 · 지급을 구분하고, 현재 보유량의 근거를 한 화면에.', scope: '브라우저 저장 시연 · 실제 결재·메일 전송 없음' },
  { id: 'ott-service', label: '분위기를 선택으로', title: '오래 남는 장면을\n만나는 작은 영화관.', summary: '오후와 새벽, 두 장면으로 시작해 취향에 맞는 작품을 고르고 기록하는 영화 큐레이션 웹입니다.', decision: '표지의 장면에서 작품 탐색과 관심 메모까지.', scope: '가상 영화·AI 이미지 · 실제 영상 재생 없음' },
  { id: 'jobflow', label: '흩어진 준비를 한곳으로', title: '회사별 기록에,\n다음 준비의 갈피를.', summary: '지원 상태와 마감, 면접 준비를 회사별로 연결합니다. 다이어리의 갈피를 정보의 위치로 사용했습니다.', decision: '회사 · 지원 단계 · 날짜 · 남은 준비를 하나의 기록으로.', scope: '가상 회사 샘플 · 체험 편집은 새로고침 시 초기화' },
];

const ProjectsSection = () => <section className="home-work portfolio-shell" id="projects" aria-labelledby="selected-title">
  <RevealOnScroll><div className="section-heading"><div><p className="eyebrow">01 / SELECTED WORK</p><h2 id="selected-title">경험은 다르게,<br />화면은 분명하게.</h2></div><p className="section-description">업무의 질서, 콘텐츠의 분위기, 기록의 흐름.<br />세 가지 작업으로 소개합니다.</p></div></RevealOnScroll>
  <div className="featured-grid">{FEATURED.map((item, index) => {
    const project = ALL_PROJECTS.find(p => p.id === item.id);
    return <RevealOnScroll key={item.id} delay={index === 2 ? 0.08 : 0} sx={{ minWidth: 0, gridColumn: index === 0 ? '1 / -1' : 'auto' }}>
      <article className={`home-project home-project--${item.id}`}>
        <div className="home-project-index"><span>0{index + 1}</span><span>{item.label}</span><span>{project.title}</span></div>
        <div className="home-project-body">
          <Link className="home-project-cover" to={`/projects/${project.slug || project.id}`} aria-label={`${project.title} 프로젝트 보기`}><ProjectCover project={project} /><span className="cover-open">작업 자세히 보기</span></Link>
          <div className="home-project-caption"><p className="project-name">{project.title}<span>{project.categoryLabel}</span></p><h3 className="project-brief">{item.title}</h3><p className="project-summary">{item.summary}</p><p className="project-decision">{item.decision}</p><div className="project-caption-foot"><Link className="portfolio-button portfolio-button--secondary" to={`/projects/${project.slug || project.id}`}>과정과 화면 보기</Link><a className="text-link" href={project.liveUrl} target="_blank" rel="noopener noreferrer">웹사이트<span className="visually-hidden"> (새 탭)</span></a></div><p className="project-scope">{item.scope}</p></div>
        </div>
      </article>
    </RevealOnScroll>;
  })}</div>
</section>;
export default ProjectsSection;
