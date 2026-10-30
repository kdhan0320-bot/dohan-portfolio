import { Link, Navigate, useLocation } from 'react-router-dom';
import TipLink from '../components/TipLink';
import TipsIcon from '../components/TipsIcon';
import TipsLayout from '../components/TipsLayout';
import ExhibitionExample from '../components/ExhibitionExample';
import TipList from '../components/TipList';
import { PAGE_TITLES, usePageTitle } from '../utils/pageMeta';
import { getLegacyWorksPath } from '../utils/workList';

export default function HomePage() {
  const location = useLocation();
  usePageTitle(PAGE_TITLES.home);
  if (getLegacyWorksPath(location.search)) return <Navigate to="/tips" replace />;
  return <TipsLayout>
    <section className="tips-hero" aria-labelledby="home-title">
      <header className="tips-home-heading">
        <p className="tips-eyebrow">첫 웹 화면을 위한 UI 디자인 팁</p>
        <h1 id="home-title">어색한 화면,<br />바꿀 <span className="tips-word-frame">기준</span>을 찾다.</h1>
        <p className="tips-lead">글자, 간격, 버튼. 어디부터 고칠지 막막할 때<br />{' '}같은 화면의 전후 차이에서 이유를 찾아보세요.</p>
        <a className="tips-primary" href="#/?section=tips" onClick={event => { if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return; event.preventDefault(); const heading = document.getElementById('tip-list-title'); heading?.scrollIntoView({ block: 'start' }); heading?.focus({ preventScroll: true }); }}>내 화면에 필요한 팁 찾기<TipsIcon /></a>
      </header>
      <figure className="tips-feature sight-sheet">
        <figcaption className="tips-feature-label"><span>하나씩 짚어보는 화면</span><span>설명용 예시</span></figcaption>
        <p className="tips-sr-only">전시 안내의 제목 크기와 예약 강조를 시선 괄호로 표시했습니다. 그림의 예약 버튼은 작동하지 않습니다.</p>
        <ExhibitionExample revised annotate />
        <TipLink className="tips-feature-link" to="/case-study" focusId="featured-case">한 화면 고치는 과정 보기<TipsIcon /></TipLink>
      </figure>
    </section>
    <section className="tips-index" aria-labelledby="tip-list-title"><div className="tips-section-heading"><div><p className="tips-eyebrow">문제로 찾는 시선 노트</p><h2 id="tip-list-title" tabIndex={-1}>어떤 부분이 어색한가요?</h2></div></div><TipList /></section>
    <section className="tips-explore" aria-labelledby="explore-title"><div className="tips-section-heading"><h2 id="explore-title">내 화면에 적용할 차례.</h2></div><div className="tips-explore-grid">
      <Link to="/case-study" className="tips-explore-card"><span className="tips-eyebrow">수정 순서가 막막할 때</span><h3>한 화면 고치기</h3><TipsIcon /></Link>
      <Link to="/checklist" className="tips-explore-card"><span className="tips-eyebrow">공개하기 전</span><h3>화면 점검</h3><TipsIcon /></Link>
    </div></section>
  </TipsLayout>;
}
