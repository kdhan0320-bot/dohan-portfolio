import { Link } from 'react-router-dom';
import './heroSection.css';

const HeroSection = () => <section className="portfolio-hero" id="home" aria-labelledby="home-title">
  <div className="portfolio-shell hero-layout">
    <div className="hero-copy" data-hero-reveal>
      <p className="hero-kicker"><span className="identity-dot" />웹·UI 디자인 / 웹퍼블리싱 포트폴리오</p>
      <h1 id="home-title">김도한<span className="hero-name-dot">.</span></h1>
      <p className="hero-statement">흩어진 정보를,<br /><span>다음 행동이 보이는 화면으로.</span></p>
      <p className="hero-description">구매·문서·현장 업무에서 마주한 복잡함을<br className="desktop-break" /> 화면의 순서와 흐름으로 풀어갑니다.</p>
      <div className="hero-actions">
        <Link className="portfolio-button portfolio-button--primary" to="/" state={{ scrollTo: 'projects' }}>대표 작업 보기</Link>
        <Link className="text-link" to="/about">경험과 제작 기여</Link>
      </div>
      <p className="hero-scope">Figma 직접 편집 · 웹 구현은 AI 협업</p>
    </div>
    <div className="hero-composition" aria-label="관찰한 정보를 정리하고 행동으로 연결하는 작업 방식">
      <div className="composition-register"><span>DOHAN KIM</span><span>관찰 / 정리 / 연결</span></div>
      <div className="composition-field">
        <span className="composition-line composition-line--one" aria-hidden="true" />
        <span className="composition-line composition-line--two" aria-hidden="true" />
        <span className="composition-d" aria-hidden="true">D</span>
        <span className="composition-disc" aria-hidden="true" />
        <div className="composition-note composition-note--source"><span className="composition-label">01 / 관찰</span><p>요청.<br />기록.<br />선택.</p><span className="composition-small">화면 밖에서 찾은 질문</span></div>
        <div className="composition-note composition-note--result"><span className="composition-label">02 / 정리</span><p>무엇을 먼저<br />보여줄까?</p><div className="composition-rules" aria-hidden="true"><i /><i /><i /></div></div>
        <div className="composition-caption"><span className="composition-label">03 / 연결</span><strong>읽는 순서가,<br />행동의 흐름이 되도록.</strong></div>
      </div>
      <div className="composition-register composition-register--bottom"><span>정리의 흔적을 남기는 디자인</span><span>2026</span></div>
    </div>
  </div>
  <div className="portfolio-shell hero-colophon"><span>SELECTED WORK / 01—07</span><span>업무의 흐름부터, 일상의 취향까지.</span><span className="hero-colophon__last">SCROLL TO EXPLORE</span></div>
</section>;
export default HeroSection;
