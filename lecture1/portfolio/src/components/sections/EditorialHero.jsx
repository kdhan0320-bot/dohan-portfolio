import { useEffect, useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { scrollToSection } from '../../hooks/useScrollNav';
import { POSTER_PROJECTS } from '../../data/posterProjects';
import './editorialHero.css';

export default function EditorialHero() {
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)', { noSsr: true });
  const [edition, setEdition] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (reduced) { setPlaying(false); return; }
    if (!playing) return;
    const timer = setTimeout(() => setPlaying(false), 1900);
    return () => clearTimeout(timer);
  }, [edition, playing, reduced]);

  const replay = () => {
    setEdition(value => value + 1);
    setPlaying(true);
  };

  return <section id="home" className="editorial-hero portfolio-shell" aria-labelledby="home-title" data-motion={playing && !reduced ? 'playing' : 'settled'}>
    <div className="editorial-top"><span>경험을 읽고, 화면으로 연결하는 일.</span><span>PORTFOLIO / 2026</span></div>
    <h1 id="home-title" key={edition}>
      <span className="editorial-first-line"><span className="editorial-word editorial-word--field" data-hero-reveal>현장과</span><span className="editorial-type-rule" aria-hidden="true" /></span>
      <span className="editorial-second-line"><em className="editorial-word editorial-word--screen" data-hero-reveal>화면</em>{' '}<span className="editorial-word editorial-word--between" data-hero-reveal>사이.</span></span>
    </h1>
    <div className="editorial-bottom">
      <p className="editorial-context"><span>구매관리·총무</span><span>자동화설비회사</span></p>
      <div className="editorial-intro-end">
        <p>구매관리·총무 경험을<br />웹·UI 디자인으로 이어갑니다.</p>
        <div className="editorial-actions">
          <button type="button" className="editorial-work-link" onClick={() => scrollToSection('projects')}>작업 살펴보기 <span>{String(POSTER_PROJECTS.length).padStart(2, '0')}</span></button>
          {!reduced && <button type="button" className="editorial-replay" onClick={replay} aria-label="첫 문장 애니메이션 다시 보기">다시 보기</button>}
        </div>
      </div>
    </div>
    <span key={`line-${edition}`} className="editorial-baseline" aria-hidden="true" />
  </section>;
}
