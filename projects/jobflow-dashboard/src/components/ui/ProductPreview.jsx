import { useRef, useState } from 'react';
import { Button } from '@mui/material';
import ArrowForwardRounded from '@mui/icons-material/ArrowForwardRounded';
import { CompanyMark } from './PageUI';
import { APPLICATION_STATUSES, DEMO_APPLICATIONS, DEMO_CHECKLISTS, DEMO_TODAY } from '../../constants';
import { BOARD_COLUMNS, boardColumn } from '../../utils/applicationBoard';
import { shortDate, deadlineLabel } from '../../utils/dates';

// This preview uses the same fictional records as the editable sample.
export default function ProductPreview({ onOpen }) {
  const [stageIndex, setStageIndex] = useState(0);
  const tabRefs = useRef([]);
  const stage = BOARD_COLUMNS[stageIndex];
  const selected = DEMO_APPLICATIONS.find(row => boardColumn(row.status) === stage.id);
  const status = APPLICATION_STATUSES.find(item => item.value === selected.status);
  const before = stage.id === 'before';
  const tasks = DEMO_CHECKLISTS.filter(item => item.application_id === selected.id && !item.is_done);
  function moveTab(event, index) {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % BOARD_COLUMNS.length;
    else if (event.key === 'ArrowLeft') next = (index + BOARD_COLUMNS.length - 1) % BOARD_COLUMNS.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = BOARD_COLUMNS.length - 1;
    else return;
    event.preventDefault();
    setStageIndex(next);
    tabRefs.current[next]?.focus();
  }
  return <div className="application-preview" style={{ '--stage-ink': stage.color, '--stage-tint': stage.tint }}>
    <div className="preview-toolbar"><h2>회사별 지원 기록</h2><span>샘플 · {DEMO_TODAY.replaceAll('-', '.')}</span></div>
    <div className="preview-stage-tabs" role="tablist" aria-label="샘플 지원 단계">
      {BOARD_COLUMNS.map((column, index) => <button key={column.id} type="button" role="tab" id={`preview-tab-${column.id}`} aria-controls={`preview-panel-${column.id}`} aria-selected={index === stageIndex} tabIndex={index === stageIndex ? 0 : -1} ref={element => { tabRefs.current[index] = element; }} onClick={() => setStageIndex(index)} onKeyDown={event => moveTab(event, index)} style={{ '--tab-ink': column.color, '--tab-tint': column.tint }}>
        <span>{column.label}</span>
      </button>)}
    </div>
    {BOARD_COLUMNS.map((column, index) => <div key={column.id} id={`preview-panel-${column.id}`} role="tabpanel" aria-labelledby={`preview-tab-${column.id}`} hidden={index !== stageIndex} className="preview-record" tabIndex={0}>
      {index === stageIndex && <>
        <div className="preview-record-heading">
          <CompanyMark name={selected.company_name} />
          <div><h3>{selected.company_name}</h3><p>{selected.position}</p></div>
          <span className="preview-status" style={{ color: status.color, background: status.bg }}>{selected.status}</span>
        </div>
        <div className="preview-record-body">
          <div className="preview-date-block">
            <span>{before ? '지원 마감' : '지원한 날짜'}</span>
            <strong>{shortDate(before ? selected.deadline : selected.applied_date)}</strong>
            {before && <b>{deadlineLabel(selected.deadline, DEMO_TODAY)}</b>}
          </div>
          <div className="preview-preparation" aria-label="남은 준비"><h4>남은 준비 <span>{tasks.length}개</span></h4>{tasks.length ? <ul>{tasks.slice(0, 2).map(item => <li key={item.id}><span aria-hidden="true" className="preview-task-box" />{item.title}</li>)}</ul> : <p>등록한 준비 항목이 없어요.</p>}</div>
        </div>
        <p className="preview-record-memo"><span>기록 메모</span>{selected.memo}</p>
        <Button variant="text" endIcon={<ArrowForwardRounded />} onClick={() => onOpen(selected.id)} aria-haspopup="dialog" className="preview-open-record">이 회사 기록 열기</Button>
      </>}
    </div>)}
    <p className="preview-caption">단계를 선택해 회사 기록을 살펴보세요.</p>
  </div>;
}
