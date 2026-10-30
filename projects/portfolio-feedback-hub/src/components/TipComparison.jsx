import iris from '../assets/season-iris.webp';
import sculpture from '../assets/perspective-sculpture.webp';
import studio from '../assets/perspective-studio.webp';
import TipsIcon from './TipsIcon';

function Marker() { return <span className="tip-marker" aria-hidden="true">1</span>; }

function TypeExample({ revised, annotate }) {
  return <div className="tip-type-example"><div className="tip-gallery-copy">
    <span className="tip-example-eyebrow">전시 소개</span>
    <div className="tip-title-slot"><span className={`tip-example-title${revised ? ' is-large' : ''}${annotate ? ' tip-outlined' : ''}`}>시선의<br />모양{annotate && <Marker />}</span></div>
    <p className="tip-example-description">일상에서 만나는<br />조형의 아름다움</p>
    <span className="tip-faux-link">전시 둘러보기</span>
  </div><img className="tip-gallery-image" src={sculpture} alt="" width="720" height="960" /></div>;
}

export function GapMeasure({ size, between = false, annotate = false, measure = true }) {
  return <span className={`tip-gap${between ? ' tip-gap-between' : ''}`} style={{ height: size }}>
    {measure && <><i className="tip-gap-rule" /><span className="tip-gap-value">{size}px</span></>}{annotate && <Marker />}
  </span>;
}

function SpacingExample({ revised, annotate }) {
  const innerGap = revised ? 6 : 16;
  return <div className={`tip-spacing-example${revised ? ' is-grouped' : ''}`}>
    <span className="tip-example-eyebrow">선택한 작업</span>
    <div className="tip-work-list">
      <div className="tip-work-group"><div className="tip-work-thumb tip-work-thumb-walk"><svg viewBox="0 0 60 60"><path d="M0 42 18 24 34 36 60 10M9 0 27 60M0 19 60 38" fill="none" stroke="#bbcdd6" strokeWidth="3" /><path d="m8 46 16-10 10 2 18-24" fill="none" stroke="#376f6a" strokeWidth="3" /></svg></div><span className="tip-work-title">산책 기록 앱</span><GapMeasure size={innerGap} /><span className="tip-work-caption">걸은 길을 모으는 앱</span></div>
      <GapMeasure size={revised ? 36 : 16} between annotate={annotate} />
      <div className="tip-work-group"><img className="tip-work-thumb" src={studio} alt="" width="60" height="60" /><span className="tip-work-title">전시 예약 웹</span><GapMeasure size={innerGap} /><span className="tip-work-caption">관람을 예약하는 웹</span></div>
    </div>
  </div>;
}

function ActionExample({ revised, annotate }) {
  return <div className="tip-action-example"><div className="tip-sound-cover"><svg viewBox="0 0 480 160" preserveAspectRatio="xMidYMid slice"><rect width="480" height="160" fill="#e3edf0" /><circle cx="355" cy="38" r="22" fill="#fafcfd" /><path d="M-20 160 87 33l107 127M109 160 229 13l134 147M263 160 386 44l114 116" fill="#b3cbd0" /><path d="M-20 160 111 88l147 72M161 160 296 76l184 84" fill="#7e9fa9" /><path d="M245 160q-32-42-14-67" fill="none" stroke="#e2edf1" strokeWidth="12" /></svg></div><span className="tip-track-name">숲의 아침</span><span className="tip-track-time">자연의 소리 · 20분</span><div className="tip-audio-progress"><span /></div>
    <div className="tip-player"><span className="tip-player-control"><TipsIcon name="previous" />이전</span><span className={`tip-player-control tip-play${revised ? ' is-primary' : ''}${annotate ? ' tip-outlined' : ''}`}><TipsIcon name="play" />재생{annotate && <Marker />}</span><span className="tip-player-control"><TipsIcon name="next" />다음</span></div>
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
  return <div className="tip-input-example"><div className="tip-signup-title">내 작업 공간 만들기</div><span className="tip-example-eyebrow">계정 만들기 · 입력 중</span><span className="tip-email-label">이메일</span><div className="tip-faux-email">hello@example.com</div><span className="tip-input-label">비밀번호</span><div className="tip-faux-input">••••••••</div><div className="tip-helper-slot">{revised && <span className={`tip-helper${annotate ? ' tip-outlined' : ''}`}><span>8자 이상 ·</span>{' '}<span>영문과 숫자</span>{annotate && <Marker />}</span>}</div><span className="tip-faux-submit">다음</span></div>;
}

const drawings = { type: TypeExample, spacing: SpacingExample, action: ActionExample, contrast: ContrastExample, labels: LabelsExample, input: InputExample };
const screenNames = {
  type: ['FORM & SPACE', '전시 안내'], spacing: ['STUDIO HAN', '선택한 작업'],
  action: ['느린 파장', 'SOUND'], contrast: ['계절의 형태', 'COLLECTION'],
  labels: ['가벼운 산책', '경로 안내'], input: ['작은 작업실', '01 / 02'],
};

function ExampleScreen({ kind, revised = false, annotate = false }) {
  const Drawing = drawings[kind];
  return <div className={`tip-screen tip-screen-${kind}`}><div className="tip-screen-top"><span>{screenNames[kind][0]}</span><span>{screenNames[kind][1]}</span></div><Drawing revised={revised} annotate={annotate} /></div>;
}

function FocusPair({ tip, annotate = true }) {
  const Drawing = drawings[tip.kind];
  return <div className={`tip-focus-pair tip-focus-${tip.kind}`}>
    {[false, true].map(revised => <figure key={String(revised)} className={`tip-focus-figure${revised ? ' is-revised' : ''}`}>
      <figcaption><span>{revised ? '바꾼 뒤' : '바꾸기 전'}</span><span>{revised ? tip.afterValue : tip.beforeValue}</span></figcaption>
      <div className="tip-focus-drawing" aria-hidden="true"><Drawing revised={revised} annotate={revised && annotate} /></div>
    </figure>)}
  </div>;
}

export function TipPreview({ tip }) {
  return <div className={`tip-preview tip-preview-${tip.kind}`} aria-hidden="true"><FocusPair tip={tip} annotate={false} /></div>;
}

export default function TipComparison({ tip, compact = false }) {
  return <div className={`tip-comparison tip-comparison-${tip.kind}${compact ? ' is-compact' : ''}`} role="group" aria-label={`${tip.topic} 비교 그림`}>
    <p className="tips-sr-only">{tip.description}</p>
    <div className="tip-focus"><FocusPair tip={tip} /><p className="tip-visual-note"><span className="tips-note-number" aria-hidden="true">1</span>{tip.visualNote}</p></div>
    {!compact && <figure className="tip-context"><figcaption><span>화면 속에서는</span><span>바꾼 뒤 · 설명용 예시</span></figcaption><div className="tip-example" aria-hidden="true"><ExampleScreen kind={tip.kind} revised annotate /></div></figure>}
  </div>;
}
