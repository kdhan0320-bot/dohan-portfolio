import { useParams, useNavigate, useLocation, Navigate, Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { ALL_PROJECTS } from '../data/projectsData';
import { PROJECT_DETAIL_READY } from '../data/portfolioMeta';
import './portfolioEditorial.css';

const BASE = import.meta.env.BASE_URL;
const mediaUrl = (path) => /^(https?:|data:|blob:)/.test(path) ? path : `${BASE}${path.replace(/^\//, '')}`;
const projectSlug = (project) => project.slug || (project.id === 'bus-arrival-app' ? 'bus-arrival' : project.id);

// A long desktop page is not a mobile frame. Only explicit device-width metadata
// constrains the image; source aspect ratio alone cannot identify a phone screen.
const isPortrait = (media) => Boolean(media.frameWidth);

const ScreenFigure = ({ media, label, priority = false, className = '' }) => (
  <figure className={`case-figure ${isPortrait(media) ? 'case-figure--portrait' : ''} ${className}`}>
    <div className="case-figure__surface">
      <img
        src={mediaUrl(media.src)}
        alt={media.alt || label || '프로젝트 화면'}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
      />
    </div>
    <figcaption>
      <span>{label || '화면 상세'}</span>
      <a href={mediaUrl(media.src)} target="_blank" rel="noopener noreferrer">
        원본 보기 <ArrowOutwardIcon aria-hidden="true" />
      </a>
    </figcaption>
  </figure>
);

const ExternalAction = ({ href, children, primary = false }) => href ? (
  <a className={`case-action${primary ? ' case-action--primary' : ''}`} href={href} target="_blank" rel="noopener noreferrer">
    {children}<ArrowOutwardIcon aria-hidden="true" />
  </a>
) : null;

const ScopeList = ({ title, items }) => items?.length ? (
  <div className="case-scope__column">
    <h3>{title}</h3>
    <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
  </div>
) : null;

const ProjectDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const publicProjects = ALL_PROJECTS.filter((item) => item.is_featured || item.moreWorksPublished);
  const project = publicProjects.find((item) => projectSlug(item) === slug);
  const ready = PROJECT_DETAIL_READY[slug];

  if (!project || !ready) return <Navigate to="/projects" replace />;

  const goBack = () => {
    if (location.key === 'default') navigate('/projects');
    else navigate(-1);
  };
  const currentIndex = publicProjects.findIndex((item) => item.id === project.id);
  const nextProject = publicProjects[(currentIndex + 1) % publicProjects.length];
  const figmaUrl = project.figmaDesignUrl || project.figmaPrototypeUrl || project.prototypeUrl;
  const heroMedia = (ready.hero?.media || []).filter((media) => media?.src);
  const usedImages = new Set(heroMedia.map((media) => media.src));
  const decisions = (ready.decisions || []).map((decision) => {
    const showMedia = decision.media?.src && !usedImages.has(decision.media.src);
    if (showMedia) usedImages.add(decision.media.src);
    return { ...decision, showMedia };
  });
  const additionalScreens = (ready.mainScreens || []).filter((screen) => {
    if (!screen.media?.src || usedImages.has(screen.media.src)) return false;
    usedImages.add(screen.media.src);
    return true;
  });
  const facts = [
    { label: '작업 분야', value: project.categoryLabel || ready.meta?.type },
    { label: '역할', value: project.role || ready.meta?.role },
    { label: '사용 도구', value: (project.tools || []).join(' · ') || ready.meta?.tools },
  ].filter((item) => item.value);

  return (
    <article className="case-page" data-page-id="project-detail" data-project-slug={slug}>
      <div className="portfolio-shell">
        <header className="case-intro">
          <button className="case-back" onClick={goBack} type="button">
            <ArrowBackIcon aria-hidden="true" /> 작업으로 돌아가기
          </button>
          <div className="case-intro__grid">
            <div>
              <p className="case-eyebrow">{project.is_figma_project ? 'Figma 디자인' : '웹사이트 · 인터랙션'}</p>
              <h1>{project.title}</h1>
            </div>
            <div className="case-intro__description">
              <p className="case-lead">{ready.hero?.summary || project.description}</p>
              <div className="case-actions" aria-label="프로젝트 바로 보기">
                <ExternalAction href={project.liveUrl} primary>웹사이트 보기</ExternalAction>
                <ExternalAction href={figmaUrl} primary={!project.liveUrl}>
                  {project.figmaDesignUrl ? 'Figma 디자인 보기' : (project.figmaPrototypeLabel || 'Figma 화면 보기')}
                </ExternalAction>
                <ExternalAction href={project.githubUrl}>코드 보기</ExternalAction>
              </div>
            </div>
          </div>
          <dl className="case-facts">
            {facts.map((item) => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}
          </dl>
        </header>

        {heroMedia.length > 0 && <div className={`case-cover ${heroMedia.length > 1 ? 'case-cover--pair' : ''}`}>
          {heroMedia.map((media, index) => <ScreenFigure
            key={media.src} media={media} priority={index === 0}
            label={index === 0 ? ready.hero.mediaLabel : '화면 구성'}
          />)}
        </div>}

        <section className="case-section case-context" aria-labelledby="case-context-heading">
          <div className="case-section__heading">
            <p className="case-eyebrow">01 / 프로젝트 배경</p>
            <h2 id="case-context-heading">어떤 문제에서<br />시작했나요?</h2>
          </div>
          <div className="case-context__body">
            <div><h3>출발점</h3><p>{ready.context?.problem || project.problem}</p></div>
            <div><h3>목표</h3><p>{ready.context?.goal || project.goal}</p></div>
          </div>
        </section>

        {decisions.length > 0 && <section className="case-section case-decisions" aria-labelledby="case-decisions-heading">
          <div className="case-section__heading case-section__heading--inline">
            <div><p className="case-eyebrow">02 / 화면과 판단</p><h2 id="case-decisions-heading">이렇게 구성했습니다.</h2></div>
            <p className="case-section__note">화면에 반영한 선택과 그 이유입니다.</p>
          </div>
          <div className="case-decisions__list">
            {decisions.map((decision, index) => {
              const evidence = decision.evidence || [
                { label: '선택', text: decision.choice },
                { label: '이유', text: decision.reason },
                { label: '확인', text: decision.verification },
              ];
              return <section key={decision.title} className={`case-decision${decision.showMedia ? '' : ' case-decision--text'}`}>
                <div className="case-decision__copy">
                  <span className="case-decision__number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                  <h3>{decision.title}</h3>
                  <dl>{evidence.filter((item) => item.text).map((item) => <div key={item.label}>
                    <dt>{item.label}</dt><dd>{item.text}</dd>
                  </div>)}</dl>
                </div>
                {decision.showMedia && <ScreenFigure media={decision.media} label={decision.mediaLabel || '주요 화면'} />}
              </section>;
            })}
          </div>
        </section>}

        {additionalScreens.length > 0 && <section className="case-section" aria-labelledby="case-screens-heading">
          <div className="case-section__heading"><h2 id="case-screens-heading">함께 살펴볼 화면</h2></div>
          <div className="case-screen-grid">
            {additionalScreens.map((screen) => <ScreenFigure key={screen.media.src} media={screen.media} label={screen.label} />)}
          </div>
        </section>}

        <section className="case-section case-scope" aria-labelledby="case-scope-heading">
          <div className="case-section__heading case-section__heading--inline">
            <div><p className="case-eyebrow">03 / 제작 범위</p><h2 id="case-scope-heading">완성한 것과 남은 것</h2></div>
          </div>
          <div className="case-scope__grid">
            <ScopeList title="제작한 범위" items={ready.scope?.actual} />
            <ScopeList title="데모·샘플의 범위" items={ready.scope?.demoStatic} />
            <ScopeList title="포함하지 않은 기능" items={ready.scope?.notIncluded} />
          </div>
          {(ready.resultLimit?.done || ready.resultLimit?.limit) && <div className="case-outcome">
            {ready.resultLimit.done && <div><h3>작업 결과</h3><p>{ready.resultLimit.done}</p></div>}
            {ready.resultLimit.limit && <div><h3>한계</h3><p>{ready.resultLimit.limit}</p></div>}
          </div>}
          {(ready.aiCollaboration?.length || project.detail?.aiContribution) && <div className="case-contribution">
            <h3>작업 기여와 AI 활용</h3>
            {ready.aiCollaboration?.length ? <dl>{ready.aiCollaboration.map((item) => <div key={item.label}>
              <dt>{item.label}</dt><dd>{item.value}</dd>
            </div>)}</dl> : <p>{project.detail.aiContribution}</p>}
          </div>}
        </section>

        <footer className="case-footer">
          <Link className="case-list-link" to="/projects"><ArrowBackIcon aria-hidden="true" />전체 작업</Link>
          {nextProject && nextProject.id !== project.id && <Link className="case-next" to={`/projects/${projectSlug(nextProject)}`}>
            <span><small>다음 프로젝트</small><strong>{nextProject.title}</strong></span>
            <ArrowForwardIcon aria-hidden="true" />
          </Link>}
        </footer>
      </div>
    </article>
  );
};

export default ProjectDetailPage;
