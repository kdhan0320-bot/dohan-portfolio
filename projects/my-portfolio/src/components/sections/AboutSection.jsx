import { Link } from 'react-router-dom';
import './careerSection.css';

const AboutSection = () => (
  <>
    <section className="career-section" id="experience" aria-labelledby="experience-title">
      <div className="portfolio-shell">
        <div className="career-section__heading">
          <div>
            <p className="eyebrow">EXPERIENCE</p>
            <h2 id="experience-title">사무와 현장의 경험을,<br />디자인의 출발점으로.</h2>
          </div>
          <div className="career-section__intro">
            <p>구매·회계·총무와 생산 현장에서 일했습니다. 서로 다른 업무를 경험한 배경을 바탕으로, 필요한 정보를 찾고 다음 행동을 판단하는 화면에 관심을 두고 있습니다.</p>
            <p className="career-section__position"><span>현재 지원 분야</span><strong>UX/UI 디자인 · 웹퍼블리싱 신입</strong></p>
          </div>
        </div>

        <div className="career-section__history" aria-label="이전 사무 및 생산 경력">
          <article className="career-section__job">
            <div className="career-section__employer">
              <p className="career-section__category">사무 경력</p>
              <h3>청림엔지니어링</h3>
            </div>
            <div className="career-section__responsibilities">
              <p className="career-section__role">구매 · 회계 · 총무</p>
              <p>구매·발주, 공장 구매품 관리와 거래처 대응을 맡았습니다. 견적·문서관리와 현장 지원 업무도 경험했습니다.</p>
              <ul className="career-section__task-list" aria-label="담당 업무">
                <li>구매·발주</li>
                <li>구매품 관리</li>
                <li>거래처 대응</li>
                <li>견적·문서관리</li>
              </ul>
            </div>
          </article>
          <article className="career-section__job">
            <div className="career-section__employer">
              <p className="career-section__category">생산 현장 경력</p>
              <h3>현대자동차</h3>
            </div>
            <div className="career-section__responsibilities">
              <p className="career-section__role">생산 현장 업무 <span>계약직</span></p>
              <p>계약직으로 생산 현장 업무를 경험했습니다.</p>
            </div>
          </article>
        </div>

        <div className="career-section__connection">
          <div>
            <p className="career-section__category">지금의 디자인 관심사</p>
            <h3>업무의 상태와 다음 할 일이<br className="career-section__desktop-break" /> 한눈에 보이는 화면</h3>
          </div>
          <div className="career-section__connection-body">
            <p>사무·현장 경험에서 출발해, 요청의 우선순위와 처리 상태를 어떻게 보여줄지 고민합니다. 설비결에서는 정비 요청과 담당자 배정을, 고른시선에서는 피드백과 수정 상태를 다뤘습니다.</p>
            <div className="career-section__links">
              <Link className="portfolio-button portfolio-button--secondary" to="/projects/seolbiit">설비결 보기</Link>
              <Link className="portfolio-button portfolio-button--secondary" to="/projects/feedback-hub">고른시선 보기</Link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="approach-section" id="about" aria-labelledby="about-title">
      <div className="portfolio-shell approach-section__layout">
        <div className="approach-section__heading">
          <p className="eyebrow">ABOUT</p>
          <h2 id="about-title">차분하게 살피고,<br />분명하게 다듬습니다.</h2>
          <p>무엇을 먼저 보고 어떻게 움직일지 분명한 디자인을 지향합니다. 화면의 인상뿐 아니라 글자의 크기와 대비, 정렬, 버튼의 표현까지 살펴봅니다.</p>
        </div>
        <div className="approach-section__body">
          <dl className="approach-section__contribution">
            <div>
              <dt>제가 맡은 부분</dt>
              <dd>작업의 요구사항과 방향을 정하고, 디자인 안을 비교·선택합니다. 글자·여백·색상·사용 흐름을 검토하고 수정할 내용을 구체적으로 피드백합니다.</dd>
            </div>
            <div>
              <dt>AI와 함께한 제작</dt>
              <dd>디자인 제안·이미지 제작·코드 작성과 점검에 AI를 활용했습니다. 각 프로젝트의 상세 페이지에 제작 범위와 기여를 구분해 정리했습니다.</dd>
            </div>
          </dl>
          <p className="approach-section__scope">이전 사무·생산 경력과 디자인 개인 프로젝트를 구분해 소개합니다. 프로젝트의 구현 범위와 한계는 각 상세 페이지에서 확인할 수 있습니다.</p>
        </div>
      </div>
    </section>
  </>
);

export default AboutSection;
