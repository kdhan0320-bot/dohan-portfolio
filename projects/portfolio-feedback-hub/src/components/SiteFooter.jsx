import BrandMark from './BrandMark';
export default function SiteFooter() {
  return <div className="footer-band"><footer className="site-footer shell">
    <div className="footer-identity"><div className="footer-brand"><BrandMark size={26} /><strong>고른시선</strong></div><p className="footer-disclaimer">만든 이 김도한 · UI 비교 연습</p></div>
    <p className="footer-perspective">목표가 바뀌면,<br /><span>같은 화면도 다르게 보입니다.</span></p>
    <div className="footer-links"><a href="https://kdhan0320-bot.github.io/dohan-portfolio/">도한의 포트폴리오</a></div>
  </footer></div>;
}
