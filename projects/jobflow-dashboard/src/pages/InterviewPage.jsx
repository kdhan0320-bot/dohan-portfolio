import Field from '../components/ui/Field';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Alert, Menu } from '@mui/material';
import Add from '@mui/icons-material/Add';
import DeleteOutline from '@mui/icons-material/DeleteOutlined';
import EditOutlined from '@mui/icons-material/EditOutlined';
import MoreHoriz from '@mui/icons-material/MoreHoriz';
import TuneOutlined from '@mui/icons-material/TuneOutlined';
import useInterviewNotes from '../hooks/useInterviewNotes';
import useApplications from '../hooks/useApplications';
import useRecordDraft from '../hooks/useRecordDraft';
import { PageHeading, LoadState, Empty, ConfirmDelete } from '../components/ui/PageUI';
import ActionFeedback from '../components/ui/ActionFeedback';
import { observeTextareaLayout } from '../utils/textareaCaret';
const INITIAL = {
  application_id: null,
  question: '',
  answer: '',
  related_project: '',
  importance: '보통',
  is_reviewed: false
};
const SCOPE_LABELS = { all: '전체 질문', common: '공통 질문', companies: '모든 회사 질문' };
function revealMobileEditor(editor) {
  if (!editor || !window.matchMedia?.('(max-width: 999px)')?.matches) return;
  if (document.documentElement?.hasAttribute('data-keyboard-open')) return;
  const rect = editor.getBoundingClientRect();
  if (rect.top < 88 || rect.bottom > window.innerHeight - 76) {
    window.scrollTo({ top: window.scrollY + rect.top - 88, behavior: 'instant' });
  }
}
export default function InterviewPage() {
  const drafts = useRecordDraft('interview');
  const {
    notes,
    loading,
    error,
    refresh,
    add,
    update,
    remove
  } = useInterviewNotes();
  const { applications, loading: companiesLoading, error: companiesError, refresh: refreshCompanies } = useApplications();
  const [searchParams, setSearchParams] = useSearchParams();
  const companyScope = searchParams.get('company') || 'all';
  const companyMap = new Map(applications.map(company => [company.id, company]));
  const selectedCompany = companyMap.get(companyScope);
  const companyScoped = !['all', 'common', 'companies'].includes(companyScope);
  const [topic, setTopic] = useState('all');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const filterCount = Number(companyScope !== 'all') + Number(topic !== 'all');
  const scopeLabel = SCOPE_LABELS[companyScope] || selectedCompany?.company_name || (companiesLoading ? '회사 확인 중' : '찾을 수 없는 회사');
  const missingCompany = companyScoped && !selectedCompany;
  const pageLoading = loading || companiesLoading;
  const pageError = error || companiesError;
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [draftId, setDraftId] = useState('new');
  const [form, setForm] = useState(INITIAL);
  const [originalForm, setOriginalForm] = useState(INITIAL);
  const [restored, setRestored] = useState(false);
  const [confirmDiscard, setConfirmDiscard] = useState(false);
  const [formError, setFormError] = useState('');
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [busy, setBusy] = useState('');
  const [target, setTarget] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [activeId, setActiveId] = useState(null);
  const practiceHeading = useRef(null);
  const pendingDelete = useRef(null);
  const emptyResult = useRef(null);
  const pendingResultFocus = useRef(false);
  const [validationTarget, setValidationTarget] = useState(null);
  const answerInput = useRef(null);
  const answerLayout = useRef(null);
  useEffect(() => {
    if (busy || pageLoading || !pendingResultFocus.current) return;
    pendingResultFocus.current = false;
    // Wait until the record and any delete dialog have released their focus.
    const frame = window.requestAnimationFrame(() => {
      (practiceHeading.current || emptyResult.current)?.focus({ preventScroll: true });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [busy, notes, open, pageLoading]);
  const includesCompany = applicationId => companyScope === 'all' || (companyScope === 'common' ? !applicationId : companyScope === 'companies' ? Boolean(applicationId) : applicationId === companyScope);
  const scopedNotes = notes.filter(note => includesCompany(note.application_id));
  const topics = [...new Set(scopedNotes.map(note => note.related_project?.trim()).filter(Boolean))];
  const filtered = scopedNotes.filter(note => topic === 'all' || (note.related_project?.trim() || 'none') === topic);
  const activeNote = filtered.find(n => n.id === activeId) || filtered[0];
  const activeHasAnswer = Boolean(activeNote?.answer?.trim());
  const activeIndex = filtered.findIndex(n => n.id === activeNote?.id);
  useLayoutEffect(() => {
    if (!open || !editingId) return;
    const answer = answerInput.current;
    const editor = answer?.closest('form');
    const fields = editor?.querySelector('.field-stack');
    if (!answer || !fields) return;
    answer.focus({ preventScroll: true });
    answer.setSelectionRange(0, 0);
    let opening = true;
    const layout = observeTextareaLayout(answer, fields, () => {
      revealMobileEditor(editor);
      // Open at the answer's first line with its label, without overriding
      // a selection the user has already moved while the layout settles.
      if (opening) {
        const label = editor.querySelector('#note-answer-label');
        const lineHeight = parseFloat(window.getComputedStyle(answer).lineHeight) || 28;
        if (fields.clientHeight < (label?.offsetHeight || 0) + lineHeight + 24) return false;
        if (document.activeElement === answer && answer.selectionStart === 0 && answer.selectionEnd === 0 && label) {
          fields.scrollTop += label.getBoundingClientRect().top - fields.getBoundingClientRect().top - 4;
        }
        opening = false;
      }
    });
    answerLayout.current = layout;
    return () => {
      layout.disconnect();
      answerLayout.current = null;
    };
  }, [open, editingId]);
  useLayoutEffect(() => { answerLayout.current?.schedule(); }, [form.answer]);
  useEffect(() => {
    // Each failed submit is a new request, even when the error text is unchanged.
    // Open the details first, then reveal the field after React has laid out the error.
    if (!validationTarget) return;
    const field = document.getElementById(validationTarget.fieldId);
    field?.closest('details')?.setAttribute('open', '');
    const frame = window.requestAnimationFrame(() => {
      if (!field) return;
      field.focus({ preventScroll: true });
      const editor = field?.closest('.inline-answer-editor');
      revealMobileEditor(editor);
      const fields = editor?.querySelector('.field-stack');
      if (fields) {
        fields.scrollTo({ top: fields.scrollTop + field.getBoundingClientRect().top - fields.getBoundingClientRect().top - (fields.clientHeight - field.offsetHeight) / 2, behavior: 'instant' });
      } else field.scrollIntoView?.({ block: 'nearest' });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [validationTarget]);
  function companyLabel(note) {
    return note.application_id ? companyMap.get(note.application_id)?.company_name || '연결한 회사 없음' : '공통 질문';
  }
  function selectCompany(value) {
    const next = new URLSearchParams(searchParams);
    if (value === 'all') next.delete('company');
    else next.set('company', value);
    setSearchParams(next);
    setActiveId(null);
    setTopic('all');
  }
  function refreshPage() {
    refresh();
    refreshCompanies();
  }
  function startNew() {
    const recovered = drafts.read('new');
    const initial = { ...INITIAL, application_id: selectedCompany?.id || null };
    openEditor(null, recovered?.values || initial, recovered?.baseline || initial, Boolean(recovered));
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
    const recovered = drafts.read(note.id);
    openEditor(note.id, recovered?.values || draft, recovered?.baseline || draft, Boolean(recovered), note.id);
  }
  function openEditor(id, values, baseline, recovered, draftKey = id || 'new') {
    setFiltersOpen(false);
    if (id) { setActiveId(id); if (!includesCompany(values.application_id)) selectCompany(values.application_id || 'common'); }
    setDraftId(draftKey);
    setEditingId(id); setForm(values); setOriginalForm(baseline); setRestored(recovered);
    setConfirmDiscard(false); setFormError(''); setValidationTarget(null); setFeedback(null); setOpen(true);
  }
  function resumeDraft() {
    const pending = drafts.pending;
    if (!pending) return;
    if (pending.recordId !== 'new' && !notes.some(note => note.id === pending.recordId)) {
      // Preserve the user's text even if its saved record was removed elsewhere.
      openEditor(null, pending.values, INITIAL, true, pending.recordId);
      setFormError('원래 질문을 찾을 수 없어 새 질문으로 열었어요. 내용을 확인한 뒤 저장해주세요.');
    } else openEditor(pending.recordId === 'new' ? null : pending.recordId, pending.values, pending.baseline, true);
  }
  function changeForm(next) {
    // Persist synchronously before a browser Back action can unmount this page.
    drafts.write(draftId, next, originalForm);
    setForm(next);
    const corrected = validationTarget?.fieldId === 'note-question'
      ? Boolean(next.question.trim())
      : validationTarget?.fieldId === 'note-company'
        && (!next.application_id || companyMap.has(next.application_id));
    if (corrected) { setFormError(''); setValidationTarget(null); }
  }
  function requestClose() {
    if (busy) return;
    if (Object.keys(INITIAL).some(key => form[key] !== originalForm[key])) setConfirmDiscard(true);
    else { pendingResultFocus.current = true; setOpen(false); }
  }
  function focusEditorField() {
    const fieldId = editingId && !originalForm.answer.trim() ? 'note-answer' : 'note-question';
    document.getElementById(fieldId)?.focus();
  }
  function discardDraft() {
    drafts.clear(draftId, form);
    pendingResultFocus.current = true;
    setConfirmDiscard(false); setOpen(false); setEditingId(null); setForm(INITIAL); setFormError('');
  }
  function continueDraft() {
    setConfirmDiscard(false);
    window.requestAnimationFrame(() => document.getElementById('note-question')?.focus({ preventScroll: true }));
  }
  async function submit(e) {
    e.preventDefault();
    if (busy || companiesLoading || companiesError) return;
    if (form.application_id && !companyMap.has(form.application_id)) {
      setFormError('연결한 회사를 찾을 수 없어요. 지원 회사를 다시 선택해주세요.');
      setValidationTarget({ fieldId: 'note-company' });
      return;
    }
    if (!form.question.trim()) {
      setFormError('질문을 입력해주세요.');
      setValidationTarget({ fieldId: 'note-question' });
      return;
    }
    setBusy(editingId ? 'edit' : 'add');
    setFormError('');
    setValidationTarget(null);
    try {
      const payload = {
        application_id: form.application_id || null,
        question: form.question.trim(),
        answer: form.answer.trim(),
        related_project: String(form.related_project ?? '').trim(),
        importance: form.importance,
        is_reviewed: Boolean(form.answer.trim() && form.is_reviewed)
      };
      await drafts.save(draftId, form, () => editingId ? update(editingId, payload) : add(payload));
      pendingResultFocus.current = true;
      setOpen(false);
      if (topic !== 'all' && (payload.related_project || 'none') !== topic) setTopic('all');
      setForm(INITIAL);
      // Keep the saved question in view when its company changes while filtered.
      if (!includesCompany(payload.application_id)) selectCompany(payload.application_id || 'common');
      if (editingId) {
        setActiveId(editingId);
      } else { setActiveId(null); }
      setFeedback({
        message: editingId ? '면접 기록을 저장했어요.' : '면접 질문을 추가했어요.'
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
      drafts.clear(target.id);
      setTarget(null);
      pendingResultFocus.current = true;
      setFeedback({
        message: '면접 질문을 삭제했어요.'
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
  const answerField = <Field id="note-answer" className="interview-answer-field" disabled={Boolean(busy)} label="나의 답변 (선택)" multiline
    inputRef={editingId ? answerInput : undefined}
    minRows={editingId ? undefined : 4} rows={editingId ? 6 : undefined}
    slotProps={{ input: editingId ? { inputComponent: 'textarea' } : {} }}
    value={form.answer} onChange={event => changeForm({ ...form, answer: event.target.value })} />;
  const questionField = <Field id="note-question" disabled={Boolean(busy)} label="질문" required value={form.question} onChange={event => changeForm({ ...form, question: event.target.value })} />;
  const companyFields = <div className="interview-record-context">
    <Field id="note-company" disabled={Boolean(busy) || companiesLoading || Boolean(companiesError)} select label="지원 회사" value={form.application_id || ''} slotProps={{ select: { displayEmpty: true } }} onChange={event => changeForm({ ...form, application_id: event.target.value || null })}>
      <MenuItem value="">공통 질문 · 회사 연결 안 함</MenuItem>
      {form.application_id && !companyMap.has(form.application_id) && <MenuItem value={form.application_id} disabled>연결한 회사 없음 · 다시 선택해주세요</MenuItem>}
      {applications.map(company => <MenuItem className="interview-company-option" key={company.id} value={company.id}>{company.company_name} · {company.position || '직무 미입력'}</MenuItem>)}
    </Field>
    <Field label="관련 프로젝트 또는 주제 (선택)" disabled={Boolean(busy)} value={form.related_project} onChange={event => changeForm({ ...form, related_project: event.target.value })} />
  </div>;
  const editorFields = <div className="field-stack">
    {!editingId && formError && <Alert severity="error">{formError}</Alert>}
    {restored && <Alert severity="info">작성 내용을 복원했어요. 저장하면 반영됩니다.</Alert>}
    <div className="interview-record-fields">{questionField}{companyFields}</div>
    {answerField}
  </div>;
  return <>
  <div className="interview-page">
  <PageHeading art="chat" title="면접" >
    <Button variant="contained" startIcon={<Add />} onClick={startNew} disabled={open || pageLoading || Boolean(pageError) || missingCompany}>질문 추가</Button>
  </PageHeading>
  {drafts.pending && !open && <Alert className="record-draft-notice" severity="info" action={<Button color="inherit" disabled={pageLoading || Boolean(pageError)} onClick={resumeDraft}>이어서 작성</Button>}>저장하지 않은 면접 기록이 있어요. </Alert>}
  <div className="interview-controls">
    <div className="interview-filter-bar">
      {filterCount > 0 && <div className="interview-filter-summary">
        <span>{scopeLabel}{topic !== 'all' ? ` · ${topic === 'none' ? '주제 미지정' : topic}` : ''}</span>
        <Button disabled={open} onClick={() => { selectCompany('all'); setTopic('all'); }}>필터 해제</Button>
      </div>}
      <Button variant="outlined" startIcon={<TuneOutlined />} aria-label={`필터${filterCount ? ' · 적용 중' : ''}`} aria-expanded={filtersOpen} aria-controls="interview-filters" disabled={open} onClick={() => setFiltersOpen(value => !value)}>
        필터{filterCount > 0 && <span className="filter-count" aria-hidden="true">{filterCount}</span>}
      </Button>
    </div>
    <div id="interview-filters" className="interview-filter-fields" hidden={!filtersOpen}>
      <Field id="interview-company-scope" select size="small" label="질문 대상" value={companyScope} slotProps={{ select: { renderValue: () => scopeLabel } }} disabled={companiesLoading || Boolean(companiesError) || open} onChange={event => selectCompany(event.target.value)}>
        {Object.entries(SCOPE_LABELS).map(([value, label]) => <MenuItem key={value} value={value}>{label}</MenuItem>)}
        {missingCompany && <MenuItem value={companyScope} disabled>{companiesLoading ? '회사 확인 중' : '찾을 수 없는 회사'}</MenuItem>}
        {applications.map(company => <MenuItem className="interview-company-option" key={company.id} value={company.id}>{company.company_name} · {company.position || '직무 미입력'}</MenuItem>)}
      </Field>
      <Field id="interview-topic" select size="small" label="주제" value={topic} disabled={pageLoading || Boolean(pageError) || open} onChange={event => { setTopic(event.target.value); setActiveId(null); }}>
        <MenuItem value="all">전체 주제</MenuItem>{topics.map(value => <MenuItem key={value} value={value}>{value}</MenuItem>)}<MenuItem value="none">주제 미지정</MenuItem>
      </Field>
    </div>
  </div>
  <LoadState loading={pageLoading} error={pageError} retry={refreshPage} />
  {!pageLoading && !pageError && missingCompany && <Alert severity="info" action={<Button color="inherit" onClick={() => selectCompany('all')}>전체 질문 보기</Button>}>이 회사의 지원 기록을 찾을 수 없어요. 삭제한 회사인지 확인해주세요.</Alert>}
  {!pageLoading && !pageError && !missingCompany && (activeNote ? <div className="interview-workspace">
    <nav className="question-queue" aria-label="연습할 질문 선택">
      <div className="question-queue-heading"><span>질문 목록</span><span>{filtered.length}개</span></div>
      <ol>
        {filtered.map((n, i) => <li key={n.id}>
          <button type="button" className="question-index" aria-current={n.id === activeNote.id ? 'true' : undefined} disabled={open} onClick={() => setActiveId(n.id)}>
            <span className="question-index-number" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
            <span>{!companyScoped && <small>{companyLabel(n)}</small>}<strong>{n.question}</strong>{!n.answer?.trim() && <span className="question-draft-label">답변 준비 전</span>}</span>

          </button>
        </li>)}
      </ol>
    </nav>
    <section className="practice-desk" aria-label="면접 질문 연습">
      <div className="practice-navigation">
      <Field className="mobile-question-select" id="interview-question-select" label="연습할 질문" select size="small" value={activeNote.id} disabled={open} onChange={event => setActiveId(event.target.value)} slotProps={{ select: { renderValue: () => `${activeIndex + 1}. ${activeNote.question}` } }}>
        {filtered.map((note, index) => <MenuItem className="interview-question-option" key={note.id} value={note.id}>{index + 1}. {!companyScoped ? `${companyLabel(note)} · ` : ''}{note.question}{!note.answer?.trim() ? ' · 답변 준비 전' : ''}</MenuItem>)}
      </Field>
      <div className="practice-pagination">
        <span aria-live="polite">질문 <strong>{activeIndex + 1}</strong> / {filtered.length}</span>

      </div>
      </div>
      {open && editingId ? <form className="practice-card inline-answer-editor" onSubmit={submit} noValidate aria-label="면접 기록 수정" onFocusCapture={event => {
        if (event.target.closest('.inline-editor-actions')) return;
        const editor = event.currentTarget;
        window.requestAnimationFrame(() => { if (editor.contains(document.activeElement)) revealMobileEditor(editor); });
      }}>
        <h2>면접 기록 수정</h2>
        <button type="button" className="inline-editor-summary" aria-label="질문·회사 정보 수정" aria-describedby="interview-editor-company interview-editor-question" title="질문·회사 정보 수정" disabled={Boolean(busy)} onClick={() => {
          const question = document.getElementById('note-question');
          question?.focus({ preventScroll: true });
          question?.closest('.field-stack')?.scrollTo({ top: 0, behavior: 'instant' });
        }}>
          <span id="interview-editor-company" className="inline-editor-company" title={companyLabel(form)}>{companyLabel(form)}</span>
          <span aria-hidden="true">·</span>
          <span id="interview-editor-question" className="inline-editor-question" title={form.question.trim() || '질문 미입력'}>{form.question.trim() || '질문 미입력'}</span>
          <EditOutlined aria-hidden="true" />
        </button>
        {formError && <Alert className="inline-editor-error" severity="error">{formError}</Alert>}{editorFields}<div className="inline-editor-actions"><Button disabled={Boolean(busy)} onClick={requestClose}>취소</Button><Button variant="contained" type="submit" disabled={Boolean(busy) || companiesLoading || Boolean(companiesError)}>{busy ? '저장 중…' : '변경 저장'}</Button></div>
      </form> : <article className="practice-card">
        <div className="practice-card-meta">
          <span className="practice-company-label">
            <span className="practice-record-company">{companyLabel(activeNote)}</span>
            {activeNote.related_project && <span>{activeNote.related_project}</span>}
          </span>
          <IconButton aria-label="질문 관리" aria-haspopup="menu" aria-expanded={Boolean(menuAnchor)} onClick={event => setMenuAnchor(event.currentTarget)}><MoreHoriz /></IconButton>
        </div>
        <div className="practice-question"><h2 ref={practiceHeading} tabIndex={-1}>{activeNote.question}</h2></div>
        <div className="practice-primary-action"><div className="practice-answer-label"><span>나의 답변</span><span className={`practice-answer-state${activeHasAnswer ? ' is-written' : ''}`}>{activeHasAnswer ? '작성 완료' : '미작성'}</span></div><Button variant="outlined" startIcon={<EditOutlined />} disabled={Boolean(busy)} onClick={() => startEdit(activeNote)}>기록 수정</Button></div>
        {activeHasAnswer && <div className="practice-answer" id={`answer-${activeNote.id}`}><p>{activeNote.answer}</p></div>}
        {!activeHasAnswer && <p className="practice-answer-placeholder">아직 작성한 답변이 없어요.</p>}

      </article>}
    </section>
  </div> : <div className="panel practice-empty" ref={emptyResult} tabIndex={-1} role="region" aria-label="면접 질문 목록 결과">
    <Empty title={topic !== 'all' ? '이 주제의 질문이 없어요' : selectedCompany ? '이 회사의 질문이 없어요' : companyScope === 'common' ? '공통 질문이 없어요' : '질문이 없어요'}>
      {topic !== 'all' ? <Button onClick={() => setTopic('all')}>전체 주제 보기</Button> : <Button onClick={startNew}>질문 추가</Button>}
    </Empty>
  </div>)}
  </div>
  <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={() => setMenuAnchor(null)} slotProps={{ transition: { onExited: () => {
    if (pendingDelete.current) { setTarget(pendingDelete.current); pendingDelete.current = null; }
  } } }}>
    <MenuItem onClick={() => { pendingDelete.current = activeNote; setMenuAnchor(null); }}><DeleteOutline fontSize="small" />질문 삭제</MenuItem>
  </Menu>
  <Dialog className="record-editor-dialog" aria-labelledby="note-dialog-title" open={open && !editingId} onClose={requestClose} slotProps={{ transition: { onEntered: focusEditorField } }} fullWidth maxWidth="sm">
    <form onSubmit={submit} noValidate>
      <DialogTitle id="note-dialog-title">{editingId ? '면접 질문 수정' : '면접 질문 기록'}</DialogTitle>
      <DialogContent>
        {editorFields}
      </DialogContent>
      <DialogActions>
        <Button disabled={Boolean(busy)} onClick={requestClose}>취소</Button>
        <Button type="submit" variant="contained" disabled={Boolean(busy) || companiesLoading || Boolean(companiesError)}>{editingId ? '변경 저장' : '추가하기'}</Button>
      </DialogActions>
    </form>
  </Dialog>
  <Dialog open={confirmDiscard} onClose={continueDraft} disableRestoreFocus aria-labelledby="discard-note-title" aria-describedby="discard-note-description" fullWidth maxWidth="xs">
    <DialogTitle id="discard-note-title">작성 내용을 저장하지 않았어요</DialogTitle>
    <DialogContent><p id="discard-note-description">닫으면 이번에 작성하거나 수정한 내용이 사라져요.</p></DialogContent>
    <DialogActions>
      <Button autoFocus variant="contained" onClick={continueDraft}>계속 작성</Button>
      <Button variant="outlined" onClick={discardDraft}>저장하지 않고 닫기</Button>
    </DialogActions>
  </Dialog>
  <ConfirmDelete open={Boolean(target)} title={target?.question} busy={Boolean(busy)} onClose={() => setTarget(null)} onConfirm={deleteNote} />
  <ActionFeedback feedback={feedback} onClose={() => setFeedback(null)} />
</>;
}
