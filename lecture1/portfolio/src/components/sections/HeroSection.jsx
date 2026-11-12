import { Link } from 'react-router-dom';
import { scrollToSection } from '../../hooks/useScrollNav';
import FlowGraphic from './FlowGraphic';
import './heroSection.css';

export default function HeroSection() {
  return <section id="home" className="portfolio-hero kinetic-hero" aria-labelledby="home-title">
    <div className="portfolio-shell">
      <div className="hero-register"><p>김도한 <span>웹·UI 디자이너</span></p><p>SELECTED WORKS <span>2026</span></p></div>
      <h1 id="home-title" className="kinetic-title">
        <span className="title-line"><span data-hero-reveal>일의 순서를,</span></span>
        <span className="title-line"><span data-hero-reveal>화면의 <em>질서로.</em></span></span>
      </h1>
      <FlowGraphic />
      <div className="hero-bottom">
        <p className="hero-statement">구매·총무와 생산 현장에서 익힌 일의 흐름.<br />이제, 이해하기 쉬운 화면으로 연결합니다.</p>
        <div className="hero-destinations"><button className="hero-work-link" type="button" onClick={() => scrollToSection('projects')}>대표 작업 살펴보기 <span>03</span></button><Link to="/about">경험과 기여</Link></div>
      </div>
    </div>
  </section>;
}
