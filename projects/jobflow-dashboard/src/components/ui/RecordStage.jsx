import { BOARD_COLUMNS, boardColumn } from '../../utils/applicationBoard';
import StatusChip from './StatusChip';

// A bookmark labels the record's current stage; it is not a progress meter.
export default function RecordStage({ status }) {
  const current = BOARD_COLUMNS.find(column => column.id === boardColumn(status));
  return <div className="record-stage" style={{ '--stage-color': current?.color || '#687783' }} aria-label={`현재 지원 상태: ${status}`}>
    <span className="record-stage-marker" aria-hidden="true" />
    <span className="record-stage-label">{current?.id === 'result' ? <StatusChip status={status} /> : status}</span>
  </div>;
}
