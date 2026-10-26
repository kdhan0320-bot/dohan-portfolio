import { BOARD_COLUMNS, boardColumn } from '../../utils/applicationBoard';

// Position marks the current stage, not a completion percentage.
export default function RecordStage({ status }) {
  const current = BOARD_COLUMNS.findIndex(column => column.id === boardColumn(status));
  return <div className="record-stage" aria-label={`현재 지원 상태: ${status}`}>
    <span className="record-stage-track" aria-hidden="true">{BOARD_COLUMNS.map((column, index) => <i key={column.id} className={index === current ? 'is-current' : ''} style={{ '--stage-color': column.color }} />)}</span>
    <span>{status}</span>
  </div>;
}
