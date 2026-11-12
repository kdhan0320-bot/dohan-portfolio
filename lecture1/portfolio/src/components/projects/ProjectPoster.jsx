import { Link } from 'react-router-dom';
import { PROJECT_DETAIL_READY } from '../../data/portfolioMeta';
import { projectNumber } from '../../data/posterProjects';
import './projectPosters.css';

const media = `${import.meta.env.BASE_URL}detail/current/`;
const titles = { 'ott-service': ['파란', '오후.'], 'feedback-hub': ['받고, 건네고,', '남은 것을 읽다.'], seolbiit: ['다음', '사람.'], gijunseon: ['기술의', '기준.'], jobflow: ['다음', '기록.'], 'bus-arrival-app': ['곧,', '도착.'], brewstep: ['오늘의', '한 잔.'] };
const secondScreens = { 'bus-arrival-app': 'onjeongryu-busdetail-20261107.png', brewstep: 'soyobit-menu-20261112.png' };

export default function ProjectPoster({ project, index = 0, heading = 'h3' }) {
  const id = project.id;
  const slug = project.slug || (id === 'bus-arrival-app' ? 'bus-arrival' : id);
  const ready = PROJECT_DETAIL_READY[id === 'bus-arrival-app' ? 'bus-arrival' : id];
  const contribution = id === 'feedback-hub' ? '발주·입고·지급 요구사항 정리' : ready?.aiCollaboration?.find(item => item.label === '김도한')?.value;
  const Heading = heading;
  const mobile = Boolean(secondScreens[id]);
  const loading = index < 3 ? 'eager' : 'lazy';
  return <article className={`poster-card${['feedback-hub', 'seolbiit'].includes(id) ? ' poster-card--lead' : ''}`} data-project={id}>
    <Link className="poster-card__link" to={`/projects/${slug}`} aria-label={`${project.title} · 작품 상세 보기`}>
      <div className={`project-poster project-poster--${id}`} aria-hidden="true">
        <div className="poster-edition"><span>{projectNumber(id)}</span><span>{id === 'ott-service' ? '단편영화 큐레이션' : project.is_figma_project && !project.liveUrl ? 'Figma 디자인' : '웹·UI 프로젝트'}</span></div>
        <p className="poster-title">{titles[id].map(line => <span key={line}>{line}</span>)}</p>
        {id === 'ott-service' ? <img className="poster-scene" src={media+'bluehour-cover-original-20261113.webp'} alt="" width="1942" height="809" loading={loading} />
          : id === 'feedback-hub' ? <><div className="poster-numbers"><span><small>입고</small>3</span><span><small>지급</small>2</span><span><small>보유</small>1</span></div><img className="poster-receipt" src={media+'pumuiseon-opening-slip.png'} alt="" loading={loading} width="1044" height="591" /></>
          : id === 'seolbiit' ? <img className="poster-picker" src={media+'seolbigyeol-picker-mobile-20261112.png'} alt="" loading={loading} width="390" height="844" />
          : mobile ? <div className="poster-phones"><img src={project.thumbnailUrl} alt="" loading={loading} width="390" height="844" /><img src={media+secondScreens[id]} alt="" loading={loading} width="390" height="844" /></div>
          : <img className="poster-screen" src={media+(id === 'gijunseon' ? 'gijunseon-hero-390-20261112.png' : 'galpirok-home-390-20261112.jpg')} alt="" loading={loading} width="390" height={id === 'gijunseon' ? '567' : '844'} />}
        <span className="poster-open">작품 보기</span>
      </div>
      <div className="poster-meta"><Heading>{project.title}</Heading><p>{project.categoryLabel || project.category}</p></div>
    </Link>
    <p className="poster-credit"><span>김도한</span>{contribution}</p>
  </article>;
}
