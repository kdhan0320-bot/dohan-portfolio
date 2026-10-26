import { useState } from 'react';
import { Alert, Button } from '@mui/material';
import PreparationItem from '../ui/PreparationItem';
import useChecklist from '../../hooks/useChecklist';
import useInterviewNotes from '../../hooks/useInterviewNotes';
import { useToday } from '../../hooks/useToday';
import { CompanyMark, LoadState } from '../ui/PageUI';
import StatusChip from '../ui/StatusChip';
import { shortDate, deadlineLabel } from '../../utils/dates';
import { isValidApplicationUrl } from '../../utils/applicationPayload';

// The same readable record is used in the home preview and the working dialog.
// Preview data stays independent of the signed-in user's workspace.
export function CompanySummary({ application, tasks = [], notes = [], today, onToggle, busy = '', feedback }) {
  const companyTasks = tasks.filter(item => item.application_id === application.id);
  const companyNotes = notes.filter(item => item.application_id === application.id);
  const remaining = companyTasks.filter(item => !item.is_done).length;
  const pending = ['관심', '지원 예정'].includes(application.status);
  return <div className="company-summary">
    <div className="summary-identity"><CompanyMark name={application.company_name} /><div><p>{application.position || '직무 미입력'}</p><small>{[application.location, application.company_size].filter(Boolean).join(' · ')}</small></div><StatusChip status={application.status} /></div>
    <section className="summary-schedule" aria-label="지원 일정">
      <h3>지원 일정</h3>
      <dl><div><dt>공고 마감</dt><dd>{application.deadline ? <><time dateTime={application.deadline}>{shortDate(application.deadline)}</time>{pending && <span className="summary-deadline">{deadlineLabel(application.deadline, today)}</span>}</> : '미등록'}</dd></div><div><dt>지원한 날짜</dt><dd>{application.applied_date ? <time dateTime={application.applied_date}>{shortDate(application.applied_date)}</time> : pending ? '아직 지원 전' : '미등록'}</dd></div></dl>
    </section>
    <div className="summary-documents"><span>제출 서류</span><span>이력서 <b>{application.resume_submitted ? '제출 완료' : '미제출'}</b></span><span>포트폴리오 <b>{application.portfolio_submitted ? '제출 완료' : '미제출'}</b></span></div>
    <section className="summary-preparation" aria-label="이 회사의 준비할 일"><h3>준비할 일 <span>남은 {remaining}개</span></h3>
      {companyTasks.length ? <div>{companyTasks.map(item => onToggle ? <PreparationItem key={item.id} item={item} onToggle={onToggle} disabled={Boolean(busy)} /> : <div key={item.id} className="summary-preview-task"><span className="summary-task-state">{item.is_done ? '완료' : '할 일'}</span><span>{item.title}</span></div>)}</div> : <p className="summary-empty">등록한 준비 항목이 없어요.</p>}
      {feedback && <p className="summary-feedback" role={feedback.error ? 'alert' : 'status'}>{feedback.message}</p>}
    </section>
    {companyNotes.length > 0 && <section className="summary-questions"><h3>면접 질문 <span>{companyNotes.length}개</span></h3>{companyNotes.map(note => note.answer?.trim() ? <details className="summary-answer" key={note.id}><summary><span>{note.question}</span><small>답변 읽기</small></summary><p>{note.answer}</p></details> : <div className="summary-preview-task" key={note.id}><span>{note.question}</span><small>답변 준비 전</small></div>)}</section>}
    {application.memo && <section className="summary-memo"><h3>기록 메모</h3><p>{application.memo}</p></section>}
    {application.job_url && isValidApplicationUrl(application.job_url) && <Button component="a" href={application.job_url} target="_blank" rel="noopener noreferrer">채용 공고 보기 ↗</Button>}
  </div>;
}

export default function LiveCompanySummary({ application }) {
  const checklist = useChecklist();
  const interview = useInterviewNotes();
  const today = useToday();
  const [busy, setBusy] = useState('');
  const [feedback, setFeedback] = useState(null);
  async function toggle(item, checked) {
    if (busy) return;
    setBusy(item.id);
    try {
      await checklist.toggle(item.id, checked);
      setFeedback({ message: `${item.title} · ${checked ? '완료했어요' : '완료를 취소했어요'}` });
    } catch (error) { setFeedback({ error: true, message: error.message }); }
    finally { setBusy(''); }
  }
  return <>
    <LoadState loading={checklist.loading || interview.loading} error={checklist.error || interview.error} retry={() => { checklist.refresh(); interview.refresh(); }} />
    {!checklist.loading && !interview.loading && !checklist.error && !interview.error && <CompanySummary application={application} tasks={checklist.items} notes={interview.notes} today={today} onToggle={toggle} busy={busy} feedback={feedback} />}
    {(checklist.error || interview.error) && <Alert severity="info">회사 정보 수정은 아래 버튼에서 할 수 있어요.</Alert>}
  </>;
}
