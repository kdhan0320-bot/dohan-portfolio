import { useParams, useNavigate, useLocation, Navigate, Link } from 'react-router-dom';
import { ALL_PROJECTS, FEATURED_CASES } from '../data/projectsData';
import ProcurementCase from './ProcurementCase';
import { PROJECT_DETAIL_READY } from '../data/portfolioMeta';
import './portfolioEditorial.css';
import { scrollToSection } from '../hooks/useScrollNav';

const BASE = import.meta.env.BASE_URL;
const mediaUrl = (path) => /^(https?:|data:|blob:)/.test(path) ? path : `${BASE}${path.replace(/^\//, '')}`;
const projectSlug = (project) => project.slug || (project.id === 'bus-arrival-app' ? 'bus-arrival' : project.id);

// A long desktop page is not a mobile frame. Only explicit device-width metadata
// constrains the image; source aspect ratio alone cannot identify a phone screen.
const isPortrait = (media) => Boolean(media.frameWidth);
// Dimensions reserve the correct space before a lazy image arrives. The source
// needs its own dimensions because a mobile capture has a different ratio.
const imageDimensions = (aspectRatio) => {
  const [width, height] = String(aspectRatio || '').split('/').map(Number);
  return width > 0 && height > 0 ? { width, height } : {};
};
const cropVariables = (media) => {
  if (!media.crop) return undefined;
  const original = imageDimensions(media.aspectRatio);
  const variables = ({ x, y, width, height }, prefix) => ({
    [`--${prefix}-ratio`]: `${width} / ${height}`,
    [`--${prefix}-image-width`]: `${original.width / width * 100}%`,
    [`--${prefix}-left`]: `${-x / width * 100}%`,
    [`--${prefix}-top`]: `${-y / height * 100}%`,
  });
  return {
    ...variables(media.crop, 'crop'),
    ...(media.mobileCrop ? variables(media.mobileCrop, 'mobile-crop') : {}),
  };
};

const ScreenFigure = ({ media, label, priority = false, className = '' }) => (
  <figure className={`case-figure ${isPortrait(media) ? 'case-figure--portrait' : ''} ${media.crop ? `case-figure--cropped ${media.mobile ? 'case-figure--crop-responsive' : ''} ${media.mobileCrop ? 'case-figure--mobile-crop' : ''}` : ''} ${className}`} style={media.frameWidth ? { '--frame-width': `${media.frameWidth}px` } : undefined}>
    <div className="case-figure__surface" style={cropVariables(media)}>
      {media.mobile ? <picture className="case-responsive-image">
        <source media={`(max-width: ${media.mobile.breakpoint || 760}px)`} srcSet={mediaUrl(media.mobile.src)} {...imageDimensions(media.mobile.aspectRatio)} />
        <img src={mediaUrl(media.src)} alt={media.alt || label || '프로젝트 화면'} {...imageDimensions(media.aspectRatio)} loading={priority ? 'eager' : 'lazy'} decoding="async" />
      </picture> : <img src={mediaUrl(media.src)} alt={media.alt || label || '프로젝트 화면'} {...imageDimensions(media.aspectRatio)} loading={priority ? 'eager' : 'lazy'} decoding="async" />}
    </div>
    <figcaption>
      <span className={media.mobile?.label || media.mobileCrop?.label ? 'case-caption-desktop' : undefined}>{label || '화면 상세'}</span>
      {(media.mobile?.label || media.mobileCrop?.label) && <span className="case-caption-mobile">{media.mobile?.label || media.mobileCrop.label}</span>}
      <a className={media.mobile ? 'case-original-desktop' : undefined} href={mediaUrl(media.original || media.src)} target="_blank" rel="noopener noreferrer" aria-label={`${label || '프로젝트 화면'} 원본 새 탭에서 보기`}>
        {media.original ? '전체 화면 보기' : '원본 보기'}
      </a>
      {media.mobile && <a className="case-original-mobile" href={mediaUrl(media.mobile.original || media.mobile.src)} target="_blank" rel="noopener noreferrer" aria-label={`${label || '프로젝트 화면'} 모바일 원본 새 탭에서 보기`}>{media.mobile.original ? '전체 화면 보기' : '원본 보기'}</a>}
      {media.relatedOriginal && <a className="case-original-related" href={mediaUrl(media.relatedOriginal.src)} target="_blank" rel="noopener noreferrer" aria-label={`${media.relatedOriginal.label} · PC 원본 새 탭에서 보기`}>{media.relatedOriginal.label}</a>}
    </figcaption>
  </figure>
);

const ExternalAction = ({ href, children, primary = false }) => href ? <a className={`case-action${primary ? ' case-action--primary' : ''}`} href={href} target="_blank" rel="noopener noreferrer" aria-label={`${children} (새 탭)`}>{children}</a> : null;
const ScopeList = ({ title, items }) => items?.length ? <div className="case-scope__column"><h3>{title}</h3><ul>{items.map(item=><li key={item}>{item}</li>)}</ul></div> : null;

