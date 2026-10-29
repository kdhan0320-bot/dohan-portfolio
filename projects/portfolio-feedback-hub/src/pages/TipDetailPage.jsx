import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import TipsLayout from '../components/TipsLayout';
import TipComparison from '../components/TipComparison';
import { TIPS, getTip } from '../constants/tips';
import { usePageTitle } from '../utils/pageMeta';
import NotFoundPage from './NotFoundPage';

export default function TipDetailPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const tip = getTip(id);
  usePageTitle(tip ? `${tip.title} | 고른시선` : '팁을 찾을 수 없음 | 고른시선');
  if (!tip) return <NotFoundPage />;
  const index = TIPS.indexOf(tip);
  const next = TIPS[index + 1];
  const returnToList = event => {
    if (location.state?.routeReturn && !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey && event.button === 0) {
      event.preventDefault();
      navigate(-1);
    }
  };
  return <TipsLayout><article className="tips-detail">
    <Link to="/tips" onClick={returnToList} className="tips-back">← {location.state?.routeReturn ? '목록으로 돌아가기' : '팁 모음'}</Link>
    <header className="tips-detail-heading"><p className="tips-eyebrow">{tip.topic} · {String(index + 1).padStart(2, '0')}</p><h1>{tip.title}</h1><p className="tips-lead">{tip.problem}</p><p className="tips-goal"><span>이 예제의 목표</span>{tip.goal}</p></header>
    <section className="tips-explanation" aria-label="비교 그림과 바꾼 이유"><TipComparison tip={tip} /><div className="tips-callout"><h2><span className="tips-note-number" aria-hidden="true">1</span>{tip.rule}</h2><p>{tip.reason}</p><dl><div><dt>바꾼 것</dt><dd>{tip.changed}</dd></div><div><dt>같게 둔 것</dt><dd>{tip.kept}</dd></div></dl></div></section>
    <section className="tips-apply" aria-labelledby="apply-title"><h2 id="apply-title">내 화면에는 이렇게 적용해 보세요</h2><ol>{tip.steps.map(([title, body]) => <li key={title}><h3>{title}</h3><p>{body}</p></li>)}</ol></section>
    <aside className="tips-condition"><p className="tips-eyebrow">다르게 판단할 상황</p><h2>{tip.exceptionTitle}</h2><p>{tip.exception}</p></aside>
    <p className="tips-evidence-note">직접 만든 예제로 설명하는 설계 판단입니다. 실제 사용자 실험 결과는 아닙니다.<br />그림 속 조작은 설명용이며 실제 서비스 기능이 아닙니다.</p>
    <nav className="tips-detail-nav" aria-label="다른 팁"><Link to="/tips" onClick={returnToList} className="tips-text-link">{location.state?.routeReturn ? '목록으로 돌아가기' : '팁 모음으로 돌아가기'}</Link>{next ? <Link to={`/tips/${next.id}`} className="tips-next"><span>다음 팁 · {next.topic}</span><strong>{next.title}</strong><span className="tips-arrow" aria-hidden="true">→</span></Link> : <Link to="/" className="tips-next"><span>필요할 때 다시 살펴보세요</span><strong>고른시선 홈으로</strong><span className="tips-arrow" aria-hidden="true">→</span></Link>}</nav>
  </article></TipsLayout>;
}
