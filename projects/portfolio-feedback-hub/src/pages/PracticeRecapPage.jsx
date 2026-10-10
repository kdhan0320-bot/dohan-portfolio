import { Link } from 'react-router-dom';
import Header from '../components/Header';
import SiteFooter from '../components/SiteFooter';
import { EXERCISES } from '../constants/exercises';
import { usePageTitle } from '../utils/pageMeta';
import '../styles/practice-recap.css';

const summaries = {
  gallery: '먼저 볼 정보에 크기와 비중을.',
  sound: '중심이 되는 조작을 눈에 띄게.',
  portfolio: '관련 정보는 가깝게, 다른 정보는 여유 있게.',
  flower: '사진 위에도 글자가 읽힐 공간을.',
  walk: '경로의 차이와 선의 뜻을 함께.',
  signup: '입력하는 동안에도 조건이 보이게.'
};

function PrincipleSketch({ kind }) {
  const muted = '#a5a2b3';
  const ink = '#6250c7';
  let drawing;

  switch (kind) {
    case 'gallery':
      drawing = <>
        <path d="M9 24h27M9 32h31M9 39h23" stroke={muted} strokeWidth="2" />
        <path d="M74 23h29" stroke={ink} strokeWidth="6" />
        <path d="M74 36h31M74 43h23" stroke={muted} strokeWidth="2" />
      </>;
      break;
    case 'sound':
      drawing = <>
        {[15, 29, 43].map(x => <circle key={x} cx={x} cy="33" r="6" fill="#e2dfeb" stroke={muted} />)}
        <path d="m27 30 4 3-4 3Z" fill="#797485" />
        <circle cx="77" cy="33" r="5" fill="#e2dfeb" stroke={muted} />
        <circle cx="94" cy="33" r="11" fill={ink} />
        <circle cx="111" cy="33" r="5" fill="#e2dfeb" stroke={muted} />
        <path d="m92 28 6 5-6 5Z" fill="#fff" />
      </>;
      break;
    case 'portfolio':
      drawing = <>
        <path d="M10 17h26M10 28h34M10 39h26M10 50h34" stroke={muted} strokeWidth="3" />
        <rect x="70" y="10" width="43" height="21" rx="3" fill="#eae5fb" />
        <rect x="70" y="38" width="43" height="21" rx="3" fill="#eae5fb" />
        <path d="M76 17h25M76 24h30M76 45h25M76 52h30" stroke={ink} strokeWidth="2" />
      </>;
      break;
    case 'flower':
      drawing = <>
        <rect x="5" y="11" width="43" height="47" rx="4" fill="#d9d2e8" />
        <rect x="72" y="11" width="43" height="47" rx="4" fill="#d9d2e8" />
        {[26, 93].map(x => <g key={x} fill="#b1a2c5"><ellipse cx={x} cy="25" rx="6" ry="11" /><ellipse cx={x} cy="25" rx="6" ry="11" transform={`rotate(60 ${x} 25)`} /><ellipse cx={x} cy="25" rx="6" ry="11" transform={`rotate(120 ${x} 25)`} /></g>)}
        <path d="M11 39h28M11 46h20" stroke="#fff" strokeWidth="3" />
        <rect x="76" y="32" width="35" height="20" rx="2" fill="#44375f" />
        <path d="M80 39h25M80 46h19" stroke="#fff" strokeWidth="3" />
      </>;
      break;
    case 'walk':
      drawing = <>
        <g fill="none" stroke="#d1ccdD" strokeWidth="2"><path d="M5 19h41M17 9v43M5 44h41M72 19h43M84 9v43M72 44h43" /><path d="m9 51 29-36M77 51l29-36" /></g>
        <path d="M8 42h23V23h13" fill="none" stroke={muted} strokeWidth="2" />
        <path d="M75 42h23V23h14" fill="none" stroke={ink} strokeWidth="4" strokeLinejoin="round" />
        <circle cx="75" cy="42" r="3" fill={ink} /><circle cx="112" cy="23" r="3" fill={ink} />
        <path d="M75 59h9" stroke={ink} strokeWidth="3" /><path d="M90 59h21" stroke="#8e899c" strokeWidth="2" />
      </>;
      break;
    default:
      drawing = <>
        <rect x="5" y="16" width="44" height="24" rx="4" fill="#fff" stroke="#c6c0d5" />
        <circle cx="13" cy="28" r="1.5" fill="#726b80" /><circle cx="19" cy="28" r="1.5" fill="#726b80" /><circle cx="25" cy="28" r="1.5" fill="#726b80" />
        <rect x="71" y="16" width="44" height="24" rx="4" fill="#fff" stroke="#c6c0d5" />
        <circle cx="79" cy="28" r="1.5" fill="#726b80" /><circle cx="85" cy="28" r="1.5" fill="#726b80" /><circle cx="91" cy="28" r="1.5" fill="#726b80" />
        <path d="M74 48h36M74 54h23" stroke={ink} strokeWidth="2" />
      </>;
  }

  return <svg className="practice-recap-sketch" viewBox="0 0 120 70" aria-hidden="true" focusable="false"><path d="M60 7v56" stroke="#ded9e9" strokeDasharray="2 4" />{drawing}</svg>;
}

export default function PracticeRecapPage() {
  usePageTitle('6가지 디자인 기준 | 고른시선');

  return <div className="app-surface practice-surface">
    <Header />
    <div className="shell practice-recap">
      <header className="practice-recap-heading">
        <h1>6가지 디자인 기준</h1>
        <p>다음 화면을 볼 때도 떠올려 보세요.</p>
      </header>
      <div className="practice-recap-grid">
        {EXERCISES.map((exercise, index) => <Link className="practice-recap-card" key={exercise.id} to={`/practice/${exercise.id}`} aria-label={`${exercise.principle} 연습 다시 보기`}>
          <div className="practice-recap-visual"><PrincipleSketch kind={exercise.kind} /><span aria-hidden="true">0{index + 1}</span></div>
          <h2>{exercise.principle}</h2>
          <p>{summaries[exercise.kind]}</p>
          <span className="practice-recap-link" aria-hidden="true">연습 다시 보기</span>
        </Link>)}
      </div>
      <div className="practice-recap-actions"><Link className="practice-secondary" to="/">홈으로</Link><Link className="practice-primary" to="/exercises">연습 모음</Link></div>
    </div>
    <SiteFooter />
  </div>;
}
