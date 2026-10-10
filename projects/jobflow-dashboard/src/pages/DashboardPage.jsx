import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Checkbox } from '@mui/material';
import Add from '@mui/icons-material/Add';
import useApplications from '../hooks/useApplications';
import useChecklist from '../hooks/useChecklist';
import { useAuth } from '../context/AuthContext';
import { useToday } from '../hooks/useToday';
import { deadlineLabel } from '../utils/dates';
import { companyDestination, pendingDeadlines, WEEKDAYS } from '../utils/calendar';
import { PageHeading, CompanyMark, LoadState, Empty } from '../components/ui/PageUI';
import StatusChip from '../components/ui/StatusChip';
import ActionFeedback from '../components/ui/ActionFeedback';
import '../styles/overview-refinement.css';

export default function DashboardPage() {
  const apps = useApplications();
  const check = useChecklist();
  const { isGuest } = useAuth();
  const today = useToday();
  const [busy, setBusy] = useState('');
  const [feedback, setFeedback] = useState(null);
  const upcoming = pendingDeadlines(apps.applications).filter(a => a.deadline >= today);
  const overdue = pendingDeadlines(apps.applications).filter(a => a.deadline < today);
  const focus = upcoming[0];
  const todo = check.items.filter(i => !i.is_done);
  const active = apps.applications.filter(a => ['지원 완료', '서류 진행', '면접 예정'].includes(a.status));
  const date = new Date(`${today}T12:00:00Z`);
  const dateText = `${Number(today.slice(5, 7))}월 ${Number(today.slice(8))}일 ${WEEKDAYS[(date.getUTCDay() + 6) % 7]}요일${isGuest ? ' · 샘플 기준일' : ''}`;
  const focusDate = focus && new Date(`${focus.deadline}T12:00:00Z`);
  async function complete(item) {
    if (busy) return;
    setBusy(item.id);
    try { await check.toggle(item.id, true); setFeedback({ message: '준비할 일을 완료했어요.' }); }
    catch (e) { setFeedback({ severity: 'error', message: e.message }); }
    finally { setBusy(''); }
  }
  return <div className="overview-page">
    <PageHeading art="overview" title="오늘의 지원" description={dateText}><Button component={Link} to="/?new=1" variant="contained" startIcon={<Add />}>지원할 회사 등록</Button></PageHeading>
    <LoadState loading={apps.loading || check.loading} error={apps.error || check.error} retry={() => { apps.refresh(); check.refresh(); }} />
    {!apps.loading && !check.loading && !apps.error && !check.error && <>
      <section className="overview-deadline" aria-labelledby="next-title">
        <header className="overview-deadline-heading">
          <h2 id="next-title">가까운 지원 마감</h2>
          <Button component={Link} to="/calendar">마감 일정 보기</Button>
        </header>
        {focus ? <div className="overview-deadline-body">
          <div className="overview-deadline-company">
            <CompanyMark name={focus.company_name} />
            <div className="overview-deadline-identity">
              <h3>{focus.company_name}</h3>
              <p>{focus.position || '직무 미입력'}</p>
              <StatusChip status={focus.status} />
            </div>
          </div>
          <div className="overview-deadline-date">
            <strong>{deadlineLabel(focus.deadline, today)}</strong>
            <time dateTime={focus.deadline}>{focus.deadline.replaceAll('-', '.')} <span>({WEEKDAYS[(focusDate.getUTCDay() + 6) % 7]}) 마감</span></time>
            <Button component={Link} to={companyDestination(focus.id)} variant="outlined">지원 정보 열기</Button>
          </div>
        </div> : <div className="overview-deadline-empty">
          <div>
            <h3>{apps.applications.length ? '다가오는 지원 마감이 없어요' : '지원할 회사를 등록해보세요'}</h3>
            <p>{apps.applications.length ? '지원 전 회사의 다가오는 마감을 확인할 수 있어요.' : '회사와 마감일을 기록하면 여기서 확인할 수 있어요.'}</p>
          </div>
          <Button component={Link} to={apps.applications.length ? '/' : '/?new=1'} variant="outlined">{apps.applications.length ? '지원 현황 열기' : '지원할 회사 등록'}</Button>
        </div>}
      </section>
      {overdue.length > 0 && <div className="overdue-note"><span>마감이 지난 미지원 회사가 {overdue.length}곳 있어요.</span><Button component={Link} to={`/?lane=before&company=${encodeURIComponent(overdue[0].id)}`}>확인하기</Button></div>}
      <div className="overview-grid">
        <section className="overview-panel" aria-labelledby="active-title"><header><h2 id="active-title">지원 중 <span>{active.length}</span></h2><Button component={Link} to="/">전체 현황</Button></header><div className="active-company-list">{active.slice(0, 3).map(a => <Link className="active-company" to={companyDestination(a.id)} key={a.id}><CompanyMark name={a.company_name} /><span className="active-company-copy"><strong>{a.company_name}</strong><small>{a.position || '직무 미입력'}</small></span><StatusChip status={a.status} /></Link>)}{!active.length && <Empty title="진행 중인 지원이 없어요"><Button component={Link} to="/">지원 현황 열기</Button></Empty>}</div></section>
        <section className="overview-panel" aria-labelledby="todo-title"><header><h2 id="todo-title">남은 준비 <span>{todo.length}</span></h2><Button component={Link} to="/checklist">전체 보기</Button></header><div className="overview-tasks">{todo.slice(0, 3).map(item => <label className="overview-task" key={item.id}><Checkbox checked={false} disabled={Boolean(busy)} onChange={() => complete(item)} slotProps={{ input: { 'aria-label': `${item.title} 완료` } }} /><span>{item.title}</span></label>)}{!todo.length && <Empty title={check.items.length ? '준비를 모두 마쳤어요' : '준비할 일을 추가해보세요'}><Button component={Link} to="/checklist">준비 체크 열기</Button></Empty>}</div></section>
      </div>
    </>}
    <ActionFeedback feedback={feedback} onClose={() => setFeedback(null)} />
  </div>;
}
