import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import TipsLayout from '../components/TipsLayout';
import TipComparison from '../components/TipComparison';
import { TIPS, getTip } from '../constants/tips';
import { usePageTitle } from '../utils/pageMeta';
import NotFoundPage from './NotFoundPage';
import TipsIcon from '../components/TipsIcon';
import TipLink from '../components/TipLink';

export default function TipDetailPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const tip = getTip(id);
  usePageTitle(tip ? `${tip.title} | 고른시선` : '팁을 찾을 수 없음 | 고른시선');
  if (!tip) return <NotFoundPage />;
  const index = TIPS.indexOf(tip);
  const next = getTip(tip.related);
  const caseSection = { type: 'type', spacing: 'spacing', action: 'action' }[tip.kind];
  const origin = location.state?.routeReturn?.pathname;
  const returnLabels = { '/': '팁 목록으로 돌아가기', '/case-study': '한 화면 고치기로 돌아가기', '/checklist': '화면 점검으로 돌아가기' };
  const backPath = returnLabels[origin] ? origin : '/?section=tips';
  const backLabel = returnLabels[origin] || '팁 목록으로 돌아가기';
  const returnToList = event => {
    if (location.state?.routeReturn && !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey && event.button === 0) {
      event.preventDefault();
      navigate(-1);
    }
  };
  return <TipsLayout><article className={`tips-detail tips-tone-${tip.tone}`}>
    <Link to={backPath} onClick={returnToList} className="tips-back"><TipsIcon name="left" />{backLabel}</Link>
    <header className="tips-detail-heading"><div className="tips-detail-meta"><span className="tips-list-number">{String(index + 1).padStart(2, '0')}</span><span>시선 노트 · {tip.topic}</span></div><h1>{tip.title}</h1></header>
    <section className="tips-explanation" aria-labelledby="rule-title">
      <TipComparison tip={tip} summary={<table className="tip-facts"><caption className="tips-sr-only">이 비교의 목표와 조건</caption><tbody><tr><th scope="row">목표</th><td>{tip.goal}</td></tr><tr><th scope="row">변경</th><td>{tip.changed}</td></tr><tr><th scope="row">유지</th><td>{tip.kept}</td></tr></tbody></table>} />
    </section>
    <aside className="tips-short-condition"><h2>{tip.exceptionTitle}</h2><p>{tip.exception}</p></aside>
    <div className="tips-reading-links">{caseSection && <TipLink to={`/case-study?section=${caseSection}`} focusId={`tip-${tip.kind}-case`} className="tips-text-link">{tip.topic} 기준을 적용한 사례<TipsIcon /></TipLink>}<TipLink to={`/checklist?section=${tip.kind}`} focusId={`tip-${tip.kind}-check`} className="tips-text-link">내 화면의 {tip.topic} 점검<TipsIcon /></TipLink></div>
    <p className="tips-evidence-note">직접 만든 설명용 그림으로, 실제 조작이나 사용자 실험 결과가 아닙니다.{tip.exampleNote && <><br />{tip.exampleNote}</>}</p>
    <nav className="tips-detail-nav" aria-label="다른 팁"><Link to={backPath} onClick={returnToList} className="tips-text-link">{backLabel}</Link><Link to={`/tips/${next.id}`} className="tips-next"><span>함께 살펴볼 팁 · {next.topic}</span><strong>{next.title}</strong><TipsIcon className="tips-arrow" /></Link></nav>
  </article></TipsLayout>;
}
