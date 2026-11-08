import { Link } from 'react-router-dom';
import './aboutPage.css';

const BASE = import.meta.env.BASE_URL;

const relatedWork = [
  {
    slug: 'seolbiit',
    title: '설비결',
    type: '정비 요청과 담당자 배정',
    image: 'detail/current/seolbigyeol-overview-2x.webp',
    alt: '설비결의 설비 점검 현황과 요청을 보여주는 실제 디자인 화면',
  },
  {
    slug: 'feedback-hub',
    title: '품의선',
    type: '입고·지급 후 남은 재고',
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
          <p>구매·총무와 생산 현장에서 일했습니다. 지금은 자재가 얼마나 남았고 어떤 정비가 급한지 판단하는 데 쓰이는 화면에 관심이 있습니다.</p>
        </div>
      </header>

      <section className="about-block about-interest" aria-labelledby="about-interest-title">
        <div className="about-block__heading">
          <h2 id="about-interest-title">업무를 주제로 한 작업</h2>
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
          <h2 id="about-background-title">이전에 맡았던 업무</h2>
        </div>
        <div className="about-jobs">
          <article className="about-job">
            <h3>구매·회계·총무</h3>
            <p className="about-job__company">청림엔지니어링</p>

            <p>공장 구매품 발주와 거래처 대응, 견적·문서 관리를 맡았습니다. 구매 요청은 엑셀과 메일로 정리해 종이 결재서로 올렸습니다.</p>
          </article>
          <article className="about-job">
            <h3>생산 현장 업무</h3>
            <p className="about-job__company">현대자동차 <span>· 계약직</span></p>

          </article>
        </div>
      </section>

      <section className="about-block about-making" aria-labelledby="about-making-title">
        <div className="about-block__heading"><h2 id="about-making-title">제작에서 맡은 일</h2></div>
        <dl className="about-decisions">
          <div>
            <dt>김도한</dt>
            <dd>
              <ul className="about-project-roles">
                <li><Link to="/projects/feedback-hub">품의선</Link><span>발주·입고·지급 순서를 요구사항으로 정리했습니다.</span></li>
                <li><Link to="/projects/seolbiit">설비결</Link><span>설비 점검 주제와 요구사항을 제시하고, 어떤 작업 상태를 먼저 보여줄지 의견을 냈습니다.</span></li>
                <li><Link to="/projects/jansang-cinema">잔상관</Link><span>편집 방향을 선택하고 홈의 단독 표지를 결정했습니다. 모바일 화면도 검토했습니다.</span></li>
              </ul>
              <p>Figma 화면을 직접 편집하며 웹퍼블리싱을 배우고 있습니다.</p>
              <ul className="about-skill-badges" aria-label="직접 다루는 도구">
                <li>Figma</li>
                <li>HTML</li>
                <li>CSS</li>
              </ul>
            </dd>
          </div>
          <div>
            <dt>AI 협업</dt>
            <dd>
              <p>설비결의 Figma 화면 구성을 제안하고 편집·검토했습니다. 웹 작품에서는 시각 시안을 제안하고 코드를 작성·검사했습니다.</p>
              <ul className="about-skill-badges" aria-label="AI와 함께 다루는 도구">
                <li>React</li>
                <li>GitHub</li>
                <li>ChatGPT</li>
                <li>Claude</li>
              </ul>
            </dd>
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
