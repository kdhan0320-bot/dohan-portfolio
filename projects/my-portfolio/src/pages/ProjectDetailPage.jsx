import { useId, useState } from 'react';
import { useParams, useNavigate, useLocation, Navigate, Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
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
      {media.mobile ? <picture className="case-responsive-image">
        <source media={`(max-width: ${media.mobile.breakpoint || 760}px)`} srcSet={mediaUrl(media.mobile.src)} />
        <img src={mediaUrl(media.src)} alt={media.alt || label || '프로젝트 화면'} loading={priority ? 'eager' : 'lazy'} decoding="async" />
      </picture> : <img src={mediaUrl(media.src)} alt={media.alt || label || '프로젝트 화면'} loading={priority ? 'eager' : 'lazy'} decoding="async" />}
    </div>
    <figcaption>
      <span className={media.mobile?.label ? 'case-caption-desktop' : undefined}>{label || '화면 상세'}</span>
      {media.mobile?.label && <span className="case-caption-mobile">{media.mobile.label}</span>}
      <a className={media.mobile ? 'case-original-desktop' : undefined} href={mediaUrl(media.original || media.src)} target="_blank" rel="noopener noreferrer" aria-label={`${label || '프로젝트 화면'} 원본 새 탭에서 보기`}>
        {media.original ? '전체 화면 보기' : '원본 보기'}
      </a>
      {media.mobile && <a className="case-original-mobile" href={mediaUrl(media.mobile.original || media.mobile.src)} target="_blank" rel="noopener noreferrer" aria-label={`${label || '프로젝트 화면'} 모바일 원본 새 탭에서 보기`}>{media.mobile.original ? '전체 화면 보기' : '원본 보기'}</a>}
      {media.relatedOriginal && <a className="case-original-related" href={mediaUrl(media.relatedOriginal.src)} target="_blank" rel="noopener noreferrer" aria-label={`${media.relatedOriginal.label} · PC 원본 새 탭에서 보기`}>{media.relatedOriginal.label}</a>}
    </figcaption>
  </figure>
);

const ScreenChoices = ({ choices }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const panelId = useId();
  const selected = choices[selectedIndex];
  return <div className="case-screen-choices">
    <div className="case-screen-choices__controls" role="group" aria-label="보관함 시연 화면 선택">
      {choices.map((choice, index) => <button key={choice.label} type="button" aria-pressed={selectedIndex === index} aria-controls={panelId} onClick={() => setSelectedIndex(index)}>{choice.label}</button>)}
    </div>
    <div id={panelId} aria-live="polite">
      <ScreenFigure media={selected.media} label={selected.caption} />
    </div>
  </div>;
};

