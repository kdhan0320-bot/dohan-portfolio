import Field from '../components/ui/Field';
import { useState } from 'react';
import { Button, Checkbox, MenuItem, Tabs, Tab, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Alert } from '@mui/material';
import Add from '@mui/icons-material/Add';
import DeleteOutline from '@mui/icons-material/DeleteOutlined';
import EditOutlined from '@mui/icons-material/EditOutlined';
import useChecklist from '../hooks/useChecklist';
import { CHECKLIST_CATEGORIES } from '../constants';
import { PageHeading, LoadState, Empty, ConfirmDelete } from '../components/ui/PageUI';
import ActionFeedback from '../components/ui/ActionFeedback';
import CompletionRing from '../components/ui/CompletionRing';
export default function ChecklistPage() {
  const {
    items,
    loading,
    error,
    refresh,
    toggle,
    add,
    update,
    remove
  } = useChecklist();
  const [tab, setTab] = useState('todo');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('서류');
  const [filter, setFilter] = useState('전체');
  const [inputError, setInputError] = useState('');
  const [busy, setBusy] = useState('');
  const [target, setTarget] = useState(null);
  const [editing, setEditing] = useState(null);
  const [editError, setEditError] = useState('');
  const [feedback, setFeedback] = useState(null);
  const done = items.filter(i => i.is_done).length;
  const filtered = items.filter(i => (tab === 'all' || i.is_done === (tab === 'done')) && (filter === '전체' || i.category === filter));
  async function action(key, fn, message) {
    setBusy(key);
    try {
      await fn();
      if (message) setFeedback({
        message
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
    if (!title.trim()) {
      setInputError('준비할 일을 입력해주세요.');
      document.getElementById('task-title')?.focus();
      return;
    }
    await action('add', async () => {
      await add(title.trim(), category);
      setTitle('');
      setTab('todo');
      setFilter('전체');
    }, '새 할 일을 추가했어요.');
  }
  async function saveEdit(e) {
    e.preventDefault();
    if (busy || !editing) return;
    if (!editing.title.trim()) {
      setEditError('준비할 일을 입력해주세요.');
      document.getElementById('edit-task-title')?.focus();
      return;
    }
    setBusy('edit'); setEditError('');
    try {
      await update(editing.id, editing);
      setEditing(null); setFilter('전체');
      setFeedback({ message: '할 일을 수정했어요.' });
    } catch (e) { setEditError(e.message); }
    finally { setBusy(''); }
  }
  return <>
  <PageHeading art="check" title="준비 체크" description="한 가지씩, 준비를 채워가요." />
  <LoadState loading={loading} error={error} retry={refresh} />
  {!loading && !error && <div className="checklist-workspace">
    <aside className="preparation-summary" aria-label="준비 진행도와 분류">
      <CompletionRing completed={done} total={items.length} />
      <p className="preparation-count"><strong>{done}</strong> / {items.length}개 완료</p>
      <div className="preparation-filters" aria-label="할 일 분류">
        <button type="button" aria-pressed={filter === '전체'} onClick={() => setFilter('전체')} className="category-filter category-all"><span>전체 분류</span><b>{items.length}</b></button>
        {CHECKLIST_CATEGORIES.map(c => {
          const categoryItems = items.filter(i => i.category === c);
          const categoryDone = categoryItems.filter(i => i.is_done).length;
          return <button type="button" className="category-filter" aria-pressed={filter === c} aria-label={categoryItems.length ? `${c}, ${categoryItems.length}개 중 ${categoryDone}개 완료` : `${c}, 등록한 일 없음`} key={c} onClick={() => setFilter(c)}>
            <span>{c}</span><small>{categoryItems.length ? `${categoryDone} / ${categoryItems.length}` : '등록 없음'}</small>
            {categoryItems.length > 0 && <span className="category-meter" aria-hidden="true"><i style={{ width: `${categoryDone / categoryItems.length * 100}%` }} /></span>}
          </button>;
        })}
      </div>
    </aside>
    <section className="preparation-tasks" aria-label="할 일 목록">
    <form className="add-task" onSubmit={submit} noValidate>
      <Field id="task-title" label="할 일" size="small" value={title} onChange={e => {
          setTitle(e.target.value);
          setInputError('');
        }} error={Boolean(inputError)} helperText={inputError} placeholder="예: 자기소개서 마지막 문단 다듬기" disabled={busy === 'add'} />
      <Field label="분류" select size="small" value={category} onChange={e => setCategory(e.target.value)}>
        {CHECKLIST_CATEGORIES.map(c => <MenuItem key={c} value={c}>
          {c}
        </MenuItem>)}
      </Field>
      <Button type="submit" variant="contained" startIcon={<Add />} disabled={Boolean(busy)}>추가</Button>
    </form>
    <div className="tabs-row">
      <Tabs value={tab} onChange={(_, v) => setTab(v)} aria-label="할 일 상태">
        <Tab value="todo" label={`진행 중 ${items.length - done}`} />
        <Tab value="done" label={`완료 ${done}`} />
        <Tab value="all" label="전체" />
      </Tabs>
    </div>
    <div className="task-collection" aria-label={`${filter} · ${filtered.length}개`}>
      {filtered.map(i => <div className={`list-task ${i.is_done ? 'done' : ''}`} key={i.id}>
        <Checkbox checked={i.is_done} disabled={Boolean(busy)} onChange={e => action(i.id, () => toggle(i.id, e.target.checked))} slotProps={{
            input: {
              'aria-label': `${i.title} ${i.is_done ? '완료 취소' : '완료'}`
            }
          }} />
        <span className="task-copy"><span className="task-category">{i.category}</span><span className="task-text">{i.title}</span></span>
        <span className="task-tools">
        <IconButton aria-label={`${i.title} 수정`} disabled={Boolean(busy)} onClick={() => { setEditing({ ...i }); setEditError(''); }}><EditOutlined fontSize="small" /></IconButton>
        <IconButton aria-label={`${i.title} 삭제`} onClick={() => setTarget(i)} disabled={Boolean(busy)}>
          <DeleteOutline fontSize="small" />
        </IconButton>
        </span>
      </div>)}
      {!filtered.length && <Empty title={tab === 'done' ? '아직 완료한 일이 없어요' : '이 목록은 비어 있어요'}>
        {filter !== '전체' ? <Button onClick={() => setFilter('전체')}>전체 분류 보기</Button> : <Button onClick={() => document.getElementById('task-title')?.focus()}>할 일 추가하기</Button>}
      </Empty>}
    </div>
    </section>
  </div>}
  <Dialog open={Boolean(editing)} onClose={busy ? undefined : () => setEditing(null)} aria-labelledby="edit-task-dialog-title" fullWidth maxWidth="sm">
    <form onSubmit={saveEdit} noValidate>
      <DialogTitle id="edit-task-dialog-title">할 일 수정</DialogTitle>
      <DialogContent><div className="field-stack" style={{ paddingTop: 12 }}>
        {editError && <Alert severity="error">{editError}</Alert>}
        <Field id="edit-task-title" label="할 일" required autoFocus value={editing?.title ?? ''} disabled={Boolean(busy)} onChange={e => setEditing({ ...editing, title: e.target.value })} />
        <Field label="분류" select value={editing?.category ?? '서류'} disabled={Boolean(busy)} onChange={e => setEditing({ ...editing, category: e.target.value })}>
          {CHECKLIST_CATEGORIES.map(c => <MenuItem value={c} key={c}>{c}</MenuItem>)}
        </Field>
      </div></DialogContent>
      <DialogActions><Button disabled={Boolean(busy)} onClick={() => setEditing(null)}>취소</Button><Button type="submit" variant="contained" disabled={Boolean(busy)}>수정 저장</Button></DialogActions>
    </form>
  </Dialog>
  <ConfirmDelete open={Boolean(target)} title={target?.title} busy={Boolean(busy)} onClose={() => setTarget(null)} onConfirm={() => action('delete', async () => {
      await remove(target.id);
      setTarget(null);
    }, '할 일을 삭제했어요.')} />
  <ActionFeedback feedback={feedback} onClose={() => setFeedback(null)} />
</>;
}
