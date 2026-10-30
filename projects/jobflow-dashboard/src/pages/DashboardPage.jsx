import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import useApplications from '../hooks/useApplications';
import useChecklist from '../hooks/useChecklist';
import { useAuth } from '../context/AuthContext';
import { useToday } from '../hooks/useToday';
import { deadlineLabel } from '../utils/dates';
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
  function companyRow(company, review = false) {
    const tasks = check.items.filter(item => item.application_id === company.id);
    const nextTask = tasks.find(item => !item.is_done);
    const upcoming = beforeApplication(company);
    const recordDate = upcoming ? company.deadline : company.applied_date;
    return <article className={`diary-entry${review ? ' diary-entry-review' : ''}${upcoming ? '' : ' diary-entry-followup'}`} key={company.id}>
      <div className="diary-entry-date">
        <span>{upcoming ? '지원 마감' : '전형 진행'}</span>
        {upcoming ? <time dateTime={recordDate || undefined}>{recordDate ? `${Number(recordDate.slice(5, 7))}.${Number(recordDate.slice(8, 10))}` : '미등록'}</time> : <strong>{company.status === '면접 예정' ? '면접' : '서류'}</strong>}
        {upcoming && company.deadline && <span className="diary-dday">{review ? '마감 지남' : deadlineLabel(company.deadline, today)}</span>}
      </div>
      <div className="diary-entry-company">
        <div className="diary-company-title"><h3>{company.company_name}</h3><RecordStage status={company.status} /></div>
        <p>{company.position || '직무 미입력'}{!upcoming && <span className="diary-applied-date">{recordDate ? <>지원 <time dateTime={recordDate}>{Number(recordDate.slice(5, 7))}.{Number(recordDate.slice(8, 10))}</time></> : '지원일 미등록'}</span>}</p>
      </div>
      <div className="diary-entry-next"><span>{review ? '확인할 내용' : '남은 준비'}{!review && pending(tasks) > 0 && <small> · {pending(tasks)}개</small>}</span><p>{review ? '실제 지원 상태 확인' : nextTask?.title || (tasks.length ? '준비 완료' : '등록한 준비 없음')}</p></div>
      <Button className="diary-entry-open" disableRipple onClick={() => setSelectedId(company.id)} aria-haspopup="dialog" aria-label={`${company.company_name} 회사 기록 보기`}><span>{review ? '지원 여부 확인' : '기록 보기'}</span><span aria-hidden="true">↗</span></Button>
    </article>;
  }
  return <div className="diary-overview">
    <header className="diary-page-heading">
      <time className="diary-date-stamp" dateTime={today} aria-label={`${today.slice(0, 4)}년 ${dateText}`}><span>{today.slice(0, 7).replace('-', '.')}</span><strong>{Number(today.slice(8))}</strong></time>
      <div><p>{WEEKDAYS[(date.getUTCDay() + 6) % 7]}요일{isGuest ? ' · 샘플 기준일' : ''}</p><h1>오늘의 지원 기록</h1></div>
      <DiaryBookmark label="오늘" />
    </header>
    <LoadState loading={loading} error={error} retry={() => { apps.refresh(); check.refresh(); }} />
    {!loading && !error && <>
      <div className="diary-support-summary" aria-label="내 지원 현황">
        <Link to="/">전체 지원 <strong>{apps.applications.length}곳</strong></Link>
        <dl>{BOARD_COLUMNS.map(column => <div key={column.id}><dt>{column.label}</dt><dd>{apps.applications.filter(company => boardColumn(company.status) === column.id).length}</dd></div>)}{apps.applications.some(company => company.status === '보류') && <div><dt>보류</dt><dd>{apps.applications.filter(company => company.status === '보류').length}</dd></div>}</dl>
      </div>
      <section className="diary-attention" aria-labelledby="attention-title">
        <div className="diary-section-heading"><h2 id="attention-title">지금 챙길 회사 <span>{companies.length}곳</span></h2><p>지원 전 · 면접 예정 · 준비가 남은 서류 전형</p></div>
        {companies.length ? <div className="diary-entries">{companies.map(company => companyRow(company))}</div> : needsReview.length ? <p className="diary-empty-note">아래에서 지난 마감의 지원 여부를 먼저 확인해주세요.</p> : <Empty title={apps.applications.length ? '지금 챙길 회사가 없어요' : '첫 지원 회사를 등록해보세요'}><Button component={Link} to="/">지원 관리로 이동</Button></Empty>}
      </section>
      {needsReview.length > 0 && <section className="diary-review" aria-labelledby="review-title">
        <div className="diary-section-heading"><h2 id="review-title">지원 여부 확인 <span>{needsReview.length}곳</span></h2></div>
        <div className="diary-entries">{needsReview.map(company => companyRow(company, true))}</div>
      </section>}
      <section className="diary-common" aria-labelledby="common-preparation-title"><div><h2 id="common-preparation-title">공통 준비 <span>남은 {pending(common)}개</span></h2><p>{nextCommon?.title || (common.length ? '공통 준비를 모두 마쳤어요' : '회사와 관계없이 챙길 일을 등록해보세요')}</p></div><Button component={Link} to="/checklist?company=common">준비 관리 <span aria-hidden="true">↗</span></Button></section>
    </>}
    {selected && <ApplicationPanel key={selected.id} application={selected} creating={false} draftScope={isGuest ? 'sample' : `user:${user.id}`} onClose={() => { setSelectedId(null); check.refresh(); }} onSave={async payload => { await apps.update(selected.id, payload); setSelectedId(null); check.refresh(); setFeedback({ message: '회사 정보를 저장했어요.' }); }} onStatusChange={status => apps.update(selected.id, { status })} onDelete={async id => { await apps.remove(id); setSelectedId(null); check.refresh(); setFeedback({ message: '회사를 삭제했어요.' }); }} />}
    <ActionFeedback feedback={feedback} onClose={() => setFeedback(null)} />
  </div>;
}
