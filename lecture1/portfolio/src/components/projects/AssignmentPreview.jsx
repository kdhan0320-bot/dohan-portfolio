import { useRef, useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Link } from 'react-router-dom';
import './assignmentPreview.css';

const assets = `${import.meta.env.BASE_URL}detail/current/`;

function PumpSummary() {
  return (
    <div className="assignment-equipment">
      <img src={assets + 'seolbigyeol-assignment-pump.webp'} alt="" width="420" height="280" />
      <div>
        <p className="assignment-id">PU-118 · 조립 2라인</p>
        <p className="assignment-title">냉각수 펌프</p>
        <p className="assignment-symptom">진동·소음 증가</p>
      </div>
    </div>
  );
}

const assignees = [
  { name: '박성민', specialty: '기계 정비' },
  { name: '이수진', specialty: '전기·센서' },
];

function AssignmentFacts({ selected = '' }) {
  return (
    <dl className="assignment-facts">
      <div><dt>{selected ? '시연에서 선택한 담당자' : '담당자'}</dt><dd>{selected || '미배정'}</dd></div>
      <div><dt>완료 기한</dt><dd><time dateTime="2026-10-07">2026.10.07</time></dd></div>
    </dl>
  );
}

function AssignmentDetail({ compact, overview }) {
  const [selected, setSelected] = useState('');
  const [pickerOpen, setPickerOpen] = useState(false);
  const trigger = useRef(null);
  const picker = <AssigneePicker selected={selected} onSelect={setSelected} compact={compact} />;
  if (compact) return picker;

  function closeOnEscape(event) {
    if (event.key !== 'Escape') return;
    setPickerOpen(false);
    trigger.current.focus();
  }

  return (
    <div className="pending-request">
      <section className="pending-request__sheet" aria-labelledby="pending-request-heading">
        <div className="pending-request__copy">
          <p className="pending-request__source">가상 정비 요청 · 시안 재구성</p>
          <h2 id="pending-request-heading">배정 대기 요청</h2>
          <p className="pending-request__symptom"><strong>냉각수 펌프</strong><span>진동·소음 증가</span></p>
          <AssignmentFacts selected={selected} />
          <button className="pending-request__toggle" type="button" ref={trigger} aria-controls="pending-request-picker"
            aria-expanded={pickerOpen} onClick={() => setPickerOpen(open => !open)}>
            {pickerOpen ? '담당자 선택 접기' : '담당자 선택'} <span aria-hidden="true">{pickerOpen ? '−' : '+'}</span>
          </button>
        </div>
        <figure className="pending-request__photo" hidden={pickerOpen}>
          <img src={assets + 'seolbigyeol-pump-original.png'} alt="조립 라인에 설치된 냉각수 펌프" width="1536" height="1024" />
          <figcaption><strong>PU-118</strong> 조립 2라인</figcaption>
        </figure>
        <div id="pending-request-picker" className="pending-request__picker" hidden={!pickerOpen} onKeyDown={closeOnEscape}>
          {pickerOpen && picker}
        </div>
      </section>
      <details className="pending-request__overview">
        <summary>작업 현황 전체 시안 보기</summary>
        {overview}
      </details>
    </div>
  );
}

// Portfolio excerpt of the Figma picker (633:89). Radio choices stay in this view.
function AssigneePicker({ selected, onSelect, compact }) {
  return (
    <figure className="assignment-preview">
      <div className="assignment-card assignee-picker">
        <h2 id="assignee-picker-title">담당자 선택</h2>
        {compact && <PumpSummary />}
        <fieldset className="assignee-options" aria-labelledby="assignee-picker-title">
          {assignees.map(({ name, specialty }) => (
            <label key={name}>
              <input type="radio" name="seolbi-assignee" value={name} checked={selected === name} onChange={() => onSelect(name)} />
              <strong>{name}</strong><span>{specialty}</span>
            </label>
          ))}
        </fieldset>
        {compact && <p className="assignee-due">완료 기한 <time dateTime="2026-10-07">2026.10.07</time></p>}
      </div>
      <figcaption>
        <span>담당자 선택 시연{compact && ' · 모바일 재구성'}</span>
        <a href={assets + 'seolbigyeol-picker-mobile-20261112.png'} target="_blank" rel="noopener noreferrer"
          aria-label="담당자 선택 Figma 모바일 시안 새 탭에서 보기">Figma 모바일 시안 보기</a>
      </figcaption>
    </figure>
  );
}

export default function AssignmentPreview({ children, showPicker = false }) {
  const compact = useMediaQuery('(max-width: 760px)', { noSsr: true });
  if (showPicker) return <AssignmentDetail compact={compact} overview={children} />;
  if (!compact) return children;

  return (
    <figure className="assignment-preview">
      <div className="assignment-card">
        <PumpSummary />
        <AssignmentFacts />
        <Link to="/projects/seolbiit" className="assignment-action">
          <span>요청 확인·배정</span>
          <span className="assignment-destination">선택 시안 보기</span>
        </Link>
      </div>
      <figcaption>
        <span>설비결 시안 · 모바일 재구성</span>
        <a href={assets + 'seolbigyeol-mobile-20261112.png'} target="_blank" rel="noopener noreferrer"
          aria-label="설비결 Figma 모바일 시안 새 탭에서 보기">Figma 모바일 시안 보기</a>
      </figcaption>
    </figure>
  );
}
