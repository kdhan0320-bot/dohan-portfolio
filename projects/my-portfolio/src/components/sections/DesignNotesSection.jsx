import { Link } from 'react-router-dom';
const DesignNotesSection=()=>(
  <section className="design-notes" id="about" aria-labelledby="notes-title"><div className="portfolio-shell">
    <div className="section-heading"><div><p className="eyebrow">03 / EDITING NOTES</p><h2 id="notes-title">보기 좋은 화면에서,<br />쓰기 편한 흐름으로.</h2></div><p className="section-description">작업을 다듬으며 선택한 두 가지 방향.<br />실제 화면에서 그 이유를 설명합니다.</p></div>
    <div className="design-note-grid">
      <article><span className="note-index">01 — 갈피록</span><h3>기록에 집중할 수 있도록.</h3><p>회사 기록과 조작이 먼저 보이도록 요청했습니다. 큰 폴더 배경을 덜고, 갈피의 인상은 로고와 단계 탭에 남기는 방향을 선택했습니다.</p><Link className="text-link" to="/projects/jobflow">화면에서 확인하기</Link></article>
      <article><span className="note-index">02 — 잔상관</span><h3>작품의 분위기도 정보니까.</h3><p>포스터의 제목이 영화의 분위기와 어울리도록 참고 사례와 방향을 제시했습니다. 웹 본문의 가독성을 유지하면서 작품의 인상을 살리고자 했습니다.</p><Link className="text-link" to="/projects/ott-service">선택의 배경 보기</Link></article>
    </div>
    <div className="design-notes-foot"><p>직접 수정·설명할 수 있는 도구는 Figma입니다.<br />웹 제작에서는 방향과 피드백을 맡고, 코드 작성·검사에 AI의 도움을 받았습니다.</p><Link className="text-link" to="/about">경험과 제작 기여 보기</Link></div>
  </div></section>
);
export default DesignNotesSection;
