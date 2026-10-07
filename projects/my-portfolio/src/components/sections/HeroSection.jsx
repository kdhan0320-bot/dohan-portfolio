const HeroSection = () => (
  <section className="home-intro portfolio-shell" id="home" aria-labelledby="home-title">
    <div className="home-intro-heading" data-hero-reveal>
      <p className="eyebrow">김도한 · UX/UI 디자인 & 웹퍼블리싱</p>
      <h1 id="home-title">화면의 흐름을 설계하고,<br />구현까지 연결합니다.</h1>
    </div>
    <div className="home-intro-note" data-hero-reveal>
      <p>일상 서비스부터 현장 업무까지.<br />필요한 정보와 다음 행동이<br className="desktop-break" /> 선명하게 보이는 화면을 만듭니다.</p>
      <a className="text-link" href="#/projects">작업 둘러보기 <span aria-hidden="true">↗</span></a>
    </div>
  </section>
);
export default HeroSection;
