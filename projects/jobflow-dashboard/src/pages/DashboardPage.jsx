import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import Add from '@mui/icons-material/Add';
import useApplications from '../hooks/useApplications';
import useChecklist from '../hooks/useChecklist';
import { useAuth } from '../context/AuthContext';
import { useToday } from '../hooks/useToday';
import { deadlineLabel } from '../utils/dates';
import { WEEKDAYS } from '../utils/calendar';
import { BOARD_COLUMNS, boardColumn } from '../utils/applicationBoard';
import { attentionCompanies, beforeApplication } from '../utils/preparationGroups';
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
  const companies = attentionCompanies(apps.applications, check.items);
  const common = check.items.filter(item => !item.application_id);
  const pending = items => items.filter(item => !item.is_done).length;
  const nextCommon = common.find(item => !item.is_done);
  const date = new Date(`${today}T12:00:00Z`);
  const dateText = `${Number(today.slice(5, 7))}월 ${Number(today.slice(8))}일 ${WEEKDAYS[(date.getUTCDay() + 6) % 7]}요일${isGuest ? ' · 샘플 기준일' : ''}`;
  const loading = apps.loading || check.loading;
  const error = apps.error || check.error;
  return <div className="overview-page company-first-overview concise-overview">
    <PageHeading art="overview" title="오늘의 지원" description={dateText}><Button className="company-add-action" aria-label="지원할 회사 등록" component={Link} to="/?new=1" variant="contained" startIcon={<Add />}><span className="full-action-label">지원할 회사 등록</span><span className="compact-action-label">회사 등록</span></Button></PageHeading>
    <LoadState loading={loading} error={error} retry={() => { apps.refresh(); check.refresh(); }} />
    {!loading && !error && <>
      <section className="attention-section" aria-labelledby="attention-title">
        <div className="section-intro"><h2 id="attention-title">지금 챙길 회사</h2><p>가까운 마감과 면접 준비부터 확인하세요.</p></div>
        {companies.length ? <div className="today-records">{companies.map((company, index) => {
          const tasks = check.items.filter(item => item.application_id === company.id);
          const nextTask = tasks.find(item => !item.is_done);
          const stage = BOARD_COLUMNS.find(column => column.id === boardColumn(company.status));
          const upcoming = beforeApplication(company);
          return <article className={`today-record${index === 0 ? ' today-record-first' : ''}${upcoming ? '' : ' today-record-in-progress'}`} key={company.id} style={{ '--record-accent': stage?.color || '#58728e' }}>
            <div className="today-company"><RecordStage status={company.status} /><h3>{company.company_name}</h3><p>{company.position || '직무 미입력'}</p></div>
            {upcoming && <div className="today-date"><span>지원 마감</span><time className={company.deadline ? 'record-date' : undefined} dateTime={company.deadline || undefined}>{company.deadline ? <><span className="record-date-month">{Number(company.deadline.slice(5, 7))}.</span>{Number(company.deadline.slice(8, 10))}</> : '미등록'}</time>{company.deadline && <b>{deadlineLabel(company.deadline, today)}</b>}</div>}
            <div className="today-next"><span>다음 준비{pending(tasks) > 0 && <small> · 남은 {pending(tasks)}개</small>}</span><p>{nextTask?.title || (tasks.length ? '등록한 준비를 모두 마쳤어요' : '준비할 일을 등록해보세요')}</p></div>
            <Button className="today-record-open" disableRipple onClick={() => setSelectedId(company.id)} aria-haspopup="dialog" aria-label={`${company.company_name} 회사 기록 보기`}><span className="today-open-label">기록 보기</span><span aria-hidden="true">→</span></Button>
          </article>;
        })}</div> : <Empty title={apps.applications.length ? '지금 챙길 회사가 없어요' : '첫 지원 회사를 등록해보세요'}><Button component={Link} to={apps.applications.length ? '/' : '/?new=1'}>{apps.applications.length ? '지원 현황 보기' : '회사 등록하기'}</Button></Empty>}
      </section>
      <section className="today-common" aria-labelledby="common-preparation-title"><div><h2 id="common-preparation-title">공통 준비 <span>남은 {pending(common)}개</span></h2><p>{nextCommon?.title || (common.length ? '공통 준비를 모두 마쳤어요' : '회사와 관계없이 챙길 일을 등록해보세요')}</p></div><Button component={Link} to="/checklist?company=common">준비 관리</Button></section>
      <div className="support-summary" aria-label="내 지원 현황">
        <Link to="/">지원 현황 <strong>{apps.applications.length}곳</strong></Link>
        <dl>{BOARD_COLUMNS.map(column => <div key={column.id}><dt><i style={{ background: column.color }} aria-hidden="true" />{column.label}</dt><dd>{apps.applications.filter(company => boardColumn(company.status) === column.id).length}</dd></div>)}{apps.applications.some(company => company.status === '보류') && <div><dt>보류</dt><dd>{apps.applications.filter(company => company.status === '보류').length}</dd></div>}</dl>
      </div>

    </>}
    {selected && <ApplicationPanel key={selected.id} application={selected} creating={false} draftScope={isGuest ? 'sample' : `user:${user.id}`} onClose={() => { setSelectedId(null); check.refresh(); }} onSave={async payload => { await apps.update(selected.id, payload); setSelectedId(null); check.refresh(); setFeedback({ message: '회사 정보를 저장했어요.' }); }} onStatusChange={status => apps.update(selected.id, { status })} onDelete={async id => { await apps.remove(id); setSelectedId(null); check.refresh(); setFeedback({ message: '회사를 삭제했어요.' }); }} />}
    <ActionFeedback feedback={feedback} onClose={() => setFeedback(null)} />
  </div>;
}
