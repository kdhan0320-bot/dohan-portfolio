import { Link } from 'react-router-dom';
import './aboutPage.css';

const BASE = import.meta.env.BASE_URL;

const relatedWork = [
  {
    slug: 'seolbiit',
    title: '설비결',
    type: '설비 점검 · 업무 관리',
    image: 'detail/current/seolbigyeol-home.png',
    alt: '설비결의 설비 점검 현황과 요청을 보여주는 실제 디자인 화면',
  },
  {
    slug: 'feedback-hub',
    title: '고른시선',
    type: '피드백 · 수정 상태',
    image: 'detail/current/goreunsiseon-home.jpg',
    alt: '고른시선의 프로젝트와 피드백을 관리하는 실제 웹 화면',
  },
];

const AboutPage = () => (
  <article className="about-page" data-page-id="about">
    <div className="portfolio-shell">
      <header className="about-intro">
        <div>
          <p className="eyebrow">ABOUT DOHAN</p>
          <h1>김도한의<br /><span>작업 배경.</span></h1>
        </div>
        <div className="about-intro__copy">
          <p className="about-intro__role">UX/UI 디자인 · 웹퍼블리싱 <span>신입 지원</span></p>
          <p>사무와 생산 현장에서 일한 경험을 바탕으로, 복잡한 정보 속에서 필요한 내용을 찾고 다음 행동을 판단하는 화면에 관심을 두고 있습니다.</p>
          <p>차분하게 살피고, 분명하게 다듬는 디자인을 지향합니다.</p>
        </div>
      </header>

      <section className="about-block about-interest" aria-labelledby="about-interest-title">
        <div className="about-block__heading">
          <p className="eyebrow">01 / 현재의 관심사</p>
          <h2 id="about-interest-title">상태가 보이고,<br />다음 행동이 분명한 화면.</h2>
          <p>요청의 우선순위와 처리 상태를 어떻게 보여줄지 고민합니다. 설비결에서는 정비 요청과 담당자 배정을, 고른시선에서는 피드백과 수정 상태를 다뤘습니다.</p>
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
          <p className="eyebrow">03 / 제작 방식</p>
          <h2 id="about-making-title">선택한 방향과<br />함께 만든 과정.</h2>
          <p>각 프로젝트의 상세 페이지에서 제작 범위와 기여, 구현의 한계를 함께 설명합니다.</p>
        </div>
        <dl className="about-contributions">
          <div>
            <dt>제가 맡은 부분</dt>
            <dd>요구사항과 방향을 정하고 디자인 안을 비교·선택합니다. 글자·여백·색상·사용 흐름을 검토하고, 수정할 내용을 구체적으로 피드백합니다.</dd>
          </div>
          <div>
            <dt>AI와 함께한 제작</dt>
            <dd>디자인 제안·이미지 제작·코드 작성과 점검에 AI를 활용했습니다. 각 작업에서 맡은 부분과 AI의 기여를 구분해 정리했습니다.</dd>
          </div>
        </dl>
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
