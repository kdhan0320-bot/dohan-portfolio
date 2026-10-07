import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Button, Tab, Tabs } from '@mui/material';
import SiteHeader from '../components/layout/SiteHeader';
import ProductPreview from '../components/ui/ProductPreview';
import { useAuth } from '../context/AuthContext';
import { getAuthErrorMessage } from '../utils/authErrors';

const views = [
  { id: 'board', label: '지원 현황', caption: '어디까지 진행됐는지, 회사별로 확인해요.' },
  { id: 'calendar', label: '마감 일정', caption: '아직 지원하지 않은 회사의 마감을 모아봐요.' },
  { id: 'checklist', label: '준비 체크', caption: '서류부터 면접까지, 남은 할 일을 확인해요.' },
];
export default function WelcomePage() {
  const { user, isGuest, enterGuestMode, loading } = useAuth();
  const navigate = useNavigate();
  const [view, setView] = useState('board');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  async function start(destination = '/overview') {
    if (busy || loading) return;
    setBusy(true); setError('');
    try { if (!user && !isGuest) await enterGuestMode(); navigate(destination); }
    catch (e) { setError(getAuthErrorMessage(e)); }
    finally { setBusy(false); }
  }
  return <div className="welcome-page welcome-refresh">
    <a className="skip-link" href="#welcome-content" onClick={e => { e.preventDefault(); document.getElementById('welcome-content')?.focus(); }}>본문으로 바로가기</a>
    <SiteHeader publicMode />
    <main id="welcome-content" tabIndex={-1}>
      <div className="welcome-stage"><section className="welcome-hero" aria-labelledby="welcome-title">
        <div className="welcome-copy"><span className="welcome-kicker">나의 입사지원 관리</span><h1 id="welcome-title">어디에 지원했고,<br />무엇이 남았는지<br /><em>한눈에.</em></h1><p>관심 회사와 공고 링크를 직접 등록하고,<br className="desktop-break" /> 지원 단계·마감일·준비할 일을 정리하세요.</p>
          <div className="welcome-actions"><Button variant="contained" size="large" onClick={() => start()} disabled={busy || loading}>{busy ? '준비 중…' : user || isGuest ? '내 지원 이어보기' : '샘플로 체험하기'}</Button><small>{user ? '내가 등록한 지원 기록으로 이동합니다.' : '가입 없이 체험 · 가상 데이터'}</small></div>
          {error && <Alert severity="error">{error}</Alert>}
        </div>
        <div className="hero-product">
          <div className="hero-preview-label"><span>이렇게 정리해요</span><small>기능 미리보기</small></div>
          <Tabs value={view} onChange={(_, value) => setView(value)} aria-label="기능 미리보기" variant="fullWidth">
            {views.map(item => <Tab key={item.id} value={item.id} id={`preview-tab-${item.id}`} aria-controls={`preview-panel-${item.id}`} label={item.label} />)}
          </Tabs>
          {views.map(item => <div key={item.id} role="tabpanel" id={`preview-panel-${item.id}`} aria-labelledby={`preview-tab-${item.id}`} tabIndex={0} hidden={view !== item.id}>
            <ProductPreview view={item.id} /><p className="hero-preview-caption">{item.caption}</p>
          </div>)}
        </div>
      </section></div>
      <section className="welcome-path" aria-label="갈피록 이용 순서">
        <ol><li><span>01</span><div><strong>지원할 회사 등록</strong><small>공고 링크와 마감일을 함께</small></div></li><li><span>02</span><div><strong>전형 단계 기록</strong><small>지원 전부터 결과까지</small></div></li><li><span>03</span><div><strong>남은 준비 확인</strong><small>마감과 할 일을 한곳에서</small></div></li></ol>
      </section>
      <section className="welcome-register-banner" aria-labelledby="welcome-register-title">
        <div className="register-banner-copy">
          <span className="section-kicker">나의 첫 갈피</span>
          <h2 id="welcome-register-title">첫 지원은, 한 회사부터.</h2>
          <p>눈여겨본 회사가 있다면 기록해두세요.</p>
          <Button variant="contained" onClick={() => start('/?new=1')} disabled={busy || loading}>지원할 회사 등록</Button>
          {!user && <small className="register-banner-note">샘플 기록은 새로고침하면 초기화돼요.</small>}
        </div>
        <div className="register-banner-art" aria-hidden="true" />
      </section>
    </main>
    <footer className="welcome-footer"><span>갈피록 · 김도한의 포트폴리오 프로젝트</span><a href="https://kdhan0320-bot.github.io/dohan-portfolio/my-portfolio/">포트폴리오로 돌아가기</a></footer>
  </div>;
}
