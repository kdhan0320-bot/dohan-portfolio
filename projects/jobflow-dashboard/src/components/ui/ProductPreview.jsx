import { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import CheckRounded from '@mui/icons-material/CheckRounded';
import CloseRounded from '@mui/icons-material/CloseRounded';
import { CompanyMark } from './PageUI';
import { APPLICATION_STATUSES, DEMO_APPLICATIONS } from '../../constants';
import { BOARD_COLUMNS, boardColumn } from '../../utils/applicationBoard';
import { shortDate, deadlineLabel } from '../../utils/dates';

function statusStyle(value) {
  const status = APPLICATION_STATUSES.find(item => item.value === value);
  return status ? { color: status.color, background: status.bg } : undefined;
}

// The same fictional records and status groups are used in the editable sample.
export default function ProductPreview({ onOpen, busy }) {
  const [selectedId, setSelectedId] = useState('demo-3');
  const [recordOpen, setRecordOpen] = useState(false);
  const selected = DEMO_APPLICATIONS.find(row => row.id === selectedId);
  const currentStage = boardColumn(selected.status);
  const stage = BOARD_COLUMNS.find(column => column.id === currentStage);
  return <div className="application-preview">
    <div className="preview-toolbar"><h2>회사별 지원 현황</h2><span>회사를 누르면 기록이 열려요</span><span className="preview-sample">샘플</span></div>
    <div className="preview-workspace">
      <div className="preview-lanes" aria-label="전형별 지원 회사 예시">
        {BOARD_COLUMNS.map((column, index) => {
          const rows = DEMO_APPLICATIONS.filter(row => boardColumn(row.status) === column.id);
          const row = rows.find(item => item.id === selectedId) || rows[0];
          return <section className="preview-lane" key={column.id} style={{ '--stage-ink': column.color, '--stage-tint': column.tint }} aria-labelledby={`preview-stage-${column.id}`}>
            <h3 id={`preview-stage-${column.id}`}><i aria-hidden="true">{String(index + 1).padStart(2, '0')}</i>{column.label}</h3>
            <button type="button" className="galpi-preview-company" aria-haspopup="dialog" aria-label={`${row.company_name}, ${row.position}, ${row.status}. 지원 기록 보기`} onClick={() => { setSelectedId(row.id); setRecordOpen(true); }}>
              <span className="preview-company-heading"><CompanyMark name={row.company_name} /><strong>{row.company_name}</strong></span>
              <span className="preview-position">{row.position}</span>
              <span className="preview-status" style={statusStyle(row.status)}>{row.status}</span>
              <span className="preview-card-date">{column.id === 'before' ? `${shortDate(row.deadline)} 마감` : `${shortDate(row.applied_date)} 지원`}{column.id === 'before' && <b>{deadlineLabel(row.deadline, '2026-09-27')}</b>}</span>
            </button>
          </section>;
        })}
      </div>
    </div>
    <Dialog open={recordOpen} onClose={() => setRecordOpen(false)} aria-labelledby="preview-record-title" className="preview-record-dialog" fullWidth maxWidth="xs">
      <DialogTitle component="div" className="preview-dialog-heading">
        <CompanyMark name={selected.company_name} />
        <div><h2 id="preview-record-title">{selected.company_name}</h2><p>{selected.position}</p></div>
        <IconButton aria-label="지원 기록 닫기" onClick={() => setRecordOpen(false)}><CloseRounded /></IconButton>
      </DialogTitle>
      <DialogContent className="preview-detail" style={{ '--stage-ink': stage.color, '--stage-tint': stage.tint }}>
          <span className="preview-detail-status" style={statusStyle(selected.status)}>{selected.status}</span>
          <dl className="preview-record-date"><dt>{currentStage === 'before' ? '지원 마감' : '지원한 날짜'}</dt><dd>{shortDate(currentStage === 'before' ? selected.deadline : selected.applied_date)}{currentStage === 'before' && <b>{deadlineLabel(selected.deadline, '2026-09-27')}</b>}</dd></dl>
          <div className="preview-documents"><span className={selected.resume_submitted ? 'is-done' : ''}><CheckRounded aria-hidden="true" />이력서 {selected.resume_submitted ? '제출' : '준비'}</span><span className={selected.portfolio_submitted ? 'is-done' : ''}><CheckRounded aria-hidden="true" />포트폴리오 {selected.portfolio_submitted ? '제출' : '준비'}</span></div>
          <details className="preview-memo"><summary>준비 메모</summary><p>{selected.memo}</p></details>
      </DialogContent>
      <DialogActions disableSpacing><Button onClick={() => setRecordOpen(false)}>닫기</Button><Button variant="contained" onClick={() => onOpen(selected.id)} disabled={busy}>지원 현황 열기</Button></DialogActions>
    </Dialog>
  </div>;
}
