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
        <p className="tips-eyebrow">첫 웹 화면을 위한 UI 디자인 팁</p>
        <h1 id="home-title">어색한 화면,<br />바꿀 <span className="tips-word-frame">기준</span>을 찾다.</h1>
        <p className="tips-lead">글자, 간격, 버튼. 어디부터 고칠지 막막할 때<br />{' '}같은 화면의 전후 차이에서 이유를 찾아보세요.</p>
        <a className="tips-primary" href="#/?section=tips" onClick={event => { if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return; event.preventDefault(); const heading = document.getElementById('tip-list-title'); heading?.scrollIntoView({ block: 'start' }); heading?.focus({ preventScroll: true }); }}>내 화면에 필요한 팁 찾기<TipsIcon /></a>
        <div className="tips-reading-line" aria-label="설명 순서"><span>문제</span><i aria-hidden="true" /><span>비교</span><i aria-hidden="true" /><span>기준</span></div>
      </header>
      <div className="tips-feature">
        <div className="tips-feature-label"><span>한눈에 보는 차이</span><span>글자 위계</span></div>
        <h2 id="feature-title">같은 화면, 제목만 다르게.</h2>
        <TipComparison tip={tip} compact />
        <TipLink className="tips-feature-link" to={`/tips/${tip.id}`} focusId="featured-tip">제목 크기를 바꾼 이유<TipsIcon /></TipLink>
      </div>
    </section>
    <section className="tips-index" aria-labelledby="tip-list-title"><div className="tips-section-heading"><div><p className="tips-eyebrow">문제로 찾는 시선 노트</p><h2 id="tip-list-title" tabIndex={-1}>어떤 부분이 어색한가요?</h2></div><p>내 화면과 닮은 문제부터 살펴보세요.</p></div><TipList /></section>
    <aside className="tips-method"><div className="tips-method-mark"><SightMark /><span>고른시선의 관점</span></div><div><h2>하나를 바꾸고, 이유를 남깁니다.</h2><p>한 요소의 차이를 비교하고, 바꾼 이유를 짚습니다.<br />목표가 다르면 다른 선택이 필요하다는 점도 함께 살펴봅니다.</p></div></aside>
  </TipsLayout>;
}
