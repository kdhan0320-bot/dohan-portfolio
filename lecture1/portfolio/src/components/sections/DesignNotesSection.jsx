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
            <dd>7개<span>업무 관리·생활 서비스·콘텐츠 탐색.</span></dd>
          </div>
          <div>
            <dt><span>02</span>제가 맡은 일</dt>
            <dd>주제 · 요구사항 · 방향 선택<span>업무 순서와 먼저 보여줄 정보를 제안했습니다.</span></dd>
          </div>
          <div>
            <dt><span>03</span>AI와 함께한 일</dt>
            <dd>시각 제안 · 화면 제작<span>Figma 편집과 웹 코드 작성·검사를 함께했습니다.</span></dd>
          </div>
        </dl>
      </RevealOnScroll>
    </div>
  </section>
);
export default DesignNotesSection;
