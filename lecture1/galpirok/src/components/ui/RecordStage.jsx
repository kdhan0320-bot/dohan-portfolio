import StatusChip from './StatusChip';

// A bookmark labels the record's current stage; it is not a progress meter.
export default function RecordStage({ status }) {
  return <div className="record-stage" aria-label={`현재 지원 상태: ${status}`}>
    <StatusChip status={status} />
  </div>;
}
