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

// Portfolio excerpt of the Figma picker (633:89). Radio choices stay in this view.
function AssigneePicker() {
  return (
    <figure className="assignment-preview">
      <div className="assignment-card assignee-picker">
        <h2>담당자 선택</h2>
        <PumpSummary />
        <fieldset className="assignee-options">
          <legend>담당자</legend>
          {assignees.map(({ name, specialty }, index) => (
            <label key={name}>
              <input type="radio" name="seolbi-assignee" value={name} defaultChecked={index === 0} />
              <strong>{name}</strong><span>{specialty}</span>
            </label>
          ))}
        </fieldset>
        <p className="assignee-due">완료 기한 <time dateTime="2026-10-07">2026.10.07</time></p>
      </div>
      <figcaption>
        <span>담당자 선택 시연 · 모바일 재구성</span>
        <a href={assets + 'seolbigyeol-assignee-picker.webp'} target="_blank" rel="noopener noreferrer"
          aria-label="담당자 선택 Figma 원본 시안 보기 (새 탭)">원본 시안 보기</a>
      </figcaption>
    </figure>
  );
}

export default function AssignmentPreview({ children, showPicker = false }) {
  const compact = useMediaQuery('(max-width: 760px)', { noSsr: true });
  if (!compact) return children;
  if (showPicker) return <AssigneePicker />;

  return (
    <figure className="assignment-preview">
      <div className="assignment-card">
        <PumpSummary />
        <dl className="assignment-facts">
          <div><dt>담당자</dt><dd>미배정</dd></div>
          <div><dt>완료 기한</dt><dd><time dateTime="2026-10-07">2026.10.07</time></dd></div>
        </dl>
        <Link to="/projects/seolbiit" className="assignment-action">
          <span>요청 확인·배정</span>
          <span className="assignment-destination">선택 시안 보기 <span aria-hidden="true">→</span></span>
        </Link>
      </div>
      <figcaption>
        <span>설비결 시안 · 모바일용 재구성</span>
        <a href={assets + 'seolbigyeol-assignment-2x.webp'} target="_blank" rel="noopener noreferrer"
          aria-label="설비결 배정 카드 원본 보기 (새 탭)">원본 카드 보기</a>
      </figcaption>
    </figure>
  );
}
