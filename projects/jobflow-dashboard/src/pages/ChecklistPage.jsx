import Field from '../components/ui/Field';
import { useState } from 'react';
import { Button, Checkbox, MenuItem, Tabs, Tab, IconButton } from '@mui/material';
import Add from '@mui/icons-material/Add';
import DeleteOutline from '@mui/icons-material/DeleteOutlined';
import useChecklist from '../hooks/useChecklist';
import { CHECKLIST_CATEGORIES } from '../constants';
import { PageHeading, LoadState, Empty, ConfirmDelete } from '../components/ui/PageUI';
import ActionFeedback from '../components/ui/ActionFeedback';
export default function ChecklistPage() {
  const {
    items,
    loading,
    error,
    refresh,
    toggle,
    add,
    remove
  } = useChecklist();
  const [tab, setTab] = useState('todo');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('서류');
  const [filter, setFilter] = useState('전체');
  const [inputError, setInputError] = useState('');
  const [busy, setBusy] = useState('');
  const [target, setTarget] = useState(null);
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
  return <>
  <PageHeading title="준비 체크" description={`완료 ${done} / 전체 ${items.length}`} />
  <LoadState loading={loading} error={error} retry={refresh} />
  {!loading && !error && <>
    <form className="add-task" onSubmit={submit} noValidate>
      <Field id="task-title" label="할 일" size="small" value={title} onChange={e => {
          setTitle(e.target.value);
          setInputError('');
        }} error={Boolean(inputError)} helperText={inputError} placeholder="예: 자기소개서 마지막 문단 다듬기" disabled={busy === 'add'} />
      <Field label="분류" select size="small" value={category} onChange={e => setCategory(e.target.value)} sx={{
          minWidth: 125
        }}>
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
      <Field label="분류 필터" select size="small" value={filter} onChange={e => setFilter(e.target.value)} sx={{
          minWidth: 130,
          mb: 1
        }}>
        <MenuItem value="전체">전체 분류</MenuItem>
        {CHECKLIST_CATEGORIES.map(c => <MenuItem key={c} value={c}>
          {c}
        </MenuItem>)}
      </Field>
    </div>
    <div className="panel">
      {filtered.map(i => <div className={`list-task ${i.is_done ? 'done' : ''}`} key={i.id}>
        <Checkbox checked={i.is_done} disabled={Boolean(busy)} onChange={e => action(i.id, () => toggle(i.id, e.target.checked))} slotProps={{
            input: {
              'aria-label': `${i.title} ${i.is_done ? '완료 취소' : '완료'}`
            }
          }} />
        <span className="task-text">
          {i.title}
        </span>
        <span className="task-category">
          {i.category}
        </span>
        <IconButton aria-label={`${i.title} 삭제`} onClick={() => setTarget(i)} disabled={Boolean(busy)}>
          <DeleteOutline fontSize="small" />
        </IconButton>
      </div>)}
      {!filtered.length && <Empty title={tab === 'done' ? '아직 완료한 일이 없어요' : '이 목록은 비어 있어요'}>
        <p>분류를 바꾸거나 새로운 할 일을 추가해보세요.</p>
      </Empty>}
    </div>
  </>}
  <ConfirmDelete open={Boolean(target)} title={target?.title} busy={Boolean(busy)} onClose={() => setTarget(null)} onConfirm={() => action('delete', async () => {
      await remove(target.id);
      setTarget(null);
    }, '할 일을 삭제했어요.')} />
  <ActionFeedback feedback={feedback} onClose={() => setFeedback(null)} />
</>;
}
