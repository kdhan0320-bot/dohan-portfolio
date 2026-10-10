import sculpture from '../assets/perspective-sculpture.webp';
import iris from '../assets/season-iris.webp';
import '../styles/principle-visual.css';

// Decorative, non-interactive excerpts of the practice screens. Left and right
// illustrate the principle, rather than repeating an exercise's A/B ordering.
function GalleryPanel({ revised }) {
  return <div className={`pv-panel pv-gallery-panel${revised ? ' pv-revised' : ''}`}>
    <div className="pv-gallery-copy"><span className="pv-gallery-title">시선의<br />모양</span><span className="pv-gallery-detail">조형의 전시</span></div>
    <img className="pv-gallery-image" src={sculpture} alt="" />
  </div>;
}

function PlaybackIcon({ play = false, next = false }) {
  return <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
    {play ? <path d="m9 5 11 7-11 7Z" fill="currentColor" /> : <g transform={next ? 'translate(24 0) scale(-1 1)' : undefined}>
      <path d="M5 6v12M19 6 9 12l10 6Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </g>}
  </svg>;
}

function SoundPanel({ revised }) {
  return <div className={`pv-panel pv-sound-panel${revised ? ' pv-revised' : ''}`}>
    <div className="pv-sound-cover"><svg viewBox="0 0 220 58" preserveAspectRatio="xMidYMid slice" focusable="false" aria-hidden="true">
      <rect width="220" height="58" fill="#c8d8ca" />
      <path d="M-15 76C28-12 82 5 125 45S194 73 235 0" fill="none" stroke="#819d89" strokeWidth="30" />
      <path d="M-10 64C36-5 87 11 127 44S191 66 231 5" fill="none" stroke="#eef4e9" strokeWidth="1.5" />
    </svg></div>
    <span className="pv-track-title">숲의 아침</span>
    <div className="pv-playback"><span className="pv-control"><PlaybackIcon /></span><span className="pv-control pv-play"><PlaybackIcon play /></span><span className="pv-control"><PlaybackIcon next /></span></div>
  </div>;
}

function PortfolioPanel({ revised }) {
  return <div className={`pv-panel pv-portfolio-panel${revised ? ' pv-revised' : ''}`}>
    <div className="pv-project-list">
      <div className="pv-project"><span className="pv-project-title"><i />산책 기록 앱</span><span className="pv-project-detail">걸은 길 기록</span></div>
      <div className="pv-project"><span className="pv-project-title"><i />전시 예약 웹</span><span className="pv-project-detail">관람 시간 예약</span></div>
    </div>
  </div>;
}

function FlowerPanel({ revised }) {
  return <div className={`pv-panel pv-flower-panel${revised ? ' pv-revised' : ''}`}>
    <img src={iris} alt="" />
    <span className="pv-flower-title">계절이 남긴<br />작은 색.</span>
  </div>;
}

function WalkPanel({ revised }) {
  return <div className={`pv-panel pv-walk-panel${revised ? ' pv-revised' : ''}`}>
    <svg className="pv-map" viewBox="0 0 220 114" preserveAspectRatio="none" focusable="false" aria-hidden="true">
      <rect width="220" height="114" fill="#e3e9df" />
      <path d="M164-5q-16 32 3 63t-3 63" fill="none" stroke="#cadde0" strokeWidth="20" />
      <path d="m-5 28 47 13 34-22 37 10 27-12M-8 82l44-17 44 6 32-32 55 28 58-21M52-5l-7 48 15 74M112-8l-7 131M198-7l-9 56 24 72" fill="none" stroke="#b6c5b1" strokeWidth="2" />
      <path className="pv-map-route" d="m26 90 31-11 22-29 34 5 18-26 49 1 18-12" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="26" cy="90" r="4" fill="#355541" stroke="#fff" strokeWidth="2" /><circle cx="198" cy="18" r="4" fill="#355541" stroke="#fff" strokeWidth="2" />
    </svg>
    <span className="pv-map-legend"><i />추천 경로</span>
  </div>;
}

function SignupPanel({ revised }) {
  return <div className={`pv-panel pv-signup-panel${revised ? ' pv-revised' : ''}`}>
    <span className="pv-field-label">비밀번호</span>
    <span className="pv-password">••••••••<i /></span>
    <span className="pv-field-hint">8자 이상<br />영문과 숫자</span>
  </div>;
}

const visuals = { gallery: GalleryPanel, sound: SoundPanel, portfolio: PortfolioPanel, flower: FlowerPanel, walk: WalkPanel, signup: SignupPanel };

export default function PrincipleVisual({ kind = 'gallery' }) {
  const resolvedKind = Object.hasOwn(visuals, kind) ? kind : 'gallery';
  const Panel = visuals[resolvedKind];
  return <div aria-hidden="true" className={`principle-visual pv-${resolvedKind}`}>
    <div className="pv-pair"><Panel revised={false} /><Panel revised /></div>
  </div>;
}
