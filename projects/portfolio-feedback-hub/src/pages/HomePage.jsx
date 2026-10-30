import { Navigate, useLocation } from 'react-router-dom';
import TipLink from '../components/TipLink';
import TipsIcon from '../components/TipsIcon';
import TipsLayout from '../components/TipsLayout';
import TipComparison from '../components/TipComparison';
import TipList from '../components/TipList';
import SightMark from '../components/SightMark';
import { TIPS } from '../constants/tips';
import { PAGE_TITLES, usePageTitle } from '../utils/pageMeta';
import { getLegacyWorksPath } from '../utils/workList';

export default function HomePage() {
  const location = useLocation();
  usePageTitle(PAGE_TITLES.home);
  if (getLegacyWorksPath(location.search)) return <Navigate to="/tips" replace />;
  const tip = TIPS[0];
  return <TipsLayout>
    <section className="tips-hero" aria-labelledby="home-title">
      <header className="tips-home-heading">
        <p className="tips-eyebrow">첫 웹 화면을 만드는 사람을 위한 UI 디자인 팁</p>
        <h1 id="home-title">어색한 UI,<br />바꿀 <span className="tips-word-frame">기준</span>을 찾다.</h1>
        <p className="tips-lead">글자부터 입력 안내까지.<br />같은 화면의 작은 차이로, 바꿀 이유를 알아보세요.</p>
        <a className="tips-primary" href="#/?section=tips" onClick={event => { if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return; event.preventDefault(); const heading = document.getElementById('tip-list-title'); heading?.scrollIntoView({ block: 'start' }); heading?.focus({ preventScroll: true }); }}>내 화면에 필요한 팁 찾기<TipsIcon /></a>
        <p className="tips-hero-caption">문제 찾기 · 차이 살펴보기 · 내 화면에 적용하기</p>
      </header>
      <div className="tips-feature">
        <div className="tips-feature-label"><span><SightMark />한 부분을 고르면, 차이가 보여요</span><span>01 / 06</span></div>
        <h2 id="feature-title">제목이 먼저 보여야 한다면?</h2>
        <TipComparison tip={tip} compact />
        <TipLink className="tips-feature-link" to={`/tips/${tip.id}`} focusId="featured-tip">제목 크기를 바꾼 이유<TipsIcon /></TipLink>
      </div>
    </section>
    <section className="tips-index" aria-labelledby="tip-list-title"><div className="tips-section-heading"><div><p className="tips-eyebrow">지금 내 화면에서</p><h2 id="tip-list-title" tabIndex={-1}>어떤 부분이 어색한가요?</h2></div><span>6가지 기초 팁</span></div><TipList /></section>
    <aside className="tips-method"><SightMark /><div><h2>하나를 바꾸고, 이유를 남깁니다.</h2><p>같은 화면에서 한 요소의 차이를 짚습니다. 무엇을 바꾸고 유지했는지, 어떤 상황에서 다른 판단이 필요한지 함께 설명합니다.</p></div><span>고른시선의 설명 방식</span></aside>
  </TipsLayout>;
}
