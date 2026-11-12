import { useEffect, useRef, useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Link } from 'react-router-dom';
import ReceiptFlow from '../projects/ReceiptFlow';
import './heroSection.css';

const BASE = import.meta.env.BASE_URL;

function CinemaScene() {
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');
  const [view, setView] = useState('scene');
  const [manual, setManual] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const surface = useRef(null);
  useEffect(() => {
    if (reduced || manual || !loaded || !window.IntersectionObserver) return;
    let timer;
    const observer = new IntersectionObserver(([entry]) => {
      clearTimeout(timer);
      if (entry.isIntersecting) timer = setTimeout(() => {
        setView('ui');
        observer.disconnect();
      }, 1800);
    }, { threshold: .6 });
    observer.observe(surface.current);
    return () => { clearTimeout(timer); observer.disconnect(); };
  }, [reduced, manual, loaded]);
  const active = reduced && !manual ? 'ui' : view;
  return <>
    <div ref={surface} className="cinema-scene" data-view={active} id="cinema-scene-screen">
      <img className="cinema-scene__art" src={`${BASE}detail/current/bluehour-scene.webp`} alt={active === 'scene' ? '잔상관 파란 오후의 AI 생성 장면 — 바닷가에서 자전거를 탄 두 친구' : ''} aria-hidden={active !== 'scene'} width="1774" height="887" fetchPriority="high" />
      <picture className="cinema-scene__ui" aria-hidden={active !== 'ui'}>
        <source media="(max-width:700px)" srcSet={`${BASE}detail/current/jansang-explore-390-20261112.png`} width="390" height="440" />
        <img src={`${BASE}detail/current/jansang-explore-1440-20261112.png`} alt={active === 'ui' ? '잔상관 공개 웹의 실제 탐색 화면 — 파란 오후 표지와 분위기·시간 선택, 영화 목록' : ''} width="1440" height="860" onLoad={() => setLoaded(true)} />
      </picture>
    </div>
    <div className="cinema-scene__controls">
      <div role="group" aria-label="잔상관 장면과 실제 화면 선택">
        {[['scene', '작품 장면'], ['ui', '실제 탐색 UI']].map(([id, label]) => <button key={id} type="button" aria-pressed={active === id} aria-controls="cinema-scene-screen" onClick={() => { setManual(true); setView(id); }}>{label}</button>)}
      </div>
      <a href="https://kdhan0320-bot.github.io/dohan-portfolio/jansang-cinema/" target="_blank" rel="noreferrer" aria-label="잔상관 웹에서 탐색 (새 탭)">웹에서 탐색</a>
    </div>
    <p className="cinema-scene__caption">{active === 'scene' ? '파란 오후 · 공개 작품의 AI 생성 장면' : '공개 웹 캡처 · 분위기와 시간으로 고르는 화면'}</p>
  </>;
}
const scenes = [
  { id: 'cinema', title: '잔상관', slug: 'jansang-cinema', image: 'bluehour-scene.webp', alt: '잔상관의 가상 영화 파란 오후 — 바닷가에서 자전거를 탄 두 친구', caption: '잔상관 · 공개 작품의 AI 생성 장면', description: '한 편의 표지로 시작해, 분위기로 고르는 단편영화.', role: '편집 방향 · 단독 표지 · 필터 통합 · 메모 읽기 흐름 결정' },
  { id: 'pumu', title: '품의선', slug: 'feedback-hub', caption: '품의선 · 실제 예시 수량을 재구성한 흐름', description: '발주와 입고, 지급을 구분해 남은 재고를 읽는 화면.', role: '발주·입고·지급 요구사항 정리' },
  { id: 'seolbi', title: '설비결', slug: 'seolbiit', image: 'seolbigyeol-home-20261112.png', alt: '설비결 Figma 작업 현황 — 배정 대기 요청과 검토할 작업', caption: '설비결 · 현재 Figma 디자인 화면', description: '배정 대기 요청에서 다음 담당자 선택까지.', role: '설비 점검 요구사항 제시 · 작업 상태의 우선순위 검토' },
];

export default function HeroSection() {
  const [selected, setSelected] = useState(0);
  const scene = scenes[selected];
  return <section id="home" className="portfolio-hero scenes-hero" aria-labelledby="home-title">
    <div className="portfolio-shell">
      <div className="scene-register"><p>김도한 <span>웹·UI 디자이너</span></p><p>SELECTED WORKS <span>2026</span></p></div>
      <div className="scene-heading">
        <h1 id="home-title"><span data-hero-reveal>읽히는 화면.</span><span data-hero-reveal>기억에 남는 장면.</span></h1>
        <p>업무의 흐름부터 영화의 분위기까지.<br />세 가지 작업으로 소개합니다.</p>
      </div>
      <div className="scene-gallery">
        <div className="scene-selector" role="group" aria-label="첫 화면 대표 작품 선택">
          {scenes.map((item, index) => <button type="button" key={item.id} aria-pressed={selected === index} aria-controls="scene-preview" onClick={() => setSelected(index)}><span>{String(index + 1).padStart(2, '0')}</span>{item.title}</button>)}
        </div>
        <figure id="scene-preview" className={`scene-preview scene-preview--${scene.id}`}>
          <div className="scene-stage" key={scene.id}>
            {scene.id === 'cinema' ? <CinemaScene /> : scene.image ? <img src={`${BASE}detail/current/${scene.image}`} alt={scene.alt} width="1440" height="1080" /> : <ReceiptFlow compact />}
          </div>
          {scene.id !== 'cinema' && <figcaption>{scene.caption}</figcaption>}
        </figure>
        <div className="scene-description" aria-live="polite" aria-atomic="true">
          <p>{scene.description}</p>
          <Link className="scene-project-link" to={`/projects/${scene.slug}`}>{scene.title} 자세히 보기</Link>
        </div>
        <p className="scene-role"><strong>김도한의 기여</strong><span>{scene.role}</span></p>
      </div>
      <div className="scene-bottom"><p>웹·UI 디자인 신입 지원 <span>시각 제안·화면 편집·구현에 AI 협업 포함</span></p><Link to="/about">경험과 기여</Link></div>
    </div>
  </section>;
}
