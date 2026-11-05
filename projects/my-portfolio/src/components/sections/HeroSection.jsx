import { useState } from 'react';
import { Link } from 'react-router-dom';
import { scrollToSection } from '../../hooks/useScrollNav';
import './heroSection.css';

const coverImage = `${import.meta.env.BASE_URL}folded-sheet.jpg`;

function FoldedSheet() {
  const [ready, setReady] = useState(false);
  const [playback, setPlayback] = useState(0);

  function handleLoad() {
    setReady(true);
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
        document.documentElement.dataset.reviewMode !== 'true') {
      setPlayback(1);
    }
  }

  return (
    <figure className="fold-art">
      <div className="fold-frame">
        <img
          className="fold-image"
          src={coverImage}
          width="1536" height="1024"
          alt="푸른 원과 가는 선들이 인쇄된 종이 한 장이 세 면으로 접혀 있다."
          onLoad={handleLoad}
        />
        {playback > 0 && (
          <div key={playback} className="fold-light" aria-hidden="true">
            <i className="fold-light-back" />
            <i className="fold-light-middle" />
            <i className="fold-light-front" />
          </div>
        )}
      </div>
      <figcaption className="fold-caption">
        <span className="fold-title">접힌 작업 도면</span>
        <button
          type="button"
          className="fold-replay"
          disabled={!ready}
          onClick={() => setPlayback(count => count + 1)}
        >
          <svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12">
            <path fill="currentColor" d="M3 1.5 10 6l-7 4.5z" />
          </svg>
          도입 모션 재생
        </button>
      </figcaption>
    </figure>
  );
}

export default function HeroSection() {
  return (
    <section id="home" className="portfolio-hero" aria-labelledby="home-title">
      <div className="portfolio-shell fold-layout">
        <div className="fold-heading" data-hero-reveal>
          <p className="fold-role">웹·UI 디자인 <span aria-hidden="true">/</span> 웹퍼블리싱</p>
          <h1 id="home-title">김도한</h1>
        </div>
        <div className="fold-intro">
          <p className="fold-description">
            구매·총무와 생산 현장에서 익힌<br className="fold-break" /> 일의 순서를 화면으로 옮깁니다.
          </p>
          <div className="fold-actions">
            <button type="button" className="fold-primary" onClick={() => scrollToSection('projects')}>
              대표 작업 보기
              <svg aria-hidden="true" width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
                <path d="M8 1.5v12m-5-5 5 5 5-5" />
              </svg>
            </button>
            <Link className="text-link" to="/about">소개 보기</Link>
          </div>
          <p className="fold-scope">Figma 직접 편집 · AI 협업 웹 제작</p>
        </div>
        <FoldedSheet />
      </div>
    </section>
  );
}
