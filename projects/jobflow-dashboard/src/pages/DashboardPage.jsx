import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Checkbox } from '@mui/material';
import Add from '@mui/icons-material/Add';
import useApplications from '../hooks/useApplications';
import useChecklist from '../hooks/useChecklist';
import useInterviewNotes from '../hooks/useInterviewNotes';
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
  const interview = useInterviewNotes();
  const { isGuest } = useAuth();
  const today = useToday();
  const [busy, setBusy] = useState('');
  const [feedback, setFeedback] = useState(null);
  const upcoming = pendingDeadlines(apps.applications).filter(a => a.deadline >= today);
  const overdue = pendingDeadlines(apps.applications).filter(a => a.deadline < today);
  const focus = upcoming[0];
  const todo = check.items.filter(i => !i.is_done);
  const companyById = new Map(apps.applications.map(application => [application.id, application]));
  const interviewCompanies = apps.applications.filter(application => application.status === '면접 예정');
  const remainingQuestions = interview.notes.filter(note => !note.is_reviewed);
  const companyPath = (path, id) => `${path}?company=${encodeURIComponent(id)}`;
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
    <LoadState loading={apps.loading || check.loading || interview.loading} error={apps.error || check.error || interview.error} retry={() => { apps.refresh(); check.refresh(); interview.refresh(); }} />
    {!apps.loading && !check.loading && !interview.loading && !apps.error && !check.error && !interview.error && <>
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
        <section className="overview-panel" aria-labelledby="todo-title">
          <header><h2 id="todo-title">오늘 챙길 준비 <span>{todo.length}</span></h2><Button component={Link} to="/checklist">준비 전체</Button></header>
          <div className="overview-tasks">
            {todo.slice(0, 3).map(item => {
              const company = companyById.get(item.application_id);
              return <div className="overview-task" key={item.id}>
                <Checkbox checked={false} disabled={Boolean(busy)} onChange={() => complete(item)} slotProps={{ input: { 'aria-label': `${item.title} 완료` } }} />
                <span className="overview-task-copy">
                  <span>{item.title}</span>
                  {company ? <Link to={companyPath('/checklist', company.id)} aria-label={`${company.company_name} 준비 체크 열기`}>{company.company_name}</Link> : <small>공통 준비</small>}
                </span>
              </div>;
            })}
            {!todo.length && <Empty title={check.items.length ? '준비를 모두 마쳤어요' : '준비할 일을 추가해보세요'}><Button component={Link} to="/checklist">준비 체크 열기</Button></Empty>}
          </div>
        </section>
        <section className="overview-panel" aria-labelledby="interview-title">
          <header><h2 id="interview-title">면접 준비 <span>{interviewCompanies.length}곳</span></h2><Button component={Link} to="/interview">질문 전체</Button></header>
          <div className="overview-interviews">
            {interviewCompanies.slice(0, 3).map(company => {
              const questions = interview.notes.filter(note => note.application_id === company.id);
              const remaining = questions.filter(note => !note.is_reviewed).length;
              return <div className="overview-interview" key={company.id}>
                <CompanyMark name={company.company_name} />
                <span className="overview-interview-copy">
                  <strong>{company.company_name}</strong>
                  <small>{!questions.length ? '질문을 준비해보세요' : remaining ? `연습할 질문 ${remaining}개` : '등록한 질문 연습 완료'}</small>
                </span>
                <Button component={Link} to={companyPath('/interview', company.id)} variant="outlined" size="small" aria-label={`${company.company_name} ${questions.length ? '면접 연습하기' : '면접 질문 준비'}`}>{questions.length ? '연습하기' : '질문 준비'}</Button>
              </div>;
            })}
            {!interviewCompanies.length && <Empty title="면접 예정인 회사가 없어요"><Button component={Link} to="/interview">{remainingQuestions.length ? `남은 질문 ${remainingQuestions.length}개 연습` : '면접 질문 준비하기'}</Button></Empty>}
          </div>
        </section>
      </div>
    </>}
    <ActionFeedback feedback={feedback} onClose={() => setFeedback(null)} />
  </div>;
}
