import Field from '../components/ui/Field';
import { useState } from 'react';
import { Button, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Tabs, Tab, IconButton, Alert } from '@mui/material';
import Add from '@mui/icons-material/Add';
import DeleteOutline from '@mui/icons-material/DeleteOutlined';
import EditOutlined from '@mui/icons-material/EditOutlined';
import Check from '@mui/icons-material/Check';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import VisibilityOffOutlined from '@mui/icons-material/VisibilityOffOutlined';
import useInterviewNotes from '../hooks/useInterviewNotes';
import { PageHeading, LoadState, Empty, ConfirmDelete } from '../components/ui/PageUI';
import ActionFeedback from '../components/ui/ActionFeedback';
const INITIAL = {
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
  const [tab, setTab] = useState('todo');
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(INITIAL);
  const [formError, setFormError] = useState('');
  const [revealed, setRevealed] = useState({});
  const [busy, setBusy] = useState('');
  const [target, setTarget] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [activeId, setActiveId] = useState(null);
  const done = notes.filter(n => n.is_reviewed).length;
  const filtered = notes.filter(n => tab === 'all' || n.is_reviewed === (tab === 'done'));
  const activeNote = filtered.find(n => n.id === activeId) || filtered[0];
  const activeIndex = filtered.findIndex(n => n.id === activeNote?.id);
  function startNew() {
    setEditingId(null); setForm(INITIAL); setFormError(''); setOpen(true);
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
    if (busy) return;
    if (!form.question.trim() || !form.answer.trim()) {
      setFormError('질문과 답변을 모두 입력해주세요.');
      document.getElementById(!form.question.trim() ? 'note-question' : 'note-answer')?.focus();
      return;
    }
    setBusy(editingId ? 'edit' : 'add');
    setFormError('');
    try {
      const payload = {
        ...form,
        question: form.question.trim(),
        answer: form.answer.trim(),
        related_project: form.related_project.trim()
      };
      if (editingId) await update(editingId, payload);
      else await add(payload);
      setOpen(false);
      setForm(INITIAL);
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
    <Button variant="contained" startIcon={<Add />} onClick={startNew}>질문 추가</Button>
  </PageHeading>
  <div className="tabs-row">
    <Tabs value={tab} onChange={(_, v) => { setTab(v); setActiveId(null); }} aria-label="복습 상태">
      <Tab value="todo" label={`복습할 질문 ${notes.length - done}`} />
      <Tab value="done" label={`복습 완료 ${done}`} />
      <Tab value="all" label="전체" />
    </Tabs>
  </div>
  <LoadState loading={loading} error={error} retry={refresh} />
  {!loading && !error && (activeNote ? <div className="interview-workspace">
    <nav className="question-queue" aria-label="연습할 질문 선택">
      <div className="question-queue-heading"><span>질문 갈피</span><span>{filtered.length}개</span></div>
      <ol>
        {filtered.map((n, i) => <li key={n.id}>
          <button type="button" className="question-index" aria-current={n.id === activeNote.id ? 'true' : undefined} onClick={() => setActiveId(n.id)}>
            <span className="question-index-number" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
            <span><small>{n.related_project || '일반 질문'}</small><strong>{n.question}</strong></span>
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
        <div className="practice-card-meta"><span>{activeNote.related_project || '일반 질문'}</span><span>중요도 {activeNote.importance}</span></div>
        <span className="practice-question-mark" aria-hidden="true">Q.</span>
        <h2>{activeNote.question}</h2>
        {revealed[activeNote.id] ? <div className="practice-answer" id={`answer-${activeNote.id}`}><span>나의 답변</span><p>{activeNote.answer}</p></div> : <div className="practice-answer-hidden"><VisibilityOffOutlined aria-hidden="true" fontSize="small" /><span>답변을 가렸어요</span></div>}
        <Button className="practice-reveal" variant="outlined" aria-expanded={Boolean(revealed[activeNote.id])} aria-controls={revealed[activeNote.id] ? `answer-${activeNote.id}` : undefined} onClick={() => setRevealed(prev => ({ ...prev, [activeNote.id]: !prev[activeNote.id] }))}>
          {revealed[activeNote.id] ? '답변 접기' : '답변 펼치기'}
        </Button>
      </article>
      <div className="practice-toolbar">
        <div>
          <IconButton aria-label={`${activeNote.question} 수정`} disabled={Boolean(busy)} onClick={() => { setEditingId(activeNote.id); setForm({ ...INITIAL, ...activeNote }); setFormError(''); setOpen(true); }}><EditOutlined fontSize="small" /></IconButton>
          <IconButton aria-label={`${activeNote.question} 삭제`} disabled={Boolean(busy)} onClick={() => setTarget(activeNote)}><DeleteOutline fontSize="small" /></IconButton>
        </div>
        <Button variant={activeNote.is_reviewed ? 'outlined' : 'contained'} startIcon={<Check />} disabled={Boolean(busy)} onClick={() => review(activeNote)}>{activeNote.is_reviewed ? '복습 취소' : '복습 완료'}</Button>
      </div>
    </section>
  </div> : <div className="panel practice-empty">
    <Empty title={tab === 'todo' && notes.length ? '지금까지의 질문을 모두 복습했어요' : tab === 'done' ? '아직 복습을 완료한 질문이 없어요' : '아직 질문이 없어요'}>
      {notes.length > 0 && <Button onClick={() => setTab('all')}>전체 질문 보기</Button>}
      <Button onClick={startNew}>새 질문 기록하기</Button>
    </Empty>
  </div>)}
  <Dialog aria-labelledby="note-dialog-title" open={open} onClose={busy ? undefined : () => setOpen(false)} fullWidth maxWidth="sm">
    <form onSubmit={submit} noValidate>
      <DialogTitle id="note-dialog-title">{editingId ? '면접 질문 수정' : '면접 질문 기록'}</DialogTitle>
      <DialogContent>
        <div className="field-stack" style={{
            paddingTop: 12
          }}>
          {formError && <Alert severity="error">
            {formError}
          </Alert>}
          <Field id="note-question" disabled={Boolean(busy)} autoFocus label="질문" required value={form.question} onChange={e => setForm({
              ...form,
              question: e.target.value
            })} />
          <Field id="note-answer" disabled={Boolean(busy)} label="나의 답변" required multiline minRows={5} value={form.answer} onChange={e => setForm({
              ...form,
              answer: e.target.value
            })} />
          <Field disabled={Boolean(busy)} label="관련 프로젝트 또는 주제" value={form.related_project} onChange={e => setForm({
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
        <Button disabled={Boolean(busy)} onClick={() => setOpen(false)}>취소</Button>
        <Button type="submit" variant="contained" disabled={Boolean(busy)}>{editingId ? '수정 저장' : '질문 저장'}</Button>
      </DialogActions>
    </form>
  </Dialog>
  <ConfirmDelete open={Boolean(target)} title={target?.question} busy={Boolean(busy)} onClose={() => setTarget(null)} onConfirm={deleteNote} />
  <ActionFeedback feedback={feedback} onClose={() => setFeedback(null)} />
</>;
}
