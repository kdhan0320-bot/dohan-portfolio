import Field from '../components/ui/Field';
import { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button, Checkbox, MenuItem, Tabs, Tab, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Alert } from '@mui/material';
import Add from '@mui/icons-material/Add';
import DeleteOutline from '@mui/icons-material/DeleteOutlined';
import EditOutlined from '@mui/icons-material/EditOutlined';
import ChecklistOutlined from '@mui/icons-material/ChecklistOutlined';
import useChecklist from '../hooks/useChecklist';
import useApplications from '../hooks/useApplications';
import { CHECKLIST_CATEGORIES } from '../constants';
import { PageHeading, LoadState, Empty, ConfirmDelete, CompanyMark } from '../components/ui/PageUI';
import ActionFeedback from '../components/ui/ActionFeedback';
import '../styles/company-checklist.css';

export default function ChecklistPage() {
  const { items, loading, error, refresh, toggle, add, update, remove } = useChecklist();
  const { applications, loading: companiesLoading, error: companiesError, refresh: refreshCompanies } = useApplications();
  const [searchParams, setSearchParams] = useSearchParams();
  const companyScope = searchParams.get('company') || 'all';
  const selectedCompany = applications.find(company => company.id === companyScope);
  const missingCompany = companyScope !== 'all' && companyScope !== 'common' && !selectedCompany;
  const companyMap = new Map(applications.map(company => [company.id, company]));
  const companyOptions = [...applications].sort((a, b) => a.company_name.localeCompare(b.company_name, 'ko'));
  const [tab, setTab] = useState('todo');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('서류');
  const [applicationId, setApplicationId] = useState(companyScope === 'all' || companyScope === 'common' ? '' : companyScope);
  const [filter, setFilter] = useState('전체');
  const [inputError, setInputError] = useState('');
  const [busy, setBusy] = useState('');
  const [target, setTarget] = useState(null);
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState(null);
  const [confirmDiscard, setConfirmDiscard] = useState('');
  const [editError, setEditError] = useState('');
  const [feedback, setFeedback] = useState(null);
  const addOriginal = useRef(null);
  const editOriginal = useRef(null);
  const taskListRef = useRef(null);
  const companyItems = items.filter(item => companyScope === 'all' || (companyScope === 'common' ? !item.application_id : item.application_id === companyScope));
  const done = companyItems.filter(item => item.is_done).length;
  const scopedItems = companyItems.filter(item => filter === '전체' || item.category === filter);
  const scopedDone = scopedItems.filter(item => item.is_done).length;
  const filtered = scopedItems.filter(item => tab === 'all' || item.is_done === (tab === 'done'));
  const scopeLabel = selectedCompany?.company_name || (companyScope === 'common' ? '공통 준비' : '전체 준비');
  const progress = companyItems.length ? Math.round(done / companyItems.length * 100) : 0;
  const addDirty = Boolean(adding && addOriginal.current && (
    title !== addOriginal.current.title || category !== addOriginal.current.category ||
    applicationId !== addOriginal.current.applicationId
  ));
  const editDirty = Boolean(editing && editOriginal.current && (
    editing.title !== editOriginal.current.title || editing.category !== editOriginal.current.category ||
    (editing.application_id || '') !== (editOriginal.current.application_id || '')
  ));

  useEffect(() => {
    setApplicationId(companyScope === 'all' || companyScope === 'common' ? '' : companyScope);
    setInputError('');
    setFilter('전체');
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
  function openAdd() {
    const initialCompany = companyScope === 'all' || companyScope === 'common' ? '' : companyScope;
    const initialCategory = filter === '전체' ? '서류' : filter;
    addOriginal.current = { title: '', category: initialCategory, applicationId: initialCompany };
    setTitle('');
    setCategory(initialCategory);
    setApplicationId(initialCompany);
    setInputError('');
    setConfirmDiscard('');
    setAdding(true);
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
    const index = filtered.findIndex(record => record.id === item.id);
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
    if (applicationId && !companyMap.has(applicationId)) {
      setInputError('연결할 회사를 다시 선택해주세요.');
      return;
    }
    setBusy('add');
    setInputError('');
    try {
      await add(title.trim(), category, applicationId || null);
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
      await update(editing.id, { ...editing, application_id: editing.application_id || null });
      if (companyScope !== 'all') setScope(editing.application_id || 'common');
      setEditing(null); setFilter('전체');
      setFeedback({ message: '할 일을 수정했어요.' });
    } catch (e) { setEditError(e.message); }
    finally { setBusy(''); }
  }

  return <div className="checklist-page">
    <PageHeading art="check" title="준비 체크">
      <Button onClick={openAdd} variant="contained" startIcon={<Add />} disabled={loading || companiesLoading || Boolean(error || companiesError || busy) || missingCompany}>할 일 추가</Button>
    </PageHeading>
    <LoadState loading={loading || companiesLoading} error={error || companiesError} retry={() => { refresh(); refreshCompanies(); }} />
    {!loading && !companiesLoading && !error && !companiesError && <>
      {missingCompany ? <Alert severity="warning" action={<Button color="inherit" onClick={() => setScope('all')}>전체 준비 보기</Button>}>선택한 회사를 찾을 수 없어요. 삭제되었거나 접근할 수 없는 회사입니다.</Alert> : <>
        <section className="checklist-company-scope" aria-label="회사별 준비 선택과 완료 현황">
          <div className="checklist-scope-controls">
            {selectedCompany ? <CompanyMark name={selectedCompany.company_name} /> : <span className="checklist-scope-icon" aria-hidden="true"><ChecklistOutlined /></span>}
            <Field className="checklist-scope-select" label="회사 선택" select size="small" value={companyScope} onChange={e => setScope(e.target.value)} disabled={Boolean(busy)} slotProps={{ select: { renderValue: value => value === 'all' ? '전체 회사 + 공통 준비' : value === 'common' ? '공통 준비' : companyLabel(value) } }}>
              <MenuItem value="all">전체 회사 + 공통 준비</MenuItem>
              <MenuItem value="common">공통 준비</MenuItem>
              {companyOptions.map(company => <MenuItem className="checklist-company-option" key={company.id} value={company.id}>{companyLabel(company.id)}</MenuItem>)}
            </Field>
            {selectedCompany && <Button component={Link} to={`/?company=${encodeURIComponent(selectedCompany.id)}`} size="small" className="checklist-company-link">회사 정보</Button>}
          </div>
          <div className="checklist-progress">
            <div className="checklist-progress-copy"><span>준비 완료</span><span><strong>{done}</strong> / {companyItems.length}</span></div>
            <div className="checklist-progress-track" role="progressbar" aria-label={`${scopeLabel} 준비 완료`} aria-valuemin={0} aria-valuemax={companyItems.length || 1} aria-valuenow={done} aria-valuetext={companyItems.length ? `${companyItems.length}개 중 ${done}개 완료` : '등록한 할 일 없음'}><span style={{ width: `${progress}%` }} /></div>
          </div>
        </section>
        <section className="checklist-sheet" aria-label={`${scopeLabel}의 할 일 목록`}>
          <div className="checklist-sheet-toolbar">
            <Tabs value={tab} onChange={(_, value) => setTab(value)} variant="scrollable" scrollButtons="auto" allowScrollButtonsMobile aria-label={`${scopeLabel} · ${filter} 분류의 할 일 상태`}>
              <Tab value="todo" label={`진행 중 ${scopedItems.length - scopedDone}`} />
              <Tab value="done" label={`완료 ${scopedDone}`} />
              <Tab value="all" label={`전체 ${scopedItems.length}`} />
            </Tabs>
            <span className="checklist-sheet-bookmark" aria-hidden="true" />
          </div>
          <div className="checklist-category-chips" aria-label="할 일 분류">
            {['전체', ...CHECKLIST_CATEGORIES].map(value => <button type="button" key={value} aria-pressed={filter === value} onClick={() => setFilter(value)}>{value}</button>)}
          </div>
          <div className="task-collection" ref={taskListRef} role="region" tabIndex={-1} aria-label={`${scopeLabel} · ${filter} · ${tab === 'todo' ? '진행 중' : tab === 'done' ? '완료' : '전체'} ${filtered.length}개`}>
            {filtered.map(item => <div className={`list-task ${item.is_done ? 'done' : ''}`} key={item.id}>
              <Checkbox checked={item.is_done} disabled={Boolean(busy)} onChange={e => toggleTask(item, e.target.checked)} slotProps={{ input: { id: `task-check-${item.id}`, 'aria-label': `${item.title} ${item.is_done ? '완료 취소' : '완료'}` } }} />
              <span className="task-copy">
                <span className="task-text">{item.title}</span>
                <span className="checklist-task-meta"><span className="task-category">{item.category}</span>{companyScope === 'all' && <><span aria-hidden="true">·</span>{item.application_id && companyMap.has(item.application_id) ? <Link to={`/?company=${encodeURIComponent(item.application_id)}`} title={companyLabel(item.application_id)}>{companyMap.get(item.application_id).company_name}</Link> : <span>{companyLabel(item.application_id)}</span>}</>}</span>
              </span>
              <span className="task-tools">
                <IconButton aria-label={`${item.title} 수정`} disabled={Boolean(busy)} onClick={() => { editOriginal.current = { title: item.title, category: item.category, application_id: item.application_id || null }; setEditing({ ...item, application_id: item.application_id || null }); setEditError(''); setConfirmDiscard(''); }}><EditOutlined fontSize="small" /></IconButton>
                <IconButton aria-label={`${item.title} 삭제`} onClick={() => setTarget(item)} disabled={Boolean(busy)}><DeleteOutline fontSize="small" /></IconButton>
              </span>
            </div>)}
            {!filtered.length && <Empty title={tab === 'done' ? '아직 완료한 일이 없어요' : tab === 'todo' && scopedItems.length > 0 ? '이 목록의 준비를 모두 마쳤어요' : '준비할 일을 추가해보세요'}>
              {filter !== '전체' ? <Button onClick={() => setFilter('전체')}>전체 분류 보기</Button> : <Button onClick={openAdd}>할 일 추가하기</Button>}
            </Empty>}
          </div>
        </section>
        <div className="checklist-secondary-tool"><Link to="/document-helper">작성 요청문 도구</Link></div>
      </>}
    </>}
    <Dialog className="checklist-edit-dialog" open={adding} onClose={closeAdd} aria-labelledby="add-task-dialog-title" fullWidth maxWidth="sm">
      <form onSubmit={submit} noValidate>
        <DialogTitle id="add-task-dialog-title">할 일 추가</DialogTitle>
        <DialogContent><div className="field-stack checklist-dialog-fields">
          <Field id="task-title" label="할 일" required autoFocus value={title} onChange={e => { setTitle(e.target.value); setInputError(''); }} error={Boolean(inputError)} helperText={inputError} slotProps={{ formHelperText: { role: 'alert' } }} placeholder="예: 자기소개서 마지막 문단 다듬기" disabled={Boolean(busy)} />
          <div className="checklist-dialog-options">
            <Field id="task-company" label="연결할 회사" select value={applicationId} onChange={e => { setApplicationId(e.target.value); setInputError(''); }} disabled={Boolean(busy)} slotProps={{ select: { displayEmpty: true, renderValue: companyLabel } }}>{companyChoices(applicationId)}</Field>
            <Field label="분류" select value={category} onChange={e => setCategory(e.target.value)} disabled={Boolean(busy)}>
              {CHECKLIST_CATEGORIES.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
            </Field>
          </div>
        </div></DialogContent>
        <DialogActions><Button disabled={Boolean(busy)} onClick={closeAdd}>취소</Button><Button type="submit" variant="contained" disabled={Boolean(busy)}>{busy === 'add' ? '저장 중…' : '추가 저장'}</Button></DialogActions>
      </form>
    </Dialog>
    <Dialog className="checklist-edit-dialog" open={Boolean(editing)} onClose={closeEdit} aria-labelledby="edit-task-dialog-title" fullWidth maxWidth="sm">
      <form onSubmit={saveEdit} noValidate>
        <DialogTitle id="edit-task-dialog-title">할 일 수정</DialogTitle>
        <DialogContent><div className="field-stack checklist-dialog-fields">
          {editError && <Alert severity="error">{editError}</Alert>}
          <Field id="edit-task-title" label="할 일" required autoFocus value={editing?.title ?? ''} disabled={Boolean(busy)} onChange={e => setEditing({ ...editing, title: e.target.value })} />
          <Field label="연결할 회사" select value={editing?.application_id || ''} disabled={Boolean(busy)} onChange={e => setEditing({ ...editing, application_id: e.target.value || null })} slotProps={{ select: { displayEmpty: true, renderValue: companyLabel } }}>{companyChoices(editing?.application_id)}</Field>
          <Field label="분류" select value={editing?.category ?? '서류'} disabled={Boolean(busy)} onChange={e => setEditing({ ...editing, category: e.target.value })}>
            {CHECKLIST_CATEGORIES.map(c => <MenuItem value={c} key={c}>{c}</MenuItem>)}
          </Field>
        </div></DialogContent>
        <DialogActions><Button disabled={Boolean(busy)} onClick={closeEdit}>취소</Button><Button type="submit" variant="contained" disabled={Boolean(busy)}>수정 저장</Button></DialogActions>
      </form>
    </Dialog>
    <Dialog open={Boolean(confirmDiscard)} onClose={() => setConfirmDiscard('')} aria-labelledby="discard-task-title" aria-describedby="discard-task-description" fullWidth maxWidth="xs">
      <DialogTitle id="discard-task-title">내용을 저장하지 않았어요</DialogTitle>
      <DialogContent><p id="discard-task-description">닫으면 작성한 내용이 사라집니다.</p></DialogContent>
      <DialogActions><Button autoFocus onClick={() => setConfirmDiscard('')}>계속 작성</Button><Button onClick={() => { if (confirmDiscard === 'add') setAdding(false); else setEditing(null); setConfirmDiscard(''); }}>저장하지 않고 닫기</Button></DialogActions>
    </Dialog>
    <ConfirmDelete open={Boolean(target)} title={target?.title} busy={Boolean(busy)} onClose={() => setTarget(null)} onConfirm={() => action('delete', async () => { await remove(target.id); setTarget(null); }, '할 일을 삭제했어요.')} />
    <ActionFeedback feedback={feedback} onClose={() => setFeedback(null)} />
  </div>;
}
