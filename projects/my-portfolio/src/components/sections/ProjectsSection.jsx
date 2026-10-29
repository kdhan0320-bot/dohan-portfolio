import { Link } from 'react-router-dom';
import { ALL_PROJECTS } from '../../data/projectsData';
import ProjectCover from '../projects/ProjectCover';

const FEATURED = [
  { id: 'seolbiit', label: '정보 구조 / 업무 UI', title: '다음 할 일이 보이는\n설비 점검 화면.', summary: '사무·생산 현장의 경험에서 출발했습니다. 요청 내용과 처리 상태, 담당자 배정을 연결한 Figma 디자인입니다.', note: '상태 요약 · 요청 확인 · 담당자 배정' },
  { id: 'ott-service', label: '시각 표현 / 콘텐츠 탐색', title: '짧은 영화,\n오래 남을 장면.', summary: '영화의 분위기를 먼저 만나고, 마음에 남은 작품과 메모를 모으는 작은 영화 전시관입니다.', note: '포스터 · 테마 기획전 · 관심 메모' },
  { id: 'jobflow', label: '사용 흐름 / 기록 관리', title: '지원의 시작부터,\n다음 준비까지.', summary: '회사별 지원 기록과 마감, 준비할 일을 연결했습니다. 기록을 읽는 흐름 안에 갈피와 종이의 인상을 담았습니다.', note: '회사 기록 · 마감 · 준비 · 면접 연습' },
];
const ProjectsSection = () => (
  <section className="home-work portfolio-shell" id="projects" aria-labelledby="selected-title">
    <div className="section-heading"><div><p className="eyebrow">01 / SELECTED WORK</p><h2 id="selected-title">관찰에서 시작해,<br className="mobile-break" /> 화면으로 이어진 작업.</h2></div><Link className="text-link" to="/projects">전체 작업 보기</Link></div>
    <div className="featured-grid">
      {FEATURED.map((item,index) => {
        const project = ALL_PROJECTS.find(p=>p.id===item.id);
        return <article className={`home-project home-project--${item.id}`} key={item.id}>
          <Link className="home-project-cover" to={`/projects/${project.slug||project.id}`} aria-label={`${project.title} 프로젝트 보기`}><ProjectCover project={project} /></Link>
          <div className="home-project-caption">
            <p className="project-meta"><span className="project-number">0{index+1}</span>{item.label}</p>
            <h3 className="project-name">{project.title}</h3>
            <p className="project-brief">{item.title}</p>
            <p className="project-summary">{item.summary}</p>
            <p className="project-focus">{item.note}</p>
            <div className="project-caption-foot"><span className="project-status">{project.is_figma_project?'Figma 디자인':'AI 협업 웹 제작'}</span><Link className="text-link" to={`/projects/${project.slug||project.id}`}>작업 이야기</Link></div>
          </div>
        </article>;
      })}
    </div>
  </section>
);
export default ProjectsSection;
