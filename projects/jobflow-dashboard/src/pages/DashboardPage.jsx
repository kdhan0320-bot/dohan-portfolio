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
import { PageHeading, LoadState, Empty } from '../components/ui/PageUI';
import RecordStage from '../components/ui/RecordStage';
import ActionFeedback from '../components/ui/ActionFeedback';
import ApplicationPanel from '../components/applications/ApplicationPanel';

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
    return <article className="today-record" key={company.id}>
      <div className="today-company"><div className="today-status-line"><RecordStage status={company.status} />{upcoming && company.deadline && <span className="deadline-badge">{review ? '마감 지남' : deadlineLabel(company.deadline, today)}</span>}</div><h3>{company.company_name}</h3><p>{company.position || '직무 미입력'}</p></div>
      <div className="today-date"><span>{upcoming ? '지원 마감' : '지원한 날짜'}</span><time className={recordDate ? 'record-date' : undefined} dateTime={recordDate || undefined}>{recordDate ? <><span className="record-date-month">{Number(recordDate.slice(5, 7))}.</span>{Number(recordDate.slice(8, 10))}</> : '미등록'}</time></div>
      <div className="today-next"><span>{review ? '확인할 내용' : '남은 준비'}{!review && pending(tasks) > 0 && <small> · {pending(tasks)}개</small>}</span><p>{review ? '실제 지원 상태 확인' : nextTask?.title || (tasks.length ? '준비 완료' : '등록한 준비 없음')}</p></div>
      <Button className="today-record-open" disableRipple onClick={() => setSelectedId(company.id)} aria-haspopup="dialog" aria-label={`${company.company_name} 회사 기록 보기`}><span className="today-open-label">{review ? '지원 여부 확인' : '기록 보기'}</span><span aria-hidden="true">→</span></Button>
    </article>;
  }
  return <div className="overview-page company-first-overview concise-overview">
    <PageHeading art="overview" title="오늘" description={dateText} />
    <LoadState loading={loading} error={error} retry={() => { apps.refresh(); check.refresh(); }} />
    {!loading && !error && <>
      <section className="attention-section" aria-labelledby="attention-title">
        <div className="overview-section-heading"><h2 id="attention-title">지금 챙길 회사</h2><p className="today-scope-note">지원 전 · 면접 예정 · 준비가 남은 서류 전형</p><div className="support-summary" aria-label="내 지원 현황">
        <Link to="/">전체 지원 <strong>{apps.applications.length}곳</strong></Link>
        <dl>{BOARD_COLUMNS.map(column => <div key={column.id}><dt><i style={{ background: column.color }} aria-hidden="true" />{column.label}</dt><dd>{apps.applications.filter(company => boardColumn(company.status) === column.id).length}</dd></div>)}{apps.applications.some(company => company.status === '보류') && <div><dt>보류</dt><dd>{apps.applications.filter(company => company.status === '보류').length}</dd></div>}</dl>
      </div></div>
        {companies.length ? <div className="today-records">{companies.map(company => companyRow(company))}</div> : needsReview.length ? <p className="today-empty-note">아래에서 지난 마감의 지원 여부를 먼저 확인해주세요.</p> : <Empty title={apps.applications.length ? '지금 챙길 회사가 없어요' : '첫 지원 회사를 등록해보세요'}><Button component={Link} to="/">지원 관리로 이동</Button></Empty>}
      </section>
      {needsReview.length > 0 && <section className="today-review" aria-labelledby="review-title">
        <div className="section-intro"><h2 id="review-title">지원 여부 확인 <span>{needsReview.length}곳</span></h2></div>
        <div className="today-records">{needsReview.map(company => companyRow(company, true))}</div>
      </section>}
      <section className="today-common" aria-labelledby="common-preparation-title"><div><h2 id="common-preparation-title">공통 준비 <span>남은 {pending(common)}개</span></h2><p>{nextCommon?.title || (common.length ? '공통 준비를 모두 마쳤어요' : '회사와 관계없이 챙길 일을 등록해보세요')}</p></div><Button component={Link} to="/checklist?company=common">준비 관리</Button></section>


    </>}
    {selected && <ApplicationPanel key={selected.id} application={selected} creating={false} draftScope={isGuest ? 'sample' : `user:${user.id}`} onClose={() => { setSelectedId(null); check.refresh(); }} onSave={async payload => { await apps.update(selected.id, payload); setSelectedId(null); check.refresh(); setFeedback({ message: '회사 정보를 저장했어요.' }); }} onStatusChange={status => apps.update(selected.id, { status })} onDelete={async id => { await apps.remove(id); setSelectedId(null); check.refresh(); setFeedback({ message: '회사를 삭제했어요.' }); }} />}
    <ActionFeedback feedback={feedback} onClose={() => setFeedback(null)} />
  </div>;
}
