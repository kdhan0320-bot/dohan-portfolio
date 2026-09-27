import Field from '../components/ui/Field';
import { useState } from 'react';
import { Button, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Tabs, Tab, IconButton, Alert } from '@mui/material';
import Add from '@mui/icons-material/Add';
import DeleteOutline from '@mui/icons-material/DeleteOutlined';
import EditOutlined from '@mui/icons-material/EditOutlined';
import Check from '@mui/icons-material/Check';
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
  const done = notes.filter(n => n.is_reviewed).length;
  const filtered = notes.filter(n => tab === 'all' || n.is_reviewed === (tab === 'done'));
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
      if (editingId) setRevealed(prev => ({ ...prev, [editingId]: true }));
      else setTab('todo');
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
  <PageHeading art="chat" title="면접 연습" description="답변을 보기 전에, 내 말로 먼저 떠올려보세요.">
    <Button variant="contained" startIcon={<Add />} onClick={() => {
        setEditingId(null);
        setForm(INITIAL);
        setOpen(true);
        setFormError('');
      }}>질문 추가</Button>
  </PageHeading>
  <div className="tabs-row">
    <Tabs value={tab} onChange={(_, v) => setTab(v)} aria-label="복습 상태">
      <Tab value="todo" label={`복습할 질문 ${notes.length - done}`} />
      <Tab value="done" label={`복습 완료 ${done}`} />
      <Tab value="all" label="전체" />
    </Tabs>
  </div>
  <LoadState loading={loading} error={error} retry={refresh} />
  {!loading && !error && <div className="notes-grid">
    {filtered.map((n, i) => <article className="panel note-card" key={n.id}>
      <div className="note-top">
        <span>Q{String(i + 1).padStart(2, '0')} · {n.related_project || '일반 질문'}</span>
        <span>중요도 {n.importance}</span>
      </div>
      <h2>
        {n.question}
      </h2>
      {revealed[n.id] && <p className="note-answer" id={`answer-${n.id}`}>
        {n.answer}
      </p>}
      <div className="note-actions">
        <Button variant="outlined" aria-expanded={Boolean(revealed[n.id])} aria-controls={revealed[n.id] ? `answer-${n.id}` : undefined} onClick={() => setRevealed(prev => ({
            ...prev,
            [n.id]: !prev[n.id]
          }))}>
          {revealed[n.id] ? '답변 접기' : '답변 펼치기'}
        </Button>
        <div>
          <IconButton aria-label={`${n.question} 수정`} disabled={Boolean(busy)} onClick={() => {
            setEditingId(n.id);
            setForm({ ...INITIAL, ...n });
            setFormError('');
            setOpen(true);
          }}><EditOutlined fontSize="small" /></IconButton>
          <Button startIcon={<Check />} disabled={Boolean(busy)} onClick={() => review(n)}>
            {n.is_reviewed ? '복습 취소' : '복습 완료'}
          </Button>
          <IconButton aria-label={`${n.question} 삭제`} disabled={Boolean(busy)} onClick={() => setTarget(n)}>
            <DeleteOutline fontSize="small" />
          </IconButton>
        </div>
      </div>
    </article>)}
    {!filtered.length && <div className="panel" style={{
        gridColumn: '1/-1'
      }}>
      <Empty title={tab === 'todo' && notes.length ? '지금까지의 질문을 모두 복습했어요' : '아직 질문이 없어요'}>
        <Button onClick={() => { setEditingId(null); setForm(INITIAL); setFormError(''); setOpen(true); }}>새 질문 기록하기</Button>
      </Empty>
    </div>}
  </div>}
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
          <Field id="note-question" autoFocus label="질문" required value={form.question} onChange={e => setForm({
              ...form,
              question: e.target.value
            })} />
          <Field id="note-answer" label="나의 답변" required multiline minRows={5} value={form.answer} onChange={e => setForm({
              ...form,
              answer: e.target.value
            })} />
          <Field label="관련 프로젝트 또는 주제" value={form.related_project} onChange={e => setForm({
              ...form,
              related_project: e.target.value
            })} />
          <Field select label="중요도" value={form.importance} onChange={e => setForm({
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
