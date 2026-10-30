import { useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Button, Dialog, DialogContent, DialogActions, DialogTitle, IconButton } from '@mui/material';
import Close from '@mui/icons-material/Close';
import SiteHeader from '../components/layout/SiteHeader';
import SiteFooter from '../components/layout/SiteFooter';
import ProductPreview from '../components/ui/ProductPreview';
import { useAuth } from '../context/AuthContext';
import { getAuthErrorMessage } from '../utils/authErrors';
import { CompanySummary } from '../components/applications/CompanySummary';
import { DEMO_APPLICATIONS, DEMO_CHECKLISTS, DEMO_INTERVIEW_NOTES, DEMO_TODAY } from '../constants';

export default function WelcomePage() {
  useLayoutEffect(() => { window.scrollTo(0, 0); }, []);
  const { user, isGuest, enterGuestMode, loading } = useAuth();
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [previewId, setPreviewId] = useState(null);
  const preview = DEMO_APPLICATIONS.find(company => company.id === previewId);
  async function start() {
    if (busy || loading) return;
    setBusy(true); setError('');
    try {
      if (!user && !isGuest) await enterGuestMode();
      navigate(user ? '/' : '/overview');
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
          <h1 id="welcome-title">입사지원 현황과 <em>마감일을 한눈에.</em></h1>
          <p>회사마다 흩어진 마감과 준비를 한곳에.</p>
          <div className="galpi-intro-action">
            <Button variant="contained" size="large" onClick={() => start()} disabled={busy || loading}>{busy ? '준비 중…' : user ? '내 지원 현황 열기' : '샘플 체험하기'}</Button>
            <small>{user ? '내 계정에 저장된 기록' : '가입 없이 · 가상 데이터 체험'}</small>
            {error && <Alert severity="error">{error}</Alert>}
          </div>
        </div>
      </section>
      <section className="galpi-product-stage" aria-label="갈피록 지원 관리 미리보기">
        <ProductPreview onOpen={setPreviewId} />
      </section>
    </main>
    <Dialog open={Boolean(preview)} onClose={() => setPreviewId(null)} aria-labelledby="preview-company-title" fullWidth maxWidth="sm" className="company-summary-dialog">
      <DialogTitle id="preview-company-title"><span><small className="summary-preview-label">가상 샘플 기록</small>{preview?.company_name}</span><IconButton aria-label="회사 기록 닫기" onClick={() => setPreviewId(null)}><Close /></IconButton></DialogTitle>
      <DialogContent>{preview && <CompanySummary application={preview} tasks={DEMO_CHECKLISTS} notes={DEMO_INTERVIEW_NOTES} today={DEMO_TODAY} />}</DialogContent>
      <DialogActions><Button onClick={() => setPreviewId(null)}>닫기</Button></DialogActions>
    </Dialog>
    <SiteFooter publicMode />
  </div>;
}
