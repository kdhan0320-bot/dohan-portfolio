import sculpture from '../assets/perspective-sculpture.webp';
import iris from '../assets/season-iris.webp';
import '../styles/exercise-artwork.css';

// These are fictional, non-interactive UI illustrations. The surrounding exercise
// supplies the accessible description, choice controls and enlarged view.
function SoundIcon({ type }) {
  return <svg viewBox="0 0 24 24" focusable="false">
    {type === 'play' && <path d="m9 5 11 7-11 7Z" fill="currentColor" />}
    {type === 'back' && <><path d="M5 7v10M19 6l-10 6 10 6Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /></>}
    {type === 'next' && <><path d="M19 7v10M5 6l10 6-10 6Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /></>}
  </svg>;
}

function Gallery() {
  return <>
    <div className="ea-topline"><span className="ea-wordmark">FORM & SPACE</span><span>작은 조형의 전시</span></div>
    <div className="ea-gallery-layout">
      <div className="ea-gallery-copy">
        <span className="ea-eyebrow">EXHIBITION 01</span>
        <div className="ea-gallery-title ea-target"><span>시선의</span><span>모양</span></div>
        <span className="ea-gallery-description">일상에서 만나는<br />조형의 아름다움</span>
        <span className="ea-mini-action">전시 둘러보기</span>
      </div>
      <div className="ea-gallery-image" style={{ backgroundImage: `url(${sculpture})` }} />
    </div>
  </>;
}

function Sound() {
  return <>
    <div className="ea-topline"><span className="ea-wordmark">느린 파장</span><span>자연의 소리</span></div>
    <div className="ea-sound-cover">
      <svg viewBox="0 0 460 110" preserveAspectRatio="xMidYMid slice" focusable="false">
        <rect width="460" height="110" fill="#bad0c1" />
        <path d="M-30 117C45-19 139 18 226 93S400 156 510-28" fill="none" stroke="#7d9b89" strokeWidth="50" />
        <path d="M-12 108C67-30 149 29 238 88S410 130 485-5" fill="none" stroke="#eaf1e6" strokeWidth="2" />
        <circle cx="360" cy="29" r="35" fill="#e0ead9" />
      </svg>
    </div>
    <div className="ea-track"><span className="ea-track-title">숲의 아침</span><span>20분 · 자연의 소리</span></div>
    <div className="ea-progress"><span /></div>
    <div className="ea-player-controls">
      <div className="ea-player-control"><span className="ea-player-circle"><SoundIcon type="back" /></span><span>이전</span></div>
      <div className="ea-player-control"><span className="ea-player-circle ea-play ea-target"><SoundIcon type="play" /></span><span>재생</span></div>
      <div className="ea-player-control"><span className="ea-player-circle"><SoundIcon type="next" /></span><span>다음</span></div>
    </div>
  </>;
}

function Portfolio({ compact = false }) {
  return <>
    <div className="ea-topline"><span className="ea-wordmark">STUDIO HAN</span><span>PORTFOLIO</span></div>
    <div className="ea-work-heading"><span>선택한 작업</span><span>01—02</span></div>
    <div className="ea-project-list">
      <div className="ea-project-group ea-target">
        <span className="ea-project-title"><span className="ea-project-mark ea-project-mark-blue" />산책 기록 앱</span>
        <span className="ea-project-description">{compact ? '걸은 길을 모으는 앱' : '매일 걸은 길을 모으는 모바일 서비스'}</span>
      </div>
      <div className="ea-project-group ea-target">
        <span className="ea-project-title"><span className="ea-project-mark ea-project-mark-coral" />전시 예약 웹</span>
        <span className="ea-project-description">{compact ? '관람 시간을 예약하는 웹' : '전시를 찾고 방문 시간을 고르는 웹사이트'}</span>
      </div>
    </div>
  </>;
}

function Flower() {
  return <>
    <div className="ea-topline"><span className="ea-wordmark">계절의 형태</span><span>COLLECTION</span></div>
    <div className="ea-flower-image" style={{ backgroundImage: `url(${iris})` }}>
      <div className="ea-flower-title ea-target"><span>계절이 남긴</span><span>작은 색.</span></div>
      <span className="ea-flower-edition">SPRING / 2026</span>
    </div>
  </>;
}

function Walk() {
  return <>
    <div className="ea-topline"><span className="ea-wordmark">가벼운 산책</span><span>추천 경로</span></div>
    <div className="ea-walk-heading"><span>나무 그늘길</span><span>35분 · 2.1km</span></div>
    <div className="ea-map">
      <svg viewBox="0 0 480 184" preserveAspectRatio="none" focusable="false">
        <rect width="480" height="184" fill="#e1e9d9" />
        <path d="M332-10q-28 50 7 93t-4 112" fill="none" stroke="#c4dce0" strokeWidth="34" />
        <path d="m-15 45 105 21 68-46 76 27 55-20m-303 109 88-32 88 9 91-50 136 46 93-36M107-20l-10 90 43 127M235-10l-23 196M413-13l-12 89 45 127" fill="none" stroke="#b5c6ac" strokeWidth="3" />
        <path className="ea-route-highlight" d="M65 144 123 126 164 81 244 90 277 48 386 49 416 31" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path className="ea-route" d="M65 144 123 126 164 81 244 90 277 48 386 49 416 31" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="65" cy="144" r="6" fill="#2b493c" stroke="#fff" strokeWidth="3" />
        <circle cx="416" cy="31" r="6" fill="#2b493c" stroke="#fff" strokeWidth="3" />
      </svg>
      <span className="ea-map-label ea-map-start">출발</span><span className="ea-map-label ea-map-end">도착</span>
    </div>
    <div className="ea-map-legend"><span /><span>추천 산책 경로</span></div>
  </>;
}

function Signup() {
  return <>
    <div className="ea-topline"><span className="ea-wordmark">작은 작업실</span><span>01 / 02</span></div>
    <div className="ea-signup-heading">계정 만들기</div>
    <div className="ea-faux-form">
      <div className="ea-faux-field"><span className="ea-field-label">이메일</span><div className="ea-field-box">name@example.com</div></div>
      <div className="ea-faux-field"><span className="ea-field-label">비밀번호</span><div className="ea-field-box"><span className="ea-password-placeholder ea-target">8자 이상 · 영문과 숫자</span></div><span className="ea-password-hint ea-target">8자 이상 · 영문과 숫자</span></div>
      <div className="ea-faux-submit">다음</div>
    </div>
  </>;
}

const artwork = { gallery: Gallery, sound: Sound, portfolio: Portfolio, flower: Flower, walk: Walk, signup: Signup };

export default function ExerciseArtwork({ kind = 'gallery', variant = 'original', highlight = false, compact = false }) {
  const resolvedKind = Object.hasOwn(artwork, kind) ? kind : 'gallery';
  const Drawing = artwork[resolvedKind];
  return <div aria-hidden="true" className={`exercise-artwork ea-${resolvedKind}${variant === 'revised' ? ' ea-revised' : ''}${highlight ? ' ea-highlight' : ''}${compact ? ' ea-compact' : ''}`}>
    <Drawing compact={compact} />
  </div>;
}
