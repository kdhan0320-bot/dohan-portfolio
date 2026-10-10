import Field from '../components/ui/Field';
import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Tabs, Tab, IconButton, Alert } from '@mui/material';
import Add from '@mui/icons-material/Add';
import DeleteOutline from '@mui/icons-material/DeleteOutlined';
import EditOutlined from '@mui/icons-material/EditOutlined';
import Check from '@mui/icons-material/Check';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import useInterviewNotes from '../hooks/useInterviewNotes';
import useApplications from '../hooks/useApplications';
import { PageHeading, LoadState, Empty, ConfirmDelete, CompanyMark } from '../components/ui/PageUI';
import ActionFeedback from '../components/ui/ActionFeedback';
import { companyDestination } from '../utils/calendar';
import '../styles/company-interview.css';
const INITIAL = {
  application_id: null,
  question: '',
  answer: '',
  related_project: '',
  importance: '보통',
  is_reviewed: false
};
export default function InterviewPage() {
  const {
    notes,
    loading,
    error,
    refresh,
    add,
    update,
    toggleReview,
    remove
  } = useInterviewNotes();
  const { applications, loading: companiesLoading, error: companiesError, refresh: refreshCompanies } = useApplications();
  const [searchParams, setSearchParams] = useSearchParams();
  const companyScope = searchParams.get('company') || 'all';
  const companyMap = new Map(applications.map(company => [company.id, company]));
  const selectedCompany = companyMap.get(companyScope);
  const companyScoped = companyScope !== 'all' && companyScope !== 'common';
  const missingCompany = companyScoped && !selectedCompany;
  const pageLoading = loading || companiesLoading;
  const pageError = error || companiesError;
  const [tab, setTab] = useState('todo');
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(INITIAL);
  const [originalForm, setOriginalForm] = useState(INITIAL);
  const [confirmDiscard, setConfirmDiscard] = useState(false);
  const [formError, setFormError] = useState('');
  const [revealed, setRevealed] = useState({});
  const [busy, setBusy] = useState('');
  const [target, setTarget] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [activeId, setActiveId] = useState(null);
  const scopedNotes = notes.filter(note => companyScope === 'all' || (companyScope === 'common' ? !note.application_id : note.application_id === companyScope));
  const done = scopedNotes.filter(n => n.is_reviewed).length;
  const filtered = scopedNotes.filter(n => tab === 'all' || n.is_reviewed === (tab === 'done'));
  const activeNote = filtered.find(n => n.id === activeId) || filtered[0];
  const activeIndex = filtered.findIndex(n => n.id === activeNote?.id);
  const activeCompany = activeNote?.application_id ? companyMap.get(activeNote.application_id) : null;
  function companyLabel(note) {
    return note.application_id ? companyMap.get(note.application_id)?.company_name || '연결한 회사 없음' : '공통 질문';
  }
  function selectCompany(value) {
    const next = new URLSearchParams(searchParams);
    if (value === 'all') next.delete('company');
    else next.set('company', value);
    setSearchParams(next);
    setActiveId(null);
  }
  function refreshPage() {
    refresh();
    refreshCompanies();
  }
  function startNew() {
    const draft = { ...INITIAL, application_id: selectedCompany?.id || null };
    setEditingId(null); setForm(draft); setOriginalForm(draft); setConfirmDiscard(false); setFormError(''); setOpen(true);
  }
  function startEdit(note) {
    const draft = {
      ...INITIAL,
      ...note,
      application_id: note.application_id || null,
      question: String(note.question ?? ''),
      answer: String(note.answer ?? ''),
      related_project: String(note.related_project ?? ''),
      importance: note.importance || '보통'
    };
    setEditingId(note.id); setForm(draft); setOriginalForm(draft); setConfirmDiscard(false); setFormError(''); setOpen(true);
  }
  function requestClose() {
    if (busy) return;
    if (Object.keys(INITIAL).some(key => form[key] !== originalForm[key])) setConfirmDiscard(true);
    else setOpen(false);
  }
  function discardDraft() {
    setConfirmDiscard(false); setOpen(false); setEditingId(null); setForm(INITIAL); setFormError('');
  }
  async function review(n) {
    setBusy(n.id);
    try {
      await toggleReview(n.id, !n.is_reviewed);
      setFeedback({
        message: n.is_reviewed ? '복습할 목록으로 옮겼어요.' : '복습을 완료했어요.'
      });
    } catch (e) {
      setFeedback({
        severity: 'error',
        message: e.message
      });
    } finally {
      setBusy('');
    }
  }
  async function submit(e) {
    e.preventDefault();
    if (busy || companiesLoading || companiesError) return;
    if (form.application_id && !companyMap.has(form.application_id)) {
      setFormError('연결한 회사를 찾을 수 없어요. 지원 회사를 다시 선택해주세요.');
      document.getElementById('note-company')?.focus();
      return;
    }
    if (!form.question.trim() || !form.answer.trim()) {
      setFormError('질문과 답변을 모두 입력해주세요.');
      document.getElementById(!form.question.trim() ? 'note-question' : 'note-answer')?.focus();
      return;
    }
    setBusy(editingId ? 'edit' : 'add');
    setFormError('');
    try {
      const payload = {
        application_id: form.application_id || null,
        question: form.question.trim(),
        answer: form.answer.trim(),
        related_project: String(form.related_project ?? '').trim(),
        importance: form.importance,
        is_reviewed: form.is_reviewed
      };
      if (editingId) await update(editingId, payload);
      else await add(payload);
      setOpen(false);
      setForm(INITIAL);
      // Keep the saved question in view when its company changes while filtered.
      if (companyScope !== 'all' && (payload.application_id || 'common') !== companyScope) selectCompany(payload.application_id || 'common');
      if (editingId) {
        setRevealed(prev => ({ ...prev, [editingId]: true }));
        setActiveId(editingId);
      } else { setTab('todo'); setActiveId(null); }
      setFeedback({
        message: editingId ? '면접 노트를 수정했어요.' : '면접 노트를 추가했어요.'
      });
      setEditingId(null);
    } catch (e) {
      setFormError(e.message);
    } finally {
      setBusy('');
    }
  }
  async function deleteNote() {
    setBusy('delete');
    try {
      await remove(target.id);
      setTarget(null);
      setFeedback({
        message: '면접 노트를 삭제했어요.'
      });
    } catch (e) {
      setFeedback({
        severity: 'error',
        message: e.message
      });
    } finally {
      setBusy('');
    }
  }
  return <>
  <PageHeading art="chat" title="면접 연습" description="답변을 가리고, 내 말로 연습해요.">
    <Button variant="contained" startIcon={<Add />} onClick={startNew} disabled={pageLoading || Boolean(pageError) || missingCompany}>질문 추가</Button>
  </PageHeading>
  <div className="interview-company-filter">
    <div className="interview-company-context">
      {selectedCompany && <CompanyMark name={selectedCompany.company_name} />}
      <div>
        <strong>{selectedCompany?.company_name || (missingCompany ? '회사를 확인할 수 없어요' : companyScope === 'common' ? '공통 질문' : '전체 면접')}</strong>
        <span>{selectedCompany ? selectedCompany.position || '직무 미입력' : missingCompany ? '회사 선택을 다시 확인해주세요.' : companyScope === 'common' ? '회사와 관계없이 준비하는 질문' : `${applications.length}개 회사 · 공통 질문`}</span>
      </div>
      {selectedCompany && <Button component={Link} to={companyDestination(selectedCompany.id)} size="small">회사 정보</Button>}
    </div>
    <Field id="interview-company-scope" select size="small" label="회사 선택" value={companyScope} disabled={companiesLoading || Boolean(companiesError)} onChange={event => selectCompany(event.target.value)}>
      <MenuItem value="all">전체 회사 · 공통 질문</MenuItem>
      <MenuItem value="common">공통 질문</MenuItem>
      {missingCompany && <MenuItem value={companyScope} disabled>{companiesLoading ? '회사 확인 중' : '찾을 수 없는 회사'}</MenuItem>}
      {applications.map(company => <MenuItem className="interview-company-option" key={company.id} value={company.id}>{company.company_name} · {company.position || '직무 미입력'}</MenuItem>)}
    </Field>
  </div>
  <div className="tabs-row interview-status-tabs">
    <Tabs value={tab} variant="scrollable" scrollButtons="auto" allowScrollButtonsMobile onChange={(_, v) => { setTab(v); setActiveId(null); }} aria-label="복습 상태">
      <Tab value="todo" label={`복습할 질문 ${scopedNotes.length - done}`} />
      <Tab value="done" label={`복습 완료 ${done}`} />
      <Tab value="all" label={`전체 ${scopedNotes.length}`} />
    </Tabs>
  </div>
  <LoadState loading={pageLoading} error={pageError} retry={refreshPage} />
  {!pageLoading && !pageError && missingCompany && <Alert severity="info" action={<Button color="inherit" onClick={() => selectCompany('all')}>전체 질문 보기</Button>}>이 회사의 지원 기록을 찾을 수 없어요. 삭제한 회사인지 확인해주세요.</Alert>}
  {!pageLoading && !pageError && !missingCompany && (activeNote ? <div className="interview-workspace">
    <nav className="question-queue" aria-label="연습할 질문 선택">
      <div className="question-queue-heading"><span>질문 갈피</span><span>{filtered.length}개</span></div>
      <ol>
        {filtered.map((n, i) => <li key={n.id}>
          <button type="button" className="question-index" aria-current={n.id === activeNote.id ? 'true' : undefined} onClick={() => setActiveId(n.id)}>
            <span className="question-index-number" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
            <span><small>{companyLabel(n)}</small><strong>{n.question}</strong></span>
            {n.is_reviewed && <Check fontSize="small" aria-label="복습 완료" />}
          </button>
        </li>)}
      </ol>
    </nav>
    <section className="practice-desk" aria-label="면접 질문 연습">
      <div className="practice-pagination">
        <span aria-live="polite">질문 <strong>{activeIndex + 1}</strong> / {filtered.length}</span>
        <div><IconButton aria-label="이전 질문" disabled={activeIndex === 0} onClick={() => setActiveId(filtered[activeIndex - 1].id)}><ChevronLeft /></IconButton><IconButton aria-label="다음 질문" disabled={activeIndex === filtered.length - 1} onClick={() => setActiveId(filtered[activeIndex + 1].id)}><ChevronRight /></IconButton></div>
      </div>
      <article className="practice-card">
        <div className="practice-card-meta"><span className="practice-company-label">{activeCompany ? <Link to={companyDestination(activeCompany.id)}>{companyLabel(activeNote)}</Link> : companyLabel(activeNote)}{activeNote.related_project && <span>{activeNote.related_project}</span>}</span><span>중요도 {activeNote.importance}</span></div>
        <div className="practice-question"><span className="practice-question-mark" aria-hidden="true">Q.</span><h2>{activeNote.question}</h2></div>
        {revealed[activeNote.id] && <div className="practice-answer" id={`answer-${activeNote.id}`}><span>나의 답변</span><p>{activeNote.answer}</p></div>}
        <Button className="practice-reveal" variant="outlined" aria-expanded={Boolean(revealed[activeNote.id])} aria-controls={revealed[activeNote.id] ? `answer-${activeNote.id}` : undefined} onClick={() => setRevealed(prev => ({ ...prev, [activeNote.id]: !prev[activeNote.id] }))}>
          {revealed[activeNote.id] ? '답변 접기' : '답변 펼치기'}
        </Button>
      </article>
      <div className="practice-toolbar">
        <div>
          <IconButton aria-label={`${activeNote.question} 수정`} disabled={Boolean(busy)} onClick={() => startEdit(activeNote)}><EditOutlined fontSize="small" /></IconButton>
          <IconButton aria-label={`${activeNote.question} 삭제`} disabled={Boolean(busy)} onClick={() => setTarget(activeNote)}><DeleteOutline fontSize="small" /></IconButton>
        </div>
        <Button variant={activeNote.is_reviewed ? 'outlined' : 'contained'} startIcon={<Check />} disabled={Boolean(busy)} onClick={() => review(activeNote)}>{activeNote.is_reviewed ? '복습 취소' : '복습 완료'}</Button>
      </div>
    </section>
  </div> : <div className="panel practice-empty">
    <Empty title={tab === 'todo' && scopedNotes.length ? '이 범위의 질문을 모두 복습했어요' : tab === 'done' ? '아직 복습을 완료한 질문이 없어요' : selectedCompany ? '이 회사의 첫 면접 질문을 기록해보세요' : companyScope === 'common' ? '아직 공통 질문이 없어요' : '아직 질문이 없어요'}>
      {scopedNotes.length > 0 && <Button onClick={() => setTab('all')}>전체 질문 보기</Button>}
      <Button onClick={startNew}>새 질문 기록하기</Button>
    </Empty>
  </div>)}
  <Dialog aria-labelledby="note-dialog-title" open={open} onClose={requestClose} fullWidth maxWidth="sm">
    <form onSubmit={submit} noValidate>
      <DialogTitle id="note-dialog-title">{editingId ? '면접 질문 수정' : '면접 질문 기록'}</DialogTitle>
      <DialogContent>
        <div className="field-stack" style={{
            paddingTop: 12
          }}>
          {formError && <Alert severity="error">
            {formError}
          </Alert>}
          <Field id="note-company" disabled={Boolean(busy) || companiesLoading || Boolean(companiesError)} select label="지원 회사" value={form.application_id || ''} slotProps={{ select: { displayEmpty: true } }} onChange={event => setForm({ ...form, application_id: event.target.value || null })}>
            <MenuItem value="">공통 질문 · 회사 연결 안 함</MenuItem>
            {form.application_id && !companyMap.has(form.application_id) && <MenuItem value={form.application_id} disabled>연결한 회사 없음 · 다시 선택해주세요</MenuItem>}
            {applications.map(company => <MenuItem className="interview-company-option" key={company.id} value={company.id}>{company.company_name} · {company.position || '직무 미입력'}</MenuItem>)}
          </Field>
          <Field id="note-question" disabled={Boolean(busy)} autoFocus label="질문" required value={form.question} onChange={e => setForm({
              ...form,
              question: e.target.value
            })} />
          <Field id="note-answer" disabled={Boolean(busy)} label="나의 답변" required multiline minRows={5} value={form.answer} onChange={e => setForm({
              ...form,
              answer: e.target.value
            })} />
          <Field disabled={Boolean(busy)} label="관련 프로젝트 또는 주제 (선택)" value={form.related_project} onChange={e => setForm({
              ...form,
              related_project: e.target.value
            })} />
          <Field disabled={Boolean(busy)} select label="중요도" value={form.importance} onChange={e => setForm({
              ...form,
              importance: e.target.value
            })}>
            {['높음', '보통', '낮음'].map(v => <MenuItem key={v} value={v}>
              {v}
            </MenuItem>)}
          </Field>
        </div>
      </DialogContent>
      <DialogActions>
        <Button disabled={Boolean(busy)} onClick={requestClose}>취소</Button>
        <Button type="submit" variant="contained" disabled={Boolean(busy) || companiesLoading || Boolean(companiesError)}>{editingId ? '수정 저장' : '질문 저장'}</Button>
      </DialogActions>
    </form>
  </Dialog>
  <Dialog open={confirmDiscard} onClose={() => setConfirmDiscard(false)} aria-labelledby="discard-note-title" aria-describedby="discard-note-description" fullWidth maxWidth="xs">
    <DialogTitle id="discard-note-title">작성 내용을 저장하지 않았어요</DialogTitle>
    <DialogContent><p id="discard-note-description">닫으면 방금 입력하거나 수정한 내용이 사라집니다.</p></DialogContent>
    <DialogActions>
      <Button autoFocus onClick={() => setConfirmDiscard(false)}>계속 작성</Button>
      <Button onClick={discardDraft}>저장하지 않고 닫기</Button>
    </DialogActions>
  </Dialog>
  <ConfirmDelete open={Boolean(target)} title={target?.question} busy={Boolean(busy)} onClose={() => setTarget(null)} onConfirm={deleteNote} />
  <ActionFeedback feedback={feedback} onClose={() => setFeedback(null)} />
</>;
}
