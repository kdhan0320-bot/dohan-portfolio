import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './heroSection.css';

const BASE = import.meta.env.BASE_URL;
const STEPS = ['기록을 관찰하고', '기준으로 정리해', '화면으로 연결합니다'];
const initialStep = () => typeof window === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.__PORTFOLIO_REVIEW_MODE__ ? 2 : 0;

const HeroSection = () => {
  const [step, setStep] = useState(initialStep);
  const timers = useRef([]);
  const clearSequence = () => { timers.current.forEach(clearTimeout); timers.current = []; };
  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!motion.matches && !window.__PORTFOLIO_REVIEW_MODE__ && document.documentElement.dataset.reviewMode !== 'true') {
      timers.current = [setTimeout(() => setStep(1), 850), setTimeout(() => setStep(2), 1750)];
    } else setStep(2);
    const onMotionChange = () => { if (motion.matches) { clearSequence(); setStep(2); } };
    motion.addEventListener('change', onMotionChange);
    return () => { clearSequence(); motion.removeEventListener('change', onMotionChange); };
  }, []);
  const selectStep = (value) => { clearSequence(); setStep(value); };

  return <section className="portfolio-hero" id="home" aria-labelledby="home-title">
    <div className="portfolio-shell hero-layout">
      <div className="hero-copy" data-hero-reveal>
        <p className="hero-kicker"><span className="identity-dot" aria-hidden="true" />김도한 · 웹·UI 디자인</p>
        <h1 id="home-title">복잡한 기록을,<br /><span>명확한 화면으로.</span></h1>
        <p className="hero-description">구매와 현장에서 찾은 질문을 바탕으로,<br className="desktop-break" /> 필요한 정보와 다음 행동이 보이는 화면을 만듭니다.</p>
        <div className="hero-actions">
          <Link className="portfolio-button portfolio-button--primary" to="/" state={{ scrollTo: 'projects' }}>작업 살펴보기 <span className="button-count">07</span></Link>
          <Link className="text-link" to="/about">경험과 제작 기여</Link>
        </div>
        <p className="hero-scope">Figma 직접 편집 · AI 협업 웹 제작<br /><span>웹·UI 디자인 신입 지원 / 웹퍼블리싱 학습 중</span></p>
      </div>
      <div className="flow-stage" data-step={step}>
        <div className="flow-register"><span>RECORD / CLARITY</span><span className="flow-register-index">0{step + 1} — 03</span></div>
        <div className="flow-visual" aria-label="품의선의 발주·입고·지급 기록을 화면으로 연결하는 시각 설명">
          <div className="flow-orbit" aria-hidden="true"><i /><i /><i /></div>
          <div className="flow-guides" aria-hidden="true"><i /><i /><i /></div>
          <div className="flow-record flow-record--order" aria-hidden={step === 2}><span>발주한 수량</span><strong>5<small>개</small></strong><em>주문 기록</em></div>
          <div className="flow-record flow-record--received" aria-hidden={step === 2}><span>받은 수량</span><strong>3<small>개</small></strong><em>입고 기록</em></div>
          <div className="flow-record flow-record--issued" aria-hidden={step === 2}><span>현장에 지급</span><strong>2<small>개</small></strong><em>지급 기록</em></div>
          <div className="flow-result" aria-hidden={step !== 1}><span>지금 쓸 수 있는 재고</span><strong>1<small>개</small></strong><span>입고 3 − 지급 2</span></div>
          <div className="flow-screen" aria-hidden={step !== 2}>
            <div className="flow-screen-bar"><span className="flow-screen-dot" />품의선 / 구매·자재 관리<span>WEB</span></div>
            <img src={`${BASE}detail/current/pumuiseon-home-20261105.jpg`} alt="품의선 실제 화면 — 발주량과 현재 재고를 구분한 구매·자재 관리" width="1348" height="926" fetchPriority="high" />
          </div>
          <span className="flow-proof" aria-hidden={step !== 2}>실제 프로젝트 화면 · 예시 데이터</span>
        </div>
        <div className="flow-steps" role="group" aria-label="기록에서 화면으로 과정 보기">
          {STEPS.map((label, index) => <button key={label} type="button" aria-pressed={step === index} onClick={() => selectStep(index)}><span>0{index + 1}</span>{label}</button>)}
        </div>
      </div>
    </div>
    <div className="portfolio-shell hero-bottom"><span>경험을 바탕으로, 쓰임을 생각합니다.</span><span className="hero-bottom-index"><i aria-hidden="true" />SELECTED WORKS 01—07</span></div>
  </section>;
};
export default HeroSection;
