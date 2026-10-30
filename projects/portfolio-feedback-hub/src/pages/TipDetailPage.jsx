import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import TipsLayout from '../components/TipsLayout';
import TipComparison from '../components/TipComparison';
import { TIPS, getTip } from '../constants/tips';
import { usePageTitle } from '../utils/pageMeta';
import NotFoundPage from './NotFoundPage';
import TipsIcon from '../components/TipsIcon';

export default function TipDetailPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const tip = getTip(id);
  usePageTitle(tip ? `${tip.title} | 고른시선` : '팁을 찾을 수 없음 | 고른시선');
  if (!tip) return <NotFoundPage />;
  const index = TIPS.indexOf(tip);
  const next = getTip(tip.related);
  const backPath = location.state?.routeReturn?.pathname === '/' ? '/' : '/?section=tips';
  const backLabel = '팁 목록으로 돌아가기';
  const returnToList = event => {
    if (location.state?.routeReturn && !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey && event.button === 0) {
      event.preventDefault();
      navigate(-1);
    }
  };
  return <TipsLayout><article className={`tips-detail tips-tone-${tip.tone}`}>
    <Link to={backPath} onClick={returnToList} className="tips-back"><TipsIcon name="left" />{backLabel}</Link>
    <header className="tips-detail-heading"><div className="tips-detail-meta"><span className="tips-list-number">{String(index + 1).padStart(2, '0')}</span><span>시선 노트 · {tip.topic}</span></div><h1>{tip.title}</h1><p className="tips-problem"><span>핵심 문제</span>{tip.problem}</p></header>
    <section className="tips-explanation" aria-labelledby="rule-title">
      <div className="tips-rule"><span className="tips-rule-label">고른 기준<span>설계 규칙</span></span><div><h2 id="rule-title">{tip.rule}</h2><p className="tips-goal"><span>이번 목표</span>{tip.goal}</p></div></div>
      <TipComparison tip={tip} />
      <div className="tips-callout"><div><h3>왜 이렇게 바꿨을까요?</h3><p>{tip.reason}</p></div><dl><div><dt>바꾼 것</dt><dd>{tip.changed}</dd></div><div><dt>유지한 것</dt><dd>{tip.kept}</dd></div></dl></div>
    </section>
    <div className="tips-application"><section className="tips-apply" aria-labelledby="apply-title"><p className="tips-eyebrow">내 화면에 적용할 때</p><h2 id="apply-title">이 세 가지를 확인하세요.</h2><ol>{tip.checks.map(check => <li key={check}>{check}</li>)}</ol></section>
    <aside className="tips-condition"><p className="tips-eyebrow">{tip.conditionLabel || '다른 선택이 필요한 때'}</p><h2>{tip.exceptionTitle}</h2><p>{tip.exception}</p></aside></div>
    <p className="tips-evidence-note">직접 만든 예제로 설명하는 설계 판단입니다. 실제 사용자 실험 결과는 아닙니다.<br />그림 속 조작은 설명용이며 실제 서비스 기능이 아닙니다.{tip.exampleNote && <><br />{tip.exampleNote}</>}</p>
    <nav className="tips-detail-nav" aria-label="다른 팁"><Link to={backPath} onClick={returnToList} className="tips-text-link">{backLabel}</Link><Link to={`/tips/${next.id}`} className="tips-next"><span>함께 살펴볼 팁 · {next.topic}</span><strong>{next.title}</strong><TipsIcon className="tips-arrow" /></Link></nav>
  </article></TipsLayout>;
}