const StandardProjectCase = ({ project, ready, featuredCase, register }) => {
  const figmaUrl = project.figmaDesignUrl || project.figmaPrototypeUrl || project.prototypeUrl;
  const heroMedia = (ready.hero?.media || []).filter(item=>item.src);
  const usedImages = new Set(heroMedia.map(item=>`${item.src}:${JSON.stringify(item.crop||null)}`));
  const decisions=(ready.decisions||[]).map(item=>{
    const key=item.media ? `${item.media.src}:${JSON.stringify(item.media.crop||null)}` : '';
    const showMedia=key&&!usedImages.has(key);
    if(showMedia)usedImages.add(key);
    return {...item,showMedia};
  });
  return <>
    <header className="case-intro">
      {register}
      <div className="case-intro__grid">
        <div>
          <p className="case-eyebrow">{project.categoryLabel}</p>
          <h1>{project.title}</h1>
          <p className="case-production">{project.productionLabel || (project.is_figma_project ? 'Figma 디자인' : 'AI 협업 웹 제작')}</p>
        </div>
        <div>
          {featuredCase && <p className="case-question">{featuredCase.question}</p>}
          <p className="case-lead">{ready.hero?.summary || project.description}</p>
          <div className="case-actions" aria-label="프로젝트 바로 보기">
            <ExternalAction href={project.liveUrl} primary>웹사이트 보기</ExternalAction>
            <ExternalAction href={figmaUrl} primary={!project.liveUrl}>Figma 디자인 보기</ExternalAction>
            <ExternalAction href={project.githubUrl}>코드 보기</ExternalAction>
          </div>
        </div>
      </div>

      <nav className="case-jumps" aria-label="프로젝트 상세 구간"><button type="button" onClick={() => scrollToSection('case-context')}><span>01</span>출발점</button><button type="button" onClick={() => scrollToSection('case-decisions')}><span>02</span>화면의 선택</button><button type="button" onClick={() => scrollToSection('case-scope')}><span>03</span>제작 범위</button></nav>
    </header>
    <div className="case-opening-facts"><dl>{(ready.aiCollaboration||[]).map(item=><div key={item.label}><dt>{item.label==='김도한'?'김도한의 기여':item.label}</dt><dd>{item.value}</dd></div>)}</dl><p className="case-opening-facts__tools">제작 도구·기술 <span>{project.tools.join(' · ')}</span></p></div>
    <div className="case-cover">{heroMedia.map((item,i)=><ScreenFigure key={item.src} media={item} priority={i===0} label={ready.hero.mediaLabel}/>)}</div>
    <section id="case-context" className="case-section case-context" aria-labelledby="case-context-heading"><div><p className="case-eyebrow">01 / CONTEXT</p><h2 id="case-context-heading">어디에서<br />시작했나요?</h2></div><div className="case-context__body"><div><h3>출발점</h3><p>{ready.context?.summary||ready.context?.problem||project.problem}</p></div><div><h3>화면의 목표</h3><p>{ready.context?.goal||project.goal}</p></div></div></section>
    <section id="case-decisions" className="case-section case-decisions" aria-labelledby="case-decisions-heading"><div className="case-section__heading"><p className="case-eyebrow">02 / DESIGN DECISIONS</p><h2 id="case-decisions-heading">{ready.decisionsTitle||'이렇게 구성했습니다.'}</h2></div><div className="case-decisions__list">{decisions.map((item,i)=><section className={`case-decision ${item.showMedia?'case-decision--illustrated':'case-decision--text'}`} key={item.title}><div className="case-decision__copy"><div><span className="case-decision__number">{String(i+1).padStart(2,'0')}</span><h3>{item.title}</h3></div>{item.summary?<p className="case-decision__summary">{item.summary}</p>:<dl>{(item.evidence||[]).map(entry=><div key={entry.label}><dt>{entry.label}</dt><dd>{entry.text}</dd></div>)}</dl>}</div>{item.showMedia&&<ScreenFigure media={item.media} label={item.mediaLabel||'선택이 반영된 화면'}/>}</section>)}</div></section>
    <section id="case-scope" className="case-section case-scope" aria-labelledby="case-scope-heading"><div className="case-section__heading"><p className="case-eyebrow">03 / SCOPE & LIMITS</p><h2 id="case-scope-heading">제작 범위와 한계.</h2></div>{ready.scopeSummary?<div className="case-scope__grid case-scope__grid--summary">{ready.scopeSummary.map(item=><div className="case-scope__column" key={item.title}><h3>{item.title}</h3><p>{item.text}</p></div>)}</div>:<div className="case-scope__grid"><ScopeList title="제작한 범위" items={ready.scope?.actual}/><ScopeList title="시연·데이터" items={ready.scope?.demoStatic}/><ScopeList title="포함하지 않은 범위" items={ready.scope?.notIncluded}/></div>}{ready.resultLimit?.limit&&<p className="case-limit">{ready.resultLimit.limit}</p>}</section>
  </>;
};

const ProjectDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const projects = ALL_PROJECTS.filter(item => item.is_featured || item.moreWorksPublished);
  const project = projects.find(item => projectSlug(item) === slug);
  const ready = PROJECT_DETAIL_READY[slug];
  if (!project || !ready) return <Navigate to="/projects" replace />;
  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];
  const featuredCase = FEATURED_CASES.find(item => item.project.id === project.id);
  const goBack = () => location.key === 'default' ? navigate('/projects') : navigate(-1);
  const register = (
    <div className="case-register">
      <button className="case-back" onClick={goBack} type="button">작업으로 돌아가기</button>
      <span>PROJECT / {String(index + 1).padStart(2, '0')}</span>
    </div>
  );
  return <article className="case-page" data-page-id="project-detail" data-project-slug={slug}><div className="portfolio-shell">
    {slug === 'feedback-hub'
      ? <ProcurementCase project={project} ready={ready} question={featuredCase.question} register={register} />
      : <StandardProjectCase project={project} ready={ready} featuredCase={featuredCase} register={register} />}
    <footer className="case-footer"><Link className="case-list-link" to="/projects">전체 작업 보기</Link>{next&&<Link className="case-next" to={`/projects/${projectSlug(next)}`}><span><small>NEXT PROJECT</small><strong>{next.title}</strong></span><span className="case-next-label">작업 보기</span></Link>}</footer>
  </div></article>;
};
export default ProjectDetailPage;
