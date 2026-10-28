import { Link } from 'react-router-dom';
import './heroSection.css';

const BASE = import.meta.env.BASE_URL;
const HeroSection = () => (
  <section className="portfolio-hero" id="home" aria-labelledby="home-title">
    <div className="portfolio-shell hero-layout">
      <div className="hero-copy" data-hero-reveal>
        <p className="hero-kicker"><span className="identity-dot" />김도한 · 웹 / UI 디자인</p>
        <h1 id="home-title">정보는 명확하게.<br /><span>화면은 나답게.</span></h1>
        <p className="hero-description">사무와 현장에서 익힌 정보의 흐름을<br className="desktop-break" /> 웹과 모바일 화면으로 옮깁니다.</p>
        <p className="hero-scope">Figma 디자인 · AI 협업 웹 제작</p>
        <div className="hero-actions">
          <Link className="portfolio-button portfolio-button--primary" to="/" state={{ scrollTo: 'projects' }}>대표 작업 살펴보기</Link>
          <Link className="text-link" to="/about">저를 소개합니다</Link>
        </div>
      </div>
      <Link className="hero-feature" to="/projects/seolbiit" aria-label="설비결 디자인 자세히 보기">
        <div className="hero-feature__top"><span>DETAIL / 01</span><span>설비결 · 설비 점검 운영 UI</span></div>
        <div className="hero-feature__image">
          <img src={`${BASE}detail/current/seolbigyeol-20261028.png`} alt="설비결의 배정 대기 요청 카드 확대 — 증상과 담당자 배정, 처리 현황" width="1440" height="1080" fetchPriority="high" decoding="async" />
        </div>
        <div className="hero-feature__bottom"><span>요청의 상태에서, 다음 행동까지.</span><span className="hero-feature__open">작업 보기 ↗</span></div>
      </Link>
    </div>
    <div className="portfolio-shell hero-colophon"><span>DOHAN KIM — SELECTED WORK, 2026</span><span>업무의 흐름부터 일상의 취향까지 <b>07</b></span></div>
  </section>
);
export default HeroSection;
