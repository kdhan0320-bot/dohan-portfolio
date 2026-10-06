import { useId, useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import SiteFooter from '../components/SiteFooter';
import WorkArtwork from '../components/WorkArtwork';
import WorkCard from '../components/WorkCard';
import ChallengeBanner from '../components/ChallengeBanner';
import { SAMPLE_POSTS } from '../constants/samplePosts';
import { PAGE_TITLES, usePageTitle } from '../utils/pageMeta';
import { getLegacyWorksPath } from '../utils/workList';

function ReviewPreview() {
  const [after, setAfter] = useState(false);
  const [active, setActive] = useState(0);
  const id = useId();
  const post = SAMPLE_POSTS[0];
  const note = post.notes[active];
  return <section className="product-preview" aria-label="디자인 피드백 보드 미리보기">
    <div className="product-preview-heading">
      <div><span className="preview-status">샘플 리뷰</span><h2>{post.title}<span>전시 웹사이트</span></h2></div>
      <div className="version-switch" role="group" aria-label="미리보기 디자인 버전">
        <button aria-pressed={!after} onClick={() => setAfter(false)}>수정 전</button>
        <button aria-pressed={after} onClick={() => setAfter(true)}>수정안</button>
      </div>
    </div>
    <div className="product-preview-body">
      <div className="product-preview-canvas">
        <div className="product-preview-art">
          <WorkArtwork kind="gallery" before={!after} viewBox="0 125 960 480" title={`전시 웹사이트 · ${after ? '수정안' : '수정 전'} 미리보기`} />
          {post.notes.map((item, index) => <button key={item.title} className="feedback-pin" aria-label={`미리보기 ${index + 1}번: ${item.title}`} aria-pressed={active === index} aria-controls={`${id}-note`} style={{ left: 'max(26px, 5%)', top: `${(item.y * 6.8 - 125) / 4.8}%` }} onClick={() => setActive(index)}>{index + 1}</button>)}
        </div>
        <p>번호를 눌러 의견을 확인해 보세요.</p>
      </div>
      <aside className="product-preview-feedback">
        <span className="section-kicker">화면의 위치와 연결된 의견</span>
        <div id={`${id}-note`} className="product-note" aria-live="polite" aria-atomic="true">
          <h3><span className="note-number">{active + 1}</span>{note.title}</h3>
          <p>{note.text}</p>
          <div className="product-note-change"><span>{after ? '바꾼 점' : '수정 방향'}</span><strong>{note.change}</strong></div>
        </div>
        <Link className="primary-link" to={`/posts/${post.id}${after ? '?view=after' : ''}`}>이 화면에 의견 남기기</Link>
        <span className="product-preview-hint">미리 준비된 디자인 예시입니다.</span>
      </aside>
    </div>
    <ol className="product-preview-steps" aria-label="리뷰 체험 순서"><li><span>01</span> 번호 선택</li><li><span>02</span> 의견 남기기</li><li><span>03</span> 수정안 비교</li></ol>
  </section>;
}

export default function HomePage() {
  const location = useLocation();
  usePageTitle(PAGE_TITLES.home);
  const legacyWorksPath = getLegacyWorksPath(location.search);
  if (legacyWorksPath) return <Navigate to={legacyWorksPath} replace />;
  const featured = [SAMPLE_POSTS[1], SAMPLE_POSTS[3], SAMPLE_POSTS[2]];
  return <div className="app-surface"><Header />
    <div className="home-page">
      <section className="shell product-intro" aria-labelledby="home-title">
        <div><span className="section-kicker">고른시선 · 디자인 피드백 보드</span><h1 id="home-title">화면에 의견을 남기고,<br /><span>수정 전후</span>를 비교하세요.</h1></div>
        <div className="product-intro-copy"><p>웹·앱 디자인의 어느 부분을 바꿀지,<br />화면과 의견을 함께 보며 살펴보세요.</p><Link className="primary-link" to="/posts/sample-1">샘플 리뷰 시작하기</Link><span>로그인 없이 체험 · 의견은 저장되지 않습니다.</span></div>
      </section>
      <div className="shell"><ReviewPreview /></div>
      <div className="shell home-challenge"><ChallengeBanner /></div>
      <section className="shell home-selection" aria-labelledby="selection-title">
        <div className="section-heading"><div><span className="section-kicker">정보 위계 · 주요 행동 · 입력과 안내</span><h2 id="selection-title">다른 화면도 리뷰해 보세요.</h2></div><Link className="secondary-link" to="/works">리뷰 예제 전체 보기</Link></div>
        <div className="work-grid">{featured.map(post => <WorkCard key={post.id} post={post} />)}</div>
      </section>
    </div><SiteFooter />
  </div>;
}
