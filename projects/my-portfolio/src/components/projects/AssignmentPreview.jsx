import useMediaQuery from '@mui/material/useMediaQuery';
import './assignmentPreview.css';

const assets = `${import.meta.env.BASE_URL}detail/current/`;

// The narrow layout is a portfolio excerpt of Figma card 634:20.
export default function AssignmentPreview({ children }) {
  const compact = useMediaQuery('(max-width: 760px)', { noSsr: true });
  if (!compact) return children;

  return (
    <figure className="assignment-preview">
      <div className="assignment-card">
        <div className="assignment-equipment">
          <img src={assets + 'seolbigyeol-assignment-pump.webp'} alt="냉각수 펌프" width="420" height="280" />
          <div>
            <p className="assignment-id">PU-118 · 조립 2라인</p>
            <p className="assignment-title">냉각수 펌프</p>
            <p className="assignment-symptom">진동·소음 증가</p>
          </div>
        </div>
        <dl className="assignment-facts">
          <div><dt>담당자</dt><dd>미배정</dd></div>
          <div><dt>완료 기한</dt><dd><time dateTime="2026-10-07">2026.10.07</time></dd></div>
        </dl>
        <details className="assignment-example">
          <summary className="assignment-action">
            <span>요청 확인·배정</span>
            <span className="assignment-destination">
              <span className="when-closed">시안 보기</span><span className="when-open">시안 닫기</span>
              <span className="assignment-chevron" aria-hidden="true" />
            </span>
          </summary>
          <figure className="assignment-next">
            <figcaption>담당자 선택 · Figma 원본 발췌</figcaption>
            <img src={assets + 'seolbigyeol-assignee-picker.webp'} width="600" height="560" loading="lazy"
              alt="냉각수 펌프 담당자 선택 시안. 기계 정비와 전기·센서 담당자 중 한 명을 고르고 완료 기한을 확인하는 화면." />
          </figure>
        </details>
      </div>
      <figcaption>
        <span>설비결 시안 · 모바일용 재구성</span>
        <a href={assets + 'seolbigyeol-assignment-2x.webp'} target="_blank" rel="noopener noreferrer"
          aria-label="설비결 배정 카드 원본 보기 (새 탭)">원본 카드 보기</a>
      </figcaption>
    </figure>
  );
}
