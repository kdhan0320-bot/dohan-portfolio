import { Link } from 'react-router-dom';
import './aboutPage.css';

const BASE = import.meta.env.BASE_URL;

const relatedWork = [
  {
    slug: 'seolbiit',
    title: '설비결',
    type: '정비 요청과 담당자 배정',
    image: 'detail/current/seolbigyeol-home-20261112.png',
    alt: '설비결의 설비 점검 현황과 요청을 보여주는 실제 디자인 화면',
  },
  {
    slug: 'feedback-hub',
    title: '품의선',
    type: '입고·지급 후 남은 재고',
    image: 'detail/current/pumuiseon-work-copy-1440-20261113.png',
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
          <p>자동화설비회사에서 구매관리·총무를 담당했습니다. 지금은 자재가 얼마나 남았고 어떤 정비가 급한지 판단하는 데 쓰이는 화면에 관심이 있습니다.</p>
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
            <h3>구매관리·총무</h3>
            <p className="about-job__company">자동화설비회사</p>

            <p>구매관리·총무 업무를 담당했습니다. 이 경험을 개인 작품의 주제 선정에 연결했으며, UX/UI 분야의 실무 경력은 없습니다.</p>
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
                <li><Link to="/projects/feedback-hub">품의선</Link><span>주제·요구사항을 제시하고, 제안을 검토해 방향을 선택했습니다.</span></li>
                <li><Link to="/projects/seolbiit">설비결</Link><span>설비 점검 주제와 요구사항을 제시하고, 어떤 작업 상태를 먼저 보여줄지 의견을 냈습니다.</span></li>
                <li><Link to="/projects/jansang-cinema">잔상관</Link><span>편집 방향을 선택하고 홈의 단독 표지를 결정했습니다. 모바일 화면도 검토했습니다.</span></li>
              </ul>
              <p>Figma와 HTML·CSS를 배우며 화면 구성과 웹퍼블리싱을 연습하고 있습니다.</p>
              <ul className="about-skill-badges" aria-label="학습 중인 도구">
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
