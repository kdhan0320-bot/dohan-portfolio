import { Link, useSearchParams } from 'react-router-dom';
import { Button, IconButton } from '@mui/material';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import Add from '@mui/icons-material/Add';
import ArrowForward from '@mui/icons-material/ArrowForward';
import useApplications from '../hooks/useApplications';
import { useToday } from '../hooks/useToday';
import { calendarState, companyDestination, monthCells, monthLabel, pendingDeadlines, shiftMonth, validDate, WEEKDAYS } from '../utils/calendar';
import { deadlineLabel } from '../utils/dates';
import { CompanyMark, Empty, LoadState, PageHeading } from '../components/ui/PageUI';

export default function CalendarPage() {
  const { applications, loading, error, refresh } = useApplications();
  const today = useToday();
  const [params, setParams] = useSearchParams();
  const { month, date } = calendarState(params, today);
  const deadlines = pendingDeadlines(applications);
  const inMonth = deadlines.filter(a => a.deadline.startsWith(month));
  const visible = date ? inMonth.filter(a => a.deadline === date) : inMonth;
  const undated = applications.filter(a => ['관심', '지원 예정'].includes(a.status) && !validDate(a.deadline)).length;
  const overdue = deadlines.filter(a => a.deadline < today).length;
  function selectMonth(value) { setParams({ month: value }); }
  function selectDate(value) { setParams({ month: value.slice(0, 7), date: value }); }
  return <>
    <PageHeading art="calendar" title="마감 일정" description="미지원 회사의 마감일"><Button component={Link} to="/?new=1" variant="contained" startIcon={<Add />}>회사 추가</Button></PageHeading>
    <LoadState loading={loading} error={error} retry={refresh} />
    {!loading && !error && <>
      <div className="calendar-layout">
        <section className="calendar-surface" aria-labelledby="calendar-month">
          <header className="calendar-toolbar"><h2 id="calendar-month" aria-live="polite">{monthLabel(month)}</h2><div><Button onClick={() => selectDate(today)}>오늘</Button><IconButton aria-label="이전 달" onClick={() => selectMonth(shiftMonth(month, -1))}><ChevronLeft /></IconButton><IconButton aria-label="다음 달" onClick={() => selectMonth(shiftMonth(month, 1))}><ChevronRight /></IconButton></div></header>
          <div className="calendar-week" aria-hidden="true">{WEEKDAYS.map(day => <span key={day}>{day}</span>)}</div>
          <div className="calendar-days" role="group" aria-label={`${monthLabel(month)} 날짜 선택`}>
            {monthCells(month).map(day => {
              const events = deadlines.filter(a => a.deadline === day);
              return <button type="button" key={day} className={`calendar-day ${day.startsWith(month) ? '' : 'other-month'} ${day === today ? 'is-today' : ''} ${day === date ? 'is-selected' : ''} ${events.length ? 'has-deadline' : ''}`} onClick={() => selectDate(day)} aria-pressed={day === date} aria-label={`${day.replaceAll('-', ' ')}${day === today ? ', 오늘' : ''}, 지원 마감 ${events.length}곳`}>
                <span className="calendar-day-number">{Number(day.slice(8))}</span>{events.length > 0 && <><span className="calendar-event-name">{events[0].company_name}</span><span className="calendar-event-count">마감 {events.length}곳</span><span className="calendar-event-dot" aria-hidden="true" /></>}
              </button>;
            })}
          </div>
          <div className="calendar-legend"><span><i className="legend-today" />오늘</span><span><i className="legend-deadline" />지원 마감</span></div>
        </section>
        <section className="calendar-agenda" aria-labelledby="agenda-title"><div className="agenda-heading"><span className="section-kicker">지원 전 확인</span><h2 id="agenda-title">{date ? `${Number(date.slice(5, 7))}월 ${Number(date.slice(8))}일` : `${Number(month.slice(5))}월의 마감`}<span>{visible.length}곳</span></h2>{date && <Button size="small" onClick={() => selectMonth(month)}>이번 달 전체 보기</Button>}</div>
          <div className="agenda-list" aria-live="polite">{visible.map(a => <Link className="agenda-company" key={a.id} to={companyDestination(a.id)}><div className="agenda-company-top"><CompanyMark name={a.company_name} /><span className={a.deadline < today ? 'deadline-pill overdue' : 'deadline-pill'}>{deadlineLabel(a.deadline, today)}</span></div><strong>{a.company_name}</strong><p>{a.position || '직무 미입력'}</p><div className="agenda-company-bottom"><span>{Number(a.deadline.slice(5, 7))}.{Number(a.deadline.slice(8))} 마감</span><ArrowForward fontSize="small" /></div></Link>)}
            {!visible.length && <Empty title={date ? '이 날은 마감이 없어요' : '이 달은 마감이 없어요'}><p>다른 날짜나 달을 선택해보세요.</p></Empty>}
          </div>
        </section>
      </div>
      {(undated > 0 || overdue > 0) && <div className="calendar-followup">{overdue > 0 && <span>마감이 지난 미지원 회사 {overdue}곳</span>}{undated > 0 && <span>마감일 미등록 {undated}곳</span>}<Button component={Link} to="/?lane=before">지원 전 회사 확인 <ArrowForward fontSize="small" /></Button></div>}
    </>}
  </>;
}
