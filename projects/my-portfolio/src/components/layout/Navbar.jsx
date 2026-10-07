import { Link, useLocation } from 'react-router-dom';
import { useActiveSection } from '../../hooks/useScrollNav';
import { PORTFOLIO_PDF_URL } from '../../constants/site';

const Navbar = () => {
  const location = useLocation();
  const section = useActiveSection(location.pathname);
  const isWork = location.pathname.startsWith('/projects') || (location.pathname === '/' && ['projects', 'more-projects'].includes(section));
  const skipToContent = (event) => {
    event.preventDefault();
    document.getElementById('main-content')?.focus();
  };
  return <>
    <a className="skip-link" href="#main-content" onClick={skipToContent}>본문으로 건너뛰기</a>
    <header className="site-header"><div className="header-inner portfolio-shell">
      <Link to="/" state={{ scrollTo: 'home' }} className="site-wordmark" aria-label="김도한 · 홈으로"><img className="wordmark-symbol" src={`${import.meta.env.BASE_URL}favicon.svg?v=3`} width="32" height="32" alt="" /><span>김도한<span className="wordmark-dot" aria-hidden="true">.</span></span><span className="wordmark-caption" aria-hidden="true">DESIGN · WEB</span></Link>
      <nav aria-label="주요 메뉴" className="site-nav">
        <Link to="/projects" aria-current={isWork ? 'page' : undefined}>작업</Link>
        <Link to="/about" aria-current={location.pathname === '/about' ? 'page' : undefined}>소개</Link>
        <Link className="nav-contact" to="/" state={{ scrollTo: 'contact' }} aria-current={location.pathname === '/' && section === 'contact' ? 'location' : undefined}>연락</Link>
        {PORTFOLIO_PDF_URL && <a className="nav-pdf" href={PORTFOLIO_PDF_URL} download>포트폴리오 PDF</a>}
      </nav>
    </div></header>
  </>;
};
export default Navbar;
