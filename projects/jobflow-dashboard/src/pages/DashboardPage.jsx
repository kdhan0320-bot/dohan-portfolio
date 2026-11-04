import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@mui/material';
import useApplications from '../hooks/useApplications';
import useChecklist from '../hooks/useChecklist';
import { useAuth } from '../context/AuthContext';
import { useToday } from '../hooks/useToday';
import { deadlineLabel, interviewDayLabel, shortDate } from '../utils/dates';
import { WEEKDAYS } from '../utils/calendar';
import { BOARD_COLUMNS, boardColumn } from '../utils/applicationBoard';
import { todayCompanyGroups, beforeApplication } from '../utils/preparationGroups';
import { LoadState, Empty } from '../components/ui/PageUI';
import RecordStage from '../components/ui/RecordStage';
import ActionFeedback from '../components/ui/ActionFeedback';
import ApplicationPanel from '../components/applications/ApplicationPanel';
import DiaryBookmark from '../components/ui/DiaryBookmark';

export default function DashboardPage() {
  const apps = useApplications();
  const check = useChecklist();
  const { isGuest, user } = useAuth();
  const { state } = useLocation();
  const sampleCompanyId = isGuest ? state?.sampleCompanyId : null;
  const sampleRow = useRef(null);
  const today = useToday();
  const [feedback, setFeedback] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const selected = apps.applications.find(company => company.id === selectedId);
  const { current: companies, needsReview } = todayCompanyGroups(apps.applications, check.items, today);
  const common = check.items.filter(item => !item.application_id);
  const pending = items => items.filter(item => !item.is_done).length;
  const nextCommon = common.find(item => !item.is_done);
  const date = new Date(`${today}T12:00:00Z`);
  const dateText = `${Number(today.slice(5, 7))}월 ${Number(today.slice(8))}일 ${WEEKDAYS[(date.getUTCDay() + 6) % 7]}요일${isGuest ? ' · 샘플 기준일' : ''}`;
  const loading = apps.loading || check.loading;
  const error = apps.error || check.error;
  useEffect(() => {
    if (!sampleCompanyId || loading || error || !sampleRow.current) return;
    const frame = window.requestAnimationFrame(() => {
      sampleRow.current?.focus({ preventScroll: true });
      sampleRow.current?.scrollIntoView({ block: 'nearest' });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [sampleCompanyId, loading, error]);
  function companyRow(company, review = false) {
    const tasks = check.items.filter(item => item.application_id === company.id);
    const remaining = tasks.filter(item => !item.is_done);
    const nextTask = remaining[0];
    const upcoming = beforeApplication(company);
    const interview = company.status === '면접 예정';
    const scheduleDate = upcoming ? company.deadline : company.interview_date;
    const fromSample = company.id === sampleCompanyId;
    return <article className={`diary-entry${review ? ' diary-entry-review' : ''}${upcoming ? '' : ' diary-entry-followup'}`} key={company.id}
      ref={fromSample ? sampleRow : undefined} tabIndex={fromSample ? -1 : undefined}
      aria-labelledby={`today-name-${company.id}`} aria-describedby={fromSample ? `today-next-${company.id}` : undefined}>
      <div className="diary-entry-date">
        <span>{upcoming ? '지원 마감' : interview ? '면접일' : '전형 진행'}</span>
        {(upcoming || interview) && scheduleDate ? <time dateTime={scheduleDate}>{shortDate(scheduleDate)}</time> : <strong>{upcoming ? '미등록' : interview ? '미정' : '서류'}</strong>}
        {interview && scheduleDate && <span className="diary-dday">{interviewDayLabel(scheduleDate, today)}</span>}
        {upcoming && company.deadline && <span className="diary-dday">{review ? '마감 지남' : deadlineLabel(company.deadline, today)}</span>}
      </div>
      <div className="diary-entry-company">
        <div className="diary-company-title"><h3 id={`today-name-${company.id}`}>{company.company_name}</h3><RecordStage status={company.status} /></div>
        <p>{company.position || '직무 미입력'}{!upcoming && <span className="diary-applied-date">{company.applied_date ? <>지원 <time dateTime={company.applied_date}>{shortDate(company.applied_date)}</time></> : '지원일 미등록'}</span>}</p>
      </div>
      <div id={`today-next-${company.id}`} className={`diary-entry-next${!review && !nextTask ? ' is-quiet' : ''}`}>
        {(review || nextTask) && <span>{review ? '확인할 내용' : '다음 준비'}</span>}
        <p>{review ? '실제 지원 상태 확인' : nextTask?.title || (tasks.length ? '준비 완료' : '등록한 준비 없음')}
          {!review && remaining.length > 1 && <small> 외 {remaining.length - 1}개</small>}
        </p>
      </div>
      <Button className="diary-entry-open" disableRipple onClick={() => setSelectedId(company.id)} aria-haspopup="dialog" aria-label={`${company.company_name} 회사 기록 보기`}><span className="diary-action-label" data-label={review ? '지원 여부 확인' : '기록 보기'}>{review ? '지원 여부 확인' : '기록 보기'}</span></Button>
    </article>;
  }
  return <div className="diary-overview">
    <header className="diary-page-heading">
      <time className="diary-date-stamp" dateTime={today} aria-label={`${today.slice(0, 4)}년 ${dateText}`}><span>{today.slice(0, 7).replace('-', '.')}</span><strong>{Number(today.slice(8))}</strong></time>
      <div className="diary-heading-copy"><h1>오늘의 지원 기록</h1><p>{WEEKDAYS[(date.getUTCDay() + 6) % 7]}요일{isGuest ? ' · 샘플 기준일' : ''}</p></div>
      <DiaryBookmark label="오늘" />
    </header>
    <LoadState loading={loading} error={error} retry={() => { apps.refresh(); check.refresh(); }} />
    {!loading && !error && <div className="diary-workday">
      <div className="diary-support-summary" aria-label="내 지원 현황">
        <Link to="/">전체 지원 <strong>{apps.applications.length}곳</strong></Link>
        <dl>{BOARD_COLUMNS.map(column => <div key={column.id}><dt>{column.label}</dt><dd>{apps.applications.filter(company => boardColumn(company.status) === column.id).length}</dd></div>)}{apps.applications.some(company => company.status === '보류') && <div><dt>보류</dt><dd>{apps.applications.filter(company => company.status === '보류').length}</dd></div>}</dl>
      </div>
      <div className="diary-company-records">
      <section className="diary-attention" aria-labelledby="attention-title">
        <div className="diary-section-heading"><h2 id="attention-title">지금 챙길 회사 <span>{companies.length}곳</span></h2><p>지원 전 · 면접 예정 · 준비가 남은 서류 전형</p></div>
        {companies.length ? <div className="diary-entries">{companies.map(company => companyRow(company))}</div> : needsReview.length ? <p className="diary-empty-note">아래에서 지난 마감의 지원 여부를 먼저 확인해주세요.</p> : <Empty title={apps.applications.length ? '지금 챙길 회사가 없어요' : '첫 지원 회사를 등록해보세요'}><Button component={Link} to="/">지원 관리로 이동</Button></Empty>}
      </section>
      {needsReview.length > 0 && <section className="diary-review" aria-labelledby="review-title">
        <div className="diary-section-heading"><h2 id="review-title">지원 여부 확인 <span>{needsReview.length}곳</span></h2></div>
        <div className="diary-entries">{needsReview.map(company => companyRow(company, true))}</div>
      </section>}
      </div>
      <section className="diary-common" aria-labelledby="common-preparation-title"><div><h2 id="common-preparation-title">공통 준비 <span>남은 {pending(common)}개</span></h2><p>{nextCommon?.title || (common.length ? '공통 준비를 모두 마쳤어요' : '회사와 관계없이 챙길 일을 등록해보세요')}</p></div><Button component={Link} to="/checklist?company=common" disableRipple><span className="diary-action-label" data-label="준비 관리">준비 관리</span></Button></section>
    </div>}
    {selected && <ApplicationPanel fromToday={!needsReview.some(company => company.id === selected.id)} key={selected.id} application={selected} creating={false} draftScope={isGuest ? 'sample' : `user:${user.id}`} onClose={() => { setSelectedId(null); check.refresh(); }} onSave={async payload => { await apps.update(selected.id, payload); setSelectedId(null); check.refresh(); setFeedback({ message: '회사 정보를 저장했어요.' }); }} onStatusChange={status => apps.update(selected.id, { status })} onDelete={async id => { await apps.remove(id); setSelectedId(null); check.refresh(); setFeedback({ message: '회사를 삭제했어요.' }); }} />}
    <ActionFeedback feedback={feedback} onClose={() => setFeedback(null)} />
  </div>;
}
