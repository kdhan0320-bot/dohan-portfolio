import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import { scrollToSection } from '../../hooks/useScrollNav';
import './editingName.css';

export default function EditingName() {
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');
  const finePointer = useMediaQuery('(hover: hover) and (pointer: fine)');
  const [edition, setEdition] = useState(0);
  const [playing, setPlaying] = useState(true);
  const board = useRef(null);
  useEffect(() => {
    if (reduced) { setPlaying(false); return; }
    setPlaying(true);
    const timer = setTimeout(() => setPlaying(false), 2300);
    return () => clearTimeout(timer);
  }, [edition, reduced]);
  const clearPointer = () => {
    board.current?.style.setProperty('--edit-x', '0px');
    board.current?.style.setProperty('--edit-y', '0px');
  };
  useEffect(() => { if (reduced) clearPointer(); }, [reduced]);
  const followPointer = (event) => {
    if (playing || reduced || !finePointer) return;
    const rect = event.currentTarget.getBoundingClientRect();
    board.current.style.setProperty('--edit-x', `${((event.clientX - rect.left) / rect.width - .5) * 12}px`);
    board.current.style.setProperty('--edit-y', `${((event.clientY - rect.top) / rect.height - .5) * 8}px`);
  };
  return <section className="name-intro" id="home" aria-labelledby="home-title">
    <div className="portfolio-shell">
      <div className="name-intro__register"><p>웹·UI 디자인 <span>김도한</span></p><p>PORTFOLIO <span>2026</span></p></div>
      <h1 id="home-title" className="visually-hidden">김도한 · 웹·UI 디자인 포트폴리오</h1>
      <div ref={board} className="name-board" data-phase={playing && !reduced ? 'editing' : 'settled'} onPointerMove={followPointer} onPointerLeave={clearPointer} aria-hidden="true">
        <div className="name-composition" key={`${edition}-${reduced}`}>
          {['김', '도', '한'].map((letter, index) => <span className={`name-letter name-letter--${index}`} key={letter} style={{ '--letter-index': index }}>
            <span className="name-letter__measure">{letter}</span>
            {[0, 1, 2].map(slice => <span className={`name-piece name-piece--${slice}`} key={slice} style={{ '--slice-index': slice }}>{letter}</span>)}
          </span>)}
        </div>
        <div className="name-baseline"><span>DOHAN</span><span>KIM</span></div>
      </div>
      <div className="name-intro__bottom">
        <p className="name-statement" data-hero-reveal>일의 맥락을 읽고,<br /><span>화면의 순서를 정합니다.</span></p>
        <div className="name-intro__actions"><button className="name-work-link" type="button" onClick={() => scrollToSection('projects')}>작업 보기 <span>07</span></button><Link to="/about">경험과 기여</Link></div>
      </div>
      <div className="name-intro__foot"><p>관찰에서 시작하는 디자인.</p>{!reduced && <button type="button" onClick={() => { clearPointer(); setEdition(value => value + 1); }} aria-label="김도한 이름 애니메이션 다시 재생">이름 다시 편집</button>}</div>
    </div>
  </section>;
}
