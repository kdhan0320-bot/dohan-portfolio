import Field from '../components/ui/Field';
import { useRef, useState } from 'react';
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
  const [confirmDiscard, setConfirmDiscard] = useState(false);
  const [editError, setEditError] = useState('');
  const [feedback, setFeedback] = useState(null);
  const editOriginal = useRef(null);
  const taskListRef = useRef(null);
  const done = items.filter(i => i.is_done).length;
  const scopedItems = items.filter(i => filter === '전체' || i.category === filter);
  const scopedDone = scopedItems.filter(i => i.is_done).length;
  const filtered = scopedItems.filter(i => tab === 'all' || i.is_done === (tab === 'done'));
  const editDirty = Boolean(editing && editOriginal.current && (
    editing.title !== editOriginal.current.title || editing.category !== editOriginal.current.category
  ));
  function closeEdit() {
    if (busy) return;
    if (editDirty) setConfirmDiscard(true);
    else setEditing(null);
  }
  async function action(key, fn, message) {
    setBusy(key);
    try {
      await fn();
      if (message) setFeedback({
        message
      });
      return true;
    } catch (e) {
      setFeedback({
        severity: 'error',
        message: e.message
      });
      return false;
    } finally {
      setBusy('');
    }
  }
  async function toggleTask(item, checked) {
    if (busy) return;
    const index = filtered.findIndex(i => i.id === item.id);
    const nextId = tab === 'all' ? item.id : (filtered[index + 1]?.id ?? filtered[index - 1]?.id);
    const saved = await action(item.id, () => toggle(item.id, checked), checked ? '할 일을 완료했어요.' : '완료를 취소했어요.');
    if (saved) window.requestAnimationFrame(() => {
      const nextInput = nextId ? document.getElementById(`task-check-${nextId}`) : null;
      if (nextInput) nextInput.focus();
      else taskListRef.current?.focus({ preventScroll: true });
    });
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
    <aside className="preparation-summary" aria-label="전체 할 일의 진행도와 분류">
      <CompletionRing completed={done} total={items.length} />
      <p className="preparation-count">전체 <strong>{done}</strong> / {items.length}개 완료</p>
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
    <section className="preparation-tasks" aria-label={`${filter} 분류의 할 일 목록`}>
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
      <Tabs value={tab} onChange={(_, v) => setTab(v)} aria-label={`${filter} 분류의 할 일 상태`}>
        <Tab value="todo" label={`진행 중 ${scopedItems.length - scopedDone}`} />
        <Tab value="done" label={`완료 ${scopedDone}`} />
        <Tab value="all" label={`전체 ${scopedItems.length}`} />
      </Tabs>
    </div>
    <div className="task-collection" ref={taskListRef} role="region" tabIndex={-1} aria-label={`${filter} · ${tab === 'todo' ? '진행 중' : tab === 'done' ? '완료' : '전체'} ${filtered.length}개`}>
      {filtered.map(i => <div className={`list-task ${i.is_done ? 'done' : ''}`} key={i.id}>
        <Checkbox checked={i.is_done} disabled={Boolean(busy)} onChange={e => toggleTask(i, e.target.checked)} slotProps={{
            input: {
              id: `task-check-${i.id}`,
              'aria-label': `${i.title} ${i.is_done ? '완료 취소' : '완료'}`
            }
          }} />
        <span className="task-copy"><span className="task-category">{i.category}</span><span className="task-text">{i.title}</span></span>
        <span className="task-tools">
        <IconButton aria-label={`${i.title} 수정`} disabled={Boolean(busy)} onClick={() => { editOriginal.current = { title: i.title, category: i.category }; setEditing({ ...i }); setEditError(''); setConfirmDiscard(false); }}><EditOutlined fontSize="small" /></IconButton>
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
  <Dialog open={Boolean(editing)} onClose={closeEdit} aria-labelledby="edit-task-dialog-title" fullWidth maxWidth="sm">
    <form onSubmit={saveEdit} noValidate>
      <DialogTitle id="edit-task-dialog-title">할 일 수정</DialogTitle>
      <DialogContent><div className="field-stack" style={{ paddingTop: 12 }}>
        {editError && <Alert severity="error">{editError}</Alert>}
        <Field id="edit-task-title" label="할 일" required autoFocus value={editing?.title ?? ''} disabled={Boolean(busy)} onChange={e => setEditing({ ...editing, title: e.target.value })} />
        <Field label="분류" select value={editing?.category ?? '서류'} disabled={Boolean(busy)} onChange={e => setEditing({ ...editing, category: e.target.value })}>
          {CHECKLIST_CATEGORIES.map(c => <MenuItem value={c} key={c}>{c}</MenuItem>)}
        </Field>
      </div></DialogContent>
      <DialogActions><Button disabled={Boolean(busy)} onClick={closeEdit}>취소</Button><Button type="submit" variant="contained" disabled={Boolean(busy)}>수정 저장</Button></DialogActions>
    </form>
  </Dialog>
  <Dialog open={confirmDiscard} onClose={() => setConfirmDiscard(false)} aria-labelledby="discard-task-title" aria-describedby="discard-task-description" fullWidth maxWidth="xs">
    <DialogTitle id="discard-task-title">수정 내용을 저장하지 않았어요</DialogTitle>
    <DialogContent><p id="discard-task-description">닫으면 방금 수정한 내용이 사라집니다.</p></DialogContent>
    <DialogActions><Button autoFocus onClick={() => setConfirmDiscard(false)}>계속 수정</Button><Button onClick={() => { setConfirmDiscard(false); setEditing(null); }}>저장하지 않고 닫기</Button></DialogActions>
  </Dialog>
  <ConfirmDelete open={Boolean(target)} title={target?.title} busy={Boolean(busy)} onClose={() => setTarget(null)} onConfirm={() => action('delete', async () => {
      await remove(target.id);
      setTarget(null);
    }, '할 일을 삭제했어요.')} />
  <ActionFeedback feedback={feedback} onClose={() => setFeedback(null)} />
</>;
}
