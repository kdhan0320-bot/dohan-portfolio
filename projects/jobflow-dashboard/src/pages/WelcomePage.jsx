import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Button } from '@mui/material';
import SiteHeader from '../components/layout/SiteHeader';
import ProductPreview from '../components/ui/ProductPreview';
import { useAuth } from '../context/AuthContext';
import { getAuthErrorMessage } from '../utils/authErrors';

export default function WelcomePage() {
  const { user, isGuest, enterGuestMode, loading } = useAuth();
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  async function start(companyId) {
    if (busy || loading) return;
    setBusy(true); setError('');
    try {
      if (!user && !isGuest) await enterGuestMode();
      navigate(companyId && !user && !isGuest ? `/?company=${companyId}` : '/');
    } catch (e) { setError(getAuthErrorMessage(e)); }
    finally { setBusy(false); }
  }
  return <div className="welcome-page welcome-product-first">
    <a className="skip-link" href="#welcome-content" onClick={e => { e.preventDefault(); document.getElementById('welcome-content')?.focus(); }}>본문으로 바로가기</a>
    <SiteHeader publicMode />
    <main id="welcome-content" tabIndex={-1}>
      <section className="galpi-intro" aria-labelledby="welcome-title">
        <div className="galpi-intro-heading">
          <span className="galpi-eyebrow">나의 취업 준비 기록장</span>
          <h1 id="welcome-title">내 <em>입사지원 현황</em>을<br />한곳에.</h1>
        </div>
        <div className="galpi-intro-action">
          <p>지원한 회사, 전형 상태, 마감일까지.<br />내 취업 준비를 직접 기록하고 관리하세요.</p>
          <Button variant="contained" size="large" onClick={() => start()} disabled={busy || loading}>{busy ? '준비 중…' : user ? '내 지원 현황 열기' : isGuest ? '체험 이어하기' : '지원 관리 체험하기'}</Button>
          <small>{user ? '로그인한 계정의 지원 기록으로 이동합니다.' : '가입 없이 체험 · 가상 데이터 · 새로고침 시 초기화'}</small>
          {error && <Alert severity="error">{error}</Alert>}
        </div>
      </section>
      <section className="galpi-product-stage" aria-label="갈피록 지원 관리 미리보기">
        <ProductPreview onOpen={start} busy={busy || loading} />
      </section>
      <div className="galpi-entry-note"><span>공고를 직접 등록하고, 회사별 지원 기록을 이어가세요.</span><span>미리보기 날짜는 2026.09.27 기준입니다.</span></div>
    </main>
    <footer className="welcome-footer"><span>갈피록 · 김도한의 포트폴리오 프로젝트</span><a href="https://kdhan0320-bot.github.io/dohan-portfolio/my-portfolio/">포트폴리오로 돌아가기</a></footer>
  </div>;
}
