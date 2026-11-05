import { Link } from 'react-router-dom';
const DesignNotesSection=()=> <section className="design-notes" id="about" aria-labelledby="notes-title"><div className="portfolio-shell notes-layout">
  <div><p className="eyebrow">03 / BEHIND THE SCREENS</p><h2 id="notes-title">화면 밖의 경험을,<br />화면 안의 기준으로.</h2><Link className="text-link" to="/about">경험과 제작 기여 보기</Link></div>
  <div className="notes-copy"><p>문서를 확인하고, 물건을 발주하고,<br className="desktop-break" /> 현장에서 필요한 정보를 찾던 경험이 있습니다.</p><p>그 경험을 바탕으로 무엇을 먼저 보여줄지 질문하고, 화면의 순서와 자연스러운 흐름을 다듬습니다.</p><dl className="notes-roles"><div><dt>직접 다루는 도구</dt><dd>Figma</dd></div><div><dt>작업에서 맡은 부분</dt><dd>주제·요구사항, 개선 피드백, 방향 선택</dd></div><div><dt>AI와 협업한 부분</dt><dd>디자인 제안·편집, 웹 코드 작성·검사</dd></div></dl></div>
</div></section>;
export default DesignNotesSection;
