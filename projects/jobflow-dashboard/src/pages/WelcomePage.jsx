import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Button } from '@mui/material';
import SiteHeader from '../components/layout/SiteHeader';
import ProductPreview from '../components/ui/ProductPreview';
import { useAuth } from '../context/AuthContext';
import { getAuthErrorMessage } from '../utils/authErrors';
import { DEMO_APPLICATIONS } from '../constants';
import { deadlineLabel } from '../utils/dates';

const sampleDeadline = DEMO_APPLICATIONS.find(row => row.id === 'demo-3');

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
          <span className="galpi-eyebrow">개인 입사지원 관리</span>
          <h1 id="welcome-title">입사지원 현황과<br /><em>마감일을 한눈에.</em></h1>
          <p>지원할 회사를 직접 등록하고 관리해요.</p>
          <div className="galpi-intro-action">
          <Button variant="contained" size="large" onClick={() => start()} disabled={busy || loading}>{busy ? '준비 중…' : user ? '내 지원 현황 열기' : isGuest ? '체험 이어하기' : '샘플 체험하기'}</Button>
          <small>{user ? '로그인한 계정의 지원 기록으로 이동합니다.' : '가입 없이 체험 · 가상 데이터 · 새로고침 시 초기화'}</small>
          {error && <Alert severity="error">{error}</Alert>}
          </div>
        </div>
        <div className="galpi-intro-visual">
          <div className="galpi-intro-art" aria-hidden="true" />
          <div className="galpi-deadline-sample" aria-label="샘플 지원 마감 일정">
            <time dateTime={sampleDeadline.deadline}><span>{Number(sampleDeadline.deadline.slice(5, 7))}월</span><strong>{Number(sampleDeadline.deadline.slice(8, 10))}</strong></time>
            <div><span className="galpi-deadline-label">지원 마감 <b>{deadlineLabel(sampleDeadline.deadline, '2026-09-27')}</b></span><strong>{sampleDeadline.company_name}</strong><small>샘플 · 2026.09.27 기준</small></div>
          </div>
        </div>
      </section>
      <section className="galpi-product-stage" aria-label="갈피록 지원 관리 미리보기">
        <ProductPreview onOpen={start} busy={busy || loading} />
      </section>
    </main>
    <footer className="welcome-footer"><span>갈피록 · 김도한의 포트폴리오 프로젝트</span><a href="https://kdhan0320-bot.github.io/dohan-portfolio/my-portfolio/">포트폴리오로 돌아가기</a></footer>
  </div>;
}
