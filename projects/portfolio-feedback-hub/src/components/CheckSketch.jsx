import iris from '../assets/season-iris.webp';

// Small static diagrams show what to inspect, not interactive controls.
export default function CheckSketch({ kind }) {
  const sketches = {
    type: <><strong className="sketch-title tip-outlined">제목</strong><span>읽을 내용</span></>,
    spacing: <><span className="sketch-group"><b>기간</b><i /></span><span className="sketch-group"><b>장소</b><i /></span></>,
    action: <><span className="sketch-button">소개</span><span className="sketch-button is-primary tip-outlined">예약</span></>,
    contrast: <><img src={iris} alt="" /><span className="sketch-shade" /><strong>읽히는 제목</strong></>,
    labels: <><svg viewBox="0 0 150 36"><path d="m6 29 32-18 32 10 35-16 38 8" fill="none" stroke="currentColor" strokeWidth="3" /></svg><span className="sketch-legend"><i />산책 경로</span></>,
    input: <><span className="sketch-input">••••••</span><span className="tip-outlined">조건은 아래에</span></>,
    mobile: <><span className="sketch-device"><i /><i /><i /></span><span className="sketch-device is-narrow"><i /><i /><i /></span></>,
    keyboard: <><kbd>Tab</kbd><span className="sketch-focus">Enter</span></>,
  };
  return <div className={`check-sketch check-sketch-${kind}`} aria-hidden="true">{sketches[kind]}</div>;
}
