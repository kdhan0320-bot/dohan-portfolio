import { useEffect, useId, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import { scrollToSection } from '../../hooks/useScrollNav';
import { POSTER_PROJECTS } from '../../data/posterProjects';
import './contextScene.css';

function InformationComposition({ edition }) {
  const prefix = useId().replaceAll(':', '');
  const fill = name => `url(#${prefix}-${name})`;
  return <svg key={edition} viewBox="0 0 720 560" aria-hidden="true" focusable="false">
    <defs>
      <linearGradient id={`${prefix}-silver`} x1="0" y1="0" x2="1" y2="1">
        <stop stopColor="#e8ebe8" stopOpacity=".95" /><stop offset=".58" stopColor="#c0c9d1" stopOpacity=".72" /><stop offset="1" stopColor="#8293a7" stopOpacity=".4" />
      </linearGradient>
      <linearGradient id={`${prefix}-mist`} x1="0" y1="0" x2="1" y2="1">
        <stop stopColor="#d6e0f1" stopOpacity=".18" /><stop offset=".5" stopColor="#c7d7ed" stopOpacity=".64" /><stop offset="1" stopColor="#aabfe0" stopOpacity=".9" />
      </linearGradient>
      <linearGradient id={`${prefix}-blue`} x1="0" y1="0" x2=".9" y2="1">
        <stop stopColor="#b6c9eb" /><stop offset=".55" stopColor="#829fcb" /><stop offset="1" stopColor="#4f6b94" />
      </linearGradient>
      <linearGradient id={`${prefix}-edge`} x1="0" y1="0" x2="1" y2="1">
        <stop stopColor="#f2f3f4" stopOpacity=".85" /><stop offset="1" stopColor="#c1d5f2" stopOpacity=".1" />
      </linearGradient>
      <radialGradient id={`${prefix}-glow`}>
        <stop stopColor="#a6bce0" stopOpacity=".14" /><stop offset="1" stopColor="#a6bce0" stopOpacity="0" />
      </radialGradient>
    </defs>
    <ellipse cx="397" cy="292" rx="315" ry="268" fill={fill('glow')} />
    <g className="context-guides" fill="none" stroke="#c1cad8" strokeWidth="1">
      <path d="M138 66v420M656 66v420M112 76h570M112 476h570" opacity=".15" />
      <path d="M138 94h-18m18 0V76m518 18h18m-18 0V76M138 458h-18m18 0v18m518-18h18m-18 0v18" opacity=".55" />
    </g>
    <g className="context-assembly">
      <rect className="context-outline" x="148" y="86" width="498" height="380" rx="3" fill="none" stroke="#c3d1e5" strokeWidth="1" />
      <g className="context-piece context-piece--observe">
        <rect x="156" y="94" width="176" height="364" rx="3" fill={fill('silver')} stroke={fill('edge')} />
        <path d="M177 116h134v320H177z" fill="none" stroke="#f1f3f4" strokeOpacity=".32" />
        <circle cx="199" cy="138" r="5" fill="#354c68" />
        <path d="M218 138h66" stroke="#354c68" strokeOpacity=".55" strokeWidth="2" />
        <path d="M199 187h89M199 203h64M199 219h77" stroke="#304660" strokeOpacity=".38" strokeWidth="2" />
        <path d="M199 263h89v94h-89z" fill="#f4f5f5" fillOpacity=".14" stroke="#4a6079" strokeOpacity=".26" />
        <path d="M199 389h89M199 405h43" stroke="#304660" strokeOpacity=".38" strokeWidth="2" />
      </g>
      <g className="context-piece context-piece--arrange">
        <rect x="348" y="94" width="290" height="164" rx="3" fill={fill('mist')} stroke={fill('edge')} />
        <path d="M371 117h244v118H371z" fill="none" stroke="#e8effa" strokeOpacity=".32" />
        <path d="M394 144h122M394 162h82" stroke="#eef3fb" strokeOpacity=".7" strokeWidth="2" />
        <path d="M394 209h198" stroke="#304660" strokeOpacity=".3" />
        <circle cx="570" cy="160" r="21" fill="none" stroke="#e8effa" strokeOpacity=".7" />
        <path d="M570 147v26m-13-13h26" stroke="#e8effa" strokeOpacity=".7" />
      </g>
      <g className="context-piece context-piece--connect">
        <rect x="348" y="274" width="290" height="184" rx="3" fill={fill('blue')} stroke={fill('edge')} />
        <path d="M371 297h244v138H371z" fill="none" stroke="#e8effa" strokeOpacity=".3" />
        <path d="M394 327h110M394 345h70" stroke="#edf3fc" strokeOpacity=".72" strokeWidth="2" />
        <path className="context-connection" d="M394 408h57v-27h60v27h81" fill="none" stroke="#f0f4fa" strokeWidth="2" pathLength="1" />
        <circle cx="394" cy="408" r="4" fill="#f0f4fa" /><circle cx="592" cy="408" r="4" fill="#f0f4fa" />
      </g>
    </g>
  </svg>;
}

export default function ContextScene() {
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');
  const finePointer = useMediaQuery('(hover: hover) and (pointer: fine)');
  const [edition, setEdition] = useState(0);
  const [playing, setPlaying] = useState(true);
  const surface = useRef(null);
  const resetPointer = () => {
    surface.current?.style.setProperty('--context-x', '0px');
    surface.current?.style.setProperty('--context-y', '0px');
  };
  useEffect(() => {
    if (reduced) { setPlaying(false); resetPointer(); return; }
    setPlaying(true);
    const timer = setTimeout(() => setPlaying(false), 3200);
    return () => clearTimeout(timer);
  }, [edition, reduced]);
  const followPointer = event => {
    if (reduced || !finePointer || playing) return;
    const rect = event.currentTarget.getBoundingClientRect();
    surface.current.style.setProperty('--context-x', `${((event.clientX - rect.left) / rect.width - .5) * 12}px`);
    surface.current.style.setProperty('--context-y', `${((event.clientY - rect.top) / rect.height - .5) * 8}px`);
  };
  return <section id="home" className="context-hero" aria-labelledby="home-title">
    <div className="portfolio-shell context-layout">
      <div className="context-introduction">
        <p className="context-signature"><span>김도한</span> 웹·UI 디자인</p>
        <h1 id="home-title" data-hero-reveal><span>현장의 맥락을 읽고,</span><span>화면의 순서를<br className="context-title-break" /> 정합니다.</span></h1>
        <p className="context-background">구매·총무와 생산 현장의 경험에서<br /> 출발한 웹·UI 디자인.</p>
      </div>
      <figure className="context-visual">
        <div ref={surface} className="context-surface" data-phase={playing && !reduced ? 'arranging' : 'settled'} onPointerMove={followPointer} onPointerLeave={resetPointer} role="img" aria-label="흩어진 세 개의 정보 면이 하나의 틀 안에 정돈되는 그래픽">
          <InformationComposition edition={`${edition}-${reduced}`} />
        </div>
        <figcaption><span>관찰 <i /> 정리 <i /> 연결</span>{!reduced && <button type="button" onClick={() => { resetPointer(); setEdition(value => value + 1); }} aria-label="정보가 제자리를 찾는 장면 다시 재생">장면 다시 보기</button>}</figcaption>
      </figure>
      <div className="context-actions"><button type="button" className="context-work-link" onClick={() => scrollToSection('projects')}>작업 보기 <span>{String(POSTER_PROJECTS.length).padStart(2, '0')}</span></button><Link to="/about">경험과 기여</Link></div>
    </div>
  </section>;
}
