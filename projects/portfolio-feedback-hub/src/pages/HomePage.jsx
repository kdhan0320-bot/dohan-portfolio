import { Navigate, useLocation } from 'react-router-dom';
import TipLink from '../components/TipLink';
import TipsLayout from '../components/TipsLayout';
import TipComparison from '../components/TipComparison';
import TipList from '../components/TipList';
import { TIPS } from '../constants/tips';
import { PAGE_TITLES, usePageTitle } from '../utils/pageMeta';
import { getLegacyWorksPath } from '../utils/workList';

export default function HomePage() {
  const location = useLocation();
  usePageTitle(PAGE_TITLES.home);
  if (getLegacyWorksPath(location.search)) return <Navigate to="/tips" replace />;
  const tip = TIPS[0];
  return <TipsLayout>
    <header className="tips-home-heading"><p className="tips-eyebrow">처음 웹 화면을 만드는 사람을 위한 UI 팁</p><h1>어색한 화면,<br />어디부터 바꿀까요?</h1><p className="tips-lead">글자·간격·버튼의 차이를 그림으로 짚어드려요.</p></header>
    <section className="tips-feature" aria-labelledby="feature-title"><div className="tips-feature-copy"><p className="tips-eyebrow">먼저 살펴볼 팁 · 글자</p><h2 id="feature-title">{tip.title}</h2><p>{tip.summary}</p><TipLink className="tips-primary" to={`/tips/${tip.id}`} focusId="featured-tip">이유와 적용 방법 보기<span aria-hidden="true">→</span></TipLink></div><div className="tips-feature-visual"><TipComparison tip={tip} compact /><p>제목 크기만 바꿔, 먼저 읽을 정보를 구분해요.</p></div></section>
    <section className="tips-index" aria-labelledby="tip-list-title"><div className="tips-section-heading"><h2 id="tip-list-title">내 화면에서 찾고 싶은 팁</h2><span>6가지 기초 팁</span></div><TipList /></section>
  </TipsLayout>;
}
