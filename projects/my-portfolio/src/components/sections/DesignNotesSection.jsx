import { Link } from 'react-router-dom';
import RevealOnScroll from '../ui/RevealOnScroll';
const DesignNotesSection = () => <section className="design-notes" id="about" aria-labelledby="notes-title"><div className="portfolio-shell">
  <RevealOnScroll><div className="notes-layout"><div><p className="eyebrow">03 / MY POINT OF VIEW</p><h2 id="notes-title">화면 밖에서 배운 것.<br /><span>화면 안에서 풀어갈 것.</span></h2><Link className="text-link" to="/about">경험과 제작 기여 보기</Link></div><div className="notes-copy"><p>문서를 확인하고, 물건을 발주하고,<br />현장에서 필요한 정보를 찾았습니다.</p><p>그 경험을 바탕으로 무엇을 먼저 보여줄지 질문합니다. 상태와 순서, 다음 행동이 자연스럽게 읽히는 화면에 관심을 두고 있습니다.</p></div></div></RevealOnScroll>
  <dl className="notes-roles"><div><dt><span>01</span>직접 다루는 도구</dt><dd>Figma<span>화면 편집과 수정·설명</span></dd></div><div><dt><span>02</span>작업에서 맡은 부분</dt><dd>경험과 판단<span>주제·요구사항·개선 피드백·방향 선택</span></dd></div><div><dt><span>03</span>AI와 협업한 부분</dt><dd>디자인과 웹 제작<span>화면 제안·편집·코드 작성·검사</span></dd></div></dl>
</div></section>;
export default DesignNotesSection;
