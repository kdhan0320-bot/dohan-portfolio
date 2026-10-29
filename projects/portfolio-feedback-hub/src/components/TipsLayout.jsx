import { Link, useLocation } from 'react-router-dom';

export default function TipsLayout({ children }) {
  const { pathname } = useLocation();
  const revisit = path => event => {
    if (pathname !== path || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.getElementById('main-content')?.focus({ preventScroll: true });
  };
  return <div className="tips-site">
    <header className="tips-header"><div className="tips-shell tips-header-inner">
      <Link className="tips-brand" to="/" onClick={revisit('/')} aria-label="고른시선 홈">고른시선<span aria-hidden="true" /></Link>
      <nav aria-label="주 메뉴"><Link to="/tips" onClick={revisit('/tips')} aria-current={pathname === '/tips' ? 'page' : undefined}>팁 모음</Link></nav>
    </div></header>
    <div className="tips-shell tips-content">{children}</div>
    <footer className="tips-footer"><div className="tips-shell tips-footer-inner">
      <div><span className="tips-footer-brand">고른시선</span><p>화면의 차이를 보고, 만드는 기준을 알아가는 곳.</p></div>
      <span>김도한 · UI 디자인 팁</span>
    </div></footer>
  </div>;
}
