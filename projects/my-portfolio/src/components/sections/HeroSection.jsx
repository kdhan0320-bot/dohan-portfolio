import { Link } from 'react-router-dom';
import { PORTFOLIO_PDF_URL } from '../../constants/site';
import './heroSection.css';

const BASE = import.meta.env.BASE_URL;
const HeroSection = () => (
  <section className="portfolio-hero" id="home" aria-labelledby="home-title">
    <div className="hero-atmosphere" aria-hidden="true"><span /><span /></div>
    <div className="portfolio-shell">
      <div className="hero-identity" data-hero-reveal>
        <div className="hero-signature">
          <p className="hero-discipline">UX/UI 디자인 · 웹퍼블리싱</p>
          <h1 id="home-title">김도한<span>.</span></h1>
          <p className="hero-roman-name" aria-hidden="true">DOHAN KIM</p>
        </div>
        <div className="hero-introduction">
          <p className="hero-statement">복잡한 정보를,<br /><span>명확한 화면으로.</span></p>
          <p className="hero-description">사무·현장 경험을 바탕으로,<br />업무와 일상을 정리하는 화면을 고민합니다.</p>
          <div className="hero-actions">
            <Link className="portfolio-button portfolio-button--primary" to="/projects">작업 보기</Link>
            <Link className="portfolio-button portfolio-button--secondary" to="/about">소개 보기</Link>
            {PORTFOLIO_PDF_URL && <a className="text-link" href={PORTFOLIO_PDF_URL} download>포트폴리오 PDF</a>}
          </div>
        </div>
      </div>
      <div className="hero-stage" aria-label="대표 작업 미리보기">
        <Link className="hero-stage__panel hero-stage__panel--equipment" to="/projects/seolbiit" aria-label="설비결 프로젝트 보기">
          <div className="hero-stage__image"><img src={`${BASE}detail/current/seolbigyeol-home.png`} alt="설비결의 작업 현황과 점검 요청 화면" loading="eager" decoding="async" /></div>
          <span className="hero-stage__caption"><strong>설비결</strong><span>업무의 흐름</span></span>
        </Link>
        <Link className="hero-stage__panel hero-stage__panel--record" to="/projects/jobflow" aria-label="갈피록 프로젝트 보기">
          <div className="hero-stage__image"><img src={`${BASE}detail/galpirok-board-pc.jpg`} alt="갈피록의 지원 단계별 기록 화면" decoding="async" /></div>
          <span className="hero-stage__caption"><strong>갈피록</strong><span>일상의 기록</span></span>
        </Link>
        <Link className="hero-stage__panel hero-stage__panel--cinema" to="/projects/ott-service" aria-label="잔상관 프로젝트 보기">
          <div className="hero-stage__image"><img src={`${BASE}detail/current/jansang-home.jpg`} alt="잔상관의 영화 탐색 화면" decoding="async" /></div>
          <span className="hero-stage__caption"><strong>잔상관</strong><span>발견의 즐거움</span></span>
        </Link>
      </div>
      <div className="hero-colophon"><span>SELECTED WORK · 2026</span><span>차분하게 살피고, 분명하게 다듬습니다.</span></div>
    </div>
  </section>
);
export default HeroSection;
