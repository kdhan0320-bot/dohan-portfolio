import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Button, Tab, Tabs } from '@mui/material';
import ArrowForward from '@mui/icons-material/ArrowForward';
import { Brand } from '../components/ui/Brand';
import ProductPreview from '../components/ui/ProductPreview';
import PaperGraphic from '../components/ui/PaperGraphic';
import { useAuth } from '../context/AuthContext';
import { getAuthErrorMessage } from '../utils/authErrors';

const views = [{ id: 'board', label: '지원 현황', caption: '어디까지 진행됐는지, 회사별로 한눈에.' }, { id: 'calendar', label: '마감 일정', caption: '놓치기 쉬운 지원 마감일을 달력으로.' }, { id: 'checklist', label: '준비 체크', caption: '남은 준비를 한 가지씩 끝내요.' }];
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
    <header className="welcome-nav"><Link to="/welcome" aria-label="갈피록 서비스 소개"><Brand /></Link><nav aria-label="서비스 메뉴"><Button onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'auto' })}>사용 방법</Button><Button component={Link} to={user || isGuest ? '/overview' : '/login'} variant="outlined">{user || isGuest ? '내 지원 열기' : '로그인 / 가입'}</Button></nav></header>
    <main id="welcome-content" tabIndex={-1}>
      <div className="welcome-stage"><section className="welcome-hero" aria-labelledby="welcome-title">
        <div className="welcome-copy"><span className="welcome-kicker">취업 준비에, 나만의 갈피</span><h1 id="welcome-title">지원은 여러 곳,<br /><em>관리는 한곳에서.</em></h1><p>관심 회사, 지원 현황, 다가오는 마감.<br />흩어진 취업 준비를 갈피록에 모아보세요.</p>
          <div className="welcome-actions"><Button variant="contained" size="large" endIcon={<ArrowForward />} onClick={start} disabled={busy || loading}>{busy ? '준비 중…' : user || isGuest ? '내 지원 이어보기' : '샘플로 시작하기'}</Button><small>가입 없이 체험 · 가상 데이터</small></div>
          {error && <Alert severity="error">{error}</Alert>}
        </div>
        <div className="welcome-product"><Tabs value={view} onChange={(_, value) => setView(value)} aria-label="기능 미리보기" variant="fullWidth">{views.map(item => <Tab key={item.id} value={item.id} id={`preview-tab-${item.id}`} aria-controls={`preview-panel-${item.id}`} label={item.label} />)}</Tabs>{views.map(item => <div key={item.id} role="tabpanel" id={`preview-panel-${item.id}`} aria-labelledby={`preview-tab-${item.id}`} tabIndex={0} hidden={view !== item.id}><ProductPreview view={item.id} /><p className="product-caption">{item.caption}</p></div>)}</div>
      </section></div>
      <section className="welcome-steps" id="how-it-works" aria-labelledby="how-title"><h2 id="how-title">나의 다음 지원까지, 세 가지 갈피.</h2><ol><li><PaperGraphic kind="folder" /><div><span className="step-index">01 · 모으기</span><h3>관심 회사 추가</h3><p>회사명부터 가볍게 기록해요.</p></div></li><li><PaperGraphic kind="steps" /><div><span className="step-index">02 · 정리하기</span><h3>진행 상태 변경</h3><p>지원 후, 회사 카드에서 바꿔요.</p></div></li><li><PaperGraphic kind="check" /><div><span className="step-index">03 · 준비하기</span><h3>마감과 할 일 확인</h3><p>다음 준비를 놓치지 않아요.</p></div></li></ol></section>
    </main>
    <footer className="welcome-footer"><span>갈피록 · 김도한의 포트폴리오 프로젝트</span><a href="https://kdhan0320-bot.github.io/dohan-portfolio/my-portfolio/">포트폴리오로 돌아가기 ↗</a></footer>
  </div>;
}
