import { Link } from 'react-router-dom';
import './aboutPage.css';

const BASE = import.meta.env.BASE_URL;

const relatedWork = [
  {
    slug: 'seolbiit',
    title: '설비결',
    type: '설비 점검 · 업무 관리',
    image: 'detail/current/seolbigyeol-overview-2x.webp',
    alt: '설비결의 설비 점검 현황과 요청을 보여주는 실제 디자인 화면',
  },
  {
    slug: 'feedback-hub',
    title: '품의선',
    type: '구매·자재 업무의 연결',
    image: 'detail/current/pumuiseon-home-20261105.jpg',
    alt: '품의선의 발주·입고·지급과 현재 보유량',
  },
];

const AboutPage = () => (
  <article className="about-page" data-page-id="about">
    <div className="portfolio-shell">
      <header className="about-intro">
        <div>
          <p className="eyebrow">ABOUT DOHAN</p>
          <h1>화면 밖의 경험,<br /><span>디자인의 출발점.</span></h1>
        </div>
        <div className="about-intro__copy">
          <p className="about-intro__role">웹·UI 디자인 <span>신입 지원</span></p>
          <p>사무와 생산 현장에서 일한 경험을 바탕으로, 복잡한 정보 속에서 필요한 내용을 찾고 다음 행동을 판단하는 화면에 관심을 두고 있습니다.</p>
          <p>Figma 화면을 직접 편집하며 웹퍼블리싱을 배우고 있습니다. 웹 작업은 AI와 함께 구현했습니다.</p>
        </div>
      </header>

      <section className="about-block about-interest" aria-labelledby="about-interest-title">
        <div className="about-block__heading">
          <p className="eyebrow">01 / 현재의 관심사</p>
          <h2 id="about-interest-title">상태가 보이고,<br />다음 행동이 분명한 화면.</h2>
          <p>요청의 우선순위와 처리 상태를 어떻게 보여줄지 고민합니다. 설비결에서는 정비 요청과 담당자 배정을, 품의선에서는 실제 구매·자재 경험을 바탕으로 주문량과 현재 재고를 구분했습니다.</p>
        </div>
        <div className="about-work-grid">
          {relatedWork.map((work) => (
            <Link className="about-work" to={`/projects/${work.slug}`} key={work.slug}>
              <div className="about-work__image">
                <img src={`${BASE}${work.image}`} alt={work.alt} loading="lazy" decoding="async" />
              </div>
              <div className="about-work__caption">
                <h3>{work.title}</h3>
                <p>{work.type}</p>
                <span>프로젝트 보기</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="about-block about-background" aria-labelledby="about-background-title">
        <div className="about-block__heading">
          <p className="eyebrow">02 / 경력 배경</p>
          <h2 id="about-background-title">화면 밖에서<br />쌓아온 경험.</h2>
          <p>이전 사무·생산 경력입니다.<br />디자인 개인 프로젝트와 구분해 소개합니다.</p>
        </div>
        <div className="about-jobs">
          <article className="about-job">
            <h3>구매·회계·총무</h3>
            <p className="about-job__company">청림엔지니어링</p>

            <p>공장 구매품 발주와 거래처 대응, 견적·문서 관리를 맡았습니다. 이때 경험한 발주·입고·지급 순서를 품의선의 설계에 반영했습니다.</p>
            <Link className="text-link" to="/projects/feedback-hub">품의선 설계 과정 보기</Link>
          </article>
          <article className="about-job">
            <h3>생산 현장 업무</h3>
            <p className="about-job__company">현대자동차 <span>· 계약직</span></p>

          </article>
        </div>
      </section>

      <section className="about-block about-making" aria-labelledby="about-making-title">
        <div className="about-block__heading"><p className="eyebrow">03 / 제작과 협업</p><h2 id="about-making-title">직접 하는 일과,<br />함께 만드는 일.</h2><p>사용한 기술과 독립적으로 수행할 수 있는 역량을 구분합니다. 구체적인 기여와 시연 범위는 각 작품에서 설명합니다.</p></div>
        <div className="about-review"><p className="about-review__label">현재의 작업 범위</p><dl className="about-decisions">
          <div><dt>직접 수정·설명 — Figma</dt><dd>Figma 화면을 직접 편집하고 수정한 내용을 설명할 수 있습니다.</dd></div>
          <div><dt>경험과 판단 — 주제·요구사항·피드백</dt><dd>품의선에는 실제 구매·자재 업무의 순서를 제공했습니다. 잔상관에는 참고 사례와 이미지 중심의 방향을 제시하고, 가독성과 자연스러운 흐름을 반복해서 검토했습니다.</dd></div>
          <div><dt>학습과 협업 — 웹퍼블리싱</dt><dd>웹 프로젝트에서 요구사항을 정리하고 수정 방향을 선택했습니다. AI는 화면 제안·코드 작성·기능 검사를 맡았습니다.</dd></div>
        </dl><div className="about-review__roles"><p><strong>김도한</strong><span>주제와 요구사항 · 개선 피드백 · 방향 선택</span></p><p><strong>AI 협업</strong><span>화면 제안·편집 · 코드 작성 · 검사</span></p></div></div>
      </section>

      <footer className="about-closing">
        <div>
          <p className="eyebrow">WORK & CONTACT</p>
          <h2>작업에서 더 자세히<br className="about-closing__break" /> 만나보세요.</h2>
        </div>
        <div className="about-closing__actions">
          <Link className="portfolio-button portfolio-button--primary" to="/projects">전체 작업 보기</Link>
          <Link className="portfolio-button portfolio-button--secondary" to="/" state={{ scrollTo: 'contact' }}>연락하기</Link>
        </div>
      </footer>
    </div>
  </article>
);

export default AboutPage;
