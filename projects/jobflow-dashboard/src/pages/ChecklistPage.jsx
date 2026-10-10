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
import CompletionRing from '../components/ui/CompletionRing';
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
  const [editing, setEditing] = useState(null);
  const [confirmDiscard, setConfirmDiscard] = useState(false);
  const [editError, setEditError] = useState('');
  const [feedback, setFeedback] = useState(null);
  const editOriginal = useRef(null);
  const taskListRef = useRef(null);
  const companyItems = items.filter(item => companyScope === 'all' || (companyScope === 'common' ? !item.application_id : item.application_id === companyScope));
  const done = companyItems.filter(item => item.is_done).length;
  const scopedItems = companyItems.filter(item => filter === '전체' || item.category === filter);
  const scopedDone = scopedItems.filter(item => item.is_done).length;
  const filtered = scopedItems.filter(item => tab === 'all' || item.is_done === (tab === 'done'));
  const scopeLabel = selectedCompany?.company_name || (companyScope === 'common' ? '공통 준비' : '전체 준비');
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
  function closeEdit() {
    if (busy) return;
    if (editDirty) setConfirmDiscard(true);
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
    await action('add', async () => {
      await add(title.trim(), category, applicationId || null);
      setTitle('');
      setTab('todo');
      setFilter('전체');
      if (companyScope !== 'all') setScope(applicationId || 'common');
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

  return <>
    <PageHeading art="check" title="준비 체크" description="지원할 회사에 맞춰, 준비할 일을 정리해요.">
      <Button component={Link} to="/document-helper" variant="text">작성 요청문 도구</Button>
    </PageHeading>
    <LoadState loading={loading || companiesLoading} error={error || companiesError} retry={() => { refresh(); refreshCompanies(); }} />
    {!loading && !companiesLoading && !error && !companiesError && <>
      {missingCompany ? <Alert severity="warning" action={<Button color="inherit" onClick={() => setScope('all')}>전체 준비 보기</Button>}>선택한 회사를 찾을 수 없어요. 삭제되었거나 접근할 수 없는 회사입니다.</Alert> : <>
        <section className="checklist-company-scope" aria-label="회사별 준비 선택">
          <div className="checklist-scope-identity">
            {selectedCompany ? <CompanyMark name={selectedCompany.company_name} /> : <span className="checklist-scope-icon" aria-hidden="true"><ChecklistOutlined /></span>}
            <div className="checklist-scope-copy">
              <strong>{scopeLabel}</strong>
              <span>{selectedCompany ? selectedCompany.position || '직무 미입력' : companyScope === 'common' ? '여러 지원에 함께 쓰는 할 일' : `${applications.length}개 회사 · 공통 준비`}</span>
            </div>
            {selectedCompany && <Button component={Link} to={`/?company=${encodeURIComponent(selectedCompany.id)}`} size="small">회사 정보</Button>}
          </div>
          <Field className="checklist-scope-select" label="회사 선택" select size="small" value={companyScope} onChange={e => setScope(e.target.value)} disabled={Boolean(busy)} slotProps={{ select: { renderValue: value => value === 'all' ? '전체 회사 + 공통 준비' : value === 'common' ? '공통 준비' : companyLabel(value) } }}>
            <MenuItem value="all">전체 회사 + 공통 준비</MenuItem>
            <MenuItem value="common">공통 준비</MenuItem>
            {companyOptions.map(company => <MenuItem className="checklist-company-option" key={company.id} value={company.id}>{companyLabel(company.id)}</MenuItem>)}
          </Field>
        </section>
        <div className="checklist-workspace company-checklist-workspace">
          <aside className="preparation-summary" aria-label={`${scopeLabel}의 진행도와 분류`}>
            <CompletionRing completed={done} total={companyItems.length} />
            <p className="preparation-count"><strong>{done}</strong> / {companyItems.length}개 완료</p>
            <div className="preparation-filters" aria-label="할 일 분류">
              <button type="button" aria-pressed={filter === '전체'} onClick={() => setFilter('전체')} className="category-filter category-all"><span>전체 분류</span><b>{companyItems.length}</b></button>
              {CHECKLIST_CATEGORIES.map(c => {
                const categoryItems = companyItems.filter(item => item.category === c);
                const categoryDone = categoryItems.filter(item => item.is_done).length;
                return <button type="button" className="category-filter" aria-pressed={filter === c} aria-label={categoryItems.length ? `${c}, ${categoryItems.length}개 중 ${categoryDone}개 완료` : `${c}, 등록한 일 없음`} key={c} onClick={() => setFilter(c)}>
                  <span>{c}</span><small>{categoryItems.length ? `${categoryDone} / ${categoryItems.length}` : '등록 없음'}</small>
                  {categoryItems.length > 0 && <span className="category-meter" aria-hidden="true"><i style={{ width: `${categoryDone / categoryItems.length * 100}%` }} /></span>}
                </button>;
              })}
            </div>
          </aside>
          <section className="preparation-tasks" aria-label={`${scopeLabel} · ${filter} 분류의 할 일 목록`}>
            <form className="add-task company-task-form" onSubmit={submit} noValidate>
              <div className="company-task-main">
                <Field id="task-title" label="할 일" size="small" value={title} onChange={e => { setTitle(e.target.value); setInputError(''); }} error={Boolean(inputError)} helperText={inputError} placeholder="예: 자기소개서 마지막 문단 다듬기" disabled={Boolean(busy)} />
                <Button type="submit" variant="contained" startIcon={<Add />} disabled={Boolean(busy)}>추가</Button>
              </div>
              <div className="company-task-options">
                <Field id="task-company" label="연결할 회사" select size="small" value={applicationId} onChange={e => { setApplicationId(e.target.value); setInputError(''); }} disabled={Boolean(busy)} slotProps={{ select: { displayEmpty: true, renderValue: companyLabel } }}>{companyChoices(applicationId)}</Field>
                <Field label="분류" select size="small" value={category} onChange={e => setCategory(e.target.value)} disabled={Boolean(busy)}>
                  {CHECKLIST_CATEGORIES.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
                </Field>
              </div>
            </form>
            <div className="tabs-row">
              <Tabs value={tab} onChange={(_, value) => setTab(value)} variant="scrollable" scrollButtons="auto" allowScrollButtonsMobile aria-label={`${scopeLabel} · ${filter} 분류의 할 일 상태`}>
                <Tab value="todo" label={`진행 중 ${scopedItems.length - scopedDone}`} />
                <Tab value="done" label={`완료 ${scopedDone}`} />
                <Tab value="all" label={`전체 ${scopedItems.length}`} />
              </Tabs>
            </div>
            <div className="task-collection" ref={taskListRef} role="region" tabIndex={-1} aria-label={`${scopeLabel} · ${filter} · ${tab === 'todo' ? '진행 중' : tab === 'done' ? '완료' : '전체'} ${filtered.length}개`}>
              {filtered.map(item => <div className={`list-task ${item.is_done ? 'done' : ''}`} key={item.id}>
                <Checkbox checked={item.is_done} disabled={Boolean(busy)} onChange={e => toggleTask(item, e.target.checked)} slotProps={{ input: { id: `task-check-${item.id}`, 'aria-label': `${item.title} ${item.is_done ? '완료 취소' : '완료'}` } }} />
                <span className="task-copy">
                  <span className="checklist-task-meta"><span className="task-category">{item.category}</span><span aria-hidden="true">·</span>{item.application_id && companyMap.has(item.application_id) ? <Link to={`/?company=${encodeURIComponent(item.application_id)}`} title={companyLabel(item.application_id)}>{companyMap.get(item.application_id).company_name}</Link> : <span>{companyLabel(item.application_id)}</span>}</span>
                  <span className="task-text">{item.title}</span>
                </span>
                <span className="task-tools">
                  <IconButton aria-label={`${item.title} 수정`} disabled={Boolean(busy)} onClick={() => { editOriginal.current = { title: item.title, category: item.category, application_id: item.application_id || null }; setEditing({ ...item, application_id: item.application_id || null }); setEditError(''); setConfirmDiscard(false); }}><EditOutlined fontSize="small" /></IconButton>
                  <IconButton aria-label={`${item.title} 삭제`} onClick={() => setTarget(item)} disabled={Boolean(busy)}><DeleteOutline fontSize="small" /></IconButton>
                </span>
              </div>)}
              {!filtered.length && <Empty title={tab === 'done' ? '아직 완료한 일이 없어요' : tab === 'todo' && scopedItems.length > 0 ? '이 목록의 준비를 모두 마쳤어요' : '준비할 일을 추가해보세요'}>
                {filter !== '전체' ? <Button onClick={() => setFilter('전체')}>전체 분류 보기</Button> : <Button onClick={() => document.getElementById('task-title')?.focus()}>할 일 추가하기</Button>}
              </Empty>}
            </div>
          </section>
        </div>
      </>}
    </>}
    <Dialog open={Boolean(editing)} onClose={closeEdit} aria-labelledby="edit-task-dialog-title" fullWidth maxWidth="sm">
      <form onSubmit={saveEdit} noValidate>
        <DialogTitle id="edit-task-dialog-title">할 일 수정</DialogTitle>
        <DialogContent><div className="field-stack" style={{ paddingTop: 12 }}>
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
    <Dialog open={confirmDiscard} onClose={() => setConfirmDiscard(false)} aria-labelledby="discard-task-title" aria-describedby="discard-task-description" fullWidth maxWidth="xs">
      <DialogTitle id="discard-task-title">수정 내용을 저장하지 않았어요</DialogTitle>
      <DialogContent><p id="discard-task-description">닫으면 방금 수정한 내용이 사라집니다.</p></DialogContent>
      <DialogActions><Button autoFocus onClick={() => setConfirmDiscard(false)}>계속 수정</Button><Button onClick={() => { setConfirmDiscard(false); setEditing(null); }}>저장하지 않고 닫기</Button></DialogActions>
    </Dialog>
    <ConfirmDelete open={Boolean(target)} title={target?.title} busy={Boolean(busy)} onClose={() => setTarget(null)} onConfirm={() => action('delete', async () => { await remove(target.id); setTarget(null); }, '할 일을 삭제했어요.')} />
    <ActionFeedback feedback={feedback} onClose={() => setFeedback(null)} />
  </>;
}