const ExternalAction = ({ href, children, primary = false }) => href ? (
  <a className={`case-action${primary ? ' case-action--primary' : ''}`} href={href} target="_blank" rel="noopener noreferrer" aria-label={`${children} (새 탭)`}>
    {children}
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
  const focusedCase = ready.presentation === 'focused-decisions';
  const figmaUrl = project.figmaDesignUrl || project.figmaPrototypeUrl || project.prototypeUrl;
  const heroMedia = (ready.hero?.media || []).filter((media) => media?.src);
  const usedImages = new Set(heroMedia.map((media) => media.src));
  const decisions = (ready.decisions || []).map((decision) => {
    const media = decision.mediaChoices?.[0]?.media || decision.media;
    const showMedia = media?.src && !usedImages.has(media.src);
    if (showMedia) usedImages.add(media.src);
    return { ...decision, media, showMedia };
  });
  const additionalScreens = (ready.mainScreens || []).filter((screen) => {
    if (!screen.media?.src || usedImages.has(screen.media.src)) return false;
    usedImages.add(screen.media.src);
    return true;
  });
  const facts = [
    { label: '작업 분야', value: project.categoryLabel || ready.meta?.type },
    { label: '사용 도구', value: (project.tools || []).join(' · ') || ready.meta?.tools },
    ...(ready.aiCollaboration || []).map((item) => ({
      label: item.label === '김도한' ? '김도한의 기여' : item.label,
      value: item.value,
    })),
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
              <p className="case-eyebrow">{project.is_figma_project ? '개인 프로젝트 · Figma 디자인 시안' : '개인 프로젝트 · 웹 구현'}</p>
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
          {!ready.imageFirst && <dl className="case-facts">
            {facts.map((item) => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}
          </dl>}
        </header>

        {heroMedia.length > 0 && <div className={`case-cover ${heroMedia.length > 1 ? 'case-cover--pair' : ''}`}>
          {heroMedia.map((media, index) => <ScreenFigure
            key={media.src} media={media} priority={index === 0}
            label={index === 0 ? ready.hero.mediaLabel : '화면 구성'}
          />)}
        </div>}

        {ready.heroNote && <section className="case-hero-note" aria-label="첫 화면의 구성 판단">
          <h2>{ready.heroNote.title}</h2>
          <p>{ready.heroNote.text}</p>
        </section>}

        {ready.imageFirst && <section className="case-project-facts" aria-label="제작 역할과 도구">
          <dl className="case-facts">
            {facts.map((item) => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}
          </dl>
        </section>}

        {!focusedCase && <section className="case-section case-context" aria-labelledby="case-context-heading">
          <div className="case-section__heading">
            <p className="case-eyebrow">01 / 프로젝트 배경</p>
            <h2 id="case-context-heading">어떤 문제에서<br />시작했나요?</h2>
          </div>
          <div className="case-context__body">
            <div><h3>{ready.context?.problemLabel || '출발점'}</h3><p>{ready.context?.problem || project.problem}</p></div>
            <div><h3>목표</h3><p>{ready.context?.goal || project.goal}</p></div>
          </div>
        </section>}

        {decisions.length > 0 && <section className={`case-section case-decisions${focusedCase ? ' case-decisions--focused' : ''}`} aria-labelledby="case-decisions-heading">
          <div className="case-section__heading case-section__heading--inline">
            <div><p className="case-eyebrow">{focusedCase ? '선택과 근거' : '02 / 화면과 판단'}</p><h2 id="case-decisions-heading">{ready.decisionsTitle || '이렇게 구성했습니다.'}</h2></div>
            {!focusedCase && <p className="case-section__note">화면에 반영한 선택과 그 이유입니다.</p>}
          </div>
          {focusedCase && ready.context?.summary && <p className="case-assumption">{ready.context.summary}</p>}
          <div className="case-decisions__list">
            {decisions.map((decision, index) => {
              const evidence = decision.evidence || [
                { label: '선택', text: decision.choice },
                { label: '이유', text: decision.reason },
                { label: '확인', text: decision.verification },
              ];
              return <section key={decision.title} className={`case-decision${decision.comparison ? ' case-decision--comparison' : decision.layout === 'wide' ? ' case-decision--wide' : decision.showMedia ? '' : ' case-decision--text'}`}>
                <div className="case-decision__copy">
                  <span className="case-decision__number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                  <h3>{decision.title}</h3>
                  {decision.summary ? <p className="case-decision__summary">{decision.summary}</p> : <dl>{evidence.filter((item) => item.text).map((item) => <div key={item.label}>
                    <dt>{item.label}</dt><dd>{item.text}</dd>
                  </div>)}</dl>}
                </div>
                {decision.comparison ? <div className="case-comparison">
                  <div className="case-comparison__grid">
                    <div>
                      <p className="case-comparison__label">{decision.comparison.beforeHeading || '이전 화면'}</p>
                      <ScreenFigure media={decision.comparison.before} label={decision.comparison.beforeLabel} />
                      <p className="case-comparison__summary">{decision.comparison.beforeSummary}</p>
                    </div>
                    <div>
                      <p className="case-comparison__label case-comparison__label--current">{decision.comparison.afterHeading || '현재 화면'}</p>
                      <ScreenFigure media={decision.media} label={decision.comparison.afterLabel} />
                      <p className="case-comparison__summary">{decision.comparison.afterSummary}</p>
                    </div>
                  </div>
                  <p className="case-comparison__note">
                    {decision.comparison.note}
                    {decision.comparison.reference && <a href={mediaUrl(decision.comparison.reference.src)} target="_blank" rel="noopener noreferrer" aria-label={`${decision.comparison.reference.label} (새 탭)`}>
                      {decision.comparison.reference.label}
                    </a>}
                  </p>
                </div> : decision.showMedia && (decision.mediaChoices ? <ScreenChoices choices={decision.mediaChoices} /> : decision.reference ? <div>
                  <ScreenFigure media={decision.media} label={decision.mediaLabel || '주요 화면'} />
                  <a className="case-screen-reference" href={mediaUrl(decision.reference.src)} target="_blank" rel="noopener noreferrer" aria-label={`${decision.reference.label} (새 탭)`}>{decision.reference.label}</a>
                </div> : <ScreenFigure media={decision.media} label={decision.mediaLabel || '주요 화면'} />)}
                {decision.check && <div className={`case-decision-check${decision.check.title ? '' : ' case-decision-check--inline'}`}>
                  {decision.check.title && <h4>{decision.check.title}</h4>}
                  <p>{decision.check.result}</p>
                </div>}
              </section>;
            })}
          </div>
          {ready.decisionsNote && <div className={`case-decisions__aside${ready.decisionsNote.media ? ' case-decisions__aside--illustrated' : ''}`}>
            <div className="case-decisions__aside-copy">
              <h3>{ready.decisionsNote.title}</h3>
              <p>{ready.decisionsNote.text}</p>
            </div>
            {ready.decisionsNote.media ? <ScreenFigure media={ready.decisionsNote.media} label={ready.decisionsNote.mediaLabel} className="case-figure--curation" /> : <a href={mediaUrl(ready.decisionsNote.reference.src)} target="_blank" rel="noopener noreferrer" aria-label={`${ready.decisionsNote.reference.label} (새 탭)`}>{ready.decisionsNote.reference.label}</a>}
          </div>}
        </section>}

        {additionalScreens.length > 0 && <section className="case-section" aria-labelledby="case-screens-heading">
          <div className="case-section__heading"><h2 id="case-screens-heading">함께 살펴볼 화면</h2></div>
          <div className="case-screen-grid">
            {additionalScreens.map((screen) => <ScreenFigure key={screen.media.src} media={screen.media} label={screen.label} />)}
          </div>
        </section>}

        {!focusedCase && ready.verification?.tasks?.length > 0 && <section className="case-section case-verification" aria-labelledby="case-verification-heading">
          <div className="case-section__heading">
            <p className="case-eyebrow">03 / 동작 확인</p>
            <h2 id="case-verification-heading">만든 흐름을 직접 확인했습니다.</h2>
            <p className="case-section__note">{ready.verification.method}</p>
          </div>
          <ol className="case-verification__tasks">
            {ready.verification.tasks.map((task) => <li key={task.title}>
              <h3>{task.title}</h3>
              <p>{task.result}</p>
            </li>)}
          </ol>
          <p className="case-verification__limit">{ready.verification.limit}</p>
        </section>}

        <section className="case-section case-scope" aria-labelledby="case-scope-heading">
          <div className="case-section__heading case-section__heading--inline">
            <div>{!ready.scopeSummary && <p className="case-eyebrow">{focusedCase ? '제작 범위' : `${ready.verification?.tasks?.length ? '04' : '03'} / 제작 범위`}</p>}<h2 id="case-scope-heading">{ready.scopeTitle || '완성한 것과 남은 것'}</h2></div>
          </div>
          {ready.scopeSummary ? <div className="case-scope__grid case-scope__grid--summary">
            {ready.scopeSummary.map((item) => <div className="case-scope__column" key={item.title}><h3>{item.title}</h3><p>{item.text}</p></div>)}
          </div> : <div className="case-scope__grid">
            <ScopeList title="제작한 범위" items={ready.scope?.actual} />
            <ScopeList title="데모·샘플의 범위" items={ready.scope?.demoStatic} />
            <ScopeList title="포함하지 않은 기능" items={ready.scope?.notIncluded} />
          </div>}
          {focusedCase && ready.verification && <div className="case-validation-summary">
            {ready.verification.method && <p>{ready.verification.method}</p>}
            {ready.verification.limit && <p>{ready.verification.limit}</p>}
          </div>}
          {(ready.resultLimit?.done || ready.resultLimit?.limit) && <div className="case-outcome">
            {ready.resultLimit.done && <div><h3>작업 결과</h3><p>{ready.resultLimit.done}</p></div>}
            {ready.resultLimit.limit && <div><h3>한계</h3><p>{ready.resultLimit.limit}</p></div>}
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
