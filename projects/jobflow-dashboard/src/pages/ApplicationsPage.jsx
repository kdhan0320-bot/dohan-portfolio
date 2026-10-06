import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button, InputAdornment, Tab, Tabs, useMediaQuery } from '@mui/material';
import Add from '@mui/icons-material/Add';
import Search from '@mui/icons-material/Search';
import ChevronRight from '@mui/icons-material/ChevronRight';
import Pause from '@mui/icons-material/Pause';
import Close from '@mui/icons-material/Close';
import useApplications from '../hooks/useApplications';
import { useToday } from '../hooks/useToday';
import { deadlineLabel, shortDate } from '../utils/dates';
import { BOARD_COLUMNS, boardColumn, boardRows } from '../utils/applicationBoard';
import { PageHeading, CompanyMark, LoadState, Empty } from '../components/ui/PageUI';
import Field from '../components/ui/Field';
import StatusChip from '../components/ui/StatusChip';
import ActionFeedback from '../components/ui/ActionFeedback';
import ApplicationPanel from '../components/applications/ApplicationPanel';

export default function ApplicationsPage() {
  const { applications, loading, error, refresh, add, update, remove } = useApplications();
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
  function closePanel() { changeParams({ company: null, new: null }, true); }
  function clearSearch() {
    changeParams({ q: null }, true);
    window.requestAnimationFrame(() => document.getElementById('board-company-search')?.focus());
  }
  async function save(payload) {
    const row = creating ? await add(payload) : await update(selected.id, payload);
    const destination = boardColumn(row.status);
    changeParams({ company: null, new: null, q: null, view: destination === 'paused' ? 'paused' : null, lane: destination === 'paused' ? null : destination }, true);
    setFeedback({ message: creating ? `${row.company_name} 추가 완료` : `${row.company_name} · ${row.status} 저장 완료` });
    if (typeof document !== 'undefined') window.requestAnimationFrame(() => document.getElementById(`company-card-${row.id}`)?.focus());
  }
  async function deleteCompany(id) {
    await remove(id); closePanel(); setFeedback({ message: '회사를 삭제했어요.' });
    if (typeof document !== 'undefined') window.requestAnimationFrame(() => document.getElementById('board-add-company')?.focus());
  }
  function card(a) {
    const pending = boardColumn(a.status) === 'before';
    return <button id={`company-card-${a.id}`} type="button" className="job-tile" key={a.id} onClick={() => changeParams({ company: a.id })} aria-label={`${a.company_name}, ${a.position || '직무 미입력'}, ${a.status}. 정보 열기`}>
      <span className="job-tile-heading"><CompanyMark name={a.company_name} /><ChevronRight fontSize="small" /></span>
      <strong className="job-company">{a.company_name}</strong><span className="job-position">{a.position || '직무 미입력'}</span>
      <span className="job-tile-bottom"><StatusChip status={a.status} />{pending && a.deadline && <span className={Date.parse(a.deadline) < Date.parse(today) ? 'job-deadline overdue' : 'job-deadline'}>{deadlineLabel(a.deadline, today)}</span>}{!pending && a.applied_date && <span className="job-date">{shortDate(a.applied_date)} 지원</span>}</span>
    </button>;
  }
  return <>
    <PageHeading art="folder" title="취업 지원 현황" description={`전체 ${applications.length}곳 · 지원 중 ${activeCount}곳`}>
      <Button id="board-add-company" variant="contained" startIcon={<Add />} onClick={() => changeParams({ new: '1', company: null })}>회사 추가</Button>
    </PageHeading>
    <div className="board-toolbar">
      <Field id="board-company-search" className="board-search" size="small" label="회사·직무 검색" placeholder="회사나 직무를 찾아보세요" value={query} onChange={e => changeParams({ q: e.target.value }, true)} slotProps={{ input: { startAdornment: <InputAdornment position="start"><Search fontSize="small" /></InputAdornment>, endAdornment: query ? <InputAdornment position="end"><Button className="search-clear" onClick={clearSearch} aria-label="검색어 지우기"><Close fontSize="small" /></Button></InputAdornment> : undefined } }} />
      <Button className="paused-toggle" startIcon={<Pause fontSize="small" />} variant={paused ? 'contained' : 'text'} aria-pressed={paused} onClick={() => changeParams({ view: paused ? null : 'paused' }, true)}>보류함 {pausedCount}</Button>
    </div>
    <LoadState loading={loading} error={error} retry={refresh} />
    {!loading && !error && <>
      {noSearchResults ? <section className="board-no-results" aria-live="polite"><Empty title="검색 결과가 없어요"><p>‘{query.trim()}’와 일치하는 회사·직무가 {paused ? '보류함' : '지원 현황'}에 없어요.</p><Button variant="outlined" onClick={clearSearch}>검색어 지우기</Button></Empty></section> : paused ? <section className="paused-board" aria-labelledby="paused-title"><div className="paused-heading"><h2 id="paused-title">잠시 보류한 회사</h2><Button onClick={() => changeParams({ view: null }, true)}>지원 현황으로</Button></div><div className="paused-cards">{filtered.filter(a => a.status === '보류').map(card)}</div>{!filtered.some(a => a.status === '보류') && <Empty title="보류한 회사가 없어요" />}</section> : <>
        <Tabs className="mobile-board-tabs" value={lane} onChange={(_,value) => changeParams({ lane: value }, true)} variant="fullWidth" aria-label="전형 단계">
          {BOARD_COLUMNS.map(c => <Tab key={c.id} id={`lane-tab-${c.id}`} aria-controls={`lane-${c.id}`} value={c.id} label={<span>{c.label}<b>{filtered.filter(a => boardColumn(a.status) === c.id).length}</b></span>} />)}
        </Tabs>
        <div className="job-board" aria-label="지원 전부터 결과까지의 전형 현황">
          {BOARD_COLUMNS.map((column, index) => {
            const rows = filtered.filter(a => boardColumn(a.status) === column.id);
            return <section className={`job-lane ${lane === column.id ? 'mobile-selected' : ''}`} id={`lane-${column.id}`} key={column.id} role={mobile ? 'tabpanel' : undefined} aria-labelledby={mobile ? `lane-tab-${column.id}` : `lane-title-${column.id}`} style={{ '--lane-color': column.color, '--lane-tint': column.tint }}>
              <header className="job-lane-heading"><span className="lane-number" aria-hidden="true">{index + 1}</span><h2 id={`lane-title-${column.id}`}>{column.label}</h2><span className="lane-count">{rows.length}</span></header>
              <div className="job-lane-cards">{rows.map(card)}</div>
              {!rows.length && <div className="job-lane-empty" aria-label="회사 없음"><span aria-hidden="true">—</span>{column.id === 'before' && <p>{query ? '검색 결과 없음' : '첫 회사를 추가해보세요'}</p>}</div>}
              {column.id === 'before' && <Button className="lane-add" startIcon={<Add />} onClick={() => changeParams({ new: '1', company: null })}>회사 추가</Button>}
            </section>;
          })}
        </div>
        <p className="board-instruction">회사를 누르면 상태와 준비 메모를 수정할 수 있어요.</p>
      </>}
      {(creating || selected) && <ApplicationPanel key={creating ? 'new' : selected.id} application={creating ? null : selected} creating={creating} onClose={closePanel} onSave={save} onDelete={deleteCompany} />}
      {params.get('company') && !selected && !creating && <div className="missing-company" role="status">이 회사 정보를 찾을 수 없어요.<Button onClick={closePanel}>닫기</Button></div>}
    </>}
    <ActionFeedback feedback={feedback} onClose={() => setFeedback(null)} />
  </>;
}
