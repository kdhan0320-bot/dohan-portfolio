import { Link, useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import SiteFooter from '../components/SiteFooter';
import WorkArtwork from '../components/WorkArtwork';
import { SAMPLE_POSTS } from '../constants/samplePosts';
import { usePageTitle } from '../utils/pageMeta';

export default function ComparePage() {
  usePageTitle('수정 전후 비교 | 고른시선');
  const [searchParams, setSearchParams] = useSearchParams();
  const post = SAMPLE_POSTS.find(item => item.id === searchParams.get('sample')) || SAMPLE_POSTS[0];
  const selectSample = event => {
    const next = new URLSearchParams(searchParams);
    next.set('sample', event.target.value);
    setSearchParams(next);
  };

  return <div className="app-surface review-surface"><Header />
    <div className="shell compare-page">
      <header className="page-heading">
        <span className="section-kicker">수정 전후 비교</span>
        <h1>의견이 닿은 곳,<br className="mobile-break" /> 무엇이 달라졌을까요?</h1>
        <p>같은 화면을 나란히 보고, 바꾼 이유를 확인하세요.</p>
      </header>
      <section aria-labelledby="comparison-title">
        <div className="compare-toolbar">
          <div><span className="section-kicker">{post.category}</span><h2 id="comparison-title">{post.title}</h2><p>{post.subtitle}</p></div>
          <label className="compare-select">비교할 예제<select value={post.id} onChange={selectSample}>{SAMPLE_POSTS.map(item => <option key={item.id} value={item.id}>{item.title}</option>)}</select></label>
        </div>
        <p className="compare-question"><strong>검토 질문</strong><span>{post.question}</span></p>
        <p className="comparison-artwork-note">검토용 디자인 이미지 · 화면 안의 버튼은 동작하지 않습니다.</p>
        <div className="comparison-grid" key={post.id}>
          <figure className="comparison-panel">
            <figcaption><span className="comparison-label">수정 전</span><span>검토할 화면</span></figcaption>
            <WorkArtwork kind={post.kind} before title={`${post.title} · 수정 전 디자인 예시`} />
          </figure>
          <figure className="comparison-panel comparison-panel--after">
            <figcaption><span className="comparison-label">수정안</span><span>의견을 반영한 예시</span></figcaption>
            <WorkArtwork kind={post.kind} title={`${post.title} · 수정안 디자인 예시`} />
          </figure>
        </div>
        <div className="comparison-notes">
          {post.notes.map((note, index) => <article className="comparison-note" key={note.title}>
            <span className="note-number" aria-hidden="true">{index + 1}</span>
            <div><h3>{note.title}</h3><p className="comparison-change">{note.change}</p><p>{note.check}</p></div>
          </article>)}
        </div>
        {post.rationale && <details className="comparison-rationale" key={`${post.id}-rationale`}>
          <summary><span><strong>수정 이유</strong><span>{post.rationale.title}</span></span><span className="rationale-toggle" aria-hidden="true">+</span></summary>
          <div className="rationale-body">
            <p className="rationale-goal">{post.rationale.goal}</p>
            <dl>{post.rationale.decisions.map(decision => <div key={decision.label}><dt>{decision.label}</dt><dd>{decision.text}</dd></div>)}</dl>
            <p className="rationale-disclaimer">가상 예제의 설계 판단입니다. 실제 사용자 검증 결과는 아닙니다.</p>
          </div>
        </details>}
        <div className="comparison-footer">
          <p>미리 제작한 수정 예시입니다. 입력한 의견에 따라 자동으로 바뀌지는 않습니다.</p>
          <Link className="primary-link" to={`/posts/${post.id}`}>이 화면에 의견 남기기</Link>
        </div>
        <span className="sr-only" role="status">{post.title}의 수정 전후를 표시합니다.</span>
      </section>
    </div><SiteFooter />
  </div>;
}
