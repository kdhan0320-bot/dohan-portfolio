import { useLayoutEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Button, Dialog, DialogContent, DialogActions, DialogTitle, IconButton } from '@mui/material';
import Close from '@mui/icons-material/Close';
import SiteHeader from '../components/layout/SiteHeader';
import SiteFooter from '../components/layout/SiteFooter';
import ProductPreview from '../components/ui/ProductPreview';
import { CompanyMark } from '../components/ui/PageUI';
import DiaryBookmark from '../components/ui/DiaryBookmark';
import { SampleRecordScope, useAuth } from '../context/AuthContext';
import { getAuthErrorMessage } from '../utils/authErrors';
import LiveCompanySummary, { CompanySummary } from '../components/applications/CompanySummary';
import { DEMO_TODAY } from '../constants';

export default function WelcomePage() {
  useLayoutEffect(() => { window.scrollTo(0, 0); }, []);
  const { user, isGuest, enterGuestMode, loading, demoApplications, demoItems, demoNotes } = useAuth();
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [previewId, setPreviewId] = useState(null);
  const [practicing, setPracticing] = useState(false);
  const [taskBusy, setTaskBusy] = useState(false);
  const titleRef = useRef(null);
  const preview = demoApplications.find(company => company.id === previewId);
  const hasTasks = preview && demoItems.some(item => item.application_id === preview.id);
  useLayoutEffect(() => {
    if (practicing) titleRef.current?.focus({ preventScroll: true });
  }, [practicing]);
  function openPreview(id) {
    setError('');
    setPracticing(false);
    setPreviewId(id);
  }
  function closePreview() {
    if (!busy && !taskBusy) { setPreviewId(null); setError(''); }
  }
  async function start() {
    if (busy || loading) return;
    setBusy(true); setError('');
    try {
      if (!user && !isGuest) await enterGuestMode();
      navigate(user ? '/' : '/overview');
    } catch (e) { setError(getAuthErrorMessage(e)); }
    finally { setBusy(false); }
  }
  return <div className="welcome-page welcome-product-first workspace-shell workspace-with-topnav workspace-diary diary-welcome">
    <a className="skip-link" href="#welcome-content" onClick={e => { e.preventDefault(); document.getElementById('welcome-content')?.focus(); }}>본문으로 바로가기</a>
    <SiteHeader publicMode diaryMode />
    <div className="workspace-content">
    <main className="workspace-main" id="welcome-content" tabIndex={-1}>
      <DiaryBookmark label="갈피록" tone="purple" />
      <section className="galpi-intro" aria-labelledby="welcome-title">
        <div className="galpi-intro-heading">
          <span className="galpi-eyebrow">나의 입사지원 다이어리</span>
          <h1 id="welcome-title">입사지원 현황과 <em><span>마감일</span>을 한눈에.</em></h1>
          <p>회사마다 흩어진 마감과 준비를 한곳에.</p>
        </div>
        <div className="galpi-intro-action">
            {user && <small>내 계정에 저장된 기록</small>}
            <Button variant="contained" size="large" onClick={() => start()} disabled={busy || loading}>{busy ? '준비 중…' : user ? '내 지원 현황 열기' : '샘플 체험하기'}</Button>
            {error && !preview && <Alert severity="error">{error}</Alert>}
        </div>
      </section>
      <section className="galpi-product-stage" aria-label="갈피록 지원 관리 미리보기">
        <ProductPreview applications={demoApplications} items={demoItems} onOpen={openPreview} />
      </section>
    </main>
    </div>
    <Dialog open={Boolean(preview)} onClose={closePreview} aria-labelledby="preview-company-title" aria-describedby="preview-mode" fullWidth maxWidth="sm" className="company-summary-dialog">
      <DialogTitle component="div" id="preview-company-header">
        <div>
          <small id="preview-mode" className="summary-preview-label">{practicing ? '샘플 체험 · 준비 체크' : '샘플 기록 미리보기'}</small>
          <h2 id="preview-company-title" className="company-record-title" tabIndex={-1} ref={titleRef}>
            {preview && <CompanyMark name={preview.company_name} />}
            <span>{preview?.company_name}</span>
          </h2>
        </div>
        <IconButton aria-label="회사 기록 닫기" disabled={busy || taskBusy} onClick={closePreview}><Close /></IconButton>
      </DialogTitle>
      <DialogContent key={practicing ? 'practice' : 'preview'}>
        {preview && (practicing
          ? <SampleRecordScope><LiveCompanySummary application={preview} preparationFirst startWithAdd={!hasTasks} onBusyChange={setTaskBusy} disabled={busy} /></SampleRecordScope>
          : <CompanySummary application={preview} tasks={demoItems} notes={demoNotes} today={DEMO_TODAY} />)}
        {error && <Alert severity="error">{error}</Alert>}
      </DialogContent>
      <DialogActions>
        <Button disabled={busy || taskBusy} onClick={closePreview}>닫기</Button>
        {!practicing && <Button variant="contained" onClick={() => setPracticing(true)}>{hasTasks ? '준비 체크 체험하기' : '할 일 추가 체험하기'}</Button>}
        {practicing && !user && <Button variant="contained" disabled={busy || loading || taskBusy} onClick={start}>샘플 전체 보기</Button>}
      </DialogActions>
    </Dialog>
    <SiteFooter publicMode />
  </div>;
}
