import { useState } from 'react';
import { Link } from 'react-router-dom';
import './heroSection.css';

const BASE = import.meta.env.BASE_URL;
const SCENES = [
  { id: 'seolbiit', title: '설비결', tab: '업무의 흐름', label: '01 / WORKFLOW', image: 'detail/current/seolbigyeol-cover-20261028.webp', alt: '설비결의 실제 Figma 화면. 정비 요청과 담당자 배정, 처리 현황을 함께 보여줍니다.', note: '요청을 읽고, 다음 할 일을 알 수 있도록.', type: 'Figma 디자인' },
  { id: 'jobflow', title: '갈피록', tab: '일상의 기록', label: '02 / RECORD', image: 'detail/current/galpirok-overview-20261028.jpg', alt: '갈피록의 실제 웹 화면. 회사별 지원 기록과 준비할 일을 보여줍니다.', note: '흩어진 지원 기록을, 하나의 흐름으로.', type: 'AI 협업 웹 제작' },
  { id: 'ott-service', title: '잔상관', tab: '취향의 발견', label: '03 / DISCOVERY', image: 'detail/current/jansang-v37-home.jpg', alt: '잔상관의 실제 웹 화면. 영화의 포스터와 테마별 작품을 보여줍니다.', note: '작품의 분위기를 만나고, 취향을 남기도록.', type: 'AI 협업 웹 제작' },
];

const HeroSection = () => {
  const [selected, setSelected] = useState(0);
  const scene = SCENES[selected];
  return <section className="portfolio-hero" id="home" aria-labelledby="home-title">
    <div className="portfolio-shell hero-layout">
      <div className="hero-copy" data-hero-reveal>
        <p className="hero-kicker"><span className="identity-dot" />김도한의 화면 편집실</p>
        <h1 id="home-title">복잡한 일에,<br /><span>자연스러운</span><br />흐름을 만듭니다.</h1>
        <p className="hero-description">흩어진 정보를 정리하고,<br />다음 행동이 보이는 화면을 고민합니다.</p>
        <p className="hero-scope">웹·UI 디자인 <span aria-hidden="true">/</span> Figma · AI 협업 웹 제작</p>
        <div className="hero-actions">
          <Link className="portfolio-button portfolio-button--primary" to="/" state={{ scrollTo: 'projects' }}>대표 작업 보기</Link>
          <Link className="portfolio-button portfolio-button--secondary" to="/about">저를 소개합니다</Link>
        </div>
      </div>
      <div className="hero-desk">
        <div className="hero-desk__caption"><span>DOHAN’S EDITING ROOM</span><span>SELECTED / 2026</span></div>
        <div className="hero-scene-controls" role="group" aria-label="첫 화면의 대표 작업 선택">
          {SCENES.map((item, index) => <button key={item.id} type="button" aria-pressed={index === selected} aria-controls="hero-scene" onClick={() => setSelected(index)}><span>0{index + 1}</span>{item.tab}</button>)}
        </div>
        <div className="hero-paper-stack">
          <Link id="hero-scene" className={`hero-feature hero-feature--${scene.id}`} to={`/projects/${scene.id}`} aria-label={`${scene.title} 작업 자세히 보기`}>
            <div className="hero-feature__top"><span>{scene.title}</span><span>{scene.type}</span></div>
            <div className="hero-feature__image"><img key={scene.id} src={`${BASE}${scene.image}`} alt={scene.alt} width="1440" height="1080" fetchPriority={selected === 0 ? 'high' : 'auto'} decoding="async" /></div>
            <div className="hero-feature__bottom"><span>{scene.note}</span><span className="hero-feature__open">자세히 보기</span></div>
          </Link>
          <span className="hero-paper-tab" aria-hidden="true">{scene.label}</span>
        </div>
        <p className="hero-scene-announcement visually-hidden" aria-live="polite">{scene.title} · {scene.note}</p>
        <p className="hero-margin-note"><span aria-hidden="true">✳</span> 서로 다른 화면에도, 분명한 이유가 있도록.</p>
      </div>
    </div>
    <div className="portfolio-shell hero-colophon"><span>관찰을 모으고. 흐름을 잇고. 화면을 다듬고.</span><span>일곱 가지 작업, 저마다의 이야기 <b>01 — 07</b></span></div>
  </section>;
};
export default HeroSection;
