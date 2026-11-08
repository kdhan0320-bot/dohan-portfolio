import { Link } from 'react-router-dom';
import RevealOnScroll from '../ui/RevealOnScroll';

const DesignNotesSection = () => (
  <section className="design-notes" id="about" aria-labelledby="notes-title">
    <div className="portfolio-shell">
      <RevealOnScroll>
        <div className="notes-layout">
          <div>
            <h2 id="notes-title">작업에서 맡은 역할</h2>
            <Link className="text-link" to="/about">경험과 제작 기여 보기</Link>
          </div>
          <div className="notes-copy">
            <p>품의선의 출발점은 제가 올리던 구매 품의서입니다. 발주부터 현장 지급까지의 순서를 정리하고, AI와 함께 전표 화면으로 옮겼습니다.</p>
          </div>
        </div>
        <dl className="notes-roles">
          <div>
            <dt><span>01</span>작업 수</dt>
            <dd>7개<span>구매·설비·영화 등 업무를 주제로 삼았습니다.</span></dd>
          </div>
          <div>
            <dt><span>02</span>제가 맡은 일</dt>
            <dd>요구사항 정리 · Figma 편집<span>발주 순서와 정비 배정 흐름을 먼저 그렸습니다.</span></dd>
          </div>
          <div>
            <dt><span>03</span>AI와 함께한 일</dt>
            <dd>코드 작성 · 화면 구현<span>제안한 시안을 실제 웹 화면으로 옮겼습니다.</span></dd>
          </div>
        </dl>
      </RevealOnScroll>
    </div>
  </section>
);
export default DesignNotesSection;
