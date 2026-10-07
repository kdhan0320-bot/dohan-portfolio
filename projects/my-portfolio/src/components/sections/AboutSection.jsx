const CAPABILITIES = [
  { title: '화면을 설계합니다.', description: '정보의 순서와 화면 사이의 흐름을 정리하고, Figma로 UI와 컴포넌트를 구성합니다.', tools: 'Figma · UI 디자인 · 프로토타입' },
  { title: '웹으로 연결합니다.', description: 'HTML·CSS와 React를 활용해 화면을 구현하고, 여러 화면 폭에서 배치를 다듬습니다.', tools: 'HTML · CSS · JavaScript · React' },
  { title: '끝까지 다듬습니다.', description: '실제 화면에서 글자, 간격, 버튼의 상태를 확인하고 피드백을 다음 수정에 반영합니다.', tools: '화면 검토 · 반응형 · 사용 흐름' },
];
const AboutSection = () => (
  <section className="about-section" id="about" aria-labelledby="about-title">
    <div className="portfolio-shell">
      <div className="about-intro">
        <div><p className="eyebrow">ABOUT</p><h2 id="about-title">현장에서 익힌 관찰을,<br />화면의 순서로 옮깁니다.</h2></div>
        <div className="about-description"><p>생산·구매 업무를 경험한 뒤 UX/UI 디자인과 웹퍼블리싱을 공부했습니다. 필요한 정보를 찾고 다음 행동을 결정하는 과정에 관심을 두고 작업합니다.</p><p>기획 의도와 화면의 표현이 이어지도록, 피드백을 바탕으로 구성을 비교하고 다듬습니다.</p></div>
      </div>
      <div className="capability-grid">
        {CAPABILITIES.map((item, index) => <article key={item.title}><span className="capability-number">0{index + 1}</span><h3>{item.title}</h3><p>{item.description}</p><p className="capability-tools">{item.tools}</p></article>)}
      </div>
      <p className="collaboration-note">이 포트폴리오는 AI 도구와 함께 제작했습니다. 요구사항·피드백·방향 선택은 제가 맡았으며, 디자인 제안·이미지 제작·코드 작성과 점검에 AI를 활용했습니다. 각 작업의 상세 페이지에서 제작 범위를 확인할 수 있습니다.</p>
    </div>
  </section>
);
export default AboutSection;
