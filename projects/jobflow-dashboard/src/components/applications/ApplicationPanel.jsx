import { useRef, useState } from 'react';
import { Alert, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, IconButton, MenuItem, useMediaQuery } from '@mui/material';
import Close from '@mui/icons-material/Close';
import OpenInNew from '@mui/icons-material/OpenInNew';
import DeleteOutlined from '@mui/icons-material/DeleteOutlined';
import useApplicationDraft from '../../hooks/useApplicationDraft';
import Field from '../ui/Field';
import LiveCompanySummary from './CompanySummary';
import { CompanyMark, ConfirmDelete } from '../ui/PageUI';
import { APPLICATION_STATUSES, COMPANY_SIZE_OPTIONS, PRIORITY_OPTIONS } from '../../constants';
import { applicationDraft, BOARD_COLUMNS, boardColumn } from '../../utils/applicationBoard';
import { isValidApplicationUrl } from '../../utils/applicationPayload';

export default function ApplicationPanel({ application, creating, draftScope, onClose, onSave, onDelete }) {
  const fullScreen = useMediaQuery('(max-width: 599px)');
  const { form, change: changeDraft, clear: clearDraft, reset: resetDraft, dirty, restored } = useApplicationDraft({ scope: draftScope, recordId: creating ? 'new' : application.id, initial: applicationDraft(application) });
  const [editing, setEditing] = useState(Boolean(creating));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({});
  const [extraOpen, setExtraOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirmLeave, setConfirmLeave] = useState(false);
  const [leaveTo, setLeaveTo] = useState('close');
  const [summaryBusy, setSummaryBusy] = useState(false);
  const companyInput = useRef(null);
  const urlInput = useRef(null);
  const summaryEditButton = useRef(null);
  const lane = boardColumn(form.status);
  function change(key, value) {
    changeDraft(key, value);
    setErrors(prev => ({ ...prev, [key]: '' }));
  }
  function close() {
    if (busy || summaryBusy) return;
    setLeaveTo('close');
    if (editing && dirty) setConfirmLeave(true);
    else onClose();
  }
  function cancelEdit() {
    if (busy) return;
    if (creating) { close(); return; }
    setLeaveTo('summary');
    if (dirty) setConfirmLeave(true);
    else returnToSummary();
  }
  function returnToSummary() {
    setEditing(false);
    window.requestAnimationFrame(() => summaryEditButton.current?.focus({ preventScroll: true }));
  }
  function discardAndLeave() {
    resetDraft();
    setConfirmLeave(false);
    setError(''); setErrors({});
    if (leaveTo === 'summary') returnToSummary();
    else onClose();
  }
  async function save(e) {
    e.preventDefault();
    if (busy) return;
    const invalid = {};
    if (!form.company_name.trim()) invalid.company_name = '회사 이름을 입력해주세요.';
    if (!isValidApplicationUrl(form.job_url)) invalid.job_url = 'http:// 또는 https://로 시작하는 공고 주소를 입력해주세요.';
    setErrors(invalid);
    if (Object.keys(invalid).length) {
      if (invalid.job_url || (!creating && invalid.company_name)) setExtraOpen(true);
      window.requestAnimationFrame(() => (invalid.company_name ? companyInput : urlInput).current?.focus());
      return;
    }
    setBusy(true); setError('');
    try { await onSave(form); clearDraft(); }
    catch (e) { setError(e.message); setBusy(false); }
  }
  async function remove() {
    if (busy) return;
    setBusy(true); setError('');
    try { await onDelete(application.id); clearDraft(); }
    catch (e) { setError(e.message); setDeleting(false); setBusy(false); }
  }
  const field = (key, label, extra = {}) => <Field id={`company-${key}`} label={label} value={form[key] ?? ''} disabled={busy} onChange={e => change(key, e.target.value)} error={Boolean(errors[key])} helperText={errors[key]} {...extra} />;
  return <>
    <Dialog
      open
      onClose={close}
      aria-labelledby="company-panel-title"
      fullScreen={fullScreen}
      maxWidth="sm"
      fullWidth
      scroll="paper"
      slotProps={{
        paper: {
          className: `company-panel${!editing ? ' company-panel-summary' : ''}`,
          sx: {
            height: { xs: '100dvh', sm: 'auto' },
            maxHeight: { xs: '100dvh', sm: 'calc(100dvh - 64px)' },
            borderRadius: { xs: 0, sm: '16px' },
            overflow: 'hidden',
            '& .company-panel-form, & .company-panel-body': {
              flex: { xs: '1 1 auto', sm: '0 1 auto' },
            },
          },
        },
      }}
    >
      <div className="company-panel-head">
        <div><span className="panel-caption">{creating ? '새 지원 정보' : '지원 정보'}</span><h2 id="company-panel-title">{creating ? '지원할 회사 등록' : application.company_name}</h2></div>
        <IconButton onClick={close} disabled={busy || summaryBusy} aria-label="회사 정보 닫기"><Close /></IconButton>
      </div>
      {!editing ? <>
        <div className="company-panel-body"><LiveCompanySummary application={application} onBusyChange={setSummaryBusy} />{restored && <Alert severity="info">저장하지 않은 수정 내용이 있어요. 회사 정보 수정에서 이어서 작성할 수 있어요.</Alert>}</div>
        <div className="company-panel-footer"><Button onClick={close} disabled={summaryBusy}>닫기</Button><Button ref={summaryEditButton} variant="outlined" disabled={summaryBusy} onClick={() => setEditing(true)}>회사 정보 수정</Button></div>
      </> : <form onSubmit={save} noValidate className="company-panel-form">
        <div className="company-panel-body">
          {error && <Alert severity="error">{error}</Alert>}
          {restored && <Alert severity="info">저장하지 않은 입력을 복원했어요.</Alert>}
          {!creating && <div className="company-panel-identity"><CompanyMark name={application.company_name} /><span>{application.position || '직무 미입력'}</span>{application.job_url && isValidApplicationUrl(application.job_url) && <Button component="a" href={application.job_url} target="_blank" rel="noopener noreferrer" size="small" endIcon={<OpenInNew fontSize="small" />}>채용 공고</Button>}</div>}
          {creating ? <>
            {field('company_name', '회사 이름', { required: true, inputRef: companyInput, autoFocus: true, placeholder: '회사 이름' })}
            {field('position', '지원 직무', { placeholder: '예: UX/UI 디자이너' })}
          </> : null}
          <div className="status-editor">
            {field('status', '현재 상태', { select: true, autoFocus: !creating, children: APPLICATION_STATUSES.map(s => <MenuItem key={s.value} value={s.value}>{s.label}</MenuItem>) })}
            {!creating && <div className="panel-stage-track" aria-label={`저장 후 표시 위치: ${BOARD_COLUMNS.find(c => c.id === lane)?.label || '보류함'}`}>
              {BOARD_COLUMNS.map(c => <span className={lane === c.id ? 'is-current' : ''} key={c.id}>{c.label}</span>)}
              {lane === 'paused' && <small>보류함에 표시됩니다</small>}
            </div>}
          </div>
          {field('deadline', '공고 마감일 (선택)', { type: 'date' })}
          {!creating && <div className="panel-documents">
            <FormControlLabel control={<Checkbox checked={Boolean(form.resume_submitted)} onChange={e => change('resume_submitted', e.target.checked)} disabled={busy} />} label="이력서 제출" />
            <FormControlLabel control={<Checkbox checked={Boolean(form.portfolio_submitted)} onChange={e => change('portfolio_submitted', e.target.checked)} disabled={busy} />} label="포트폴리오 제출" />
          </div>}
          {!creating && field('memo', '준비 메모', { multiline: true, minRows: 3, placeholder: '다음에 할 일을 적어보세요.' })}
          <details className="panel-extra" open={extraOpen} onToggle={event => setExtraOpen(event.currentTarget.open)}>
            <summary>{creating ? '공고·지원일 추가' : '회사·공고 정보 수정'}</summary>
            <div className="panel-extra-fields">
              {!creating && <>{field('company_name', '회사 이름', { required: true, inputRef: companyInput })}{field('position', '지원 직무')}</>}
              {field('job_url', '채용 공고 주소', { type: 'url', inputRef: urlInput, placeholder: 'https://' })}
              {field('applied_date', '지원한 날짜', { type: 'date' })}
              {!creating && <>
                {field('location', '근무 지역')}
                <div className="panel-field-pair">{field('company_size', '기업 규모', { select: true, children: [<MenuItem value="" key="none">선택 안 함</MenuItem>, ...COMPANY_SIZE_OPTIONS.map(s => <MenuItem value={s} key={s}>{s}</MenuItem>)] })}{field('priority', '우선순위', { select: true, children: PRIORITY_OPTIONS.map(s => <MenuItem value={s.value} key={s.value}>{s.label}</MenuItem>) })}</div>
              </>}
            </div>
          </details>
          {!creating && <Button className="company-delete" color="error" startIcon={<DeleteOutlined />} onClick={() => setDeleting(true)} disabled={busy}>회사 삭제</Button>}
        </div>
        <div className="company-panel-footer"><Button onClick={cancelEdit} disabled={busy}>{creating ? '취소' : '기록으로 돌아가기'}</Button><Button type="submit" variant="contained" disabled={busy}>{busy ? '저장 중…' : creating ? '등록하기' : '변경 저장'}</Button></div>
      </form>}
    </Dialog>
    <ConfirmDelete open={deleting} title={application?.company_name} description="준비 체크와 면접 질문은 남고, 회사 연결만 해제됩니다." busy={busy} onClose={() => setDeleting(false)} onConfirm={remove} />
    <Dialog open={confirmLeave} onClose={() => setConfirmLeave(false)} aria-labelledby="discard-title" maxWidth="xs" fullWidth>
      <DialogTitle id="discard-title">변경 내용을 저장하지 않았어요</DialogTitle><DialogContent>{leaveTo === 'close' ? '입력을 버리고 닫을까요?' : '수정을 취소하고 회사 기록으로 돌아갈까요?'}</DialogContent><DialogActions><Button onClick={() => setConfirmLeave(false)}>계속 작성</Button><Button onClick={discardAndLeave}>{leaveTo === 'close' ? '입력 버리고 닫기' : '수정 취소'}</Button></DialogActions>
    </Dialog>
  </>;
}
