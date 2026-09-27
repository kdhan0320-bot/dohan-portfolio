import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Button, Tab, Tabs } from '@mui/material';
import ArrowForward from '@mui/icons-material/ArrowForward';
import { Brand } from '../components/ui/Brand';
import ProductPreview from '../components/ui/ProductPreview';
import { useAuth } from '../context/AuthContext';
import { getAuthErrorMessage } from '../utils/authErrors';

const views = [{ id: 'board', label: '지원 현황', caption: '관심 회사를 담고, 전형별로 정리해요.' }, { id: 'calendar', label: '마감 일정', caption: '다가오는 지원 마감을 확인해요.' }, { id: 'checklist', label: '준비 체크', caption: '남은 준비를 하나씩 마쳐요.' }];
export default function WelcomePage() {
  const { user, isGuest, enterGuestMode, loading } = useAuth();
  const navigate = useNavigate();
  const [view, setView] = useState('board');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  async function start() {
    if (busy || loading) return;
    setBusy(true); setError('');
    try { if (!user && !isGuest) await enterGuestMode(); navigate('/overview'); }
    catch (e) { setError(getAuthErrorMessage(e)); }
    finally { setBusy(false); }
  }
  return <div className="welcome-page">
    <a className="skip-link" href="#welcome-content" onClick={e => { e.preventDefault(); document.getElementById('welcome-content')?.focus(); }}>본문으로 바로가기</a>
    <header className="welcome-nav"><Link to="/welcome" aria-label="갈피록 서비스 소개"><Brand /></Link><nav aria-label="서비스 메뉴"><Button onClick={() => { const section = document.getElementById('how-it-works'); section?.scrollIntoView({ behavior: 'auto' }); section?.focus({ preventScroll: true }); }}>기능 둘러보기</Button><Button component={Link} to={user || isGuest ? '/overview' : '/login'} variant="outlined">{user || isGuest ? '내 지원 열기' : '로그인 / 가입'}</Button></nav></header>
    <main id="welcome-content" tabIndex={-1}>
      <div className="welcome-stage"><section className="welcome-hero" aria-labelledby="welcome-title">
        <div className="welcome-copy"><span className="welcome-kicker">나의 취업 준비 기록장</span><h1 id="welcome-title">지원은 여러 곳,<br /><em>관리는 한곳에서.</em></h1><p>회사부터 마감까지, 나만의 갈피를 꽂아요.</p>
          <div className="welcome-actions"><Button variant="contained" size="large" endIcon={<ArrowForward />} onClick={start} disabled={busy || loading}>{busy ? '준비 중…' : user || isGuest ? '내 지원 이어보기' : '샘플로 시작하기'}</Button><small>가입 없이 체험 · 가상 데이터</small></div>
          {error && <Alert severity="error">{error}</Alert>}
        </div>
        <div className="welcome-sculpture" aria-hidden="true"><span className="sculpture-seal">나의 다음을 담는 곳</span></div>
      </section></div>
      <section className="welcome-showcase" id="how-it-works" aria-labelledby="how-title" tabIndex={-1}>
        <header><h2 id="how-title">흩어진 준비가,<br />한눈에.</h2><span>세 가지 갈피로 정리하세요.</span></header>
        <div className="showcase-layout">
          <div className="showcase-controls"><Tabs value={view} onChange={(_, value) => setView(value)} aria-label="기능 미리보기" orientation="vertical">{views.map((item, index) => <Tab key={item.id} value={item.id} id={`preview-tab-${item.id}`} aria-controls={`preview-panel-${item.id}`} label={<><span className="showcase-number">0{index + 1}</span><span>{item.label}</span><ArrowForward fontSize="small" /></>} />)}</Tabs><p className="showcase-hint">탭을 눌러 미리 볼 수 있어요.</p></div>
          <div className="showcase-preview">{views.map(item => <div key={item.id} role="tabpanel" id={`preview-panel-${item.id}`} aria-labelledby={`preview-tab-${item.id}`} tabIndex={0} hidden={view !== item.id}><ProductPreview view={item.id} /><p className="showcase-caption">{item.caption}</p></div>)}</div>
        </div>
      </section>
    </main>
    <footer className="welcome-footer"><span>갈피록 · 김도한의 포트폴리오 프로젝트</span><a href="https://kdhan0320-bot.github.io/dohan-portfolio/my-portfolio/">포트폴리오로 돌아가기 ↗</a></footer>
  </div>;
}
