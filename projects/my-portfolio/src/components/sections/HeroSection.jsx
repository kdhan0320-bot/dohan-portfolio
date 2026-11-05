import { useState } from 'react';
import { Link } from 'react-router-dom';
import { scrollToSection } from '../../hooks/useScrollNav';
import './heroSection.css';

// The three faces share the same baseline, like the ruled edges of stacked forms.
const DigeutMark = () => (
  <svg className="intro-glyph" viewBox="0 0 496 324" aria-hidden="true" focusable="false">
    <g className="intro-guides" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M18 58h460M18 243h460M74 18v282M375 18v282" strokeDasharray="2 6" />
      <path d="M13 58h10m-5-5v10m455 180h10m-5-5v10" />
    </g>
    <g className="intro-sheet intro-sheet--back">
      <path d="M104 34h301v39H145v142h260v41H104z" fill="#d2dde4" stroke="#a1b2be" />
      <path d="M111 42h286m-286 0v205h286" fill="none" stroke="#f7f9fa" />
    </g>
    <g className="intro-sheet intro-sheet--middle">
      <path d="M89 46h301v40H130v141h260v41H89z" fill="#9bafbe" stroke="#879dad" />
      <path d="M96 54h287m-287 0v206h287" fill="none" stroke="#d4dfe5" />
    </g>
    <g className="intro-sheet intro-sheet--top">
      <path d="M74 58h301v40H115z" fill="#638198" />
      <path d="M74 58h301" stroke="#8199aa" />
    </g>
    <g className="intro-sheet intro-sheet--spine">
      <path d="m74 58 41 40v141l-41 41z" fill="#4b667a" />
      <path d="M81 76v187" fill="none" stroke="#6d879a" />
    </g>
    <g className="intro-sheet intro-sheet--foot">
      <path d="m74 280 41-41h260v41z" fill="#577387" />
      <path d="M86 274h282" fill="none" stroke="#849dad" />
    </g>
    <g className="intro-sheet intro-sheet--rules" fill="none">
      <path d="M145 144h302m-302 32h262m-262 32h223" stroke="#a7b8c4" />
      <path d="M145 140v8m302-8v8" stroke="#788f9e" />
    </g>
  </svg>
);

const HeroSection = () => {
  const [playback, setPlayback] = useState(0);

  return (
    <section id="home" className="portfolio-hero" aria-labelledby="home-title">
      <div className="portfolio-shell intro-layout">
        <div className="intro-heading" data-hero-reveal>
          <p className="intro-role">웹디자인 · 웹퍼블리싱 포트폴리오</p>
          <h1 id="home-title">김도한</h1>
        </div>
        <div className="intro-details">
          <p className="intro-description">구매·총무와 생산 현장에서 배운 업무의 순서를<br className="intro-break" /> 일하는 사람의 화면에 담습니다.</p>
          <div className="intro-actions">
            <button className="portfolio-button portfolio-button--primary" type="button" onClick={() => scrollToSection('projects')}>대표 작업 보기</button>
            <Link className="text-link" to="/about">소개 보기</Link>
          </div>
          <p className="intro-scope">Figma 직접 편집 · AI 협업 웹 제작</p>
        </div>
        <figure className="intro-art">
          <DigeutMark key={playback} />
          <figcaption className="intro-art-caption">
            <span>도한의 ‘ㄷ’과 전표의 괘선</span>
            <button className="intro-replay" type="button" onClick={() => setPlayback(n => n + 1)} aria-label="도입 모션 다시 보기">
              <svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M4 8a6.5 6.5 0 1 1 .4 5M4 3v5h5" /></svg>
              <span>다시 보기</span>
            </button>
          </figcaption>
        </figure>
      </div>
    </section>
  );
};

export default HeroSection;
