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
      </RevealOnScroll>
    </div>
  </section>
);
export default DesignNotesSection;
