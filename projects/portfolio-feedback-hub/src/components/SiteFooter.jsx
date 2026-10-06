import { Link } from 'react-router-dom';
import BrandMark from './BrandMark';
export default function SiteFooter() {
  return <div className="footer-band"><footer className="site-footer shell">
    <div className="footer-identity"><div className="footer-brand"><BrandMark size={26} /><strong>고른시선</strong></div><p>디자인 피드백 보드 · 포트폴리오용 체험 서비스</p></div>
    <div className="footer-links"><Link to="/compare">수정 전후</Link><Link to="/challenges">디자인 챌린지</Link><Link to="/guide">이용 안내</Link><Link to="/login">관리자 로그인</Link><a href="https://kdhan0320-bot.github.io/dohan-portfolio/">도한의 포트폴리오</a></div>
  </footer></div>;
}
