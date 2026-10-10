import { Link } from 'react-router-dom';
import Header from '../components/Header';
import SiteFooter from '../components/SiteFooter';
import PracticeIcon from '../components/PracticeIcon';
import { PAGE_TITLES, usePageTitle } from '../utils/pageMeta';
import sculpture from '../assets/perspective-sculpture.webp';
import '../styles/practice-guide.css';

const steps = [
  ['목표 읽기', '어떤 점을 비교할지 확인해요.'],
  ['A·B 선택', '목표에 더 적합한 화면을 골라요.'],
  ['이유 확인', '강조된 차이와 설계 이유를 살펴봐요.'],
];

const questions = [
  ['제시된 선택이 언제나 정답인가요?', '해당 목표에 따른 설계 제안입니다. 다른 상황에도 적용되는 절대적인 정답이나 실제 사용자 검증 결과는 아닙니다.'],
  ['선택이나 메모는 저장되나요?', '현재 연습 화면에서만 유지됩니다. 다른 페이지로 이동하거나 새로고침하면 사라지며, 다른 사람에게 전송되지 않습니다.'],
  ['회원가입이 필요한가요?', '6가지 예제 모두 로그인 없이 연습할 수 있습니다.'],
  ['예제 속 버튼도 누를 수 있나요?', '예제는 비교용 그림입니다. 그림 바깥의 A·B 선택 버튼을 사용해 주세요.'],
];

function GuideScene({ stage }) {
  return <div className={`guide-scene guide-scene-${stage}`} aria-hidden="true">
    <div className="guide-scene-topline"><span>글자 위계</span><span>01 / 06</span></div>
    <div className="guide-scene-question">전시 제목이 먼저 읽히는 쪽은?</div>
    <div className="guide-scene-options">
      {['A', 'B'].map((side) => <div key={side} className={`guide-scene-option guide-scene-option-${side.toLowerCase()}${stage > 1 && side === 'B' ? ' is-picked' : ''}`}>
        <div className="guide-scene-option-label"><span>{side}</span>{stage > 1 && side === 'B' && <span className="guide-scene-check"><PracticeIcon name="check" /></span>}</div>
        <div className="guide-scene-gallery">
          <div className="guide-scene-gallery-copy"><span className="guide-scene-gallery-title">시선의<br />모양</span><span className="guide-scene-gallery-rule" /></div>
          <img src={sculpture} alt="" />
        </div>
        {stage < 3 && <span className="guide-scene-choice">{stage === 2 && side === 'B' ? 'B 선택함' : `${side} 선택하기`}</span>}
      </div>)}
    </div>
    {stage === 3 && <div className="guide-scene-result"><span>B</span><span>제목을 크게, 먼저 읽히도록.</span></div>}
  </div>;
}

export default function GuidePage() {
  usePageTitle(PAGE_TITLES.guide);
  return <div className="app-surface practice-surface"><Header /><div className="shell practice-guide">
    <header><h1>이용 안내</h1><p>두 화면을 비교하고, 선택의 이유를 알아보세요.</p></header>
    <ol className="practice-guide-steps" aria-label="디자인 비교 연습 순서">
      {steps.map(([title, description], index) => <li key={title}>
        <GuideScene stage={index + 1} />
        <div className="guide-step-copy"><div className="guide-step-title"><span aria-hidden="true">0{index + 1}</span><h2>{title}</h2></div><p>{description}</p></div>
      </li>)}
    </ol>
    <Link className="practice-primary" to="/practice/sample-1">바로 연습하기</Link>
    <section className="practice-faq" aria-labelledby="faq-title"><h2 id="faq-title">궁금한 점</h2>{questions.map(([question, answer]) => <details key={question}><summary><span>{question}</span><PracticeIcon name="plus" /></summary><p>{answer}</p></details>)}</section>
  </div><SiteFooter /></div>;
}
