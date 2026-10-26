import Field from '../components/ui/Field';
import { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button, Menu, MenuItem, Tabs, Tab, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Alert } from '@mui/material';
import Add from '@mui/icons-material/Add';
import DeleteOutline from '@mui/icons-material/DeleteOutlined';
import EditOutlined from '@mui/icons-material/EditOutlined';
import MoreHoriz from '@mui/icons-material/MoreHoriz';
import useChecklist from '../hooks/useChecklist';
import useApplications from '../hooks/useApplications';
import useRecordDraft from '../hooks/useRecordDraft';
import { CHECKLIST_CATEGORIES } from '../constants';
import { PageHeading, LoadState, Empty, ConfirmDelete } from '../components/ui/PageUI';
import PreparationItem from '../components/ui/PreparationItem';
import StatusChip from '../components/ui/StatusChip';
import { preparationGroups } from '../utils/preparationGroups';
import { shortDate } from '../utils/dates';
import ActionFeedback from '../components/ui/ActionFeedback';
import '../styles/company-checklist.css';

export default function ChecklistPage() {
  const drafts = useRecordDraft('checklist');
  const { items, loading, error, refresh, toggle, add, update, remove } = useChecklist();
  const { applications, loading: companiesLoading, error: companiesError, refresh: refreshCompanies } = useApplications();
  const [searchParams, setSearchParams] = useSearchParams();
  const companyScope = searchParams.get('company') || 'all';
  const selectedCompany = applications.find(company => company.id === companyScope);
  const missingCompany = companyScope !== 'all' && companyScope !== 'common' && !selectedCompany;
  const companyMap = new Map(applications.map(company => [company.id, company]));
  const companyOptions = [...applications].sort((a, b) => a.company_name.localeCompare(b.company_name, 'ko'));
  const [tab, setTab] = useState('todo');
  const [completedHere, setCompletedHere] = useState([]);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('서류');
  const [applicationId, setApplicationId] = useState(companyScope === 'all' || companyScope === 'common' ? '' : companyScope);
  const [filter, setFilter] = useState('전체');
  const [inputError, setInputError] = useState('');
  const [busy, setBusy] = useState('');
  const [target, setTarget] = useState(null);
  const [adding, setAdding] = useState(false);
  const [addDraftId, setAddDraftId] = useState('new');
  const [editing, setEditing] = useState(null);
  const [restored, setRestored] = useState(false);
  const [confirmDiscard, setConfirmDiscard] = useState('');
  const [editError, setEditError] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [taskMenu, setTaskMenu] = useState(null);
  const pendingTaskAction = useRef(null);
  const addOriginal = useRef(null);
  const editOriginal = useRef(null);
  const taskListRef = useRef(null);
  const dialogTriggerRef = useRef(null);
  const companyItems = items.filter(item => companyScope === 'all' || (companyScope === 'common' ? !item.application_id : item.application_id === companyScope));
  const scopedItems = companyItems.filter(item => filter === '전체' || item.category === filter);
  const scopedDone = scopedItems.filter(item => item.is_done).length;
  const filtered = scopedItems.filter(item => tab === 'all' || item.is_done === (tab === 'done') || (tab === 'todo' && completedHere.includes(item.id)));
  const scopeLabel = selectedCompany?.company_name || (companyScope === 'common' ? '공통 준비' : '전체 준비');
  const groups = preparationGroups(filtered, applications);
  const addDirty = Boolean(adding && addOriginal.current && (
    title !== addOriginal.current.title || category !== addOriginal.current.category ||
    (applicationId || null) !== addOriginal.current.application_id
  ));
  const editDirty = Boolean(editing && editOriginal.current && (
    editing.title !== editOriginal.current.title || editing.category !== editOriginal.current.category ||
    (editing.application_id || '') !== (editOriginal.current.application_id || '')
  ));

  useEffect(() => {
    setInputError('');
    setFilter('전체');
    setCompletedHere([]);
  }, [companyScope]);

  function setScope(value) {
    setSearchParams(previous => {
      const next = new URLSearchParams(previous);
      if (value === 'all') next.delete('company');
      else next.set('company', value);
      return next;
    });
  }
  function companyLabel(id) {
    const company = companyMap.get(id);
    return !id ? '공통 준비' : company ? `${company.company_name}${company.position ? ` · ${company.position}` : ''}` : '연결된 회사를 찾을 수 없어요';
  }
  function companyChoices(value) {
    return [
      <MenuItem key="common" value="">공통 준비</MenuItem>,
      ...(value && !companyMap.has(value) ? [<MenuItem key="missing" value={value} disabled>연결된 회사를 찾을 수 없어요</MenuItem>] : []),
      ...companyOptions.map(company => <MenuItem className="checklist-company-option" key={company.id} value={company.id}>{companyLabel(company.id)}</MenuItem>)
    ];
  }
  function restoreDialogFocus() {
    // Run after both the editor and any discard confirmation have unmounted.
    window.requestAnimationFrame(() => {
      const trigger = dialogTriggerRef.current;
      const fallback = document.getElementById('checklist-add-task');
      const destination = trigger?.isConnected && !trigger.disabled ? trigger : fallback;
      if (destination && !destination.disabled) destination.focus({ preventScroll: true });
    });
  }
  function openAdd(event, recoveredDraft) {
    dialogTriggerRef.current = event?.currentTarget || null;
    const initialCompany = companyScope === 'all' || companyScope === 'common' ? '' : companyScope;
    const initialCategory = filter === '전체' ? '서류' : filter;
    const recovered = recoveredDraft || drafts.read('new');
    const initial = { title: '', category: initialCategory, application_id: initialCompany || null };
    const values = recovered?.values || initial;
    setAddDraftId(recovered?.recordId || 'new');
    addOriginal.current = recovered?.baseline || initial;
    setTitle(values.title);
    setCategory(values.category);
    setApplicationId(values.application_id || '');
    setRestored(Boolean(recovered));
    setInputError('');
    setConfirmDiscard('');
    setAdding(true);
  }
  function changeNew(field, value) {
    const next = { title, category, application_id: applicationId || null, [field]: value };
    drafts.write(addDraftId, next, addOriginal.current);
    setTitle(next.title); setCategory(next.category); setApplicationId(next.application_id || '');
    setInputError('');
  }
  function openEdit(item, recovered = drafts.read(item.id)) {
    editOriginal.current = recovered?.baseline || { title: item.title, category: item.category, application_id: item.application_id || null };
    setEditing({ ...item, application_id: item.application_id || null, ...recovered?.values });
    setRestored(Boolean(recovered)); setEditError(''); setConfirmDiscard('');
  }
  function changeEdit(next) {
    drafts.write(editing.id, next, editOriginal.current);
    setEditing(next);
  }
  function resumeDraft(event) {
    const pending = drafts.pending;
    if (!pending) return;
    dialogTriggerRef.current = event.currentTarget;
    if (pending.recordId === 'new') openAdd(event, pending);
    else {
      const item = items.find(record => record.id === pending.recordId);
      if (item) openEdit(item, pending);
      else {
        const recovered = { ...pending, baseline: { title: '', category: '서류', application_id: null } };
        openAdd(event, recovered);
        setInputError('원래 항목을 찾을 수 없어 새 할 일로 열었어요. 내용을 확인해주세요.');
      }
    }
  }
  function discardDraft() {
    if (confirmDiscard === 'add') { drafts.clear(addDraftId); setAdding(false); }
    else { drafts.clear(editing.id); setEditing(null); }
    setConfirmDiscard('');
  }
  function closeAdd() {
    if (busy) return;
    if (addDirty) setConfirmDiscard('add');
    else setAdding(false);
  }
  function closeEdit() {
    if (busy) return;
    if (editDirty) setConfirmDiscard('edit');
    else setEditing(null);
  }
  function chooseTaskAction(type) {
    if (!taskMenu || busy) return;
    dialogTriggerRef.current = taskMenu.anchor;
    pendingTaskAction.current = { type, item: taskMenu.item };
    setTaskMenu(null);
  }
  function finishTaskMenuClose() {
    // Open the dialog after the menu has restored focus to its persistent trigger.
    const nextAction = pendingTaskAction.current;
    pendingTaskAction.current = null;
    if (!nextAction) return;
    const { item, type } = nextAction;
    if (type === 'delete') {
      setTarget(item);
      return;
    }
    openEdit(item);
  }
  async function action(key, fn, message) {
    setBusy(key);
    try {
      await fn();
      if (message) setFeedback({ message });
      return true;
    } catch (e) {
      setFeedback({ severity: 'error', message: e.message });
      return false;
    } finally {
      setBusy('');
    }
  }
  async function toggleTask(item, checked) {
    if (busy) return;
    const originalInput = document.getElementById(`task-check-${item.id}`);
    const keepFocus = document.activeElement === originalInput;
    const index = filtered.findIndex(record => record.id === item.id);
    const nextId = tab !== 'done' ? item.id : (filtered[index + 1]?.id ?? filtered[index - 1]?.id);
    if (checked) setCompletedHere(ids => [...new Set([...ids, item.id])]);
    const saved = await action(item.id, () => toggle(item.id, checked), checked ? '완료했어요. 다시 누르면 취소할 수 있어요.' : '완료 표시를 취소했어요.');
    if (!saved) setCompletedHere(ids => ids.filter(id => id !== item.id));
    if (saved && keepFocus && (document.activeElement === document.body || document.activeElement === originalInput)) window.requestAnimationFrame(() => {
      const nextInput = nextId ? document.getElementById(`task-check-${nextId}`) : null;
      if (nextInput) nextInput.focus({ preventScroll: true });
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
    if (applicationId && !companyMap.has(applicationId)) {
      setInputError('연결할 회사를 다시 선택해주세요.');
      return;
    }
    setBusy('add');
    setInputError('');
    try {
      await drafts.save(addDraftId, { title, category, application_id: applicationId || null }, () => add(title.trim(), category, applicationId || null));
      setAdding(false);
      setTitle('');
      setTab('todo');
      setFilter('전체');
      if (companyScope !== 'all') setScope(applicationId || 'common');
      setFeedback({ message: '새 할 일을 추가했어요.' });
    } catch (e) {
      setInputError(e.message);
    } finally {
      setBusy('');
    }
  }
  async function saveEdit(e) {
    e.preventDefault();
    if (busy || !editing) return;
    if (!editing.title.trim()) {
      setEditError('준비할 일을 입력해주세요.');
      document.getElementById('edit-task-title')?.focus();
      return;
    }
    if (editing.application_id && !companyMap.has(editing.application_id)) {
      setEditError('연결할 회사를 다시 선택하거나 공통 준비로 바꿔주세요.');
      return;
    }
    setBusy('edit'); setEditError('');
    try {
      await drafts.save(editing.id, editing, () => update(editing.id, { ...editing, application_id: editing.application_id || null }));
      if (companyScope !== 'all') setScope(editing.application_id || 'common');
      setEditing(null); setFilter('전체');
      setFeedback({ message: '할 일을 수정했어요.' });
    } catch (e) { setEditError(e.message); }
    finally { setBusy(''); }
  }

  return <div className="checklist-page grouped-checklist">
    <PageHeading art="check" title="준비 체크" description="회사별로 할 일을 모으고, 마친 일은 바로 표시해요.">
      <Button id="checklist-add-task" onClick={openAdd} variant="contained" startIcon={<Add />} disabled={loading || companiesLoading || Boolean(error || companiesError || busy) || missingCompany}>할 일 추가</Button>
    </PageHeading>
    {drafts.pending && !adding && !editing && <Alert className="record-draft-notice" severity="info" action={<Button color="inherit" disabled={loading || companiesLoading || Boolean(error || companiesError)} onClick={resumeDraft}>이어서 작성</Button>}>저장하지 않은 할 일이 있어요. 현재 탭에서 이어서 작성할 수 있어요.</Alert>}
    <LoadState loading={loading || companiesLoading} error={error || companiesError} retry={() => { refresh(); refreshCompanies(); }} />
    {!loading && !companiesLoading && !error && !companiesError && <>
      {missingCompany ? <Alert severity="warning" action={<Button color="inherit" onClick={() => setScope('all')}>전체 준비 보기</Button>}>선택한 회사를 찾을 수 없어요. 삭제되었거나 접근할 수 없는 회사입니다.</Alert> : <>
        <div className="preparation-controls">
          <div className="preparation-status-tabs">
            <Tabs value={tab} onChange={(_, value) => { setTab(value); setCompletedHere([]); }} variant="fullWidth" aria-label="할 일 상태">
              {[
                { value: 'todo', label: '남은 일', count: scopedItems.length - scopedDone },
                { value: 'all', label: '전체', count: scopedItems.length },
                { value: 'done', label: '완료', count: scopedDone }
              ].map(status => <Tab key={status.value} id={`checklist-tab-${status.value}`} aria-controls={`checklist-panel-${status.value}`} value={status.value} label={`${status.label} ${status.count}`} />)}
            </Tabs>
          </div>
          <details className="preparation-filter-options">
            <summary>목록 좁히기{companyScope !== 'all' || filter !== '전체' ? ' · 적용 중' : ''}</summary>
            <div className="preparation-filter-fields">
              <Field label="회사" select size="small" value={companyScope} onChange={e => setScope(e.target.value)} disabled={Boolean(busy)}>
                <MenuItem value="all">전체 회사 + 공통 준비</MenuItem><MenuItem value="common">공통 준비</MenuItem>
                {companyOptions.map(company => <MenuItem className="checklist-company-option" key={company.id} value={company.id}>{companyLabel(company.id)}</MenuItem>)}
              </Field>
              <Field label="분류" select size="small" value={filter} onChange={event => { setFilter(event.target.value); setCompletedHere([]); }}>
                {['전체', ...CHECKLIST_CATEGORIES].map(value => <MenuItem key={value} value={value}>{value === '전체' ? '전체 분류' : value}</MenuItem>)}
              </Field>
            </div>
          </details>
        </div>
        {(companyScope !== 'all' || filter !== '전체') && <div className="preparation-filter-summary"><span>{scopeLabel}{filter !== '전체' ? ` · ${filter}` : ''}</span><Button onClick={() => { setScope('all'); setFilter('전체'); }}>필터 해제</Button></div>}
        {['all', 'todo', 'done'].map(value => <div key={value} id={`checklist-panel-${value}`} role="tabpanel" aria-labelledby={`checklist-tab-${value}`} hidden={tab !== value}>
          {tab === value && <div className="preparation-groups" ref={taskListRef} role="region" tabIndex={-1} aria-label={`${scopeLabel} · ${filter} · 표시된 항목 ${filtered.length}개`}>
            {groups.map(group => {
              const allGroupItems = scopedItems.filter(item => (item.application_id || 'common') === group.id);
              const row = item => <PreparationItem key={item.id} item={item} onToggle={toggleTask} disabled={Boolean(busy)} inputId={`task-check-${item.id}`} recent={completedHere.includes(item.id)} showCategory>
                <IconButton id={`task-actions-${item.id}`} aria-label={`${item.title} 관리`} aria-haspopup="menu" aria-expanded={taskMenu?.item.id === item.id ? true : undefined} aria-controls={taskMenu?.item.id === item.id ? 'checklist-task-menu' : undefined} disabled={Boolean(busy)} onClick={event => setTaskMenu({ anchor: event.currentTarget, item })}><MoreHoriz fontSize="small" /></IconButton>
              </PreparationItem>;
              return <section className={`preparation-group company-record${group.id === 'common' ? ' preparation-group-common' : ''}`} key={group.id} aria-label={`${group.title} 할 일`}>
                <header className="preparation-group-heading"><span className="record-bookmark" aria-hidden="true" /><h2>{group.title}</h2>{group.company && <StatusChip status={group.company.status} />}<p>{group.company?.deadline && <span>공고 마감 {shortDate(group.company.deadline)}</span>}<span>남은 일 {allGroupItems.filter(item => !item.is_done).length}개</span><span>완료 {allGroupItems.filter(item => item.is_done).length}개</span></p></header>
                <div className="preparation-group-items">{group.items.map(row)}</div>
              </section>;
            })}
            {!filtered.length && <Empty title={tab === 'done' ? '아직 완료한 일이 없어요' : tab === 'todo' && scopedItems.length > 0 ? '이 목록의 준비를 모두 마쳤어요' : '이 조건에 맞는 할 일이 없어요'}>{filter !== '전체' ? <Button onClick={() => setFilter('전체')}>전체 분류 보기</Button> : <Button onClick={openAdd}>할 일 추가하기</Button>}</Empty>}
          </div>}
        </div>)}
        <div className="checklist-secondary-tool"><Link to="/document-helper">작성 요청문 도구</Link></div>
      </>}
    </>}
    <Menu id="checklist-task-menu" className="checklist-task-menu" anchorEl={taskMenu?.anchor} open={Boolean(taskMenu)} onClose={() => setTaskMenu(null)} slotProps={{ list: { 'aria-labelledby': taskMenu ? `task-actions-${taskMenu.item.id}` : undefined }, transition: { onExited: finishTaskMenuClose } }}>
      <MenuItem onClick={() => chooseTaskAction('edit')}><EditOutlined fontSize="small" />할 일 수정</MenuItem>
      <MenuItem onClick={() => chooseTaskAction('delete')}><DeleteOutline fontSize="small" />할 일 삭제</MenuItem>
    </Menu>
    <Dialog className="checklist-edit-dialog record-editor-dialog" open={adding} onClose={closeAdd} disableRestoreFocus slotProps={{ transition: { onExited: restoreDialogFocus } }} aria-labelledby="add-task-dialog-title" fullWidth maxWidth="sm">
      <form onSubmit={submit} noValidate>
        <DialogTitle id="add-task-dialog-title">할 일 추가</DialogTitle>
        <DialogContent><div className="field-stack checklist-dialog-fields">
          {restored && <Alert severity="info">작성 내용을 복원했어요. 저장하면 반영됩니다.</Alert>}
          <Field id="task-title" label="할 일" required autoFocus value={title} onChange={e => changeNew('title', e.target.value)} error={Boolean(inputError)} helperText={inputError} slotProps={{ formHelperText: { role: 'alert' } }} placeholder="예: 자기소개서 마지막 문단 다듬기" disabled={Boolean(busy)} />
          <div className="checklist-dialog-options">
            <Field id="task-company" label="연결할 회사" select value={applicationId} onChange={e => changeNew('application_id', e.target.value || null)} disabled={Boolean(busy)} slotProps={{ select: { displayEmpty: true, renderValue: companyLabel } }}>{companyChoices(applicationId)}</Field>
            <Field label="분류" select value={category} onChange={e => changeNew('category', e.target.value)} disabled={Boolean(busy)}>
              {CHECKLIST_CATEGORIES.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
            </Field>
          </div>
        </div></DialogContent>
        <DialogActions><Button disabled={Boolean(busy)} onClick={closeAdd}>취소</Button><Button type="submit" variant="contained" disabled={Boolean(busy)}>{busy === 'add' ? '저장 중…' : '추가 저장'}</Button></DialogActions>
      </form>
    </Dialog>
    <Dialog className="checklist-edit-dialog record-editor-dialog" open={Boolean(editing)} onClose={closeEdit} disableRestoreFocus slotProps={{ transition: { onExited: restoreDialogFocus } }} aria-labelledby="edit-task-dialog-title" fullWidth maxWidth="sm">
      <form onSubmit={saveEdit} noValidate>
        <DialogTitle id="edit-task-dialog-title">할 일 수정</DialogTitle>
        <DialogContent><div className="field-stack checklist-dialog-fields">
          {editError && <Alert severity="error">{editError}</Alert>}
          {restored && <Alert severity="info">작성 내용을 복원했어요. 저장하면 반영됩니다.</Alert>}
          <Field id="edit-task-title" label="할 일" required autoFocus value={editing?.title ?? ''} disabled={Boolean(busy)} onChange={e => changeEdit({ ...editing, title: e.target.value })} />
          <Field label="연결할 회사" select value={editing?.application_id || ''} disabled={Boolean(busy)} onChange={e => changeEdit({ ...editing, application_id: e.target.value || null })} slotProps={{ select: { displayEmpty: true, renderValue: companyLabel } }}>{companyChoices(editing?.application_id)}</Field>
          <Field label="분류" select value={editing?.category ?? '서류'} disabled={Boolean(busy)} onChange={e => changeEdit({ ...editing, category: e.target.value })}>
            {CHECKLIST_CATEGORIES.map(c => <MenuItem value={c} key={c}>{c}</MenuItem>)}
          </Field>
        </div></DialogContent>
        <DialogActions><Button disabled={Boolean(busy)} onClick={closeEdit}>취소</Button><Button type="submit" variant="contained" disabled={Boolean(busy)}>수정 저장</Button></DialogActions>
      </form>
    </Dialog>
    <Dialog open={Boolean(confirmDiscard)} onClose={() => setConfirmDiscard('')} aria-labelledby="discard-task-title" aria-describedby="discard-task-description" fullWidth maxWidth="xs">
      <DialogTitle id="discard-task-title">내용을 저장하지 않았어요</DialogTitle>
      <DialogContent><p id="discard-task-description">닫으면 작성한 내용이 사라집니다.</p></DialogContent>
      <DialogActions><Button autoFocus onClick={() => setConfirmDiscard('')}>계속 작성</Button><Button onClick={discardDraft}>저장하지 않고 닫기</Button></DialogActions>
    </Dialog>
    <ConfirmDelete open={Boolean(target)} title={target?.title} busy={Boolean(busy)} onClose={() => setTarget(null)} onConfirm={() => action('delete', async () => { await remove(target.id); drafts.clear(target.id); setTarget(null); window.requestAnimationFrame(() => taskListRef.current?.focus({ preventScroll: true })); }, '할 일을 삭제했어요.')} />
    <ActionFeedback feedback={feedback} onClose={() => setFeedback(null)} />
  </div>;
}
