import BrandMark from './BrandMark';
import PracticeIcon from './PracticeIcon';
export default function SiteFooter() {
  const returnToTop = event => {
    const heading = event.currentTarget.closest('.practice-surface')?.querySelector('h1');
    if (heading) {
      heading.setAttribute('tabindex', '-1');
      heading.focus({ preventScroll: true });
    }
    window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  };
  return <div className="footer-band"><footer className="site-footer shell">
    <div className="footer-identity"><div className="footer-brand"><BrandMark size={26} /><strong>고른시선</strong></div><p className="footer-disclaimer">만든 이 김도한 · UI 비교 연습</p></div>
    <p className="footer-perspective">목표가 바뀌면,<br /><span>같은 화면도 다르게 보입니다.</span></p>
    <div className="footer-links"><a href="https://kdhan0320-bot.github.io/dohan-portfolio/">도한의 포트폴리오</a><button className="footer-top" onClick={returnToTop}>맨 위로<PracticeIcon name="up" /></button></div>
  </footer></div>;
}
