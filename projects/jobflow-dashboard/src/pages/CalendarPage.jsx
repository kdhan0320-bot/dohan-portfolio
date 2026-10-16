import { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button, IconButton, useMediaQuery } from '@mui/material';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';
import Add from '@mui/icons-material/Add';
import useApplications from '../hooks/useApplications';
import { useToday } from '../hooks/useToday';
import { useAuth } from '../context/AuthContext';
import { agendaDeadlines, calendarFocusDate, calendarState, companyDestination, keyboardDate, monthCells, monthLabel, pendingDeadlines, shiftMonth, validDate, WEEKDAYS } from '../utils/calendar';
import { deadlineLabel } from '../utils/dates';
import { CompanyMark, Empty, LoadState, PageHeading } from '../components/ui/PageUI';
import '../styles/calendar-refinement.css';

export default function CalendarPage() {
  const { applications, loading, error, refresh } = useApplications();
  const today = useToday();
  const { isGuest } = useAuth();
  const referenceLabel = isGuest ? '샘플 기준일' : '오늘';
  const [params, setParams] = useSearchParams();
  const selection = calendarState(params, today);
  const { month, date, scope } = selection;
  const [focusedDate, setFocusedDate] = useState(null);
  const [calendarExpanded, setCalendarExpanded] = useState(false);
  const compactCalendar = useMediaQuery('(max-width: 699px)');
  const calendarVisible = !compactCalendar || calendarExpanded;
  const pageDescription = compactCalendar
    ? `지원 전 회사${isGuest ? ` · 샘플 기준 ${today.replaceAll('-', '.')}` : '의 마감일을 확인해요.'}`
    : '아직 지원하지 않은 회사의 마감일을 확인해요.';
  const agendaTitle = useRef(null);
  const pendingAgendaFocus = useRef(null);
  const [agendaFocusRequest, setAgendaFocusRequest] = useState(0);
  const dayButtons = useRef(new Map());
  const pendingFocus = useRef(null);
  const tabDate = calendarFocusDate(month, date, focusedDate, today);
  const deadlines = pendingDeadlines(applications);
  const visible = agendaDeadlines(deadlines, selection, today);
  const undated = applications.filter(a => ['관심', '지원 예정'].includes(a.status) && !validDate(a.deadline)).length;
  const overdue = deadlines.filter(a => a.deadline < today).length;
  useEffect(() => {
    const pending = pendingFocus.current;
    if (!pending) return;
    pendingFocus.current = null;
    if (document.activeElement === pending.origin || document.activeElement === document.body) {
      dayButtons.current.get(pending.day)?.focus();
    }
  }, [month, focusedDate]);
  useEffect(() => {
    const pending = pendingAgendaFocus.current;
    if (!pending) return;
    pendingAgendaFocus.current = null;
    agendaTitle.current?.focus({ preventScroll: true });
    if (pending.scroll) agendaTitle.current?.scrollIntoView({ block: 'nearest', behavior: 'instant' });
  }, [agendaFocusRequest]);
  function revealAgenda() {
    pendingAgendaFocus.current = { scroll: compactCalendar };
    if (compactCalendar) setCalendarExpanded(false);
    // A fresh request also handles confirming the already selected date.
    setAgendaFocusRequest(value => value + 1);
  }
  function selectMonth(value) { pendingFocus.current = null; setParams({ month: value }); }
  function selectDate(value) {
    pendingFocus.current = null;
    setFocusedDate(value);
    setParams({ month: value.slice(0, 7), date: value });
    if (compactCalendar) revealAgenda();
  }
  function selectUpcoming() { pendingFocus.current = null; setFocusedDate(null); setParams({}); revealAgenda(); }
  function selectMonthAgenda() { selectMonth(month); revealAgenda(); }
  function moveDate(event, day) {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    const next = keyboardDate(day, event.key);
    if (!next) return;
    event.preventDefault();
    if (next === day) return;
    pendingFocus.current = { day: next, origin: event.currentTarget };
    setFocusedDate(next);
    if (!next.startsWith(month)) setParams(current => {
      const updated = new URLSearchParams(current);
      updated.set('month', next.slice(0, 7));
      return updated;
    }, { replace: true });
  }
  return <div className="calendar-page">
    <PageHeading art="calendar" title="마감 일정" description={pageDescription}><Button className="company-add-action" aria-label="지원할 회사 등록" component={Link} to="/?new=1" variant="contained" startIcon={<Add />}><span className="full-action-label">지원할 회사 등록</span><span className="compact-action-label">회사 등록</span></Button></PageHeading>
    <LoadState loading={loading} error={error} retry={refresh} />
    {!loading && !error && <>
      <div className="calendar-layout">
        <section className="calendar-surface" aria-labelledby="calendar-month">
          <header className="calendar-toolbar"><h2 id="calendar-month" aria-label={monthLabel(month)} aria-live="polite">{compactCalendar ? `${Number(month.slice(0, 4))}. ${Number(month.slice(5))}` : monthLabel(month)}</h2><div className="calendar-month-actions">{!compactCalendar && <Button onClick={() => selectDate(today)}>{referenceLabel}</Button>}<IconButton aria-label="이전 달" onClick={() => selectMonth(shiftMonth(month, -1))}><ChevronLeft /></IconButton><IconButton aria-label="다음 달" onClick={() => selectMonth(shiftMonth(month, 1))}><ChevronRight /></IconButton></div>{compactCalendar && <Button className="calendar-toggle" aria-expanded={calendarVisible} aria-controls="calendar-date-picker" endIcon={calendarVisible ? <ExpandLess /> : <ExpandMore />} onClick={() => setCalendarExpanded(value => !value)}>{calendarVisible ? '달력 접기' : '날짜 선택'}</Button>}</header>
          {isGuest && !compactCalendar && <p className="calendar-reference-note">샘플은 {today.replaceAll('-', '.')} 기준으로 표시해요.</p>}
          <div id="calendar-date-picker" hidden={!calendarVisible}>
          {compactCalendar && <div className="calendar-reference-action"><Button onClick={() => selectDate(today)}>{referenceLabel} 보기</Button></div>}
          <div className="calendar-week" aria-hidden="true">{WEEKDAYS.map(day => <span key={day}>{day}</span>)}</div>
          <div className="calendar-days" role="group" aria-label={`${monthLabel(month)} 날짜 선택`} aria-description="방향키로 날짜 이동, Home과 End로 주의 처음과 끝 이동, PageUp과 PageDown으로 월 이동, Enter 또는 Space로 날짜 선택">
            {monthCells(month).map(day => {
              const events = deadlines.filter(a => a.deadline === day);
              return <button type="button" key={day} ref={node => { if (node) dayButtons.current.set(day, node); else dayButtons.current.delete(day); }} tabIndex={day === tabDate ? 0 : -1} className={`calendar-day ${day.startsWith(month) ? '' : 'other-month'} ${day === today ? 'is-today' : ''} ${day === date ? 'is-selected' : ''} ${events.length ? 'has-deadline' : ''}`} onFocus={() => setFocusedDate(day)} onKeyDown={event => moveDate(event, day)} onClick={() => selectDate(day)} aria-pressed={day === date} aria-current={day === today ? 'date' : undefined} aria-label={`${Number(day.slice(0, 4))}년 ${Number(day.slice(5, 7))}월 ${Number(day.slice(8))}일${day === today ? `, ${referenceLabel}` : ''}, 지원 마감 ${events.length}곳`}>
                <span className="calendar-day-number">{Number(day.slice(8))}</span>{events.length > 0 && <><span className="calendar-event-label" data-count={events.length}><span className="calendar-event-name">{events[0].company_name}</span><span className="calendar-event-count">{events.length}곳</span></span><span className="calendar-event-dot" aria-hidden="true" /></>}
              </button>;
            })}
          </div>
          <div className="calendar-legend"><span><i className="legend-today" />{referenceLabel}</span><span><i className="legend-deadline" />지원 마감</span></div>
          </div>
        </section>
        <section className="calendar-agenda" aria-labelledby="agenda-title"><div className="agenda-heading"><span className="section-kicker">지원 전 확인</span><h2 id="agenda-title" ref={agendaTitle} tabIndex={-1}>{scope === 'upcoming' ? '다가오는 마감' : date ? `${Number(date.slice(5, 7))}월 ${Number(date.slice(8))}일` : `${Number(month.slice(5))}월의 마감`}<span>{visible.length}곳</span></h2><div className="agenda-scope-actions">{scope !== 'month' && <Button size="small" onClick={selectMonthAgenda}>{Number(month.slice(5))}월 전체 보기</Button>}{scope !== 'upcoming' && <Button size="small" onClick={selectUpcoming}>다가오는 마감</Button>}</div></div>
          <div className="agenda-list" aria-live="polite">{visible.map(a => <Link className="agenda-company" key={a.id} to={companyDestination(a.id)}><div className="agenda-company-top"><CompanyMark name={a.company_name} /><span className="agenda-company-identity"><strong>{a.company_name}</strong><span>{a.position || '직무 미입력'}</span></span></div><div className="agenda-company-bottom"><span>{Number(a.deadline.slice(5, 7))}.{Number(a.deadline.slice(8))} 마감</span><span className={a.deadline < today ? 'deadline-pill overdue' : 'deadline-pill'}>{deadlineLabel(a.deadline, today)}</span></div></Link>)}
            {!visible.length && <Empty title={scope === 'upcoming' ? '다가오는 마감이 없어요' : date ? '이 날은 마감이 없어요' : '이 달은 마감이 없어요'}><p>{scope === 'upcoming' ? '지원할 회사의 마감일을 등록해보세요.' : '다른 날짜나 달을 선택해보세요.'}</p></Empty>}
          </div>
        </section>
      </div>
      {(undated > 0 || overdue > 0) && <div className="calendar-followup">{overdue > 0 && <span>마감이 지난 미지원 회사 {overdue}곳</span>}{undated > 0 && <span>마감일 미등록 {undated}곳</span>}<Button component={Link} to="/?lane=before">지원 전 회사 확인</Button></div>}
    </>}
  </div>;
}
