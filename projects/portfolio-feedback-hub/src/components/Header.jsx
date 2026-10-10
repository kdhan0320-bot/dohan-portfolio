import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import BrandMark from './BrandMark';

export default function Header() {
  const { user, signOut } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [leaving, setLeaving] = useState(false);
  const logout = async () => {
    if (leaving) return;
    setLeaving(true);
    setError('');
    try { await signOut(); navigate('/'); }
    catch { setError('로그아웃하지 못했습니다. 다시 시도해 주세요.'); }
    finally { setLeaving(false); }
  };
  const links = [['/exercises', '연습 모음'], ['/guide', '이용 안내']];
  return <header className="site-header"><div className="header-inner">
    <Link className="brand" to="/" aria-label="고른시선 홈"><BrandMark /><span>고른시선<small>UI 디자인 비교 연습</small></span></Link>
    <nav aria-label="주 메뉴">{links.map(([to, label]) => <Link key={to} to={to} aria-current={pathname === to ? 'page' : undefined} className={to === '/exercises' && pathname.startsWith('/practice/') ? 'is-section-active' : undefined}>{label}</Link>)}</nav>
    <div className="header-actions"><Link className="nav-cta" to="/practice/sample-1">바로 연습하기</Link>{user && <button className="text-button" onClick={logout} disabled={leaving}>{leaving ? '로그아웃 중…' : '로그아웃'}</button>}</div>
  </div>{error && <p className="inline-error" role="alert">{error}</p>}</header>;
}
