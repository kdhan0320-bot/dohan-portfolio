import { Link } from 'react-router-dom';
import BrandMark from './BrandMark';
export default function SiteFooter() {
  return <div className="footer-band"><footer className="site-footer shell">
    <div className="footer-identity"><div className="footer-brand"><BrandMark size={26} /><strong>고른시선</strong></div><p className="footer-disclaimer">직접 만든 UI 예제 · 포트폴리오 프로젝트</p></div>
    <div className="footer-links"><Link to="/exercises">연습 모음</Link><Link to="/guide">이용 안내</Link><a href="https://kdhan0320-bot.github.io/dohan-portfolio/">도한의 포트폴리오</a></div>
  </footer></div>;
}
