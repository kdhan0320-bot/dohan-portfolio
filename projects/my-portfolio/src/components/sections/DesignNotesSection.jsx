import { Link } from 'react-router-dom';
import RevealOnScroll from '../ui/RevealOnScroll';
const DesignNotesSection = () => <section className="design-notes" id="about" aria-labelledby="notes-title"><div className="portfolio-shell">
  <RevealOnScroll><div className="notes-layout"><div><h2 id="notes-title">작업에서 맡은 역할</h2><Link className="text-link" to="/about">경험과 제작 기여 보기</Link></div><div className="notes-copy"><p>구매 품의를 올리고, 발주한 자재를 확인하고, 생산 현장에 지급하는 일을 경험했습니다.</p><p>품의선에는 이 업무 순서와 요구사항을 제공했습니다. 웹퍼블리싱은 학습 중이며, 디자인 제안과 구현 과정에는 AI가 참여했습니다.</p></div></div></RevealOnScroll>
  <dl className="notes-roles"><div><dt>직접 다루는 도구</dt><dd>Figma<span>화면 편집과 수정·설명</span></dd></div><div><dt>작업에서 맡은 부분</dt><dd>경험과 판단<span>주제·요구사항·개선 피드백·방향 선택</span></dd></div><div><dt>AI와 협업한 부분</dt><dd>디자인과 웹 제작<span>화면 제안·편집·코드 작성·검사</span></dd></div></dl>
</div></section>;
export default DesignNotesSection;
