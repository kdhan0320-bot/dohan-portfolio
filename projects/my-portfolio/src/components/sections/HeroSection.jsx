import { Link } from 'react-router-dom';

const BASE = import.meta.env.BASE_URL;
const HeroSection = () => (
  <section className="home-intro portfolio-shell" id="home" aria-labelledby="home-title">
    <div className="home-intro-copy" data-hero-reveal>
      <p className="eyebrow"><span className="identity-mark" aria-hidden="true" />김도한 · UX/UI 디자인 · 웹퍼블리싱</p>
      <h1 id="home-title">일의 맥락을 알고,<br /><span>화면을 설계합니다.</span></h1>
      <p className="home-intro-description">구매·회계·총무와 생산 현장을 경험했습니다.{' '}<br />이제 그 경험을 바탕으로, 필요한 정보와<br className="desktop-break" /> 다음 행동이 분명한 화면을 고민합니다.</p>
      <div className="hero-actions">
        <Link className="portfolio-button portfolio-button--primary" to="/projects">프로젝트 보기</Link>
        <Link className="portfolio-button portfolio-button--secondary" to="/" state={{ scrollTo: 'experience' }}>이전 경력 보기</Link>
      </div>
      <p className="hero-role-note">사무·생산 실무 경험 <span aria-hidden="true">·</span> 디자인·웹퍼블리싱 신입 지원</p>
    </div>
    <figure className="identity-visual" data-hero-reveal aria-label="실제 프로젝트 화면으로 소개하는 작업 방향">
      <div className="identity-visual__heading"><span>경험을 화면으로</span><span aria-hidden="true">DOHAN KIM</span></div>
      <div className="identity-visual__grid" aria-hidden="true" />
      <div className="identity-screen identity-screen--main">
        <div className="identity-screen__label"><span>설비결</span><span>업무 흐름을 정리하는 UI</span></div>
        <img src={`${BASE}detail/current/seolbigyeol-home.png`} alt="설비결의 작업 현황, 우선 요청과 확인할 사항" fetchPriority="high" decoding="async" />
      </div>
      <div className="identity-screen identity-screen--note">
        <div className="identity-screen__label"><span>갈피록</span><span>일상의 기록을 정리하는 웹</span></div>
        <img src={`${BASE}detail/galpirok-board-pc.jpg`} alt="갈피록의 지원 단계별 기록 화면" decoding="async" />
      </div>
      <figcaption><span className="identity-visual__index">01 — 02</span><span>정보의 순서와 다음 행동을 생각합니다.</span></figcaption>
    </figure>
    <div className="experience-summary" aria-label="경력과 현재 작업 요약">
      <div><span>사무 실무</span><strong>구매 · 회계 · 총무</strong></div>
      <div><span>현장 경험</span><strong>생산 업무 · 현장 지원</strong></div>
      <div><span>현재 작업</span><strong>UI 디자인 · 웹퍼블리싱</strong></div>
    </div>
  </section>
);
export default HeroSection;
