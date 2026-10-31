import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import ActionFeedback from '../ui/ActionFeedback';

export default function SiteFooter({ publicMode = false }) {
  const { user, isGuest, enterGuestMode } = useAuth();
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState(null);
  async function openGuide(event) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || user || isGuest) return;
    event.preventDefault();
    try { await enterGuestMode(); navigate('/guide'); }
    catch { setFeedback({ severity: 'error', message: '안내를 열지 못했어요. 다시 시도해주세요.' }); }
  }
  return <><footer className={`site-footer${publicMode ? ' site-footer-public' : ''}`}>
    <div className="site-footer-inner">
      {isGuest && !publicMode && <div><strong>샘플 체험 · 가상 데이터</strong></div>}
      <nav aria-label="하단 안내"><Link to="/guide" onClick={openGuide}>이용 안내</Link><Link to="/welcome">서비스 소개</Link><a href="https://kdhan0320-bot.github.io/dohan-portfolio/my-portfolio/">포트폴리오로 돌아가기</a></nav>
    </div>
  </footer><ActionFeedback feedback={feedback} onClose={() => setFeedback(null)} /></>;
}
