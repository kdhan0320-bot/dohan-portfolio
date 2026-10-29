import { Link } from 'react-router-dom';
import './aboutPage.css';

const BASE = import.meta.env.BASE_URL;

const relatedWork = [
  {
    slug: 'seolbiit',
    title: '설비결',
    type: '설비 점검 · 업무 관리',
    image: 'detail/current/seolbigyeol-20261028.png',
    alt: '설비결의 설비 점검 현황과 요청을 보여주는 실제 디자인 화면',
  },
  {
    slug: 'feedback-hub',
    title: '고른시선',
    type: '목적에 따른 UI 비교',
    image: 'detail/current/goreunsiseon-20261028.jpg',
    alt: '고른시선의 고정 A/B 화면과 목표별 비교 연습',
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
          <p>현재 AI 없이 직접 수정하고 설명할 수 있는 도구는 Figma입니다. 웹퍼블리싱은 학습 중이며, 웹 구현은 AI와 함께 제작했습니다.</p>
        </div>
      </header>

      <section className="about-block about-interest" aria-labelledby="about-interest-title">
        <div className="about-block__heading">
          <p className="eyebrow">01 / 현재의 관심사</p>
          <h2 id="about-interest-title">상태가 보이고,<br />다음 행동이 분명한 화면.</h2>
          <p>요청의 우선순위와 처리 상태를 어떻게 보여줄지 고민합니다. 설비결에서는 정비 요청과 담당자 배정을, 고른시선에서는 목적에 따라 달라지는 화면의 선택 기준을 다뤘습니다.</p>
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
            <p className="about-job__category">사무 업무</p>
            <h3>청림엔지니어링</h3>
            <p className="about-job__role">구매 · 회계 · 총무</p>
            <p>구매·발주, 공장 구매품 관리와 거래처 대응을 맡았습니다. 견적·문서관리와 현장 지원 업무도 경험했습니다.</p>
          </article>
          <article className="about-job">
            <p className="about-job__category">생산 현장</p>
            <h3>현대자동차</h3>
            <p className="about-job__role">생산 현장 업무 <span>계약직</span></p>
            <p>계약직으로 생산 현장 업무를 경험했습니다.</p>
          </article>
        </div>
      </section>

      <section className="about-block about-making" aria-labelledby="about-making-title">
        <div className="about-block__heading">
          <p className="eyebrow">03 / 검토와 개선</p>
          <h2 id="about-making-title">문제를 짚고,<br />수정 방향을 정하는 일.</h2>
          <p>이 포트폴리오를 다듬으며 제가 제기한 문제와 반영한 방향입니다. 작품별 제작 범위와 기여는 각 상세 페이지에서 설명합니다.</p>
        </div>
        <div className="about-review">
          <p className="about-review__label">실제 사례 · 이 포트폴리오의 개선</p>
          <dl className="about-decisions">
            <div>
              <dt>작품이 더 먼저 보이도록</dt>
              <dd>화면이 밋밋하고 작품의 개성이 충분히 드러나지 않는다고 피드백했습니다. 따뜻한 색상과 자연스러운 흐름을 요청하고, 실제 작품을 크게 보여주는 화면 편집실 방향을 선택했습니다.</dd>
            </div>
            <div>
              <dt>실제 수행 범위를 분명하게</dt>
              <dd>Figma에서 직접 가능한 작업과 AI의 도움을 받은 웹 구현을 구분했습니다. 사용한 기술 목록이 독립적으로 구현할 수 있는 역량으로 읽히지 않도록 소개를 정리했습니다.</dd>
            </div>
            <div>
              <dt>작업과 경력의 위치를 구분</dt>
              <dd>홈에 회사명과 연혁을 넣은 구성을 재검토했습니다. 홈은 작품 중심으로, 자세한 경력은 소개 페이지에서 읽도록 방향을 정했습니다.</dd>
            </div>
          </dl>
          <div className="about-review__roles" aria-label="이 사이트 개선의 기여 구분">
            <p><strong>김도한</strong><span>문제 제기 · 수정 요청 · 방향 승인</span></p>
            <p><strong>AI 협업</strong><span>디자인 제안 · 편집 · 코드 수정 · 점검</span></p>
          </div>
        </div>
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
