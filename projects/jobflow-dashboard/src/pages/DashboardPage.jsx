import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Checkbox } from '@mui/material';
import Add from '@mui/icons-material/Add';
import useApplications from '../hooks/useApplications';
import useChecklist from '../hooks/useChecklist';
import { useAuth } from '../context/AuthContext';
import { useToday } from '../hooks/useToday';
import { deadlineLabel, daysUntil } from '../utils/dates';
import { companyDestination, pendingDeadlines, WEEKDAYS } from '../utils/calendar';
import { PageHeading, CompanyMark, LoadState, Empty } from '../components/ui/PageUI';
import StatusChip from '../components/ui/StatusChip';
import PaperGraphic from '../components/ui/PaperGraphic';
import ActionFeedback from '../components/ui/ActionFeedback';

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
  return <>
    <PageHeading title="오늘의 지원" description={`개인 입사 지원 기록 · ${dateText}`}><Button component={Link} to="/?new=1" variant="contained" startIcon={<Add />}>지원할 회사 등록</Button></PageHeading>
    <LoadState loading={apps.loading || check.loading} error={apps.error || check.error} retry={() => { apps.refresh(); check.refresh(); }} />
    {!apps.loading && !check.loading && !apps.error && !check.error && <>
      <section className={`next-application ${focus ? '' : 'next-application-empty'}`} aria-labelledby="next-title">
        <div className="next-application-copy"><span className="section-kicker">{focus ? '가장 가까운 지원 마감' : '나의 다음 기회'}</span><h2 id="next-title">{focus ? <>다음 지원은,<br />{focus.company_name}.</> : <>관심 있는 회사부터<br />시작해보세요.</>}</h2><p>{focus ? `${focus.position || '직무 미입력'} · ${deadlineLabel(focus.deadline, today)}` : '지원하고 싶은 회사를 등록하고 준비를 시작해요.'}</p><Button component={Link} to={focus ? companyDestination(focus.id) : '/?new=1'} variant="contained">{focus ? '지원 정보 열기' : '지원할 회사 등록'}</Button></div>
        <div className="deadline-visual" aria-hidden="true"><div className="date-ticket"><span>{focus ? `${Number(focus.deadline.slice(5, 7))}월 지원 마감` : '새로운 시작'}</span><strong>{focus ? Number(focus.deadline.slice(8)) : '+'}</strong><small>{focus ? `${WEEKDAYS[(focusDate.getUTCDay() + 6) % 7]}요일` : '관심 회사를 담아요'}</small><div className="ticket-stub">{focus ? daysUntil(focus.deadline, today) === 0 ? 'TODAY' : `D − ${daysUntil(focus.deadline, today)}` : '갈피록'}</div></div><span className="ticket-orbit ticket-orbit-one" /><span className="ticket-orbit ticket-orbit-two" /></div>
      </section>
      {overdue.length > 0 && <div className="overdue-note"><span>마감이 지난 미지원 회사가 {overdue.length}곳 있어요.</span><Button component={Link} to={`/?lane=before&company=${encodeURIComponent(overdue[0].id)}`}>확인하기</Button></div>}
      <div className="overview-grid">
        <section className="overview-panel" aria-labelledby="active-title"><header><h2 id="active-title">지원 중 <span>{active.length}</span></h2><Button component={Link} to="/">전체 현황</Button></header><div className="active-company-list">{active.slice(0, 3).map(a => <Link className="active-company" to={companyDestination(a.id)} key={a.id}><CompanyMark name={a.company_name} /><span className="active-company-copy"><strong>{a.company_name}</strong><small>{a.position || '직무 미입력'}</small></span><StatusChip status={a.status} /></Link>)}{!active.length && <Empty title="진행 중인 지원이 없어요"><Button component={Link} to="/">지원 현황 열기</Button></Empty>}</div></section>
        <section className="overview-panel" aria-labelledby="todo-title"><header><h2 id="todo-title">남은 준비 <span>{todo.length}</span></h2><Button component={Link} to="/checklist">전체 보기</Button></header><div className="overview-tasks">{todo.slice(0, 3).map(item => <label className="overview-task" key={item.id}><Checkbox checked={false} disabled={Boolean(busy)} onChange={() => complete(item)} slotProps={{ input: { 'aria-label': `${item.title} 완료` } }} /><span>{item.title}</span></label>)}{!todo.length && <Empty title={check.items.length ? '준비를 모두 마쳤어요' : '준비할 일을 추가해보세요'}><Button component={Link} to="/checklist">준비 체크 열기</Button></Empty>}</div></section>
      </div>
      <section className="prep-banner" aria-labelledby="prep-banner-title">
        <PaperGraphic kind="check" className="prep-banner-art" />
        <div className="prep-banner-copy">
          <h2 id="prep-banner-title">지원 전에, 제출할 자료부터.</h2>
          <p>회사별로 이력서·포트폴리오 준비 여부를 표시해두세요.</p>
        </div>
        <Button component={Link} to="/" variant="contained" className="prep-banner-action">지원 현황 확인</Button>
      </section>
    </>}
    <ActionFeedback feedback={feedback} onClose={() => setFeedback(null)} />
  </>;
}
