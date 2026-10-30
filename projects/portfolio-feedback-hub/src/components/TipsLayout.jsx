import { Link, useLocation, useNavigate } from 'react-router-dom';
import SightMark from './SightMark';

export default function TipsLayout({ children }) {
  const { pathname, search } = useLocation();
  const navigate = useNavigate();
  const revisit = path => event => {
    if (pathname !== path || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (search) navigate(path, { replace: true });
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.getElementById('main-content')?.focus({ preventScroll: true });
  };
  return <div className="tips-site">
    <header className="tips-header"><div className="tips-shell tips-header-inner">
      <Link className="tips-brand" to="/" onClick={revisit('/')} aria-label="고른시선 홈"><SightMark />고른시선</Link>
      <nav aria-label="주 메뉴"><Link to="/?section=tips" onClick={event => {
        if (pathname !== '/' || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        const heading = document.getElementById('tip-list-title');
        heading?.scrollIntoView({ block: 'start' });
        heading?.focus({ preventScroll: true });
      }}>팁 찾기</Link></nav>
    </div></header>
    <div className="tips-shell tips-content">{children}</div>
    <footer className="tips-footer"><div className="tips-shell tips-footer-inner">
      <div><span className="tips-footer-brand"><SightMark />고른시선</span><p>화면의 차이를 보고, 만드는 기준을 알아가는 곳.</p></div>
      <span>직접 만든 예시로 설명합니다.<br />김도한 · UI 디자인 & 웹퍼블리싱</span>
    </div></footer>
  </div>;
}
