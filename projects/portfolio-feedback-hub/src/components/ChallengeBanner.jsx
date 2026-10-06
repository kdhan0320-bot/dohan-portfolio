import { Link } from 'react-router-dom';

export default function ChallengeBanner() {
  return <section className="challenge-banner" aria-labelledby="challenge-banner-title">
    <div className="challenge-banner-copy">
      <span className="section-kicker">피드백 연습</span>
      <h2 id="challenge-banner-title">한 가지를 바꾸면,<br />화면은 어떻게 달라질까요?</h2>
      <p>제목·버튼·입력 안내에서<br />바꿀 부분과 이유를 찾아보세요.</p>
    </div>
    <svg className="challenge-banner-art" viewBox="0 0 440 260" aria-hidden="true" focusable="false">
      <rect x="34" y="25" width="260" height="196" rx="10" fill="#F9F4ED" stroke="#DFB8A6" strokeWidth="2" />
      <path d="M34 58H294" stroke="#DFB8A6" strokeWidth="2" />
      <circle cx="53" cy="42" r="3" fill="#C58D78" /><circle cx="66" cy="42" r="3" fill="#C58D78" /><circle cx="79" cy="42" r="3" fill="#C58D78" />
      <rect x="61" y="82" width="160" height="14" rx="3" fill="#352E2A" />
      <rect x="61" y="105" width="119" height="14" rx="3" fill="#352E2A" />
      <rect x="61" y="137" width="142" height="6" rx="3" fill="#C3B4AA" />
      <rect x="61" y="151" width="117" height="6" rx="3" fill="#C3B4AA" />
      <rect x="61" y="179" width="74" height="23" rx="4" fill="#B4442E" />
      <rect x="52" y="72" width="182" height="58" rx="5" fill="none" stroke="#B4442E" strokeWidth="2" strokeDasharray="5 4" />
      <circle cx="234" cy="73" r="15" fill="#B4442E" stroke="#F9F4ED" strokeWidth="3" />
      <text x="234" y="78" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="700">1</text>
      <path d="M249 74H324V119" fill="none" stroke="#B4442E" strokeWidth="2" />
      <rect x="221" y="119" width="193" height="91" rx="8" fill="#352E2A" />
      <circle cx="246" cy="145" r="11" fill="#F5B197" /><text x="246" y="149" textAnchor="middle" fill="#352E2A" fontSize="12" fontWeight="700">1</text>
      <text x="266" y="150" fill="#FFF9F3" fontSize="14" fontWeight="700">제목의 우선순위</text>
      <text x="238" y="181" fill="#E9D9CE" fontSize="13">첫 문장이 먼저 읽히도록.</text>
      <circle cx="368" cy="53" r="22" fill="#F5B197" />
      <path d="M358 53l7 7 13-15" fill="none" stroke="#643829" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
    <div className="challenge-banner-action"><Link className="primary-link" to="/challenges">피드백 연습 보기</Link><span>예제 연습 · 의견은 저장되지 않아요.</span></div>
  </section>;
}
