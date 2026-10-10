import { Link } from 'react-router-dom';
import Header from '../components/Header';
import SiteFooter from '../components/SiteFooter';
import PracticeIcon from '../components/PracticeIcon';
import { PAGE_TITLES, usePageTitle } from '../utils/pageMeta';

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

export default function GuidePage() {
  usePageTitle(PAGE_TITLES.guide);
  return <div className="app-surface practice-surface"><Header /><div className="shell practice-guide">
    <header><h1>이용 안내</h1><p>두 화면을 비교하고, 선택의 이유를 알아보세요.</p></header>
    <ol className="practice-guide-steps" aria-label="디자인 비교 연습 순서">
      {steps.map(([title, description], index) => <li key={title}><span aria-hidden="true">0{index + 1}</span><h2>{title}</h2><p>{description}</p></li>)}
    </ol>
    <Link className="practice-primary" to="/practice/sample-1">바로 연습하기</Link>
    <section className="practice-faq" aria-labelledby="faq-title"><h2 id="faq-title">궁금한 점</h2>{questions.map(([question, answer]) => <details key={question}><summary><span>{question}</span><PracticeIcon name="plus" /></summary><p>{answer}</p></details>)}</section>
  </div><SiteFooter /></div>;
}
