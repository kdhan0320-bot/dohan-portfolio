import iris from '../assets/season-iris.webp';

function Marker() { return <span className="tip-marker" aria-hidden="true">1</span>; }

function TypeExample({ revised, annotate }) {
  return <div className="tip-type-example">
    <span className="tip-example-eyebrow">전시 소개</span>
    <div className="tip-title-slot"><span className={`tip-example-title${revised ? ' is-large' : ''}${annotate ? ' tip-outlined' : ''}`}>시선의<br />모양{annotate && <Marker />}</span></div>
    <p className="tip-example-description">일상에서 만나는<br />조형의 아름다움</p>
  </div>;
}

function SpacingExample({ revised, annotate }) {
  return <div className={`tip-spacing-example${revised ? ' is-grouped' : ''}`}>
    <span className="tip-example-eyebrow">선택한 작업</span>
    <div className="tip-work-list">
      <div className="tip-work-group"><span className="tip-work-title">산책 기록 앱</span><span className="tip-work-caption">걸은 길을 모으는 앱</span></div>
      <div className="tip-work-group"><span className="tip-work-title">전시 예약 웹</span><span className="tip-work-caption">관람 시간을 예약하는 웹</span></div>
      {annotate && <Marker />}
    </div>
  </div>;
}

function ActionExample({ revised, annotate }) {
  return <div className="tip-action-example"><span className="tip-example-eyebrow">자연의 소리</span><span className="tip-track-name">숲의 아침</span><span className="tip-track-time">20분</span>
    <div className="tip-player"><span className="tip-player-control"><span aria-hidden="true">‹</span>이전</span><span className={`tip-player-control tip-play${revised ? ' is-primary' : ''}${annotate ? ' tip-outlined' : ''}`}><span aria-hidden="true">▷</span>재생{annotate && <Marker />}</span><span className="tip-player-control"><span aria-hidden="true">›</span>다음</span></div>
  </div>;
}

function ContrastExample({ revised, annotate }) {
  return <div className={`tip-photo-example${revised ? ' is-shaded' : ''}`}><img src={iris} alt="" width="720" height="480" /><span className="tip-photo-shade" /><span className={`tip-photo-title${annotate ? ' tip-outlined' : ''}`}>계절이 남긴<br />작은 색.{annotate && <Marker />}</span></div>;
}

function LabelsExample({ revised, annotate }) {
  return <div className="tip-labels-example"><span className="tip-example-eyebrow">나무 그늘길 · 35분</span><div className="tip-map">
    <svg viewBox="0 0 360 150" preserveAspectRatio="none" aria-hidden="true"><path className="tip-map-river" d="M270 -10Q220 60 280 170" /><path className="tip-map-roads" d="M-10 40 110 65 210 25 370 60M-10 120 170 95 370 130M100 -10 130 170M200 -10 175 170" /><path className="tip-map-route" d="M35 110 95 90 140 45 210 60 300 30" /><circle cx="35" cy="110" r="5" /><circle cx="300" cy="30" r="5" /></svg><span className="tip-map-start">출발</span><span className="tip-map-end">도착</span>
    </div><div className="tip-legend-slot">{revised && <span className={`tip-legend${annotate ? ' tip-outlined' : ''}`}><i />추천 산책 경로{annotate && <Marker />}</span>}</div></div>;
}

function InputExample({ revised, annotate }) {
  return <div className="tip-input-example"><span className="tip-example-eyebrow">계정 만들기 · 입력 중</span><span className="tip-input-label">비밀번호</span><div className="tip-faux-input">••••••••</div><div className="tip-helper-slot">{revised && <span className={`tip-helper${annotate ? ' tip-outlined' : ''}`}>8자 이상 · 영문과 숫자{annotate && <Marker />}</span>}</div></div>;
}

const drawings = { type: TypeExample, spacing: SpacingExample, action: ActionExample, contrast: ContrastExample, labels: LabelsExample, input: InputExample };

export default function TipComparison({ tip, compact = false }) {
  const Drawing = drawings[tip.kind];
  return <div className={`tip-comparison tip-comparison-${tip.kind}${compact ? ' is-compact' : ''}`} role="group" aria-label={`${tip.topic} 비교 그림`}>
    <p className="tips-sr-only">{tip.description}</p>
    {[false, true].map(revised => <figure key={String(revised)} className={`tip-figure${revised ? ' is-revised' : ''}`}>
      <figcaption>{revised ? tip.after : tip.before}</figcaption>
      <div className="tip-example" aria-hidden="true"><Drawing revised={revised} annotate={!compact && revised} /></div>
    </figure>)}
  </div>;
}
