import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import Add from '@mui/icons-material/Add';
import useApplications from '../hooks/useApplications';
import useChecklist from '../hooks/useChecklist';
import useInterviewNotes from '../hooks/useInterviewNotes';
import { useAuth } from '../context/AuthContext';
import { useToday } from '../hooks/useToday';
import { deadlineLabel, shortDate } from '../utils/dates';
import { WEEKDAYS } from '../utils/calendar';
import { BOARD_COLUMNS, boardColumn } from '../utils/applicationBoard';
import { attentionCompanies, beforeApplication } from '../utils/preparationGroups';
import { PageHeading, LoadState, Empty } from '../components/ui/PageUI';
import StatusChip from '../components/ui/StatusChip';
import PreparationItem from '../components/ui/PreparationItem';
import ActionFeedback from '../components/ui/ActionFeedback';
import ApplicationPanel from '../components/applications/ApplicationPanel';

export default function DashboardPage() {
  const apps = useApplications();
  const check = useChecklist();
  const interview = useInterviewNotes();
  const { isGuest, user } = useAuth();
  const today = useToday();
  const [busy, setBusy] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [completedHere, setCompletedHere] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const taskInputs = useRef(new Map());
  const selected = apps.applications.find(company => company.id === selectedId);
  const companies = attentionCompanies(apps.applications, check.items);
  const common = check.items.filter(item => !item.application_id);
  const pending = items => items.filter(item => !item.is_done).length;
  const visible = items => items.filter(item => !item.is_done || completedHere.includes(item.id));
  const date = new Date(`${today}T12:00:00Z`);
  const dateText = `${Number(today.slice(5, 7))}월 ${Number(today.slice(8))}일 ${WEEKDAYS[(date.getUTCDay() + 6) % 7]}요일${isGuest ? ' · 샘플 기준일' : ''}`;
  const loading = apps.loading || check.loading || interview.loading;
  const error = apps.error || check.error || interview.error;
  async function complete(item, checked) {
    if (busy) return;
    const originalInput = taskInputs.current.get(item.id);
    const focused = document.activeElement === originalInput;
    setBusy(item.id);
    try {
      await check.toggle(item.id, checked);
      setCompletedHere(ids => checked ? [...new Set([...ids, item.id])] : ids.filter(id => id !== item.id));
      setFeedback({ message: checked ? '완료했어요. 다시 누르면 취소할 수 있어요.' : '완료 표시를 취소했어요.' });
    } catch (caught) { setFeedback({ severity: 'error', message: caught.message }); }
    finally {
      setBusy('');
      if (focused && (document.activeElement === document.body || document.activeElement === originalInput)) window.requestAnimationFrame(() => taskInputs.current.get(item.id)?.focus({ preventScroll: true }));
    }
  }
  const task = item => <PreparationItem key={item.id} item={item} onToggle={complete} disabled={Boolean(busy)} recent={completedHere.includes(item.id)} inputRef={node => { if (node) taskInputs.current.set(item.id, node); else taskInputs.current.delete(item.id); }} />;
  return <div className="overview-page company-first-overview">
    <PageHeading art="overview" title="오늘의 지원" description={dateText}><Button className="company-add-action" aria-label="지원할 회사 등록" component={Link} to="/?new=1" variant="contained" startIcon={<Add />}><span className="full-action-label">지원할 회사 등록</span><span className="compact-action-label">회사 등록</span></Button></PageHeading>
    <LoadState loading={loading} error={error} retry={() => { apps.refresh(); check.refresh(); interview.refresh(); }} />
    {!loading && !error && <>
      <section className="attention-section" aria-labelledby="attention-title">
        <div className="section-intro"><h2 id="attention-title">지금 챙길 회사</h2><p>지원 전 마감순 · 면접 준비</p></div>
        {companies.length ? <div className="attention-records">{companies.map(company => {
          const tasks = check.items.filter(item => item.application_id === company.id);
          const notes = interview.notes.filter(note => note.application_id === company.id);
          const stage = BOARD_COLUMNS.find(column => column.id === boardColumn(company.status));
          return <article className="company-record" key={company.id} style={{ '--record-accent': stage?.color || '#58728e' }}>
            <header className="company-record-heading"><span className="record-bookmark" aria-hidden="true" /><StatusChip status={company.status} /><h3>{company.company_name}</h3><p>{company.position || '직무 미입력'}</p></header>
            <div className="record-schedule"><span>공고 마감</span><time dateTime={company.deadline || undefined}>{company.deadline ? shortDate(company.deadline) : '미등록'}</time>{beforeApplication(company) && company.deadline && <b>{deadlineLabel(company.deadline, today)}</b>}</div>
            <section className="record-preparation" aria-label={`${company.company_name} 준비할 일`}><h4>남은 준비 <span>{pending(tasks)}개</span></h4>{visible(tasks).length ? visible(tasks).map(task) : <p className="record-empty-copy">{tasks.length ? '등록한 준비를 모두 마쳤어요.' : '아직 등록한 준비가 없어요.'}</p>}</section>
            {notes.length > 0 && <div className="record-question-note"><span>면접 질문 {notes.length}개</span><span>답변 작성 {notes.filter(note => note.answer?.trim()).length}개</span></div>}
            <div className="company-record-action"><Button onClick={() => setSelectedId(company.id)} aria-haspopup="dialog" aria-label={`${company.company_name} 회사 기록 보기`}>회사 기록 보기</Button></div>
          </article>;
        })}</div> : <Empty title={apps.applications.length ? '지금 챙길 회사가 없어요' : '첫 지원 회사를 등록해보세요'}><Button component={Link} to={apps.applications.length ? '/' : '/?new=1'}>{apps.applications.length ? '지원 현황 보기' : '회사 등록하기'}</Button></Empty>}
      </section>
      <section className="common-preparation" aria-labelledby="common-preparation-title"><header><div><h2 id="common-preparation-title">공통 준비 <span>남은 {pending(common)}개</span></h2><p>회사와 관계없이 챙길 일</p></div><Button component={Link} to="/checklist">준비 관리</Button></header><div className="common-preparation-items">{visible(common).length ? visible(common).map(task) : <p className="record-empty-copy">{common.length ? '공통 준비를 모두 마쳤어요.' : '등록한 공통 준비가 없어요.'}</p>}</div></section>
      <div className="support-summary" aria-label="내 지원 현황">
        <Link to="/">지원 현황 <strong>{apps.applications.length}곳</strong></Link>
        <dl>{BOARD_COLUMNS.map(column => <div key={column.id}><dt><i style={{ background: column.color }} aria-hidden="true" />{column.label}</dt><dd>{apps.applications.filter(company => boardColumn(company.status) === column.id).length}</dd></div>)}{apps.applications.some(company => company.status === '보류') && <div><dt>보류</dt><dd>{apps.applications.filter(company => company.status === '보류').length}</dd></div>}</dl>
      </div>

    </>}
    {selected && <ApplicationPanel key={selected.id} application={selected} creating={false} draftScope={isGuest ? 'sample' : `user:${user.id}`} onClose={() => { setSelectedId(null); check.refresh(); }} onSave={async payload => { await apps.update(selected.id, payload); setSelectedId(null); check.refresh(); setFeedback({ message: '회사 정보를 저장했어요.' }); }} onDelete={async id => { await apps.remove(id); setSelectedId(null); check.refresh(); interview.refresh(); setFeedback({ message: '회사를 삭제했어요.' }); }} />}
    <ActionFeedback feedback={feedback} onClose={() => setFeedback(null)} />
  </div>;
}
