import Field from '../components/ui/Field';
import { APPLICATION_STAGES, getApplicationStage } from '../utils/applicationStages';
import { StageArt } from '../components/ui/JournalArt';
import { useToday } from '../hooks/useToday';
import { deadlineLabel } from '../utils/dates';
import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button, MenuItem, FormControlLabel, Checkbox } from '@mui/material';
import EditOutlined from '@mui/icons-material/EditOutlined';
import OpenInNew from '@mui/icons-material/OpenInNew';
import useApplications from '../hooks/useApplications';
import { APPLICATION_STATUSES } from '../constants';
import { isValidApplicationUrl } from '../utils/applicationPayload';
import { PageHeading, CompanyMark, LoadState, Empty, Panel, ConfirmDelete } from '../components/ui/PageUI';
import ActionFeedback from '../components/ui/ActionFeedback';
export default function ApplicationDetailPage() {
  const {
    id
  } = useParams();
  const navigate = useNavigate();
  const {
    applications,
    loading,
    error,
    refresh,
    update,
    remove
  } = useApplications();
  const [feedback, setFeedback] = useState(null);
  const [busy, setBusy] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const today = useToday();
  const a = applications.find(a => a.id === id);
  async function save(payload) {
    setBusy(true);
    try {
      await update(id, payload);
      setFeedback({
        message: '지원 기록을 수정했어요.'
      });
    } catch (e) {
      setFeedback({
        severity: 'error',
        message: e.message
      });
    } finally {
      setBusy(false);
    }
  }
  async function deleteRow() {
    setBusy(true);
    try {
      await remove(id);
      navigate('/applications', {
        replace: true
      });
    } catch (e) {
      setFeedback({
        severity: 'error',
        message: e.message
      });
    } finally {
      setBusy(false);
    }
  }
  if (loading || error) return <LoadState loading={loading} error={error} retry={refresh} />;
  if (!a) return <Empty title="지원 기록을 찾을 수 없어요">
  <Button component={Link} to="/applications">목록으로 돌아가기</Button>
</Empty>;
  return <>
  <Button component={Link} to="/applications" sx={{
      mb: 2,
      ml: -2
    }}>← 지원 관리</Button>
  <PageHeading title="지원 기록">
    <Button component={Link} to={`/applications/${id}/edit`} variant="outlined" startIcon={<EditOutlined />}>수정</Button>
  </PageHeading>
  <ol className="detail-journey" aria-label="이 회사의 현재 단계">
    {APPLICATION_STAGES.map((stage, index) => <li key={stage.id} aria-current={stage.statuses.includes(a.status) ? 'step' : undefined}>
      <span>{stage.number}</span><strong>{stage.label}</strong>
      {stage.statuses.includes(a.status) && <small>현재 단계</small>}
      {index < 2 && <b aria-hidden="true">→</b>}
    </li>)}
  </ol>
  <div className="detail-grid">
    <section className="panel panel-body">
      <div className="detail-title">
        <CompanyMark name={a.company_name} />
        <div>
          <h2>
            {a.company_name}
          </h2>
          <p className="muted">
            {a.position || '직무 미입력'}
          </p>
        </div>
      </div>
      <Field fullWidth select label="전형 상태" value={a.status} disabled={busy} onChange={e => save({
          status: e.target.value
        })}>
        {APPLICATION_STATUSES.map(s => <MenuItem value={s.value} key={s.value}>
          {s.label}
        </MenuItem>)}
      </Field>
      <dl className="detail-fields">
        {[['근무 지역', a.location], ['기업 규모', a.company_size], ['지원한 날짜', a.applied_date], ['공고 마감일', a.deadline ? `${a.deadline} · ${deadlineLabel(a.deadline, today)}` : null], ['우선순위', a.priority]].map(([label, value]) => <div key={label}>
          <dt>
            {label}
          </dt>
          <dd>
            {value || '미입력'}
          </dd>
        </div>)}
      </dl>
      {a.job_url && isValidApplicationUrl(a.job_url) && <Button component="a" href={a.job_url} target="_blank" rel="noopener noreferrer" endIcon={<OpenInNew />} variant="outlined">채용 공고 보기</Button>}
      <div style={{
          borderTop: '1px solid #E3DDD7',
          marginTop: 28,
          paddingTop: 24
        }}>
        <h3 style={{
            marginBottom: 12
          }}>기억할 내용</h3>
        <p className="memo-text">
          {a.memo || '아직 메모가 없어요. 수정 화면에서 기록해보세요.'}
        </p>
      </div>
    </section>
    <div>
      <Panel title="제출한 자료">
        <div className="panel-body" style={{
            paddingTop: 0,
            display: 'flex',
            flexDirection: 'column'
          }}>
          <FormControlLabel control={<Checkbox checked={Boolean(a.resume_submitted)} disabled={busy} onChange={e => save({
              resume_submitted: e.target.checked
            })} />} label="이력서" />
          <FormControlLabel control={<Checkbox checked={Boolean(a.portfolio_submitted)} disabled={busy} onChange={e => save({
              portfolio_submitted: e.target.checked
            })} />} label="포트폴리오" />
        </div>
      </Panel>
      <div className="panel panel-body" style={{
          marginTop: 20,
          background: '#F1EEEB'
        }}>
        <StageArt className="detail-stage-art" index={Math.max(0, APPLICATION_STAGES.findIndex(stage => stage.id === getApplicationStage(a.status)?.id))} />
        <h3>다음 준비도 이어서</h3>
        <p className="muted" style={{
            margin: '10px 0 15px'
          }}>해야 할 일과 면접 답변을 정리해요.</p>
        <Button component={Link} to="/checklist">준비할 일 ↗</Button>
        <Button component={Link} to="/interview">면접 노트 ↗</Button>
      </div>
      <Button color="error" onClick={() => setDeleting(true)} sx={{
          mt: 2
        }} disabled={busy}>이 기록 삭제</Button>
    </div>
  </div>
  <ConfirmDelete open={deleting} title={a.company_name} busy={busy} onClose={() => setDeleting(false)} onConfirm={deleteRow} />
  <ActionFeedback feedback={feedback} onClose={() => setFeedback(null)} />
</>;
}
