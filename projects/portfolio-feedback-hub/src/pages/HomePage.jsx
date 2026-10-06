import { Link, Navigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import SiteFooter from '../components/SiteFooter';
import WorkArtwork from '../components/WorkArtwork';
import WorkCard from '../components/WorkCard';
import PerspectiveBackdrop from '../components/PerspectiveBackdrop';
import { SAMPLE_POSTS } from '../constants/samplePosts';
import { PAGE_TITLES, usePageTitle } from '../utils/pageMeta';
import { getLegacyWorksPath } from '../utils/workList';

export default function HomePage() {
  const location = useLocation();
  usePageTitle(PAGE_TITLES.home);
  const legacyWorksPath = getLegacyWorksPath(location.search);
  if (legacyWorksPath) return <Navigate to={legacyWorksPath} replace />;
  const featured = [SAMPLE_POSTS[1], SAMPLE_POSTS[3], SAMPLE_POSTS[2]];
  return <div className="app-surface"><Header />
    <div className="home-page">
      <section className="home-intro" aria-labelledby="home-title">
        <div className="shell home-hero">
        <div className="hero-copy">
          <span className="section-kicker">디자인 피드백 체험</span>
          <h1 id="home-title">디자인에<br /><span>다른 시선</span>을 더하다.</h1>
        </div>
        <div className="hero-summary">
          <p>화면의 번호를 골라 의견을 남겨보세요.<br />수정 전과 수정안을 함께 비교할 수 있어요.</p>
          <div className="hero-actions"><Link className="primary-link" to="/posts/sample-1">리뷰 체험하기 <span aria-hidden="true">↗</span></Link></div>
          <span className="hero-footnote">로그인 없이 · 저장되지 않는 샘플 체험</span>
        </div>
        </div>
        <div className="shell hero-stage">
        <PerspectiveBackdrop />
        <div className="hero-exhibit">
        <Link className="hero-preview" to="/posts/sample-1" aria-label="시선의 모양 피드백 예시 체험하기">
          <div className="preview-bar"><span className="preview-project"><svg className="preview-window-mark" width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M7 3H3V7M13 3H17V7M17 13V17H13M7 17H3V13" stroke="currentColor" strokeWidth="1.5" /><circle cx="10" cy="10" r="2" fill="currentColor" /></svg>시선의 모양</span><span>리뷰 예시 <i /></span></div>
          <div className="preview-canvas"><WorkArtwork kind="gallery" before viewBox="0 125 960 480" title="전시 웹사이트 수정 전 화면과 제목에 연결된 의견 예시" /><span className="preview-pin" aria-hidden="true">1</span></div>
          <div className="preview-comment"><span className="note-number">1</span><div><strong>제목의 크기와 대비</strong><p>전시 제목이 먼저 읽히면 좋겠어요.</p></div><span className="preview-comment-mark" aria-hidden="true">↗</span></div>
          <div className="preview-bottom"><span>샘플 리뷰 · 예시 의견 2개</span><span aria-hidden="true">체험하기 ↗</span></div>
        </Link>
        </div>
        </div>
        <div className="shell hero-process"><ol aria-label="리뷰 체험 순서"><li><span>01</span> 번호 고르기</li><li><span>02</span> 의견 남기기</li><li><span>03</span> 수정안 비교</li></ol><Link className="plain-link" to="/guide">리뷰 방법 <span aria-hidden="true">↗</span></Link></div>
      </section>
      <section className="shell home-selection" aria-labelledby="selection-title">
        <div className="section-heading"><div><span className="section-kicker">서로 다른 작업, 새로운 관점</span><h2 id="selection-title">다음은, 어떤 디자인?</h2></div><Link className="plain-link" to="/works">작업 전체 보기 <span aria-hidden="true">↗</span></Link></div>
        <div className="work-grid">{featured.map(post => <WorkCard key={post.id} post={post} />)}</div>
      </section>
    </div><SiteFooter />
  </div>;
}
