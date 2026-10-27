import Field from '../components/ui/Field';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Alert, Menu } from '@mui/material';
import Add from '@mui/icons-material/Add';
import DeleteOutline from '@mui/icons-material/DeleteOutlined';
import EditOutlined from '@mui/icons-material/EditOutlined';
import MoreHoriz from '@mui/icons-material/MoreHoriz';
import useInterviewNotes from '../hooks/useInterviewNotes';
import useApplications from '../hooks/useApplications';
import useRecordDraft from '../hooks/useRecordDraft';
import { PageHeading, LoadState, Empty, ConfirmDelete } from '../components/ui/PageUI';
import ActionFeedback from '../components/ui/ActionFeedback';
import { revealTextareaCaret } from '../utils/textareaCaret';
import '../styles/company-interview.css';
const INITIAL = {
  application_id: null,
  question: '',
  answer: '',
  related_project: '',
  importance: '보통',
  is_reviewed: false
};
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
  const companyScoped = companyScope !== 'all' && companyScope !== 'common';
  const missingCompany = companyScoped && !selectedCompany;
  const pageLoading = loading || companiesLoading;
  const pageError = error || companiesError;
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editSection, setEditSection] = useState('answer');
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
  const pendingEdit = useRef(null);
  const emptyResult = useRef(null);
  const pendingResultFocus = useRef(false);
  const [validationTarget, setValidationTarget] = useState(null);
  const answerInput = useRef(null);
  useLayoutEffect(() => {
    const input = answerInput.current;
    if (!open || !editingId || !input) return;
    const fields = input.closest('.field-stack');
    let width = input.clientWidth;
    const fitAnswer = () => {
      const scrollTop = fields?.scrollTop || 0;
      input.style.height = 'auto';
      input.style.height = `${input.scrollHeight}px`;
      if (fields) fields.scrollTop = scrollTop;
      revealMobileEditor(input.closest('.inline-answer-editor'));
    };
    fitAnswer();
    // Measure the visible input itself so its actual wrapping and height stay
    // in sync when the available width changes.
    const observer = window.ResizeObserver && new window.ResizeObserver(() => {
      if (input.clientWidth !== width) {
        width = input.clientWidth;
        fitAnswer();
      }
    });
    observer?.observe(input);
    return () => observer?.disconnect();
  }, [open, editingId, form.answer]);
  useEffect(() => {
    if (busy || pageLoading || !pendingResultFocus.current) return;
    pendingResultFocus.current = false;
    // Wait until the record and any delete dialog have released their focus.
    const frame = window.requestAnimationFrame(() => {
      (practiceHeading.current || emptyResult.current)?.focus({ preventScroll: true });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [busy, notes, open, pageLoading]);
  const scopedNotes = notes.filter(note => companyScope === 'all' || (companyScope === 'common' ? !note.application_id : note.application_id === companyScope));
  const filtered = scopedNotes;
  const activeNote = filtered.find(n => n.id === activeId) || filtered[0];
  const activeHasAnswer = Boolean(activeNote?.answer?.trim());
  const activeIndex = filtered.findIndex(n => n.id === activeNote?.id);
  useEffect(() => {
    if (!open || !editingId || editSection !== 'answer') return;
    const answer = document.getElementById('note-answer');
    answer?.focus({ preventScroll: true });
    const editor = answer?.closest('form');
    let frame;
    const fields = editor?.querySelector('.field-stack');
    let opening = true;
    const revealActions = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        revealMobileEditor(editor);
        // The editor can briefly measure only its padding while styles and
        // focus settle. Do not scroll against that provisional height. Start
        // with the label and first line; later resizes follow the current caret.
        if (opening && fields) {
          const label = editor.querySelector('#note-answer-label');
          const lineHeight = parseFloat(window.getComputedStyle(answer).lineHeight) || 28;
          if (fields.clientHeight < (label?.offsetHeight || 0) + lineHeight + 24) return;
          fields.scrollTop = 0;
          opening = false;
        }
        revealTextareaCaret(answer, fields);
      });
    };
    revealActions();
    // A short answer can grow after opening. React only to a change in editor
    // height, so typing within the bounded area does not keep moving the page.
    const observer = window.ResizeObserver && new window.ResizeObserver(revealActions);
    if (editor) observer?.observe(editor);
    if (fields) observer?.observe(fields);
    window.visualViewport?.addEventListener('resize', revealActions);
    window.addEventListener('resize', revealActions);
    return () => {
      observer?.disconnect();
      window.cancelAnimationFrame(frame);
      window.visualViewport?.removeEventListener('resize', revealActions);
      window.removeEventListener('resize', revealActions);
    };
  }, [open, editingId, editSection]);
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
  function startEdit(note, section = 'answer') {
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
    openEditor(note.id, recovered?.values || draft, recovered?.baseline || draft, Boolean(recovered), note.id, section);
  }
  function openEditor(id, values, baseline, recovered, draftKey = id || 'new', section) {
    const nextSection = section || (id && ['question', 'application_id', 'related_project'].some(key => values[key] !== baseline[key]) ? 'details' : 'answer');
    if (id) { setActiveId(id); if (companyScope !== 'all' && (values.application_id || 'common') !== companyScope) selectCompany(values.application_id || 'common'); }
    setDraftId(draftKey);
    setEditSection(nextSection);
    setEditingId(id); setForm(values); setOriginalForm(baseline); setRestored(recovered);
    setConfirmDiscard(false); setFormError(''); setValidationTarget(id && nextSection === 'details' ? { fieldId: 'note-question' } : null); setFeedback(null); setOpen(true);
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
    window.requestAnimationFrame(() => document.getElementById(editSection === 'details' ? 'note-question' : 'note-answer')?.focus({ preventScroll: true }));
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
      setForm(INITIAL);
      // Keep the saved question in view when its company changes while filtered.
      if (companyScope !== 'all' && (payload.application_id || 'common') !== companyScope) selectCompany(payload.application_id || 'common');
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
  const companyFields = <>
    <Field id="note-company" disabled={Boolean(busy) || companiesLoading || Boolean(companiesError)} select label="지원 회사" value={form.application_id || ''} slotProps={{ select: { displayEmpty: true } }} onChange={event => changeForm({ ...form, application_id: event.target.value || null })}>
      <MenuItem value="">공통 질문 · 회사 연결 안 함</MenuItem>
      {form.application_id && !companyMap.has(form.application_id) && <MenuItem value={form.application_id} disabled>연결한 회사 없음 · 다시 선택해주세요</MenuItem>}
      {applications.map(company => <MenuItem className="interview-company-option" key={company.id} value={company.id}>{company.company_name} · {company.position || '직무 미입력'}</MenuItem>)}
    </Field>
    <Field label="관련 프로젝트 또는 주제 (선택)" disabled={Boolean(busy)} value={form.related_project} onChange={event => changeForm({ ...form, related_project: event.target.value })} />
  </>;
  const editorFields = <div className="field-stack">
    {!editingId && formError && <Alert severity="error">{formError}</Alert>}
    {restored && <Alert severity="info">작성 내용을 복원했어요. 저장하면 반영됩니다.</Alert>}
    {editingId && editSection === 'details' ? <>{questionField}{companyFields}</> : <>
    {!editingId && questionField}
    {answerField}
    <details className="interview-question-details">
      <summary>{editingId ? '질문·회사 정보' : '회사·추가 정보 (선택)'}</summary>
      <div className="field-stack">
        {editingId && questionField}
        {companyFields}
      </div>
    </details>
    </>}
  </div>;
  return <>
  <div className="interview-page">
  <PageHeading art="chat" title="면접 연습" description="질문과 내 답변을 함께 읽고 다듬어요.">
    <Button variant="contained" startIcon={<Add />} onClick={startNew} disabled={open || pageLoading || Boolean(pageError) || missingCompany}>질문 추가</Button>
  </PageHeading>
  {drafts.pending && !open && <Alert className="record-draft-notice" severity="info" action={<Button color="inherit" disabled={pageLoading || Boolean(pageError)} onClick={resumeDraft}>이어서 작성</Button>}>저장하지 않은 면접 기록이 있어요. 현재 탭에서 이어서 작성할 수 있어요.</Alert>}
  <div className="interview-controls">
    <div className="interview-company-filter">
      <Field id="interview-company-scope" select size="small" label="질문 범위" value={companyScope} disabled={companiesLoading || Boolean(companiesError) || open} onChange={event => selectCompany(event.target.value)}>
        <MenuItem value="all">전체 회사 · 공통 질문</MenuItem>
        <MenuItem value="common">공통 질문</MenuItem>
        {missingCompany && <MenuItem value={companyScope} disabled>{companiesLoading ? '회사 확인 중' : '찾을 수 없는 회사'}</MenuItem>}
        {applications.map(company => <MenuItem className="interview-company-option" key={company.id} value={company.id}>{company.company_name} · {company.position || '직무 미입력'}</MenuItem>)}
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
            <span>{companyScope === 'all' && <small>{companyLabel(n)}</small>}<strong>{n.question}</strong>{!n.answer?.trim() && <span className="question-draft-label">답변 준비 전</span>}</span>

          </button>
        </li>)}
      </ol>
    </nav>
    <section className="practice-desk" aria-label="면접 질문 연습">
      <div className="practice-navigation">
      <Field className="mobile-question-select" id="interview-question-select" label="연습할 질문" select size="small" value={activeNote.id} disabled={open} onChange={event => setActiveId(event.target.value)} slotProps={{ select: { renderValue: () => `${activeIndex + 1}. ${activeNote.question}` } }}>
        {filtered.map((note, index) => <MenuItem className="interview-question-option" key={note.id} value={note.id}>{index + 1}. {companyScope === 'all' ? `${companyLabel(note)} · ` : ''}{note.question}{!note.answer?.trim() ? ' · 답변 준비 전' : ''}</MenuItem>)}
      </Field>
      <div className="practice-pagination">
        <span aria-live="polite">질문 <strong>{activeIndex + 1}</strong> / {filtered.length}</span>

      </div>
      </div>
      {open && editingId ? <form className="practice-card inline-answer-editor" onSubmit={submit} noValidate aria-label={editSection === 'details' ? '질문·회사 정보 수정' : '면접 답변 작성'} onFocusCapture={event => {
        if (event.target.closest('.inline-editor-actions')) return;
        const editor = event.currentTarget;
        window.requestAnimationFrame(() => { if (editor.contains(document.activeElement)) revealMobileEditor(editor); });
      }} onKeyUp={event => {
        // Native caret navigation can scroll the document as well as the fields.
        // Keep the actions above the mobile navigation after that default action.
        if (event.target.tagName === 'TEXTAREA') revealMobileEditor(event.currentTarget);
      }}>
        <h2>{editSection === 'details' ? '질문·회사 정보 수정' : originalForm.question}</h2>{formError && <Alert className="inline-editor-error" severity="error">{formError}</Alert>}{editorFields}<div className="inline-editor-actions"><Button disabled={Boolean(busy)} onClick={requestClose}>취소</Button><Button variant="contained" type="submit" disabled={Boolean(busy) || companiesLoading || Boolean(companiesError)}>{busy ? '저장 중…' : '변경 저장'}</Button></div>
      </form> : <article className="practice-card">
        <div className="practice-card-meta">
          <span className="practice-company-label">
            {companyScope === 'all' && companyLabel(activeNote)}
            {activeNote.related_project && <span>{activeNote.related_project}</span>}
          </span>
          <IconButton aria-label="질문 관리" aria-haspopup="menu" aria-expanded={Boolean(menuAnchor)} onClick={event => setMenuAnchor(event.currentTarget)}><MoreHoriz /></IconButton>
        </div>
        <div className="practice-question"><h2 ref={practiceHeading} tabIndex={-1}>{activeNote.question}</h2></div>
        <div className="practice-primary-action"><div className="practice-answer-label"><span>나의 답변</span><span className="practice-answer-state">{activeHasAnswer ? '작성됨' : '작성 전'}</span></div><Button variant="outlined" startIcon={<EditOutlined />} disabled={Boolean(busy)} onClick={() => startEdit(activeNote)}>{activeHasAnswer ? '답변 수정' : '답변 작성'}</Button></div>
        {activeHasAnswer && <div className="practice-answer" id={`answer-${activeNote.id}`}><p>{activeNote.answer}</p></div>}
        {!activeHasAnswer && <p className="practice-answer-placeholder">아직 작성한 답변이 없어요.</p>}

      </article>}
    </section>
  </div> : <div className="panel practice-empty" ref={emptyResult} tabIndex={-1} role="region" aria-label="면접 질문 목록 결과">
    <Empty title={selectedCompany ? '이 회사의 첫 면접 질문을 기록해보세요' : companyScope === 'common' ? '아직 공통 질문이 없어요' : '아직 질문이 없어요'}>
      <Button onClick={startNew}>새 질문 기록하기</Button>
    </Empty>
  </div>)}
  </div>
  <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={() => setMenuAnchor(null)} slotProps={{ transition: { onExited: () => {
    if (pendingEdit.current) { startEdit(pendingEdit.current, 'details'); pendingEdit.current = null; }
    if (pendingDelete.current) { setTarget(pendingDelete.current); pendingDelete.current = null; }
  } } }}>
    <MenuItem onClick={() => { pendingEdit.current = activeNote; setMenuAnchor(null); }}><EditOutlined fontSize="small" />질문·회사 수정</MenuItem>
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
        <Button type="submit" variant="contained" disabled={Boolean(busy) || companiesLoading || Boolean(companiesError)}>{editingId ? '수정 저장' : '질문 저장'}</Button>
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
