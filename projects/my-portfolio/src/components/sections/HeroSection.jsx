import { Link } from 'react-router-dom';
import './heroSection.css';

const HeroSection = () => (
  <section id="home" className="portfolio-hero" aria-labelledby="home-title">
    <div className="portfolio-shell hero-layout">
      <div className="hero-copy" data-hero-reveal>
        <p className="hero-byline">김도한 <span>웹·UI 디자인</span></p>
        <h1 id="home-title">구매 현장의 기준을<br /><em>화면에 담습니다.</em></h1>
        <p className="hero-description">구매·총무와 생산 현장에서 일했습니다.<br />그때 마주친 질문을 바탕으로, 일하는 사람이 다음 행동을 판단할 수 있는 화면을 설계합니다.</p>
        <div className="hero-actions">
          <Link className="portfolio-button portfolio-button--primary" to="/projects/feedback-hub">품의선 설계 과정 보기</Link>
          <Link className="text-link" to="/projects">전체 작업 보기</Link>
        </div>
        <p className="hero-scope">Figma 직접 편집 <span aria-hidden="true">/</span> AI 협업 웹 제작</p>
      </div>

      <figure className="stock-sheet" aria-labelledby="stock-question">
        <figcaption className="stock-caption">
          <strong>품의선</strong><span>구매·자재 관리 웹</span>
        </figcaption>
        <div className="stock-reading">
          <div>
            <p className="stock-question" id="stock-question">5개를 발주했다면,<br />지금 쓸 수 있는 수량은?</p>
            <p className="stock-answer"><strong>1</strong><span>개</span><span className="stock-result-label">현재 재고</span></p>
          </div>
          <dl className="stock-ledger">
            <div><dt>입고</dt><dd>3개</dd></div>
            <div><dt>지급</dt><dd>−2개</dd></div>
            <div><dt>미입고</dt><dd>2개</dd></div>
          </dl>
        </div>
        <div className="stock-exhibit">
          <div className="stock-crop">
            <img src={`${import.meta.env.BASE_URL}detail/current/pumuiseon-home-20261105.jpg`}
              alt="포토센서 입출고 전표. 받은 수량, 지급 수량, 현재 보유량을 나란히 표시한 품의선 화면."
              width="1348" height="926" fetchPriority="high" />
          </div>
          <p>포토센서 입출고 전표 <span>실제 화면 · 예시 데이터</span></p>
        </div>
      </figure>
    </div>
  </section>
);

export default HeroSection;
