import { Link, useLocation } from 'react-router-dom';
import { useActiveSection } from '../../hooks/useScrollNav';

const Navbar = () => {
  const location = useLocation();
  const section = useActiveSection(location.pathname);
  const isWork = location.pathname.startsWith('/projects') || (location.pathname === '/' && section === 'projects');
  const skipToContent = (event) => {
    event.preventDefault();
    document.getElementById('main-content')?.focus();
  };
  return (
    <>
      <a className="skip-link" href="#main-content" onClick={skipToContent}>본문으로 건너뛰기</a>
      <header className="site-header">
        <div className="header-inner portfolio-shell">
          <Link to="/" state={{ scrollTo: 'home' }} className="site-wordmark" aria-label="김도한 · 홈으로"><span>김도한<span className="wordmark-dot" aria-hidden="true">.</span></span><span className="wordmark-caption" aria-hidden="true">DESIGN PORTFOLIO</span></Link>
          <nav aria-label="주요 메뉴" className="site-nav">
            <Link to="/projects" aria-current={isWork ? 'page' : undefined}>작업</Link>
            <Link to="/" state={{ scrollTo: 'about' }} aria-current={location.pathname === '/' && section === 'about' ? 'location' : undefined}>소개</Link>
            <Link to="/" state={{ scrollTo: 'contact' }} aria-current={location.pathname === '/' && section === 'contact' ? 'location' : undefined}>연락<span aria-hidden="true">↗</span></Link>
          </nav>
        </div>
      </header>
    </>
  );
};
export default Navbar;
