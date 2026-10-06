import { Link } from 'react-router-dom';
import Header from '../components/Header';
import SiteFooter from '../components/SiteFooter';
import WorkArtwork from '../components/WorkArtwork';
import { PAGE_TITLES, usePageTitle } from '../utils/pageMeta';

const questions = [
  ['로그인이나 회원가입이 필요한가요?', '준비된 예제는 로그인 없이 체험할 수 있습니다. 공개 회원가입은 제공하지 않습니다.'],
  ['내가 남긴 의견은 저장되나요?', '체험 의견은 현재 화면에서만 보입니다. 다른 페이지로 이동하거나 새로고침하면 사라지고, 다른 사람에게 전송되지 않습니다.'],
  ['디자인 속 버튼이나 입력창도 사용할 수 있나요?', '검토할 디자인은 이미지입니다. 이미지 위의 번호와 바깥의 의견 입력창, 수정 전·수정안 버튼을 사용해 주세요.'],
];

export default function GuidePage() {
  usePageTitle(PAGE_TITLES.guide);
  return <div className="app-surface"><Header /><div className="shell guide-page">
    <header className="page-heading"><span className="section-kicker">이용 안내</span><h1>의견을 적고,<br className="mobile-break" /> 수정 예시와 비교해요.</h1><p>준비된 화면으로 디자인 피드백을 연습하는 체험 서비스입니다.</p></header>
    <ol className="guide-steps" aria-label="샘플 리뷰 이용 순서">
      <li><div className="guide-visual guide-locate" aria-hidden="true"><WorkArtwork kind="gallery" before /><span className="preview-pin">1</span></div><div className="guide-step-copy"><span>01</span><div><h2>번호를 고르세요</h2><p>화면에 표시된 번호를 누르면 해당 위치의 의견이 보입니다.</p></div></div></li>
      <li><div className="guide-visual guide-write" aria-hidden="true"><div className="guide-comment-card"><span className="note-number">1</span><strong>이 부분에 의견 남기기</strong><p>제목을 더 크게 보여주면 좋겠어요.<span className="example-caret" /></p><span className="example-submit">의견 추가</span></div></div><div className="guide-step-copy"><span>02</span><div><h2>의견을 남겨보세요</h2><p>선택한 위치에 의견을 적어봅니다. 저장되지는 않아요.</p></div></div></li>
      <li><div className="guide-visual guide-compare" aria-hidden="true"><div><span>수정 전</span><WorkArtwork kind="gallery" before viewBox="80 190 445 165" /></div><div><span>수정안</span><WorkArtwork kind="gallery" viewBox="80 190 445 165" /></div></div><div className="guide-step-copy"><span>03</span><div><h2>수정 예시를 비교하세요</h2><p>미리 만든 수정안입니다. 입력한 의견으로 자동 변경되지는 않아요.</p></div></div></li>
    </ol>
    <div className="guide-start"><Link className="primary-link" to="/posts/sample-1">샘플 리뷰 시작하기</Link></div>
    <section className="guide-faq" aria-labelledby="faq-title"><h2 id="faq-title">궁금한 점</h2><div>{questions.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>
  </div><SiteFooter /></div>;
}
