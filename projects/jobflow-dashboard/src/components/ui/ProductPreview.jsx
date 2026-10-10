import { useState } from 'react';
import { Button } from '@mui/material';
import CheckRounded from '@mui/icons-material/CheckRounded';
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
  const selected = DEMO_APPLICATIONS.find(row => row.id === selectedId);
  const currentStage = boardColumn(selected.status);
  const stage = BOARD_COLUMNS.find(column => column.id === currentStage);
  return <div className="application-preview">
    <div className="preview-toolbar"><h2>지원 현황</h2><span>회사를 선택해보세요</span><span className="preview-sample">샘플</span></div>
    <div className="preview-workspace">
      <div className="preview-lanes" aria-label="전형별 지원 회사 예시">
        {BOARD_COLUMNS.map(column => {
          const rows = DEMO_APPLICATIONS.filter(row => boardColumn(row.status) === column.id);
          const row = rows.find(item => item.id === selectedId) || rows[0];
          return <section className="preview-lane" key={column.id} style={{ '--stage-ink': column.color, '--stage-tint': column.tint }} aria-labelledby={`preview-stage-${column.id}`}>
            <h3 id={`preview-stage-${column.id}`}><i aria-hidden="true" />{column.label}<span>{rows.length}</span></h3>
            <button type="button" className="galpi-preview-company" aria-pressed={selectedId === row.id} aria-controls="galpi-preview-company-detail" onClick={() => setSelectedId(row.id)}>
              <CompanyMark name={row.company_name} />
              <strong>{row.company_name}</strong><span className="preview-position">{row.position}</span>
              <span className="preview-status" style={statusStyle(row.status)}>{row.status}</span>
              <span className="preview-card-date">{column.id === 'before' ? `${shortDate(row.deadline)} 마감` : `${shortDate(row.applied_date)} 지원`}{column.id === 'before' && <b>{deadlineLabel(row.deadline, '2026-09-27')}</b>}</span>
            </button>
            {rows.length > 1 && <Button className="preview-more" onClick={() => onOpen()} disabled={busy}>외 {rows.length - 1}곳 보기</Button>}
          </section>;
        })}
      </div>
      <aside className="preview-detail" id="galpi-preview-company-detail" aria-label="선택한 회사의 지원 기록" style={{ '--stage-ink': stage.color, '--stage-tint': stage.tint }}>
        <div aria-live="polite" aria-atomic="true">
          <span className="preview-detail-label">선택한 회사</span>
          <h3>{selected.company_name}</h3><p className="preview-detail-position">{selected.position}</p>
          <span className="preview-detail-status" style={statusStyle(selected.status)}>{selected.status}</span>
          <dl className="preview-record-date"><dt>{currentStage === 'before' ? '지원 마감' : '지원한 날짜'}</dt><dd>{shortDate(currentStage === 'before' ? selected.deadline : selected.applied_date)}{currentStage === 'before' && <b>{deadlineLabel(selected.deadline, '2026-09-27')}</b>}</dd></dl>
          <div className="preview-documents"><span className={selected.resume_submitted ? 'is-done' : ''}><CheckRounded aria-hidden="true" />이력서 {selected.resume_submitted ? '제출' : '준비'}</span><span className={selected.portfolio_submitted ? 'is-done' : ''}><CheckRounded aria-hidden="true" />포트폴리오 {selected.portfolio_submitted ? '제출' : '준비'}</span></div>
          <details className="preview-memo"><summary>준비 메모</summary><p>{selected.memo}</p></details>
        </div>
        <Button variant="outlined" onClick={() => onOpen(selected.id)} disabled={busy}>지원 기록 열어보기</Button>
      </aside>
    </div>
  </div>;
}
