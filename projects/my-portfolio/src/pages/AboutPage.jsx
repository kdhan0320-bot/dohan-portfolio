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
          <p>작품마다 다룬 문제와 선택한 방향, 저와 AI가 맡은 범위를 함께 소개합니다.</p>
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
          <p className="eyebrow">03 / 검토와 개선</p>
          <h2 id="about-making-title">문제를 짚고,<br />수정 방향을 정하는 일.</h2>
          <p>이 포트폴리오를 다듬으며 제가 제기한 문제와 반영한 방향입니다. 작품별 제작 범위와 기여는 각 상세 페이지에서 설명합니다.</p>
        </div>
        <div className="about-review">
          <p className="about-review__label">실제 사례 · 이 포트폴리오의 개선</p>
          <dl className="about-decisions">
            <div>
              <dt>작품이 더 먼저 보이도록</dt>
              <dd>썸네일이 아래로 치우쳐 보인다고 피드백했습니다. 첫 화면에 실제 작품 화면을 배치하고, 목록의 화면 높이와 상단선을 맞추는 방향을 선택했습니다.</dd>
            </div>
            <div>
              <dt>버튼은 간결하게</dt>
              <dd>반복되는 화살표를 줄이고 버튼을 활용하자고 요청했습니다. 홈 버튼의 화살표를 덜어내고, 글자와 버튼 형태로 동작을 구분하는 방향을 선택했습니다.</dd>
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
