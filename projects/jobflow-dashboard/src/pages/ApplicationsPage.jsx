import ApplicationsNav from '../components/applications/ApplicationsNav';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button, InputAdornment, Tab, Tabs, useMediaQuery } from '@mui/material';
import Add from '@mui/icons-material/Add';
import Search from '@mui/icons-material/Search';
import Pause from '@mui/icons-material/Pause';
import Close from '@mui/icons-material/Close';
import useApplications from '../hooks/useApplications';
import useChecklist from '../hooks/useChecklist';
import { useToday } from '../hooks/useToday';
import { deadlineLabel, shortDate } from '../utils/dates';
import { BOARD_COLUMNS, boardColumn, boardRows } from '../utils/applicationBoard';
import { PageHeading, CompanyMark, LoadState, Empty } from '../components/ui/PageUI';
import Field from '../components/ui/Field';
import StatusChip from '../components/ui/StatusChip';
import ActionFeedback from '../components/ui/ActionFeedback';
import ApplicationPanel from '../components/applications/ApplicationPanel';
import { useAuth } from '../context/AuthContext';

export default function ApplicationsPage() {
  const { user, isGuest } = useAuth();
  const draftScope = isGuest ? 'sample' : user?.id ? `user:${user.id}` : null;
  const { applications, loading, error, refresh, add, update, remove } = useApplications();
  const checklist = useChecklist();
  const [params, setParams] = useSearchParams();
  const [feedback, setFeedback] = useState(null);
  const query = params.get('q') || '';
  const paused = params.get('view') === 'paused';
  const lane = BOARD_COLUMNS.some(c => c.id === params.get('lane')) ? params.get('lane') : 'before';
  const selected = applications.find(a => a.id === params.get('company'));
  const creating = params.get('new') === '1';
  const today = useToday();
  const mobile = useMediaQuery('(max-width:699px)');
  const filtered = boardRows(applications, query);
  const visibleRows = filtered.filter(a => paused ? a.status === '보류' : a.status !== '보류');
  const noSearchResults = query.trim() && !visibleRows.length;
  const pausedCount = applications.filter(a => a.status === '보류').length;
  const activeCount = applications.filter(a => ['지원 완료', '서류 진행', '면접 예정'].includes(a.status)).length;
  function changeParams(values, replace = false) {
    setParams(prev => { const next = new URLSearchParams(prev); Object.entries(values).forEach(([key,value]) => { if (value == null || value === '') next.delete(key); else next.set(key, value); }); return next; }, { replace });
  }
  function searchCompanies(value) {
    const matches = boardRows(applications, value).filter(row => paused ? row.status === '보류' : row.status !== '보류');
    const firstLane = mobile && !paused && value.trim() && matches.length ? boardColumn(matches[0].status) : null;
    changeParams({ q: value, ...(firstLane ? { lane: firstLane } : {}) }, true);
  }
  function closePanel() {
    const recordId = selected?.id;
    changeParams({ company: null, new: null }, true);
    checklist.refresh();
    window.requestAnimationFrame(() => (document.getElementById(`company-card-${recordId}`) || document.getElementById('board-add-company'))?.focus({ preventScroll: true }));
  }
  function clearSearch() {
    changeParams({ q: null }, true);
    window.requestAnimationFrame(() => document.getElementById('board-company-search')?.focus());
  }
  async function save(payload) {
    const row = creating ? await add(payload) : await update(selected.id, payload);
    const destination = boardColumn(row.status);
    changeParams({ company: null, new: null, q: null, view: destination === 'paused' ? 'paused' : null, lane: destination === 'paused' ? null : destination }, true);
    setFeedback({ message: creating ? '회사를 등록했어요.' : '회사 정보를 저장했어요.' });
    if (typeof document !== 'undefined') window.requestAnimationFrame(() => document.getElementById(`company-card-${row.id}`)?.focus());
  }
  async function deleteCompany(id) {
    await remove(id); closePanel(); setFeedback({ message: '회사를 삭제했어요.' });
    if (typeof document !== 'undefined') window.requestAnimationFrame(() => document.getElementById('board-add-company')?.focus());
  }
  async function changeStatus(status) {
    await update(selected.id, { status });
    const destination = boardColumn(status);
    // Keep the record open, then reveal its new column when it is closed.
    changeParams({ view: destination === 'paused' ? 'paused' : null, lane: destination === 'paused' ? null : destination }, true);
  }
  function card(a) {
    const pending = boardColumn(a.status) === 'before';
    return <button id={`company-card-${a.id}`} type="button" className="job-tile" key={a.id} onClick={() => changeParams({ company: a.id })} aria-haspopup="dialog">
      <span className="job-tile-heading"><CompanyMark name={a.company_name} /><span className="job-tile-identity"><strong className="job-company">{a.company_name}</strong><span className="job-position">{a.position || '직무 미입력'}</span></span></span>
      {!checklist.loading && !checklist.error && <span className="job-tile-preparation">{(() => { const remaining = checklist.items.filter(item => item.application_id === a.id && !item.is_done); return remaining.length ? `남은 준비 ${remaining.length}개 · ${remaining[0].title}` : checklist.items.some(item => item.application_id === a.id) ? '준비 완료' : '준비 미등록'; })()}</span>}
      <span className="job-tile-bottom"><StatusChip status={a.status} />{pending && a.deadline && <span className={Date.parse(a.deadline) < Date.parse(today) ? 'job-deadline overdue' : 'job-deadline'}>{shortDate(a.deadline)} 마감 · {deadlineLabel(a.deadline, today)}</span>}{!pending && a.applied_date && <span className="job-date">{shortDate(a.applied_date)} 지원</span>}</span>
    </button>;
  }
  return <>
    <PageHeading art="folder" title="지원 관리" description={`전체 ${applications.length}곳 · 지원 중 ${activeCount}곳`}>
      <Button id="board-add-company" className="company-add-action" aria-label="지원할 회사 등록" variant="contained" startIcon={<Add />} onClick={() => changeParams({ new: '1', company: null })} aria-haspopup="dialog"><span className="full-action-label">지원할 회사 등록</span><span className="compact-action-label">회사 등록</span></Button>
    </PageHeading>
    <ApplicationsNav />
    <div className="board-toolbar">
      <Field id="board-company-search" className="board-search" size="small" label="회사·직무 검색" hideLabel placeholder="회사·직무 검색" value={query} onChange={e => searchCompanies(e.target.value)} slotProps={{ input: { startAdornment: <InputAdornment position="start"><Search fontSize="small" /></InputAdornment>, endAdornment: query ? <InputAdornment position="end"><Button className="search-clear" onClick={clearSearch} aria-label="검색어 지우기"><Close fontSize="small" /></Button></InputAdornment> : undefined } }} />
      <Button className="paused-toggle" startIcon={<Pause fontSize="small" />} variant={paused ? 'contained' : 'text'} aria-pressed={paused} onClick={() => changeParams({ view: paused ? null : 'paused' }, true)}>보류함 {pausedCount}</Button>
    </div>
    <LoadState loading={loading} error={error} retry={refresh} />
    {!loading && !error && <>
      {noSearchResults ? <section className="board-no-results" aria-live="polite"><Empty title="검색 결과가 없어요"><p>검색어 ‘{query.trim()}’에 해당하는 회사·직무가 없어요.</p><Button variant="outlined" onClick={clearSearch}>검색어 지우기</Button></Empty></section> : paused ? <section className="paused-board" aria-labelledby="paused-title"><div className="paused-heading"><h2 id="paused-title">잠시 보류한 회사</h2><Button onClick={() => changeParams({ view: null }, true)}>지원 현황으로</Button></div><div className="paused-cards">{filtered.filter(a => a.status === '보류').map(card)}</div>{!filtered.some(a => a.status === '보류') && <Empty title="보류한 회사가 없어요" />}</section> : <>
        <Tabs className="mobile-board-tabs" value={lane} onChange={(_,value) => changeParams({ lane: value }, true)} variant="fullWidth" aria-label="전형 단계">
          {BOARD_COLUMNS.map(c => <Tab key={c.id} id={`lane-tab-${c.id}`} aria-controls={`lane-${c.id}`} value={c.id} label={<span>{c.label}<b>{filtered.filter(a => boardColumn(a.status) === c.id).length}곳</b></span>} />)}
        </Tabs>
        <div className="job-board" aria-label="지원 전부터 결과까지의 전형 현황">
          {BOARD_COLUMNS.map(column => {
            const rows = filtered.filter(a => boardColumn(a.status) === column.id);
            return <section className={`job-lane ${lane === column.id ? 'mobile-selected' : ''}`} id={`lane-${column.id}`} key={column.id} role={mobile ? 'tabpanel' : undefined} aria-labelledby={mobile ? `lane-tab-${column.id}` : `lane-title-${column.id}`} style={{ '--lane-color': column.color, '--lane-tint': column.tint }}>
              {!mobile && <header className="job-lane-heading"><h2 id={`lane-title-${column.id}`}>{column.label}</h2><span className="lane-count">{rows.length}곳</span></header>}
              <div className="job-lane-cards">{rows.map(card)}</div>
              {!rows.length && <div className="job-lane-empty" aria-label="회사 없음"><span aria-hidden="true">—</span>{column.id === 'before' && <p>{query ? '이 단계에는 검색 결과가 없어요' : '지원할 회사를 등록해보세요'}</p>}</div>}
            </section>;
          })}
        </div>
      </>}
      {(creating || selected) && <ApplicationPanel key={`${draftScope}:${creating ? 'new' : selected.id}`} draftScope={draftScope} application={creating ? null : selected} creating={creating} onClose={closePanel} onSave={save} onStatusChange={creating ? undefined : changeStatus} onDelete={deleteCompany} />}
      {params.get('company') && !selected && !creating && <div className="missing-company" role="status">이 회사 정보를 찾을 수 없어요.<Button onClick={closePanel}>닫기</Button></div>}
    </>}
    <ActionFeedback feedback={feedback} onClose={() => setFeedback(null)} />
  </>;
}
