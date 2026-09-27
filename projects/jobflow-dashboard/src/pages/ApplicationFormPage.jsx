import Field from '../components/ui/Field';
import { StageArt } from '../components/ui/JournalArt';
import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { MenuItem, Button, Checkbox, FormControlLabel, Alert } from '@mui/material';
import useApplications from '../hooks/useApplications';
import { APPLICATION_STATUSES, PRIORITY_OPTIONS, COMPANY_SIZE_OPTIONS } from '../constants';
import { APPLICATION_MUTABLE_FIELDS, isValidApplicationUrl } from '../utils/applicationPayload';
import { PageHeading, LoadState, Empty } from '../components/ui/PageUI';
const INITIAL = {
  company_name: '',
  position: '',
  location: '',
  company_size: '',
  status: '관심',
  applied_date: '',
  deadline: '',
  priority: '보통',
  job_url: '',
  memo: '',
  portfolio_submitted: false,
  resume_submitted: false
};
export default function ApplicationFormPage() {
  const {
    id
  } = useParams();
  const navigate = useNavigate();
  const {
    applications,
    loading,
    error,
    refresh,
    add,
    update
  } = useApplications();
  const [form, setForm] = useState(INITIAL);
  const [initialized, setInitialized] = useState(false);
  const [busy, setBusy] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [errors, setErrors] = useState({});
  const application = applications.find(a => a.id === id);
  useEffect(() => {
    if (id && application && !initialized) {
      setForm(APPLICATION_MUTABLE_FIELDS.reduce((a, k) => ({
        ...a,
        [k]: application[k] ?? INITIAL[k]
      }), {}));
      setInitialized(true);
    }
  }, [id, application, initialized]);
  function change(key, value) {
    setForm(prev => ({
      ...prev,
      [key]: value
    }));
    setErrors(prev => ({
      ...prev,
      [key]: ''
    }));
  }
  async function submit(e) {
    e.preventDefault();
    if (busy) return;
    const next = {};
    if (!form.company_name.trim()) next.company_name = '회사 이름을 입력해주세요.';
    if (!isValidApplicationUrl(form.job_url)) next.job_url = 'http:// 또는 https://로 시작하는 공고 주소를 입력해주세요.';
    setErrors(next);
    if (Object.keys(next).length) {
      document.getElementById(`application-${Object.keys(next)[0]}`)?.focus();
      return;
    }
    setBusy(true);
    setSaveError('');
    try {
      const row = id ? await update(id, form) : await add(form);
      navigate(`/applications/${row.id}`, {
        replace: true
      });
    } catch (e) {
      setSaveError(e.message);
    } finally {
      setBusy(false);
    }
  }
  function field(key, label, options = {}) {
    return <Field id={`application-${key}`} label={label} value={form[key]} onChange={e => change(key, e.target.value)} disabled={busy} fullWidth error={Boolean(errors[key])} helperText={errors[key]} {...options} />;
  }
  if (id && (loading || error)) return <LoadState loading={loading} error={error} retry={refresh} />;
  if (id && !application) return <Empty title="지원 기록을 찾을 수 없어요">
  <Button component={Link} to="/applications">지원 목록으로</Button>
</Empty>;
  return <>
    <PageHeading title={id ? '지원 기록 수정' : '회사 담기'} />
    <div className="entry-layout">
      <aside className="entry-aside">
        <StageArt index={0} />
        <h2>{id ? <>기록을 다듬고,<br />다음을 준비해요.</> : <>마음에 든 회사,<br />한 곳부터 담아요.</>}</h2>
        <p>회사 이름만 입력해도 저장할 수 있어요.</p>
      </aside>
      <form className="panel form-panel" onSubmit={submit} noValidate>
        {saveError && <Alert severity="error" sx={{ mb: 3 }}>{saveError}</Alert>}
        <div className="form-grid">
          {field('company_name', '회사 이름', { required: true, placeholder: '예: 나의다음 스튜디오' })}
          {field('position', '지원 직무', { placeholder: '예: UX/UI 디자이너' })}
          {field('job_url', '채용 공고 주소', { placeholder: 'https://', type: 'url' })}
          {field('deadline', '공고 마감일', { type: 'date' })}
        </div>
        <details className="form-more" open={id ? true : undefined}>
          <summary>상태·일정·메모 더하기 <span>선택 입력</span></summary>
          <div className="form-grid">
            {field('status', '전형 상태', { select: true, children: APPLICATION_STATUSES.map(v => <MenuItem key={v.value} value={v.value}>{v.label}</MenuItem>) })}
            {field('applied_date', '지원한 날짜', { type: 'date' })}
            {field('location', '근무 지역')}
            {field('company_size', '기업 규모', { select: true, children: [<MenuItem key="none" value="">선택 안 함</MenuItem>, ...COMPANY_SIZE_OPTIONS.map(v => <MenuItem key={v} value={v}>{v}</MenuItem>)] })}
            {field('priority', '우선순위', { select: true, children: PRIORITY_OPTIONS.map(v => <MenuItem key={v.value} value={v.value}>{v.label}</MenuItem>) })}
            <div className="full-width submitted-options">
              <FormControlLabel control={<Checkbox checked={form.resume_submitted} onChange={e => change('resume_submitted', e.target.checked)} disabled={busy} />} label="이력서 제출" />
              <FormControlLabel control={<Checkbox checked={form.portfolio_submitted} onChange={e => change('portfolio_submitted', e.target.checked)} disabled={busy} />} label="포트폴리오 제출" />
            </div>
            {field('memo', '기억할 내용', { className: 'full-width', multiline: true, minRows: 3, placeholder: '지원 이유나 준비할 자료를 적어보세요.' })}
          </div>
        </details>
        <div className="form-actions">
          <Button component={Link} to={id ? `/applications/${id}` : '/applications'} disabled={busy}>취소</Button>
          <Button type="submit" variant="contained" disabled={busy}>{busy ? '저장 중…' : id ? '수정 저장' : '회사 담기'}</Button>
        </div>
      </form>
    </div>
  </>;
}
