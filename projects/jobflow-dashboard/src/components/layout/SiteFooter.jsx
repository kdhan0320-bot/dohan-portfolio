import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function SiteFooter({ publicMode = false }) {
  const { isGuest } = useAuth();
  return <footer className={`site-footer${publicMode ? ' site-footer-public' : ''}`}>
    <div className="site-footer-inner">
      <div>{isGuest && !publicMode ? <><strong>샘플 체험 · 가상 데이터</strong><p>새로고침하면 샘플 기록이 처음 상태로 돌아갑니다.</p></> : <span>갈피록 · 김도한의 포트폴리오 프로젝트</span>}</div>
      <nav aria-label="하단 안내">{!publicMode && <><Link to="/guide">이용 안내</Link><Link to="/welcome">서비스 소개</Link></>}<a href="https://kdhan0320-bot.github.io/dohan-portfolio/my-portfolio/">포트폴리오로 돌아가기</a></nav>
    </div>
  </footer>;
}
